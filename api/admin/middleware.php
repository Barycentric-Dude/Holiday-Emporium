<?php
// api/admin/middleware.php
require_once __DIR__ . '/../config.php';

function verify_admin() {
    if (!isset($_SESSION['admin_id'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized access. Please login.']);
        exit;
    }
    return $_SESSION['admin_id'];
}
?>
