<?php
// api/admin/tours.php
require_once __DIR__ . '/middleware.php';

// Verify admin session
verify_admin();

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST' || $method === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON payload.']);
        exit;
    }

    $id = $data['id'] ?? null;
    $slug = $data['slug'] ?? '';
    $title = $data['title'] ?? '';
    $title_mr = $data['title_mr'] ?? '';
    $category = $data['category'] ?? '';
    $duration = $data['duration'] ?? '';
    $price = $data['price'] ?? '';
    $tagline = $data['tagline'] ?? '';
    $description = $data['description'] ?? '';
    $image = $data['image'] ?? '';

    if (!$id || !$title || !$category) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields (id, title, category).']);
        exit;
    }

    $pdo->beginTransaction();

    try {
        if ($method === 'POST') {
            // Check if ID exists
            $check = $pdo->prepare("SELECT id FROM tours WHERE id = ?");
            $check->execute([$id]);
            if ($check->fetch()) {
                throw new Exception("Tour with ID '$id' already exists.");
            }

            $stmt = $pdo->prepare("INSERT INTO tours (id, slug, title, title_mr, category, duration, price, tagline, description, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$id, $slug, $title, $title_mr, $category, $duration, $price, $tagline, $description, $image]);
        } else {
            $stmt = $pdo->prepare("UPDATE tours SET slug=?, title=?, title_mr=?, category=?, duration=?, price=?, tagline=?, description=?, image=? WHERE id=?");
            $stmt->execute([$slug, $title, $title_mr, $category, $duration, $price, $tagline, $description, $image, $id]);
            
            // Clear existing related data for update
            $pdo->prepare("DELETE FROM tour_highlights WHERE tour_id = ?")->execute([$id]);
            $pdo->prepare("DELETE FROM tour_itineraries WHERE tour_id = ?")->execute([$id]);
            $pdo->prepare("DELETE FROM tour_variants WHERE tour_id = ?")->execute([$id]);
        }

        // Insert highlights
        if (isset($data['highlights']) && is_array($data['highlights'])) {
            $h_stmt = $pdo->prepare("INSERT INTO tour_highlights (tour_id, highlight_text) VALUES (?, ?)");
            foreach ($data['highlights'] as $highlight) {
                if (!empty($highlight)) $h_stmt->execute([$id, $highlight]);
            }
        }

        // Insert itineraries
        if (isset($data['itinerary']) && is_array($data['itinerary'])) {
            $i_stmt = $pdo->prepare("INSERT INTO tour_itineraries (tour_id, day, title, details, stay) VALUES (?, ?, ?, ?, ?)");
            foreach ($data['itinerary'] as $item) {
                $i_stmt->execute([$id, $item['day'], $item['title'], $item['details'], $item['stay'] ?? '']);
            }
        }

        // Insert variants
        if (isset($data['variants']) && is_array($data['variants'])) {
            $v_stmt = $pdo->prepare("INSERT INTO tour_variants (tour_id, variant_id, name, duration, destinations) VALUES (?, ?, ?, ?, ?)");
            foreach ($data['variants'] as $v) {
                $v_stmt->execute([$id, $v['id'], $v['name'], $v['duration'], $v['destinations']]);
            }
        }

        $pdo->commit();
        echo json_encode(['success' => true, 'message' => 'Tour saved successfully.']);

    } catch (Exception $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
    }

} elseif ($method === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'] ?? null;

    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Tour ID is required.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM tours WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true, 'message' => 'Tour deleted.']);
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
}
?>
