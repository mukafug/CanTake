<?php
//========💨AwalRegion_API_Configuration💨=====
// Include konfigurasi database
require_once '../config/database.php';

// Set headers untuk CORS dan response JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request untuk CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
//========💧AkhirRegion_API_Configuration💧=====

//========💨AwalRegion_POST_Validation💨=====
// Validasi hanya menerima POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Only POST method is allowed'
    ]);
    exit;
}

// Ambil data JSON dari request body
$data = json_decode(file_get_contents('php://input'), true);

// Validasi field yang wajib diisi
if (!isset($data['email']) || !isset($data['new_password'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Email dan password baru diperlukan'
    ]);
    exit;
}
//========💧AkhirRegion_POST_Validation💧=====

//========💨AwalRegion_Input_Processing💨=====
// Sanitize dan validasi input data
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$newPassword = $data['new_password'];

// Validasi format email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Format email tidak valid'
    ]);
    exit;
}

// Cek apakah email ada di database
$checkEmailSql = "SELECT id FROM users WHERE email = ?";
$user = getRecord($checkEmailSql, "s", [$email]);

if (!$user) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Email tidak ditemukan'
    ]);
    exit;
}
//========💧AkhirRegion_Input_Processing💧=====

//========💨AwalRegion_Password_Update💨=====
// Update password di database (password tidak di-hash)
$updateSql = "UPDATE users SET password = ? WHERE email = ?";
$stmt = $conn->prepare($updateSql);
$stmt->bind_param("ss", $newPassword, $email);

if ($stmt->execute()) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Password berhasil diubah'
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Gagal mengubah password',
        'error' => $conn->error
    ]);
}

// Tutup koneksi database
$stmt->close();
$conn->close();
//========💧AkhirRegion_Password_Update💧=====
?>
