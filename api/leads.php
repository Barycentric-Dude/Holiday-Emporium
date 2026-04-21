<?php
// api/leads.php
require_once 'config.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON']);
        exit;
    }

    $first_name = $data['first_name'] ?? '';
    $last_name = $data['last_name'] ?? '';
    $phone = $data['phone'] ?? '';
    $email = $data['email'] ?? '';
    $package_interest = $data['package_interest'] ?? '';
    $message = $data['message'] ?? '';

    if (empty($first_name) || empty($phone) || empty($email) || empty($package_interest)) {
        http_response_code(400);
        echo json_encode(['error' => 'Required fields missing']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO leads (first_name, last_name, phone, email, package_interest, message) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$first_name, $last_name, $phone, $email, $package_interest, $message]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Thank you! We will contact you soon.',
            'lead_id' => $pdo->lastInsertId()
        ]);
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }

} elseif ($method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM leads ORDER BY created_at DESC");
        $leads = $stmt->fetchAll();
        echo json_encode(['leads' => $leads]);
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
