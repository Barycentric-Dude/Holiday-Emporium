<?php
// api/admin/auth_check.php
require_once __DIR__ . '/../config.php';

header('Content-Type: application/json');

if (isset($_SESSION['admin_id'])) {
    echo json_encode([
        'authenticated' => true,
        'admin' => [
            'username' => $_SESSION['admin_username']
        ]
    ]);
} else {
    echo json_encode([
        'authenticated' => false
    ]);
}
?>
