<?php
//========💨AwalRegion_Database_Configuration💨=====
// Konfigurasi koneksi database MySQL untuk CanTake
$host = "localhost";
$username = "root";
$password = "";
$database = "cantake";

// Membuat koneksi ke database
$conn = new mysqli($host, $username, $password, $database);

// Cek koneksi database
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set character set untuk mendukung emoji dan karakter khusus
$conn->set_charset("utf8mb4");
//========💧AkhirRegion_Database_Configuration💧=====

//========💨AwalRegion_Helper_Functions💨=====
// Fungsi untuk handle error database dan return JSON response
function handleDatabaseError($message) {
    global $conn;
    $response = [
        "status" => "error",
        "message" => $message,
        "error" => $conn->error
    ];
    echo json_encode($response);
    exit;
}

// Fungsi untuk mengambil satu record dari database
function getRecord($sql, $types = null, $params = []) {
    global $conn;

    $stmt = $conn->prepare($sql);

    if ($types && $params) {
        $stmt->bind_param($types, ...$params);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        return $result->fetch_assoc();
    }

    return null;
}

// Fungsi untuk mengambil multiple records dari database
function getRecords($sql, $types = null, $params = []) {
    global $conn;

    $stmt = $conn->prepare($sql);

    if ($types && $params) {
        $stmt->bind_param($types, ...$params);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $records = [];
    while ($row = $result->fetch_assoc()) {
        $records[] = $row;
    }

    return $records;
}
//========💧AkhirRegion_Helper_Functions💧=====
?>
