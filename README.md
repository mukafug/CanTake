# CanTake - Dokumentasi Lengkap

## 1. 🎯 Perkenalan

**CanTake** adalah aplikasi web untuk pesan makanan dari kantin kampus. Mahasiswa bisa lihat menu warung-warung dan pesan makanan untuk diambil sendiri (tidak ada delivery).

### ✨ Fitur Utama
- **🏪 Dashboard Toko**: Bisa lihat warung dan menu tanpa login dulu
- **🔐 Login System**: Harus login kalau mau pesan makanan
- **🛒 Keranjang Belanja**: Tempat naruh makanan yang mau dipesan
- **👨‍💼 Dashboard Merchant**: Tempat penjual kelola pesanan yang masuk
- **📊 Kelola Pesanan**: Bisa pantau status pesanan secara real-time
- **💳 Pembayaran**: Bisa bayar pakai uang tunai atau QRIS

### 👥 Siapa yang Pakai
- **🎓 Mahasiswa**: Yang mau beli makanan dari kantin kampus
- **🍳 Penjual/Warung**: Yang mau jual makanan secara online

## 2. 🛠️ Cara Install

### 📋 Yang Harus Ada Dulu
- **Node.js** (versi 14 ke atas)
- **XAMPP** (buat server Apache dan MySQL)
- **Browser** (Chrome, Firefox, Safari, atau Edge)

### 📝 Langkah-Langkah Install

#### A. 🔧 Setup Backend (PHP & MySQL)

