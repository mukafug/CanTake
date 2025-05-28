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
// Handle GET requests - mengambil data menu/produk
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Ambil semua menu items yang tersedia
    if (!isset($_GET['id']) && !isset($_GET['merchant_id']) && !isset($_GET['top_sellers'])) {
        $sql = "SELECT * FROM menu_items WHERE available = 1";
        $menuItems = getRecords($sql);

        echo json_encode([
            "status" => "success",
            "data" => $menuItems
        ]);
    }
    // Ambil menu item berdasarkan ID
    else if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $sql = "SELECT * FROM menu_items WHERE id = ? AND available = 1";
        $menuItem = getRecord($sql, "i", [$id]);

        if ($menuItem) {
            echo json_encode([
                "status" => "success",
                "data" => $menuItem
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Menu item not found"
            ]);
        }
    }
    // Ambil menu items berdasarkan merchant ID
    else if (isset($_GET['merchant_id'])) {
        $merchantId = $_GET['merchant_id'];
        $sql = "SELECT * FROM menu_items WHERE merchant_id = ? AND available = 1";
        $menuItems = getRecords($sql, "i", [$merchantId]);

        echo json_encode([
            "status" => "success",
            "data" => $menuItems
        ]);
    }
    // Ambil menu items terlaris (best seller)
    else if (isset($_GET['top_sellers'])) {
        $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;

        // Query untuk mengambil menu items karena belum ada data order
        $sql = "SELECT m.*, 0 as order_count
                FROM menu_items m
                WHERE m.available = 1
                LIMIT ?";

        $topSellers = getRecords($sql, "i", [$limit]);

        // Tambahkan nama merchant ke setiap menu item
        foreach ($topSellers as &$item) {
            $merchantId = $item['merchant_id'];
            $merchantSql = "SELECT merchant_name, image_url FROM merchants WHERE id = ?";
            $merchant = getRecord($merchantSql, "i", [$merchantId]);

            if ($merchant) {
                $item['merchant_name'] = $merchant['merchant_name'];
                $item['merchant_image_url'] = $merchant['image_url'];
            } else {
                $item['merchant_name'] = "Unknown Merchant";
                $item['merchant_image_url'] = "";
            }
        }

        echo json_encode([
            "status" => "success",
            "data" => $topSellers
        ]);
    }
}
//========💧AkhirRegion_GET_Requests💧=====

//========💨AwalRegion_POST_Requests💨=====
// Handle POST requests - membuat menu item baru
else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ambil data JSON dari request body
    $data = json_decode(file_get_contents("php://input"), true);

    // Validasi field yang wajib diisi
    if (
        !isset($data['merchant_id']) ||
        !isset($data['name']) ||
        !isset($data['price']) ||
        !isset($data['prep_time'])
    ) {
        echo json_encode([
            "status" => "error",
            "message" => "Missing required fields"
        ]);
        exit;
    }

    // Insert menu item baru ke database
    $sql = "INSERT INTO menu_items (merchant_id, name, description, price, prep_time, available, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $merchantId = $data['merchant_id'];
    $name = $data['name'];
    $description = isset($data['description']) ? $data['description'] : '';
    $price = $data['price'];
    $prepTime = $data['prep_time'];
    $available = isset($data['available']) ? $data['available'] : 1;
    $imageUrl = isset($data['image_url']) ? $data['image_url'] : '';

    $stmt->bind_param("issdiss", $merchantId, $name, $description, $price, $prepTime, $available, $imageUrl);

    if ($stmt->execute()) {
        $newId = $stmt->insert_id;

        echo json_encode([
            "status" => "success",
            "message" => "Menu item created successfully",
            "id" => $newId
        ]);
    } else {
        handleDatabaseError("Failed to create menu item");
    }
}
//========💧AkhirRegion_POST_Requests💧=====

//========💨AwalRegion_PUT_Requests💨=====
// Handle PUT requests - update menu item
else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Ambil data JSON dari request body
    $data = json_decode(file_get_contents("php://input"), true);

    // Validasi ID menu item harus ada
    if (!isset($data['id'])) {
        echo json_encode([
            "status" => "error",
            "message" => "Menu item ID is required"
        ]);
        exit;
    }

    // Build query update dinamis berdasarkan field yang dikirim
    $sql = "UPDATE menu_items SET ";
    $params = [];
    $types = "";

    if (isset($data['name'])) {
        $sql .= "name = ?, ";
        $params[] = $data['name'];
        $types .= "s";
    }

    if (isset($data['description'])) {
        $sql .= "description = ?, ";
        $params[] = $data['description'];
        $types .= "s";
    }

    if (isset($data['price'])) {
        $sql .= "price = ?, ";
        $params[] = $data['price'];
        $types .= "d";
    }

    if (isset($data['prep_time'])) {
        $sql .= "prep_time = ?, ";
        $params[] = $data['prep_time'];
        $types .= "i";
    }

    if (isset($data['available'])) {
        $sql .= "available = ?, ";
        $params[] = $data['available'];
        $types .= "i";
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
            "message" => "Menu item updated successfully"
        ]);
    } else {
        handleDatabaseError("Failed to update menu item");
    }
}
//========💧AkhirRegion_PUT_Requests💧=====

//========💨AwalRegion_DELETE_Requests💨=====
// Handle DELETE requests - hapus menu item
else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Validasi ID menu item harus ada di parameter
    if (!isset($_GET['id'])) {
        echo json_encode([
            "status" => "error",
            "message" => "Menu item ID is required"
        ]);
        exit;
    }

    $id = $_GET['id'];

    // Hapus menu item dengan set available = 0 (soft delete)
    $sql = "UPDATE menu_items SET available = 0 WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Menu item deleted successfully"
        ]);
    } else {
        handleDatabaseError("Failed to delete menu item");
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
