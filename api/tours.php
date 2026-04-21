<?php
// api/tours.php
require_once 'config.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $tour_id = isset($_GET['id']) ? $_GET['id'] : null;

    if ($tour_id) {
        // Fetch single tour
        $stmt = $pdo->prepare("SELECT * FROM tours WHERE id = ?");
        $stmt->execute([$tour_id]);
        $tour = $stmt->fetch();

        if ($tour) {
            // Fetch highlights
            $h_stmt = $pdo->prepare("SELECT highlight_text FROM tour_highlights WHERE tour_id = ?");
            $h_stmt->execute([$tour_id]);
            $tour['highlights'] = $h_stmt->fetchAll(PDO::FETCH_COLUMN);

            // Fetch itinerary
            $i_stmt = $pdo->prepare("SELECT day, title, details, stay FROM tour_itineraries WHERE tour_id = ? ORDER BY id ASC");
            $i_stmt->execute([$tour_id]);
            $tour['itinerary'] = $i_stmt->fetchAll();

            // Fetch variants
            $v_stmt = $pdo->prepare("SELECT variant_id as id, name, duration, destinations FROM tour_variants WHERE tour_id = ?");
            $v_stmt->execute([$tour_id]);
            $tour['variants'] = $v_stmt->fetchAll();

            echo json_encode($tour);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Tour not found']);
        }
    } else {
        // Fetch all tours
        $stmt = $pdo->query("SELECT * FROM tours");
        $tours = $stmt->fetchAll();

        foreach ($tours as &$tour) {
            $tid = $tour['id'];
            
            // Fetch highlights
            $h_stmt = $pdo->prepare("SELECT highlight_text FROM tour_highlights WHERE tour_id = ?");
            $h_stmt->execute([$tid]);
            $tour['highlights'] = $h_stmt->fetchAll(PDO::FETCH_COLUMN);

            // Fetch itinerary
            $i_stmt = $pdo->prepare("SELECT day, title, details, stay FROM tour_itineraries WHERE tour_id = ? ORDER BY id ASC");
            $i_stmt->execute([$tid]);
            $tour['itinerary'] = $i_stmt->fetchAll();

            // Fetch variants
            $v_stmt = $pdo->prepare("SELECT variant_id as id, name, duration, destinations FROM tour_variants WHERE tour_id = ?");
            $v_stmt->execute([$tid]);
            $tour['variants'] = $v_stmt->fetchAll();
        }

        echo json_encode(['tours' => $tours]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