1. **📥 Install XAMPP**
   - Download XAMPP dari [https://www.apachefriends.org/](https://www.apachefriends.org/)
   - Install dan buka XAMPP Control Panel
   - Nyalakan **Apache** dan **MySQL**

2. **🗄️ Setup Database**
   - Buka phpMyAdmin di `http://localhost/phpmyadmin`
   - Buat database baru namanya `cantake`
   - Import file SQL Cantake kami

3. **📁 Setup Project**
   - Copy project ke folder `C:\xampp\htdocs\CanTake`
   - Pastikan struktur folder sudah benar

#### B. ⚛️ Setup Frontend (React)

1. **📦 Install Dependencies**
   ```bash
   cd C:\xampp\htdocs\CanTake\FrontEnd
   npm install
   ```

2. **🚀 Jalankan Development Server**
   ```bash
   npm start
   ```
   - Aplikasi jalan di `http://localhost:3000`

#### C. ✅ Cek Instalasi

1. **Backend**: Buka `http://localhost/CanTake/BackEnd/api/merchant.php` - harus muncul JSON
2. **Frontend**: Buka `http://localhost:3000` - harus muncul halaman CanTake
3. **Database**: Pastikan tabel-tabel sudah ada di database `cantake`

## 3. 💻 Technology Stack

### ⚛️ Frontend (Bagian Depan)
- **React 18.2.0**: Library JavaScript buat bikin tampilan website
- **React Router DOM 6.20.0**: Buat navigasi antar halaman
- **Create React App**: Tool buat bikin dan jalanin project React
- **CSS Biasa**: Styling pakai CSS murni (tanpa framework)
- **BoxIcons 2.1.4**: Library ikon buat UI
- **JavaScript ES6+**: Bahasa pemrograman utama frontend

### 🔧 Backend (Bagian Belakang)
- **PHP**: Bahasa pemrograman server
- **MySQL**: Database buat nyimpen data
- **Apache**: Web server (lewat XAMPP)
- **JSON**: Format data antara frontend dan backend

### 🛠️ Tools Development
- **XAMPP**: Environment lokal (Apache + MySQL + PHP)
- **Node.js & NPM**: Package manager buat install library frontend
- **phpMyAdmin**: Interface web buat kelola database MySQL

### 🏗️ Arsitektur
- **Client-Server**: Frontend (React) ngobrol sama Backend (PHP) lewat REST API
- **MVC Pattern**: Backend pakai pola Model-View-Controller
- **Component-Based**: Frontend pakai komponen React yang bisa dipake ulang

### 📦 Dependencies Utama
```json
{
  "dependencies": {
    "boxicons": "^2.1.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "react-scripts": "5.0.1"
  }
}
```

### 🌐 Browser Support
- Chrome (terbaru)
- Firefox (terbaru)
- Safari (terbaru)
- Edge (terbaru)
- Mobile browsers (responsive)

## 4. 📁 Struktur File dan Folder

### 🗂️ Gambaran Umum Project

```
CanTake/
│
├── FrontEnd/                # 🎨 Aplikasi React (tampilan website)
│   ├── public/              # 📂 File statis (gambar, icon, dll)
│   │   ├── assets/          # 🖼️ Gambar dan asset utama
│   │   │   └── MainAssets/  # 📸 Gambar produk, merchant, dll
│   │   │       └── Upload/  # 📤 Folder upload gambar
│   │   └── index.html       # 🌐 File HTML utama
│   │
│   ├── src/                 # 💻 Source code utama
│   │   ├── assets/          # 🎭 Asset untuk development
│   │   ├── pages/           # 📄 Halaman-halaman website
│   │   │   ├── Dashboard.js # 🏠 Halaman utama
│   │   │   ├── LoginPage.js # 🔐 Halaman login
│   │   │   ├── GeraiPage.js # 🏪 Halaman detail warung
│   │   │   ├── CheckoutPage.js # 🛒 Halaman checkout
│   │   │   └── MerchantDashboard.js # 👨‍💼 Dashboard penjual
│   │   │
│   │   ├── services/        # 🔌 Koneksi ke API backend
│   │   │   └── api.js       # 📡 Fungsi-fungsi API
│   │   │
│   │   ├── utils/           # 🛠️ Fungsi bantuan
│   │   ├── App.js           # 🚀 Komponen utama aplikasi
│   │   ├── App.css          # 🎨 Style utama aplikasi
│   │   ├── index.js         # 🎯 Entry point aplikasi
│   │   └── index.css        # 🌍 Style global
│   │
│   └── package.json         # 📦 Daftar library dan script
│
└── BackEnd/                 # 🔧 Backend PHP
    ├── api/                 # 🌐 API endpoints
    │   ├── merchant.php     # 🏪 API data warung/merchant
    │   ├── produk.php       # 🍔 API data menu/produk
    │   ├── user.php         # 👤 API login dan user
    │   ├── keranjang.php    # 🛒 API keranjang belanja
    │   ├── order.php        # 📋 API pesanan
    │   └── upload.php       # 📤 API upload gambar
    │
    ├── config/              # ⚙️ File konfigurasi
    │   └── database.php     # 🗄️ Koneksi database
    │
    └── database.md          # 📚 Dokumentasi database
```

### 📂 Penjelasan Folder Utama

| Folder | Fungsi | Teknologi |
|--------|--------|-----------|
| 🎨 **CanTake/FrontEnd/** | Tampilan website (yang dilihat user) | React, CSS, JavaScript |
| 🔧 **CanTake/BackEnd/** | Server (ngolah data di belakang layar) | PHP, MySQL |

---

### 📁 Detail Struktur Frontend

#### 📂 **CanTake/FrontEnd/public/** - File Statis
```
public/
├── assets/MainAssets/     # 🖼️ Gambar utama (logo, banner, dll)
│   └── Upload/           # 📤 Gambar yang diupload user
└── index.html            # 🌐 File HTML utama
```

**Fungsi:**
- Tempat file yang bisa diakses langsung dari browser
- Menyimpan gambar, icon, dan asset statis
- Upload folder untuk gambar produk dan merchant

#### 💻 **CanTake/FrontEnd/src/** - Source Code Utama
```
src/
├── pages/               # 📄 Halaman-halaman website
├── services/            # 🔌 Komunikasi dengan backend
├── utils/               # 🛠️ Fungsi bantuan
├── assets/              # 🎭 Asset development
├── App.js               # 🚀 Komponen utama
├── App.css              # 🎨 Style utama
├── index.js             # 🎯 Entry point
└── index.css            # 🌍 Style global
```

**Fungsi:**
- Berisi semua source code React
- Mengatur routing dan komponen
- Handle styling dan logic aplikasi

#### 📦 **CanTake/FrontEnd/package.json** - Konfigurasi Project
**Fungsi:**
- Daftar library yang dipakai (React, Router, BoxIcons)
- Script untuk menjalankan aplikasi (`npm start`, `npm build`)
- Konfigurasi dependencies dan devDependencies

---

### 🔧 Detail Struktur Backend

#### 🌐 **CanTake/BackEnd/api/** - API Endpoints
```
api/
├── merchant.php         # 🏪 Data warung/merchant
├── produk.php           # 🍔 Data menu/produk
├── user.php             # 👤 Login dan user
├── keranjang.php        # 🛒 Keranjang belanja
├── order.php            # 📋 Pesanan
└── upload.php           # 📤 Upload gambar
```

**Fungsi:**
- Handle request dari frontend
- CRUD operations untuk database
- Response dalam format JSON

#### ⚙️ **CanTake/BackEnd/config/** - Konfigurasi
```
config/
└── database.php         # 🗄️ Koneksi database MySQL
```

**Fungsi:**
- Konfigurasi koneksi database
- Helper functions untuk database operations

#### 📚 **CanTake/BackEnd/database.md** - Dokumentasi
**Fungsi:**
- Dokumentasi struktur database
- Penjelasan tabel-tabel dan relasi

---

## 5. 📝 Penjelasan Detail File

### 🎨 Frontend Files

#### 📄 **Halaman-Halaman Utama (CanTake/FrontEnd/src/pages/)**

##### 🏠 **CanTake/FrontEnd/src/pages/Dashboard.js**
**Fungsi:**
- Halaman utama website CanTake
- Menampilkan banner dengan slider
- Menampilkan Top Warung (10 merchant teratas)
- Menampilkan Best Seller items
- Keranjang belanja sticky di sebelah kanan

**Fitur Utama:**
- Banner dengan text bahasa Indonesia dan efek slider
- Section "Top Warung" dengan grid merchant
- Section "Best Seller" dengan item populer
- Navbar dengan logo dan menu navigasi
- Footer dengan link ke halaman lain

##### 🔐 **CanTake/FrontEnd/src/pages/LoginPage.js**
**Fungsi:**
- Halaman login untuk user dan merchant
- Form login dengan email dan password
- Toggle antara login user biasa dan merchant
- Redirect ke dashboard setelah login berhasil

**Fitur Utama:**
- Form login responsive
- Validasi input email dan password
- Button "Login as Merchant" untuk penjual
- Error handling untuk login gagal
- Local storage untuk menyimpan data user

##### 🏪 **CanTake/FrontEnd/src/pages/GeraiPage.js**
**Fungsi:**
- Halaman detail merchant/warung
- Menampilkan info merchant dan menu mereka
- User bisa tambah item ke keranjang
- Menampilkan prep time dan harga

**Fitur Utama:**
- Header dengan info merchant (nama, gambar, jumlah menu)
- Grid menu items dengan gambar dan detail
- Button "Tambah ke Keranjang" untuk setiap item
- Keranjang belanja sticky di sebelah kanan
- Validasi: hanya bisa pesan dari satu warung

##### 🛒 **CanTake/FrontEnd/src/pages/CheckoutPage.js**
**Fungsi:**
- Halaman checkout untuk finalisasi pesanan
- Menampilkan ringkasan pesanan
- Pilihan metode pembayaran (Cash/QRIS)
- Konfirmasi dan submit pesanan

**Fitur Utama:**
- Layout split: order summary (kiri) + payment (kanan)
- Daftar item yang dipesan dengan harga
- Total harga dan biaya
- Radio button untuk pilih metode pembayaran
- Button "Pesan Sekarang" untuk submit
- Redirect ke dashboard setelah berhasil

##### 👨‍💼 **CanTake/FrontEnd/src/pages/MerchantDashboard.js**
**Fungsi:**
- Dashboard khusus untuk merchant/penjual
- Kelola menu items (CRUD operations)
- Kelola pesanan yang masuk
- Upload gambar untuk menu

**Fitur Utama:**
- Layout seperti GeraiPage tapi untuk merchant sendiri
- Table management menu items (horizontal layout)
- Form tambah/edit menu dengan upload gambar
- Section kelola pesanan dengan status
- Order history untuk pesanan selesai
- Button logout

#### 🔌 **Services (CanTake/FrontEnd/src/services/)**

##### 📡 **CanTake/FrontEnd/src/services/api.js**
**Fungsi:**
- File utama untuk komunikasi dengan backend
- Berisi semua fungsi API calls
- Handle error dan response dari server

**Fungsi-Fungsi Utama:**
```javascript
// Merchant APIs
- getAllMerchants()          // Ambil semua merchant
- getTopMerchants()          // Ambil top 10 merchant
- getMerchantById(id)        // Ambil merchant by ID

// Menu/Product APIs
- getAllMenuItems()          // Ambil semua menu
- getMenuItemsByMerchantId() // Ambil menu by merchant
- getTopSellingMenuItems()   // Ambil best seller items
- addMenuItem()              // Tambah menu baru
- updateMenuItem()           // Update menu
- deleteMenuItem()           // Hapus menu

// User APIs
- loginUser()                // Login user/merchant
- registerUser()             // Register user baru

// Cart APIs
- getCartByUserId()          // Ambil keranjang user
- addToCart()                // Tambah item ke keranjang
- updateCartItem()           // Update quantity item
- removeFromCart()           // Hapus item dari keranjang
- clearCart()                // Kosongkan keranjang

// Order APIs
- createOrder()              // Buat pesanan baru
- getOrdersByUserId()        // Ambil pesanan user
- getOrdersByMerchantId()    // Ambil pesanan merchant
- updateOrderStatus()        // Update status pesanan
- cancelOrder()              // Cancel pesanan

// Upload APIs
- uploadImage()              // Upload gambar
```

**Konfigurasi:**
- Base URL: `http://localhost/CanTake/BackEnd/api`
- Error handling dengan try-catch
- Response format JSON

#### 🚀 **File Utama (CanTake/FrontEnd/src/)**

##### 🎯 **CanTake/FrontEnd/src/index.js**
**Fungsi:**
- Entry point aplikasi React
- Render komponen App ke DOM
- Setup BrowserRouter untuk routing

**Code Structure:**
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Render aplikasi ke element dengan id 'root'
```

##### 🚀 **CanTake/FrontEnd/src/App.js**
**Fungsi:**
- Komponen utama aplikasi
- Setup routing untuk semua halaman
- Manage global state (user login, cart)

**Routes:**
- `/` atau `/dashboard` → Dashboard
- `/login` → LoginPage
- `/gerai/:id` → GeraiPage
- `/checkout` → CheckoutPage
- `/merchant-dashboard` → MerchantDashboard

**Features:**
- Context untuk user authentication
- Context untuk cart management
- Protected routes (login required)
- Global navigation dan footer

##### 🎨 **CanTake/FrontEnd/src/App.css**
**Fungsi:**
- Style utama aplikasi
- CSS variables untuk tema
- Responsive design
- Dark theme dengan warna orange/cream

**Style Features:**
- CSS Grid dan Flexbox layouts
- Smooth transitions dan animations
- Mobile-first responsive design
- Custom scrollbar styling
- Gradient backgrounds
- Modern card designs

##### 🌍 **CanTake/FrontEnd/src/index.css**
**Fungsi:**
- Global CSS reset dan base styles
- Typography dan font imports
- Global utility classes

**Global Styles:**
- Font family setup
- CSS reset untuk margin/padding
- Base styling untuk body dan html
- Global color variables

#### 📂 **File Statis (CanTake/FrontEnd/public/)**

##### 🌐 **CanTake/FrontEnd/public/index.html**
**Fungsi:**
- File HTML utama aplikasi
- Template dasar untuk React app
- Meta tags dan konfigurasi

**Struktur:**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#8c6239" />
    <meta name="description" content="CanTake - Layanan pesan antar makanan untuk mahasiswa kampus" />
    <title>CanTake - Food Delivery</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

**Features:**
- Responsive viewport meta tag
- SEO-friendly description
- Root element untuk React mounting

##### 🖼️ **CanTake/FrontEnd/public/assets/MainAssets/**
**Struktur Folder:**
```
assets/MainAssets/
├── logo/               # 🏷️ Logo CanTake
├── banners/            # 🎨 Banner images
├── merchants/          # 🏪 Gambar merchant/warung
├── products/           # 🍔 Gambar menu/produk
├── icons/              # 🎯 Icon aplikasi
└── Upload/             # 📤 Folder upload user
    ├── merchants/      # 🏪 Upload gambar merchant
    └── products/       # 🍔 Upload gambar produk
```

**Fungsi:**
- Menyimpan semua asset gambar aplikasi
- Folder Upload untuk gambar yang diupload user
- Organisasi berdasarkan kategori (logo, banner, merchant, produk)

#### 🎭 **Asset Development (CanTake/FrontEnd/src/assets/)**

**Fungsi:**
- Asset untuk development (icon, placeholder images)
- Gambar yang di-import langsung ke komponen
- SVG icons dan illustrations

**Contoh Penggunaan:**
```javascript
import logoImage from '../assets/logo.png';
import placeholderImage from '../assets/placeholder.jpg';
```

#### 🛠️ **Utilities (CanTake/FrontEnd/src/utils/)**

##### 🔧 **Helper Functions**
**Fungsi yang Biasanya Ada:**

```javascript
// Format currency
export const formatCurrency = (amount) => {
  return `Rp ${amount.toLocaleString('id-ID')}`;
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID');
};

// Validate email
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Local storage helpers
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

// Image path helpers
export const getImagePath = (imagePath) => {
  return `http://localhost/CanTake/FrontEnd/public/${imagePath}`;
};
```

**Fungsi:**
- Helper functions yang dipakai di banyak komponen
- Validasi input dan format data
- Local storage management
- Image path handling

#### 📦 **CanTake/FrontEnd/package.json - Detail Dependencies**

##### 🔗 **Dependencies Utama**
```json
{
  "dependencies": {
    "boxicons": "^2.1.4",           // Icon library
    "react": "^18.2.0",             // Core React
    "react-dom": "^18.2.0",         // React DOM rendering
    "react-router-dom": "^6.20.0"   // Client-side routing
  },
  "devDependencies": {
    "react-scripts": "5.0.1"        // Build tools & dev server
  }
}
```

**Penjelasan Dependencies:**

| Library | Versi | Fungsi |
|---------|-------|--------|
| **boxicons** | 2.1.4 | Icon library untuk UI elements (🏠, 🛒, 👤, dll) |
| **react** | 18.2.0 | Core library untuk building UI components |
| **react-dom** | 18.2.0 | Rendering React components ke DOM |
| **react-router-dom** | 6.20.0 | Client-side routing (navigasi antar halaman) |
| **react-scripts** | 5.0.1 | Build tools, dev server, dan testing |

##### 📜 **Scripts Available**
```json
{
  "scripts": {
    "start": "set NODE_OPTIONS=--openssl-legacy-provider && react-scripts start",
    "build": "set NODE_OPTIONS=--openssl-legacy-provider && react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

**Penjelasan Scripts:**

| Script | Fungsi |
|--------|--------|
| **npm start** | Jalankan development server di localhost:3000 |
| **npm run build** | Build aplikasi untuk production |
| **npm test** | Jalankan unit tests |
| **npm run eject** | Eject dari Create React App (tidak disarankan) |

**Note:** `NODE_OPTIONS=--openssl-legacy-provider` dibutuhkan untuk kompatibilitas dengan Node.js versi baru.

#### 🎨 **CSS System Details**

##### 🎨 **Color Variables (CanTake/FrontEnd/src/App.css)**
```css
:root {
  /* Primary Colors */
  --primary-orange: #ff6b35;
  --primary-brown: #8c6239;
  --primary-cream: #f8f5f0;

  /* Background Colors */
  --bg-dark: #1a1a1a;
  --bg-card: #2d2d2d;
  --bg-gradient: linear-gradient(135deg, #ff6b35, #8c6239);

  /* Text Colors */
  --text-light: #ffffff;
  --text-dark: #333333;
  --text-muted: #666666;
}
```

##### 📱 **Responsive Breakpoints**
```css
/* Mobile First Approach */
.container {
  width: 100%;
  padding: 0 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    max-width: 750px;
    margin: 0 auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
  }
}
```

##### ✨ **Animation Classes**
```css
/* Smooth transitions */
.smooth-transition {
  transition: all 0.3s ease-in-out;
}

