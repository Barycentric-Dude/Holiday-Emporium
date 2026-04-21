<?php
// api/index.php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

echo json_encode(["message" => "Holiday Emporium PHP API"]);
?>
