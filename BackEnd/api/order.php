<?php
//========💨AwalRegion_API_Configuration💨=====
// Set headers untuk CORS dan response JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Include konfigurasi database
require_once '../config/database.php';

// Handle preflight OPTIONS request untuk CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}
//========💧AkhirRegion_API_Configuration💧=====

//========💨AwalRegion_GET_Requests💨=====
// Handle GET requests - mengambil data order
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Ambil orders berdasarkan user ID
    if (isset($_GET['user_id'])) {
        $userId = $_GET['user_id'];
        $sql = "SELECT o.*, os.status_name, m.merchant_name, rr.reason as rejection_reason
                FROM orders o
                JOIN order_status os ON o.status_id = os.id
                JOIN merchants m ON o.merchant_id = m.id
                LEFT JOIN reject_reasons rr ON o.rejection_reason_id = rr.id
                WHERE o.user_id = ?
                ORDER BY o.created_at DESC";
        $orders = getRecords($sql, "i", [$userId]);

        // Ambil order items untuk setiap order
        foreach ($orders as &$order) {
            $orderItemsSql = "SELECT oi.*, mi.name as menu_item_name
                             FROM order_items oi
                             JOIN menu_items mi ON oi.menu_item_id = mi.id
                             WHERE oi.order_id = ?";
            $order['items'] = getRecords($orderItemsSql, "i", [$order['id']]);
        }

        echo json_encode([
            "status" => "success",
            "data" => $orders
        ]);
    }
    // Ambil orders berdasarkan merchant ID
    else if (isset($_GET['merchant_id'])) {
        $merchantId = $_GET['merchant_id'];
        $sql = "SELECT o.*, os.status_name, u.first_name, u.last_name, u.username
                FROM orders o
                JOIN order_status os ON o.status_id = os.id
                JOIN users u ON o.user_id = u.id
                WHERE o.merchant_id = ?
                ORDER BY o.created_at DESC";
        $orders = getRecords($sql, "i", [$merchantId]);

        // Ambil order items untuk setiap order
        foreach ($orders as &$order) {
            $orderItemsSql = "SELECT oi.*, mi.name as menu_item_name
                             FROM order_items oi
                             JOIN menu_items mi ON oi.menu_item_id = mi.id
                             WHERE oi.order_id = ?";
            $order['items'] = getRecords($orderItemsSql, "i", [$order['id']]);
        }

        echo json_encode([
            "status" => "success",
            "data" => $orders
        ]);
    }
    // Ambil single order berdasarkan ID
    else if (isset($_GET['id'])) {
        $orderId = $_GET['id'];
        $sql = "SELECT o.*, os.status_name, m.merchant_name, u.first_name, u.last_name, u.username
                FROM orders o
                JOIN order_status os ON o.status_id = os.id
                JOIN merchants m ON o.merchant_id = m.id
                JOIN users u ON o.user_id = u.id
                WHERE o.id = ?";
        $order = getRecord($sql, "i", [$orderId]);

        if ($order) {
            // Ambil order items untuk order ini
            $orderItemsSql = "SELECT oi.*, mi.name as menu_item_name
                             FROM order_items oi
                             JOIN menu_items mi ON oi.menu_item_id = mi.id
                             WHERE oi.order_id = ?";
            $order['items'] = getRecords($orderItemsSql, "i", [$orderId]);

            echo json_encode([
                "status" => "success",
                "data" => $order
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Order not found"
            ]);
        }
    }
    else {
        echo json_encode([
            "status" => "error",
            "message" => "Missing required parameters"
        ]);
    }
}
//========💧AkhirRegion_GET_Requests💧=====