/* Hover effects */
.hover-scale:hover {
  transform: scale(1.05);
}

/* Loading animations */
.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

**CSS Features:**
- CSS Custom Properties (variables) untuk theming
- Mobile-first responsive design
- Smooth animations dan transitions
- Modern CSS Grid dan Flexbox layouts
- Custom scrollbar styling
- Dark theme dengan accent colors

---

### 🔧 Backend Files

#### 🌐 **API Endpoints (CanTake/BackEnd/api/)**

##### 🏪 **CanTake/BackEnd/api/merchant.php**
**Fungsi:**
- Handle semua operasi terkait merchant/warung
- CRUD operations untuk data merchant
- Get top merchants dan merchant by ID

**Endpoints:**
```php
GET /api/merchant.php                    // Ambil semua merchant
GET /api/merchant.php?id={id}           // Ambil merchant by ID
GET /api/merchant.php?user_id={id}      // Ambil merchant by user ID
GET /api/merchant.php?top_merchants=true&limit=10  // Top 10 merchant
POST /api/merchant.php                  // Tambah merchant baru
PUT /api/merchant.php                   // Update merchant
DELETE /api/merchant.php                // Hapus merchant
```

**Response Format:**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "merchant_name": "Warung Bu Sari",
    "qris_code_url": "path/to/qris.jpg",
    "image_url": "path/to/merchant.jpg",
    "menu_count": 15
  }
}
```

**Features:**
- Join dengan tabel users untuk data lengkap
- Count menu items untuk setiap merchant
- Error handling dan validasi input
- Support untuk upload gambar merchant

##### 🍔 **CanTake/BackEnd/api/produk.php**
**Fungsi:**
- Handle operasi menu/produk makanan
- CRUD operations untuk menu items
- Get best seller items dan menu by merchant

**Endpoints:**
```php
GET /api/produk.php                     // Ambil semua menu
GET /api/produk.php?id={id}            // Ambil menu by ID
GET /api/produk.php?merchant_id={id}   // Ambil menu by merchant
GET /api/produk.php?top_sellers=true&limit=10  // Best seller items
POST /api/produk.php                   // Tambah menu baru
PUT /api/produk.php                    // Update menu
DELETE /api/produk.php                 // Hapus menu
```

**Data Structure:**
```json
{
  "id": 1,
  "merchant_id": 1,
  "name": "Nasi Gudeg",
  "description": "Nasi gudeg khas Jogja",
  "price": 15000,
  "prep_time": 10,
  "available": 1,
  "image_url": "path/to/product.jpg",
  "merchant_name": "Warung Bu Sari"
}
```

**Features:**
- Join dengan merchant untuk nama warung
- Filter berdasarkan availability
- Sort berdasarkan popularitas untuk best sellers
- Upload dan manage gambar produk

##### 👤 **CanTake/BackEnd/api/user.php**
**Fungsi:**
- Handle authentication dan user management
- Login untuk user biasa dan merchant
- Register user baru

**Endpoints:**
```php
POST /api/user.php (action: login)     // Login user/merchant
POST /api/user.php (action: register)  // Register user baru
GET /api/user.php?id={id}             // Get user profile
PUT /api/user.php                     // Update user profile
```

**Login Request:**
```json
{
  "action": "login",
  "email": "user@example.com",
  "password": "password123",
  "is_merchant": false
}
```

**Login Response:**
```json
{
  "status": "success",
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role_name": "buyer"
  }
}
```

**Features:**
- Password hashing dengan PHP password_hash()
- Role-based authentication (buyer/merchant)
- Session management
- Input validation dan sanitization

##### 🛒 **CanTake/BackEnd/api/keranjang.php**
**Fungsi:**
- Handle operasi keranjang belanja
- Add, update, remove items dari cart
- Get cart by user ID

**Endpoints:**
```php
GET /api/keranjang.php?user_id={id}    // Ambil keranjang user
POST /api/keranjang.php                // Tambah item ke keranjang
PUT /api/keranjang.php                 // Update quantity item
DELETE /api/keranjang.php              // Hapus item dari keranjang
DELETE /api/keranjang.php?clear=true   // Kosongkan keranjang
```

**Cart Item Structure:**
```json
{
  "cart_id": 1,
  "user_id": 1,
  "merchant_id": 1,
  "items": [
    {
      "id": 1,
      "menu_item_id": 5,
      "quantity": 2,
      "price": 15000,
      "menu_name": "Nasi Gudeg",
      "merchant_name": "Warung Bu Sari"
    }
  ],
  "total_amount": 30000
}
```

**Business Rules:**
- User hanya bisa pesan dari satu merchant per cart
- Auto-create cart jika belum ada
- Validasi stock availability
- Calculate total amount otomatis

##### 📋 **CanTake/BackEnd/api/order.php**
**Fungsi:**
- Handle pemesanan dan order management
- Create order dari cart
- Update status pesanan
- Get orders by user/merchant

**Endpoints:**
```php
GET /api/order.php?user_id={id}        // Pesanan user
GET /api/order.php?merchant_id={id}    // Pesanan merchant
POST /api/order.php                    // Buat pesanan baru
PUT /api/order.php                     // Update status pesanan
```

**Order Status Flow:**
1. **Pending** (1) - Pesanan baru dibuat
2. **Paid** (2) - Sudah dibayar
3. **Accepted** (3) - Diterima merchant
4. **Rejected** (4) - Ditolak merchant
5. **Completed** (5) - Pesanan selesai

**Order Structure:**
```json
{
  "id": 1,
  "user_id": 1,
  "merchant_id": 1,
  "status_id": 2,
  "total_amount": 45000,
  "created_at": "2024-01-15 10:30:00",
  "paid_at": "2024-01-15 10:32:00",
  "merchant_name": "Warung Bu Sari",
  "status_name": "Paid",
  "items": [
    {
      "menu_name": "Nasi Gudeg",
      "quantity": 2,
      "price": 15000
    }
  ]
}
```

**Features:**
- Order cancellation dalam 2 menit pertama
- Automatic timestamp updates
- Join dengan multiple tables untuk data lengkap
- Order history tracking

##### 📤 **CanTake/BackEnd/api/upload.php**
**Fungsi:**
- Handle upload gambar untuk merchant dan produk
- Validasi file type dan size
- Generate unique filename

**Endpoint:**
```php
POST /api/upload.php                   // Upload gambar
```

**Upload Request:**
```javascript
const formData = new FormData();
formData.append('image', file);
formData.append('type', 'product'); // atau 'merchant'
```

**Upload Response:**
```json
{
  "status": "success",
  "message": "File uploaded successfully",
  "image_url": "CanTake/FrontEnd/public/assets/MainAssets/Upload/product_123456.jpg",
  "filename": "product_123456.jpg"
}
```

**Features:**
- Support JPEG, PNG, GIF
- Max file size 5MB
- Unique filename generation
- Organized folder structure (products/, merchants/)
- Error handling untuk upload gagal

#### ⚙️ **Configuration (CanTake/BackEnd/config/)**

##### 🗄️ **CanTake/BackEnd/config/database.php**
**Fungsi:**
- Konfigurasi koneksi database MySQL
- Helper functions untuk database operations
- Error handling untuk database

**Database Config:**
```php
<?php
// Database configuration
$host = "localhost";
$username = "root";
$password = "";
$database = "cantake";

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set character set
$conn->set_charset("utf8mb4");
?>
```

**Helper Functions:**
```php
// Get single record
function getRecord($sql, $types = "", $params = []) {
    global $conn;
    $stmt = $conn->prepare($sql);
    if ($types && $params) {
        $stmt->bind_param($types, ...$params);
    }
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_assoc();
}

