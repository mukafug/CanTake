# CanTake Database Documentation

## Overview

CanTake adalah aplikasi e-commerce untuk pemesanan makanan dari kantin kampus. Database ini dirancang untuk mendukung fitur-fitur utama seperti manajemen pengguna, katalog produk, keranjang belanja, dan sistem pemesanan.

## Database Schema

### Roles Table

Tabel untuk menyimpan peran pengguna dalam sistem.

```sql
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE     -- e.g. 'buyer' or 'merchant'
);
```

| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary key |
| name | VARCHAR(50) | Nama peran (buyer, merchant) |

### Users Table

Tabel untuk menyimpan data pengguna.

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role_id INT NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);
```

| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary key |
| username | VARCHAR(50) | Username unik |
| password | VARCHAR(255) | Password pengguna |
| email | VARCHAR(100) | Email pengguna |
| first_name | VARCHAR(100) | Nama depan |
| last_name | VARCHAR(100) | Nama belakang |
| role_id | INT | Foreign key ke tabel roles |

### Merchants Table

Tabel untuk menyimpan data merchant/vendor.

```sql
CREATE TABLE merchants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  merchant_name VARCHAR(255) NOT NULL,
  qris_code_url VARCHAR(255),            -- URL or path to static QRIS image
  image_url VARCHAR(255),                -- URL or path to merchant image
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary key |
| user_id | INT | Foreign key ke tabel users |
| merchant_name | VARCHAR(255) | Nama merchant/toko |
| qris_code_url | VARCHAR(255) | URL gambar QRIS untuk pembayaran |
| image_url | VARCHAR(255) | URL atau path ke gambar merchant |

### Menu Items Table

Tabel untuk menyimpan menu/produk yang dijual oleh merchant.

```sql
CREATE TABLE menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  merchant_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  prep_time INT NOT NULL,               -- estimated prep time in minutes
  available TINYINT(1) NOT NULL DEFAULT 1,
  image_url VARCHAR(255),               -- URL or path to menu item image
  FOREIGN KEY (merchant_id) REFERENCES merchants(id)
);
```

| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary key |
| merchant_id | INT | Foreign key ke tabel merchants |
| name | VARCHAR(100) | Nama menu/produk |
| description | TEXT | Deskripsi menu/produk |
| price | DECIMAL(10,2) | Harga menu/produk |
| prep_time | INT | Estimasi waktu persiapan dalam menit |
| available | TINYINT(1) | Status ketersediaan (1=tersedia, 0=tidak tersedia) |
| image_url | VARCHAR(255) | URL atau path ke gambar menu/produk |

### Carts Table

Tabel untuk menyimpan keranjang belanja pengguna.

```sql
CREATE TABLE carts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  merchant_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (merchant_id) REFERENCES merchants(id)
);
```

| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary key |
| user_id | INT | Foreign key ke tabel users |
| merchant_id | INT | Foreign key ke tabel merchants |
| created_at | DATETIME | Waktu pembuatan keranjang |

### Cart Items Table

Tabel untuk menyimpan item dalam keranjang belanja.

```sql
CREATE TABLE cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cart_id INT NOT NULL,
  menu_item_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  FOREIGN KEY (cart_id) REFERENCES carts(id),
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);
```

| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary key |
| cart_id | INT | Foreign key ke tabel carts |
| menu_item_id | INT | Foreign key ke tabel menu_items |
| quantity | INT | Jumlah item |

### Order Status Table

Tabel untuk menyimpan status pesanan.

```sql
CREATE TABLE order_status (
  id INT AUTO_INCREMENT PRIMARY KEY,
  status_name VARCHAR(50) NOT NULL
);
```

| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary key |
| status_name | VARCHAR(50) | Nama status (Pending, Paid, Accepted, Rejected, Completed) |

### Reject Reasons Table

Tabel untuk menyimpan alasan penolakan pesanan.

```sql
CREATE TABLE reject_reasons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reason VARCHAR(100) NOT NULL
);
```

| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary key |
| reason | VARCHAR(100) | Alasan penolakan (Habis, tutup, dll) |

### Orders Table

