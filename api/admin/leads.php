<?php
// api/admin/leads.php
require_once __DIR__ . '/middleware.php';

// Verify admin session
verify_admin();

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // List all leads
    try {
        $stmt = $pdo->query("SELECT * FROM leads ORDER BY created_at DESC");
        $leads = $stmt->fetchAll();
        echo json_encode(['leads' => $leads]);
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} elseif ($method === 'DELETE') {
    // Delete a lead
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'] ?? null;

    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Lead ID is required.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM leads WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true, 'message' => 'Lead deleted.']);
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
}
?>
