
<?php
$host = 'fdb1027.biz.nf'; 
$db = '4552867_4552867'; 
$user = '4552867_4552867'; 
$pass = 'Eissa@12'; 

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'];
$requestDetails = $data['requestDetails'];
$status = $data['status'];

$stmt = $conn->prepare("UPDATE requests SET request_details = ?, status = ? WHERE id = ?");
$stmt->bind_param("ssi", $requestDetails, $status, $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $conn->error]);
}

$stmt->close();
$conn->close();
?>