//========💨AwalRegion_POST_Requests💨=====
// Handle POST requests - membuat order baru
else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data) {
        echo json_encode([
            "status" => "error",
            "message" => "Invalid JSON data"
        ]);
        exit;
    }

    // Validasi field yang wajib diisi
    if (!isset($data['user_id']) || !isset($data['merchant_id']) || !isset($data['items']) || !isset($data['total_amount'])) {
        echo json_encode([
            "status" => "error",
            "message" => "Missing required fields"
        ]);
        exit;
    }

    try {
        // Mulai database transaction
        $conn->begin_transaction();

        // Insert order baru ke database
        $orderSql = "INSERT INTO orders (user_id, merchant_id, status_id, total_amount, created_at) VALUES (?, ?, 1, ?, NOW())";
        $stmt = $conn->prepare($orderSql);
        $userId = $data['user_id'];
        $merchantId = $data['merchant_id'];
        $totalAmount = $data['total_amount'];

        $stmt->bind_param("iid", $userId, $merchantId, $totalAmount);

        if (!$stmt->execute()) {
            throw new Exception("Failed to create order");
        }

        $orderId = $stmt->insert_id;

        // Insert order items ke database
        $orderItemSql = "INSERT INTO order_items (order_id, menu_item_id, quantity, price_at_order) VALUES (?, ?, ?, ?)";
        $itemStmt = $conn->prepare($orderItemSql);

        foreach ($data['items'] as $item) {
            $menuItemId = $item['menu_item_id'];
            $quantity = $item['quantity'];
            $priceAtOrder = $item['price_at_order'];

            $itemStmt->bind_param("iiid", $orderId, $menuItemId, $quantity, $priceAtOrder);

            if (!$itemStmt->execute()) {
                throw new Exception("Failed to add order item");
            }
        }

        // Jika payment method cash, langsung update status ke paid
        if (isset($data['payment_method']) && $data['payment_method'] === 'cash') {
            $updateStatusSql = "UPDATE orders SET status_id = 2, paid_at = NOW() WHERE id = ?";
            $updateStmt = $conn->prepare($updateStatusSql);
            $updateStmt->bind_param("i", $orderId);
            $updateStmt->execute();
        }
        // Untuk QRIS, anggap langsung paid untuk demo
        else if (isset($data['payment_method']) && $data['payment_method'] === 'qris') {
            $updateStatusSql = "UPDATE orders SET status_id = 2, paid_at = NOW() WHERE id = ?";
            $updateStmt = $conn->prepare($updateStatusSql);
            $updateStmt->bind_param("i", $orderId);
            $updateStmt->execute();
        }

        // Commit transaction jika semua berhasil
        $conn->commit();

        echo json_encode([
            "status" => "success",
            "message" => "Order created successfully",
            "order_id" => $orderId
        ]);

    } catch (Exception $e) {
        // Rollback transaction jika ada error
        $conn->rollback();

        echo json_encode([
            "status" => "error",
            "message" => "Failed to create order: " . $e->getMessage()
        ]);
    }
}
//========💧AkhirRegion_POST_Requests💧=====

//========💨AwalRegion_PUT_Requests💨=====
// Handle PUT requests - update status order
else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data) {
        echo json_encode([
            "status" => "error",
            "message" => "Invalid JSON data"
        ]);
        exit;
    }

    // Handle update berdasarkan action atau status_id
    if (isset($data['action'])) {
        // Approach berdasarkan action (untuk merchant dashboard)
        if (!isset($data['order_id']) || !isset($data['action'])) {
            echo json_encode([
                "status" => "error",
                "message" => "Missing required fields"
            ]);
            exit;
        }

        $orderId = $data['order_id'];
        $action = $data['action'];
        $rejectionReasonId = isset($data['rejection_reason_id']) ? $data['rejection_reason_id'] : null;

        // Mapping action ke status ID
        switch ($action) {
            case 'accept':
                $statusId = 3; // Accepted
                $updateFields = ["status_id = ?", "accepted_at = NOW()"];
                $params = [$statusId];
                $types = "i";
                break;
            case 'reject':
                $statusId = 4; // Rejected
                $updateFields = ["status_id = ?"];
                $params = [$statusId];
                $types = "i";
                if ($rejectionReasonId) {
                    $updateFields[] = "rejection_reason_id = ?";
                    $params[] = $rejectionReasonId;
                    $types .= "i";
                }
                break;
            case 'complete':
                $statusId = 5; // Completed
                $updateFields = ["status_id = ?", "completed_at = NOW()"];
                $params = [$statusId];
                $types = "i";
                break;
            default:
                echo json_encode([
                    "status" => "error",
                    "message" => "Invalid action"
                ]);
                exit;
        }
    } else {
        // Approach original berdasarkan status_id
        if (!isset($data['order_id']) || !isset($data['status_id'])) {
            echo json_encode([
                "status" => "error",
                "message" => "Missing required fields"
            ]);
            exit;
        }

        $orderId = $data['order_id'];
        $statusId = $data['status_id'];
        $rejectionReasonId = isset($data['rejection_reason_id']) ? $data['rejection_reason_id'] : null;

        // Build query update berdasarkan status
        $updateFields = ["status_id = ?"];
        $params = [$statusId];
        $types = "i";

        // Tambahkan timestamp field berdasarkan status
        switch ($statusId) {
            case 2: // Paid
                $updateFields[] = "paid_at = NOW()";
                break;
            case 3: // Accepted
                $updateFields[] = "accepted_at = NOW()";
                break;
            case 4: // Rejected
                if ($rejectionReasonId) {
                    $updateFields[] = "rejection_reason_id = ?";
                    $params[] = $rejectionReasonId;
                    $types .= "i";
                }
                break;
            case 5: // Completed
                $updateFields[] = "completed_at = NOW()";
                break;
        }
    }

    $sql = "UPDATE orders SET " . implode(", ", $updateFields) . " WHERE id = ?";
    $params[] = $orderId;
    $types .= "i";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param($types, ...$params);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Order status updated successfully"
        ]);
    } else {
        // Log error untuk debugging
        error_log("SQL Error: " . $stmt->error);
        error_log("SQL Query: " . $sql);
        error_log("Parameters: " . json_encode($params));

        echo json_encode([
            "status" => "error",
            "message" => "Failed to update order status: " . $stmt->error
        ]);
    }
}
//========💧AkhirRegion_PUT_Requests💧=====

//========💨AwalRegion_Invalid_Method💨=====
// Handle invalid method
else {
    echo json_encode([
        "status" => "error",
        "message" => "Method not allowed"
    ]);
}
//========💧AkhirRegion_Invalid_Method💧=====
?>
