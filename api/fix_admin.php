<?php
require_once 'config.php';

$username = 'admin';
$password = 'admin123';
$hash = password_hash($password, PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare("UPDATE admins SET password_hash = ? WHERE username = ?");
    $stmt->execute([$hash, $username]);
    
    if ($stmt->rowCount() > 0) {
        echo "Successfully updated password for 'admin' to 'admin123'.<br>";
    } else {
        // If update failed (user might not exist), try insert
        $stmt = $pdo->prepare("INSERT INTO admins (username, password_hash) VALUES (?, ?) ON DUPLICATE KEY UPDATE password_hash = ?");
        $stmt->execute([$username, $hash, $hash]);
        echo "Successfully set admin credentials.<br>";
    }
    echo "Database connection is working correctly.";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
