<?php
//========💨AwalRegion_API_Configuration💨=====
// Include konfigurasi database
require_once '../config/database.php';

// Set headers untuk CORS dan response JSON
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight OPTIONS request untuk CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
//========💧AkhirRegion_API_Configuration💧=====


// Ambil data JSON dari request body
$data = json_decode(file_get_contents("php://input"), true);


//========💨AwalRegion_POST_Requests💨=====
// Handle POST requests - login dan register user
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Proses login user
    if (isset($data['action']) && $data['action'] === 'login') {
        // Validasi field yang wajib diisi
        if (!isset($data['email']) || !isset($data['password'])) {
            echo json_encode([
                "status" => "error",
                "message" => "Email and password are required"
            ]);
            exit;
        }

        $email = $data['email'];
        $password = $data['password'];
        $isMerchant = isset($data['is_merchant']) && $data['is_merchant'] === true;

        // Ambil data user berdasarkan email
        $sql = "SELECT u.id, u.username, u.password, u.email, u.first_name, u.last_name, u.role_id, r.name as role_name
                FROM users u
                JOIN roles r ON u.role_id = r.id
                WHERE u.email = ?";

        $user = getRecord($sql, "s", [$email]);

        if (!$user) {
            echo json_encode([
                "status" => "error",
                "message" => "User not found"
            ]);
            exit;
        }

        // Cek kompatibilitas role user dengan login type
        if ($isMerchant && $user['role_name'] !== 'merchant') {
            echo json_encode([
                "status" => "error",
                "message" => "This account is not registered as a merchant"
            ]);
            exit;
        }

        if (!$isMerchant && $user['role_name'] === 'merchant') {
            echo json_encode([
                "status" => "error",
                "message" => "Merchant accounts must login as merchant. Please use the merchant login option."
            ]);
            exit;
        }

        // Verifikasi password (direct comparison)
        if ($password !== $user['password']) {
            echo json_encode([
                "status" => "error",
                "message" => "Invalid password"
            ]);
            exit;
        }

        // Hapus password dari response untuk keamanan
        unset($user['password']);

        // Jika user adalah merchant, ambil detail merchant
        if ($user['role_id'] == 2) { // role_id 2 untuk merchant
            $merchantSql = "SELECT id, merchant_name, qris_code_url FROM merchants WHERE user_id = ?";
            $merchant = getRecord($merchantSql, "i", [$user['id']]);

            if ($merchant) {
                $user['merchant'] = $merchant;
            } else if ($isMerchant) {
                // If merchant login was requested but no merchant details found
                echo json_encode([
                    "status" => "error",
                    "message" => "Merchant profile not found"
                ]);
                exit;
            }
        }

        // Return user data
        echo json_encode([
            "status" => "success",
            "message" => "Login successful",
            "data" => $user
        ]);
        exit;
    }

    // Proses register user baru
    else if (isset($data['action']) && $data['action'] === 'register') {
        // Validasi field yang wajib diisi
        if (!isset($data['username']) || !isset($data['email']) || !isset($data['password'])) {
            echo json_encode([
                "status" => "error",
                "message" => "Username, email, and password are required"
            ]);
            exit;
        }

        $username = $data['username'];
        $email = $data['email'];
        $password = $data['password'];
        $firstName = isset($data['first_name']) ? $data['first_name'] : '';
        $lastName = isset($data['last_name']) ? $data['last_name'] : '';
        $roleId = isset($data['role_id']) ? $data['role_id'] : 1; // Default to buyer role (1)

        // Cek apakah username atau email sudah ada
        $checkSql = "SELECT id FROM users WHERE username = ? OR email = ?";
        $existingUser = getRecord($checkSql, "ss", [$username, $email]);

        if ($existingUser) {
            echo json_encode([
                "status" => "error",
                "message" => "Username or email already exists"
            ]);
            exit;
        }

        // Insert user baru ke database (password tidak di-hash)
        // Insert new user
        $sql = "INSERT INTO users (username, password, email, first_name, last_name, role_id)
                VALUES (?, ?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssi", $username, $password, $email, $firstName, $lastName, $roleId);

        if ($stmt->execute()) {
            $newId = $stmt->insert_id;

            // Return success response
            echo json_encode([
                "status" => "success",
                "message" => "Registration successful",
                "id" => $newId
            ]);
        } else {
            handleDatabaseError("Failed to register user");
        }
        exit;
    }
}
//========💧AkhirRegion_POST_Requests💧=====

//========💨AwalRegion_GET_Requests💨=====
// Handle GET requests - ambil data user
else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Ambil user berdasarkan ID
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $sql = "SELECT u.id, u.username, u.email, u.first_name, u.last_name, u.role_id, r.name as role_name
                FROM users u
                JOIN roles r ON u.role_id = r.id
                WHERE u.id = ?";

        $user = getRecord($sql, "i", [$id]);

        if ($user) {
            // Jika user adalah merchant, ambil detail merchant
            if ($user['role_id'] == 2) { // role_id 2 untuk merchant
                $merchantSql = "SELECT id, merchant_name, qris_code_url FROM merchants WHERE user_id = ?";
                $merchant = getRecord($merchantSql, "i", [$user['id']]);

                if ($merchant) {
                    $user['merchant'] = $merchant;
                }
            }

            echo json_encode([
                "status" => "success",
                "data" => $user
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "User not found"
            ]);
        }
        exit;
    }
}
//========💧AkhirRegion_GET_Requests💧=====

//========💨AwalRegion_Invalid_Request💨=====
// Handle invalid request jika tidak ada endpoint yang cocok
echo json_encode([
    "status" => "error",
    "message" => "Invalid request"
]);
//========💧AkhirRegion_Invalid_Request💧=====
?>