Tabel untuk menyimpan pesanan.

```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  merchant_id INT NOT NULL,
  status_id INT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  paid_at DATETIME DEFAULT NULL,
  accepted_at DATETIME DEFAULT NULL,
  completed_at DATETIME DEFAULT NULL,
  rejection_reason_id INT DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (merchant_id) REFERENCES merchants(id),
  FOREIGN KEY (status_id) REFERENCES order_status(id),
  FOREIGN KEY (rejection_reason_id) REFERENCES reject_reasons(id)
);
```

| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary key |
| user_id | INT | Foreign key ke tabel users |
| merchant_id | INT | Foreign key ke tabel merchants |
| status_id | INT | Foreign key ke tabel order_status |
| total_amount | DECIMAL(10,2) | Total harga pesanan |
| created_at | DATETIME | Waktu pembuatan pesanan |
| paid_at | DATETIME | Waktu pembayaran |
| accepted_at | DATETIME | Waktu penerimaan pesanan oleh merchant |
| completed_at | DATETIME | Waktu penyelesaian pesanan |
| rejection_reason_id | INT | Foreign key ke tabel reject_reasons (jika ditolak) |

### Order Items Table

Tabel untuk menyimpan item dalam pesanan.

```sql
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  menu_item_id INT NOT NULL,
  quantity INT NOT NULL,
  price_at_order DECIMAL(10,2) NOT NULL,  -- price snapshot
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);
```

| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary key |
| order_id | INT | Foreign key ke tabel orders |
| menu_item_id | INT | Foreign key ke tabel menu_items |
| quantity | INT | Jumlah item |
| price_at_order | DECIMAL(10,2) | Harga saat pemesanan (snapshot) |

## Relasi Antar Tabel

1. **Users - Roles**: Setiap pengguna memiliki satu peran (buyer atau merchant)
2. **Users - Merchants**: Setiap merchant terhubung dengan satu user (one-to-one)
3. **Merchants - Menu Items**: Setiap merchant memiliki banyak menu item (one-to-many)
4. **Users - Carts**: Setiap user dapat memiliki satu keranjang aktif (one-to-one)
5. **Carts - Cart Items**: Setiap keranjang dapat memiliki banyak item (one-to-many)
6. **Users - Orders**: Setiap user dapat memiliki banyak pesanan (one-to-many)
7. **Orders - Order Items**: Setiap pesanan dapat memiliki banyak item (one-to-many)
8. **Orders - Order Status**: Setiap pesanan memiliki satu status (one-to-one)
9. **Orders - Reject Reasons**: Pesanan yang ditolak memiliki satu alasan penolakan (one-to-one)

## Nilai Default

1. **Roles**:
   - buyer (id: 1)
   - merchant (id: 2)

2. **Order Status**:
   - Pending (id: 1)
   - Paid (id: 2)
   - Accepted (id: 3)
   - Rejected (id: 4)
   - Completed (id: 5)

3. **Reject Reasons**:
   - Sold out (id: 1) - Merchant rejection
   - Closed (id: 2) - Merchant rejection
   - Too busy (id: 3) - Merchant rejection
   - Invalid payment (id: 4) - Merchant rejection
   - Berubah pikiran (id: 5) - User cancellation
   - Salah pesan (id: 6) - User cancellation
   - Terlalu lama menunggu (id: 7) - User cancellation
   - Alasan lain (id: 8) - User cancellation

## Alur Pesanan

1. Pengguna membuat keranjang belanja (carts)
2. Pengguna menambahkan item ke keranjang (cart_items)
3. Pengguna checkout, membuat pesanan baru (orders) dengan status "Pending"
4. Pengguna melakukan pembayaran, status berubah menjadi "Paid"
5. **User dapat membatalkan pesanan dalam 2 menit pertama** (status "Pending" atau "Paid") dengan alasan pembatalan
6. Merchant menerima pesanan, status berubah menjadi "Accepted"
7. Merchant menyelesaikan pesanan, status berubah menjadi "Completed"
8. Atau, merchant dapat menolak pesanan, status berubah menjadi "Rejected" dengan alasan penolakan
