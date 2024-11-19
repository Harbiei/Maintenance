
<?php
$host = 'fdb1027.biz.nf';
$db = '4552867_4552867';
$user = '4552867_4552867';
$pass = 'Eissa@12';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
}

$result = $conn->query("SELECT * FROM requests");

$requests = [];

while ($row = $result->fetch_assoc()) {
    $requests[] = $row;
}

echo json_encode($requests);

$conn->close();
?>
