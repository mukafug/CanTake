<?php
//========💨AwalRegion_API_Configuration💨=====
// Include konfigurasi database
require_once '../config/database.php';

// Set headers untuk CORS dan response JSON
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight OPTIONS request untuk CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
//========💧AkhirRegion_API_Configuration💧=====

//========💨AwalRegion_POST_Requests💨=====
// Handle POST requests - upload file gambar
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Cek apakah file berhasil diupload
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode([
            "status" => "error",
            "message" => "No file uploaded or upload error occurred"
        ]);
        exit;
    }

    $file = $_FILES['image'];

    // Validasi tipe file yang diizinkan
    $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!in_array($file['type'], $allowedTypes)) {
        echo json_encode([
            "status" => "error",
            "message" => "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed."
        ]);
        exit;
    }

    // Validasi ukuran file maksimal 5MB
    $maxSize = 5 * 1024 * 1024; // 5MB dalam bytes
    if ($file['size'] > $maxSize) {
        echo json_encode([
            "status" => "error",
            "message" => "File size too large. Maximum size is 5MB."
        ]);
        exit;
    }

    // Generate nama file unik untuk mencegah konflik
    $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $fileName = 'menu_' . uniqid() . '_' . time() . '.' . $fileExtension;

    // Set direktori upload
    $uploadDir = '../../FrontEnd/public/assets/MainAssets/Upload/';

    // Buat direktori jika belum ada
    if (!is_dir($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            echo json_encode([
                "status" => "error",
                "message" => "Failed to create upload directory"
            ]);
            exit;
        }
    }

    $uploadPath = $uploadDir . $fileName;

    // Pindahkan file yang diupload ke direktori tujuan
    if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
        // Return path yang kompatibel dengan database
        $dbPath = 'CanTake/FrontEnd/public/assets/MainAssets/Upload/' . $fileName;

        echo json_encode([
            "status" => "success",
            "message" => "File uploaded successfully",
            "image_url" => $dbPath,
            "filename" => $fileName
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to move uploaded file"
        ]);
    }
}
//========💧AkhirRegion_POST_Requests💧=====

//========💨AwalRegion_Invalid_Method💨=====
// Handle invalid method
else {
    echo json_encode([
        "status" => "error",
        "message" => "Method not supported"
    ]);
}
//========💧AkhirRegion_Invalid_Method💧=====
?>
