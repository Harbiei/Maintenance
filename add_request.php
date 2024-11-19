
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

$buildingNumber = $data['buildingNumber'];
$roomNumber = $data['roomNumber'];
$requestDetails = $data['requestDetails'];
$status = 'تم إرسال الطلب';

$stmt = $conn->prepare("INSERT INTO requests (building_number, room_number, request_details, status) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $buildingNumber, $roomNumber, $requestDetails, $status);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $conn->error]);
}

$stmt->close();
$conn->close();
?>
