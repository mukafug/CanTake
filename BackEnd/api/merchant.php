<?php
//========💨AwalRegion_API_Configuration💨=====
// Include konfigurasi database
require_once '../config/database.php';

// Set headers untuk CORS dan response JSON
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
//========💧AkhirRegion_API_Configuration💧=====

//========💨AwalRegion_GET_Requests💨=====
// Handle GET requests - mengambil data merchant
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Ambil semua merchant dengan jumlah menu
    if (!isset($_GET['id']) && !isset($_GET['user_id']) && !isset($_GET['top_merchants'])) {
        $sql = "SELECT m.id, m.merchant_name, m.qris_code_url, m.image_url, u.email, u.first_name, u.last_name,
                       COUNT(mi.id) as menu_count
                FROM merchants m
                JOIN users u ON m.user_id = u.id
                LEFT JOIN menu_items mi ON m.id = mi.merchant_id AND mi.available = 1
                GROUP BY m.id, m.merchant_name, m.qris_code_url, m.image_url, u.email, u.first_name, u.last_name";
        $merchants = getRecords($sql);

        echo json_encode([
            "status" => "success",
            "data" => $merchants
        ]);
    }
    // Ambil merchant berdasarkan ID
    else if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $sql = "SELECT m.id, m.merchant_name, m.qris_code_url, m.image_url, u.email, u.first_name, u.last_name
                FROM merchants m
                JOIN users u ON m.user_id = u.id
                WHERE m.id = ?";
        $merchant = getRecord($sql, "i", [$id]);

        if ($merchant) {
            echo json_encode([
                "status" => "success",
                "data" => $merchant
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Merchant not found"
            ]);
        }
    }
    // Ambil merchant berdasarkan user ID
    else if (isset($_GET['user_id'])) {
        $userId = $_GET['user_id'];
        $sql = "SELECT m.id, m.merchant_name, m.qris_code_url, m.image_url, u.email, u.first_name, u.last_name
                FROM merchants m
                JOIN users u ON m.user_id = u.id
                WHERE m.user_id = ?";
        $merchant = getRecord($sql, "i", [$userId]);

        if ($merchant) {
            echo json_encode([
                "status" => "success",
                "data" => [$merchant] // Return as array to match expected format
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Merchant not found for this user"
            ]);
        }
    }
    // Ambil top merchants berdasarkan jumlah menu
    else if (isset($_GET['top_merchants'])) {
        $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;

        // Query untuk mengambil merchant dengan jumlah menu terbanyak
        $sql = "SELECT m.id, m.merchant_name, m.qris_code_url, m.image_url,
                       COUNT(mi.id) as menu_count
                FROM merchants m
                LEFT JOIN menu_items mi ON m.id = mi.merchant_id AND mi.available = 1
                GROUP BY m.id, m.merchant_name, m.qris_code_url, m.image_url
                LIMIT ?";

        $topMerchants = getRecords($sql, "i", [$limit]);

        if ($topMerchants) {
            echo json_encode([
                "status" => "success",
                "data" => $topMerchants
            ]);
        } else {
            // Untuk debugging jika tidak ada merchant ditemukan
            echo json_encode([
                "status" => "error",
                "message" => "No merchants found",
                "sql" => $sql,
                "limit" => $limit
            ]);
        }
    }
}
//========💧AkhirRegion_GET_Requests💧=====

//========💨AwalRegion_POST_Requests💨=====
// Handle POST requests - membuat merchant baru
else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ambil data JSON dari request body
    $data = json_decode(file_get_contents("php://input"), true);

    // Validasi field yang wajib diisi
    if (
        !isset($data['user_id']) ||
        !isset($data['merchant_name'])
    ) {
        echo json_encode([
            "status" => "error",
            "message" => "Missing required fields"
        ]);
        exit;
    }

    // Insert merchant baru ke database
    $sql = "INSERT INTO merchants (user_id, merchant_name, qris_code_url, image_url) VALUES (?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $userId = $data['user_id'];
    $merchantName = $data['merchant_name'];
    $qrisCodeUrl = isset($data['qris_code_url']) ? $data['qris_code_url'] : '';
    $imageUrl = isset($data['image_url']) ? $data['image_url'] : '';

    $stmt->bind_param("isss", $userId, $merchantName, $qrisCodeUrl, $imageUrl);

    if ($stmt->execute()) {
        $newId = $stmt->insert_id;

        echo json_encode([
            "status" => "success",
            "message" => "Merchant created successfully",
            "id" => $newId
        ]);
    } else {
        handleDatabaseError("Failed to create merchant");
    }
}
//========💧AkhirRegion_POST_Requests💧=====

//========💨AwalRegion_PUT_Requests💨=====
// Handle PUT requests - update data merchant
else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Ambil data JSON dari request body
    $data = json_decode(file_get_contents("php://input"), true);

    // Validasi ID merchant harus ada
    if (!isset($data['id'])) {
        echo json_encode([
            "status" => "error",
            "message" => "Merchant ID is required"
        ]);
        exit;
    }

    // Build query update dinamis berdasarkan field yang dikirim
    $sql = "UPDATE merchants SET ";
    $params = [];
    $types = "";

    if (isset($data['merchant_name'])) {
        $sql .= "merchant_name = ?, ";
        $params[] = $data['merchant_name'];
        $types .= "s";
    }

    if (isset($data['qris_code_url'])) {
        $sql .= "qris_code_url = ?, ";
        $params[] = $data['qris_code_url'];
        $types .= "s";
    }

    if (isset($data['image_url'])) {
        $sql .= "image_url = ?, ";
        $params[] = $data['image_url'];
        $types .= "s";
    }

    // Remove trailing comma and space
    $sql = rtrim($sql, ", ");

    // Add WHERE clause
    $sql .= " WHERE id = ?";
    $params[] = $data['id'];
    $types .= "i";

    // Execute update
    $stmt = $conn->prepare($sql);
    $stmt->bind_param($types, ...$params);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Merchant updated successfully"
        ]);
    } else {
        handleDatabaseError("Failed to update merchant");
    }
}
//========💧AkhirRegion_PUT_Requests💧=====

//========💨AwalRegion_DELETE_Requests💨=====
// Handle DELETE requests - hapus merchant
else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Validasi ID merchant harus ada di parameter
    if (!isset($_GET['id'])) {
        echo json_encode([
            "status" => "error",
            "message" => "Merchant ID is required"
        ]);
        exit;
    }

    $id = $_GET['id'];

    // Hapus merchant dari database
    $sql = "DELETE FROM merchants WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Merchant deleted successfully"
        ]);
    } else {
        handleDatabaseError("Failed to delete merchant");
    }
}
//========💧AkhirRegion_DELETE_Requests💧=====

//========💨AwalRegion_Invalid_Method💨=====
// Handle unsupported methods
else {
    echo json_encode([
        "status" => "error",
        "message" => "Method not supported"
    ]);
}
//========💧AkhirRegion_Invalid_Method💧=====
?>
