// Konfigurasi base URL untuk komunikasi dengan backend
const API_BASE_URL = 'http://localhost/CanTake/BackEnd/api';


//========💨AwalRegion_Generic_Fetch_Function💨=====
// Fungsi generic untuk fetch data dengan error handling
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
//========💧AkhirRegion_Generic_Fetch_Function💧=====

//========💨AwalRegion_Merchant_API_Functions💨=====
// Fungsi API untuk data merchant/warung

// Ambil semua data merchant
export const getAllMerchants = async () => {
  return fetchData(`${API_BASE_URL}/merchant.php`);
};

// Ambil top merchant dengan limit tertentu
export const getTopMerchants = async (limit = 10) => {
  return fetchData(`${API_BASE_URL}/merchant.php?top_merchants=true&limit=${limit}`);
};

// Ambil data merchant berdasarkan ID
export const getMerchantById = async (id) => {
  return fetchData(`${API_BASE_URL}/merchant.php?id=${id}`);
};

// Ambil semua menu items
export const getAllMenuItems = async () => {
  return fetchData(`${API_BASE_URL}/produk.php`);
};

// Ambil menu items berdasarkan merchant ID
export const getMenuItemsByMerchantId = async (merchantId) => {
  return fetchData(`${API_BASE_URL}/produk.php?merchant_id=${merchantId}`);
};

// Ambil top selling menu items
export const getTopSellingMenuItems = async (limit = 10) => {
  return fetchData(`${API_BASE_URL}/produk.php?top_sellers=true&limit=${limit}`);
};

// Ambil menu item berdasarkan ID
export const getMenuItemById = async (id) => {
  return fetchData(`${API_BASE_URL}/produk.php?id=${id}`);
};

// Buat menu item baru
export const createMenuItem = async (menuItemData) => {
  return fetchData(`${API_BASE_URL}/produk.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(menuItemData),
  });
};

// Update menu item yang sudah ada
export const updateMenuItem = async (menuItemData) => {
  return fetchData(`${API_BASE_URL}/produk.php`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(menuItemData),
  });
};

// Hapus menu item
export const deleteMenuItem = async (id) => {
  return fetchData(`${API_BASE_URL}/produk.php?id=${id}`, {
    method: 'DELETE',
  });
};
//========💧AkhirRegion_Merchant_API_Functions💧=====

//========💨AwalRegion_Merchant_CRUD_Functions💨=====
// Fungsi CRUD untuk merchant (Create, Read, Update, Delete)

// Buat merchant baru
export const createMerchant = async (merchantData) => {
  return fetchData(`${API_BASE_URL}/merchant.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(merchantData),
  });
};

// Update data merchant
export const updateMerchant = async (merchantData) => {
  return fetchData(`${API_BASE_URL}/merchant.php`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(merchantData),
  });
};

// Hapus merchant
export const deleteMerchant = async (id) => {
  return fetchData(`${API_BASE_URL}/merchant.php?id=${id}`, {
    method: 'DELETE',
  });
};
//========💧AkhirRegion_Merchant_CRUD_Functions💧=====

//========💨AwalRegion_Order_API_Functions💨=====
// Fungsi API untuk mengelola pesanan/order

// Buat pesanan baru
export const createOrder = async (orderData) => {
  return fetchData(`${API_BASE_URL}/order.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
};

// Ambil pesanan berdasarkan user ID
export const getOrdersByUserId = async (userId) => {
  return fetchData(`${API_BASE_URL}/order.php?user_id=${userId}`);
};

// Ambil pesanan berdasarkan merchant ID
export const getOrdersByMerchantId = async (merchantId) => {
  return fetchData(`${API_BASE_URL}/order.php?merchant_id=${merchantId}`);
};

// Update status pesanan
export const updateOrderStatus = async (orderId, statusId, rejectionReasonId = null) => {
  return fetchData(`${API_BASE_URL}/order.php`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      order_id: orderId,
      status_id: statusId,
      rejection_reason_id: rejectionReasonId
    }),
  });
};

// Cancel pesanan oleh user (set status ke Rejected)
export const cancelOrder = async (orderId, rejectionReasonId) => {
  return fetchData(`${API_BASE_URL}/order.php`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      order_id: orderId,
      status_id: 4, // Status rejected
      rejection_reason_id: rejectionReasonId
    }),
  });
};
//========💧AkhirRegion_Order_API_Functions💧=====