// Get multiple records
function getRecords($sql, $types = "", $params = []) {
    global $conn;
    $stmt = $conn->prepare($sql);
    if ($types && $params) {
        $stmt->bind_param($types, ...$params);
    }
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_all(MYSQLI_ASSOC);
}

// Execute query (INSERT, UPDATE, DELETE)
function executeQuery($sql, $types = "", $params = []) {
    global $conn;
    $stmt = $conn->prepare($sql);
    if ($types && $params) {
        $stmt->bind_param($types, ...$params);
    }
    return $stmt->execute();
}

// Handle database errors
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
```

**Features:**
- MySQLi dengan prepared statements
- UTF-8 character set support
- Reusable helper functions
- Consistent error handling
- SQL injection protection

#### 📚 **Database Documentation (CanTake/BackEnd/database.md)**

**Fungsi:**
- Dokumentasi lengkap struktur database
- Penjelasan setiap tabel dan relasi
- SQL schema dan sample data

**Database Tables:**

| Tabel | Fungsi | Relasi |
|-------|--------|--------|
| **roles** | Role user (buyer/merchant) | → users |
| **users** | Data user dan authentication | → merchants, carts, orders |
| **merchants** | Data merchant/warung | → menu_items, orders |
| **menu_items** | Menu/produk makanan | → cart_items, order_items |
| **carts** | Keranjang belanja user | → cart_items |
| **cart_items** | Item dalam keranjang | - |
| **order_status** | Status pesanan | → orders |
| **reject_reasons** | Alasan penolakan | → orders |
| **orders** | Data pesanan | → order_items |
| **order_items** | Item dalam pesanan | - |

**Key Relationships:**
- Users ↔ Merchants (One-to-One)
- Merchants ↔ Menu Items (One-to-Many)
- Users ↔ Orders (One-to-Many)
- Orders ↔ Order Items (One-to-Many)
- Carts ↔ Cart Items (One-to-Many)

**Business Logic:**
- User hanya bisa punya satu cart aktif
- Order bisa di-cancel dalam 2 menit pertama
- Merchant bisa update status pesanan
- Auto-calculate total amount di cart dan order
