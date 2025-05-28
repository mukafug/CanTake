//========💨AwalRegion_Import_Dependencies💨=====
// Import React dan dependencies untuk merchant dashboard
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createMenuItem, updateMenuItem, deleteMenuItem } from '../services/api';
import 'boxicons/css/boxicons.min.css';
//========💧AkhirRegion_Import_Dependencies💧=====


// Komponen dashboard merchant untuk mengelola menu dan pesanan
const MerchantDashboard = ({ user, logout }) => {
  //========💨AwalRegion_State_Management💨=====
  // State untuk merchant data, orders, dan UI
  const [merchant, setMerchant] = useState(null);
  const [orders, setOrders] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();
  //========💧AkhirRegion_State_Management💧=====

  //========💨AwalRegion_Helper_Functions💨=====
  // Fungsi untuk mendapatkan data user dari props atau localStorage
  const getCurrentUser = () => {
    if (user) return user;

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    return null;
  };
  //========💧AkhirRegion_Helper_Functions💧=====

  //========💨AwalRegion_Effect_Hooks💨=====
  // Effect untuk auth check dan fetch data merchant
  useEffect(() => {
    // Scroll ke atas saat komponen dimount
    window.scrollTo(0, 0);

    // Fungsi untuk check authentication merchant
    const checkAuth = () => {
      let currentUser = user;

      // Jika user tidak tersedia, coba ambil dari localStorage
      if (!currentUser) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            currentUser = JSON.parse(storedUser);
          } catch (error) {
            console.error('Error parsing user data:', error);
          }
        }
      }

      setAuthChecked(true);

      // Cek apakah user adalah merchant setelah auth dicek
      if (!currentUser || currentUser.role_name !== 'merchant') {
        navigate('/login');
        return;
      }

      fetchMerchantData();
    };

    // Delay kecil untuk allow React state update
    const timeout = setTimeout(checkAuth, 200);
    return () => clearTimeout(timeout);
  }, [user, navigate]);
  //========💧AkhirRegion_Effect_Hooks💧=====

  //========💨AwalRegion_API_Functions💨=====
  // Fungsi untuk fetch data merchant dan related data
  const fetchMerchantData = async () => {
    try {
      setLoading(true);

      // Get current user (dari props atau localStorage)
      let currentUser = user;
      if (!currentUser) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            currentUser = JSON.parse(storedUser);
          } catch (error) {
            console.error('Error parsing user data:', error);
            setError('Failed to load user data');
            return;
          }
        }
      }

      if (!currentUser) {
        setError('User data not found');
        return;
      }

      // Fetch info merchant berdasarkan user ID
      const merchantResponse = await fetch(`http://localhost/CanTake/BackEnd/api/merchant.php?user_id=${currentUser.id}`);
      const merchantData = await merchantResponse.json();

      if (merchantData.status === 'success' && merchantData.data.length > 0) {
        const merchantInfo = merchantData.data[0];
        setMerchant(merchantInfo);

        // Fetch orders dan menu items untuk merchant ini
        await fetchOrders(merchantInfo.id);
        await fetchHistoryOrders(merchantInfo.id);
        await fetchMenuItems(merchantInfo.id);
      } else {
        setError('Merchant data not found');
      }
    } catch (err) {
      setError('Failed to load merchant data');
      console.error('Error fetching merchant data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async (merchantId) => {
    try {
      const response = await fetch(`http://localhost/CanTake/BackEnd/api/order.php?merchant_id=${merchantId}`);
      const data = await response.json();

      if (data.status === 'success') {
        // Filter orders to show only Paid and Accepted status
        const relevantOrders = data.data.filter(order =>
          ['Paid', 'Accepted'].includes(order.status_name)
        );
        setOrders(relevantOrders);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const fetchHistoryOrders = async (merchantId) => {
    try {
      const response = await fetch(`http://localhost/CanTake/BackEnd/api/order.php?merchant_id=${merchantId}`);
      const data = await response.json();

      if (data.status === 'success') {
        // Filter orders to show Completed and Rejected status (finished orders)
        const finishedOrders = data.data.filter(order =>
          ['Completed', 'Rejected'].includes(order.status_name)
        );
        setHistoryOrders(finishedOrders);
      }
    } catch (err) {
      console.error('Error fetching history orders:', err);
    }
  };

  const fetchMenuItems = async (merchantId) => {
    try {
      const response = await fetch(`http://localhost/CanTake/BackEnd/api/produk.php?merchant_id=${merchantId}`);
      const data = await response.json();

      if (data.status === 'success') {
        const formattedMenuItems = data.data.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description || 'Tidak ada deskripsi',
          price: parseFloat(item.price),
          prep_time: item.prep_time,
          available: item.available === 1,
          imageUrl: item.image_url ? item.image_url.replace('CanTake/FrontEnd/public/', '/') : '',
        }));
        setMenuItems(formattedMenuItems);
      } else {
        setMenuItems([]);
      }
    } catch (err) {
      console.error('Error fetching menu items:', err);
      setMenuItems([]);
    }
  };

  // Fungsi untuk handle action order (accept, reject, complete)
  const handleOrderAction = async (orderId, action, reasonId = null) => {
    setActionLoading(prev => ({ ...prev, [orderId]: true }));

    try {
      const response = await fetch('http://localhost/CanTake/BackEnd/api/order.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: orderId,
          action: action,
          rejection_reason_id: reasonId
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Refresh orders setelah action berhasil
        if (merchant) {
          await fetchOrders(merchant.id);
          await fetchHistoryOrders(merchant.id);
        }
      } else {
        alert(data.message || 'Failed to update order');
      }
    } catch (err) {
      console.error('Error updating order:', err);
      alert('Failed to update order');
    } finally {
      setActionLoading(prev => ({ ...prev, [orderId]: false }));
    }
  };
  //========💧AkhirRegion_API_Functions💧=====

  //========💨AwalRegion_Event_Handlers💨=====
  // Handle logout merchant
  const handleLogout = () => {
    if (logout) {
      logout();
    }
  };
  //========💧AkhirRegion_Event_Handlers💧=====

  //========💨AwalRegion_Conditional_Renders💨=====
  // Auth checking state - tampilkan loading saat check auth
  if (!authChecked) {
    return (
      <div className="w-100">
        <div className="page-layout">
          <div className="main-content">
            <div className="section" style={{ textAlign: 'center', padding: '3rem' }}>
              <i className='bx bx-loader-alt bx-spin' style={{ fontSize: '3rem', color: 'var(--primary-color)' }}></i>
              <p>Memuat...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state - tampilkan spinner saat data sedang dimuat
  if (loading) {
    return (
      <div className="w-100">
        <MerchantNavbar user={user} handleLogout={handleLogout} />
        <div className="page-layout">
          <div className="main-content">
            <div className="section" style={{ textAlign: 'center', padding: '3rem' }}>
              <i className='bx bx-loader-alt bx-spin' style={{ fontSize: '3rem', color: 'var(--primary-color)' }}></i>
              <p>Memuat dashboard merchant...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state - tampilkan pesan error jika merchant tidak ditemukan
  if (error || !merchant) {
    return (
      <div className="w-100">
        <MerchantNavbar user={user} handleLogout={handleLogout} />
        <div className="page-layout">
          <div className="main-content">
            <div className="section" style={{ textAlign: 'center', padding: '3rem' }}>
              <i className='bx bx-error-circle' style={{ fontSize: '3rem', color: 'var(--primary-color)' }}></i>
              <p>{error || 'Merchant tidak ditemukan'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-100">
      <MerchantNavbar user={user} handleLogout={handleLogout} />

      {/* Main Layout with Sidebar */}
      <div className="page-layout">
        {/* Main content */}
        <div className="main-content">
          {/* Merchant Banner */}
          <div className="section">
            <div className="merchant-banner" style={{
              backgroundImage: `url(${require('../assets/banner_merchant.jpg')})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              minHeight: '250px',
              overflow: 'hidden',
              width: '100%'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2rem'
              }}>
                <div style={{
                  color: 'white',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                }}>
                  <h1 style={{
                    fontSize: '2.8rem',
                    fontWeight: 'bold',
                    margin: '0 0 0.5rem 0',
                    lineHeight: '1.2'
                  }}>
                    {merchant.merchant_name}
                  </h1>
                  <div style={{
                    fontSize: '1.1rem',
                    opacity: '0.95',
                    marginBottom: '0.5rem'
                  }}>
                    Dashboard Merchant
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    opacity: '0.9',
                    display: 'flex',
                    gap: '1.5rem',
                    flexWrap: 'wrap'
                  }}>
                    <span>📍 Kantin Kampus PNJ</span>
                    <span>📋 {orders.length} Pesanan Aktif</span>
                    <span>👤 {getCurrentUser()?.first_name || getCurrentUser()?.username || 'User'} {getCurrentUser()?.last_name || ''}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Management */}
          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Kelola Menu</h2>
              <button
                className="order-now-button"
                onClick={() => setShowAddMenuModal(true)}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
              >
                <i className='bx bx-plus'></i> Tambah Menu
              </button>
            </div>
            <MenuManagement
              merchantId={merchant.id}
              menuItems={menuItems}
              onMenuUpdate={() => fetchMenuItems(merchant.id)}
              showAddModal={showAddMenuModal}
              setShowAddModal={setShowAddMenuModal}
            />
          </div>
        </div>

        {/* Sidebar with Order Management */}
        <div className="sidebar">
          {/* Active Orders */}
          <div className="checkout-menu" style={{ marginBottom: '1.5rem' }}>
            <h2>Kelola Pesanan</h2>
            <OrdersTable
              orders={orders}
              onAccept={(orderId) => handleOrderAction(orderId, 'accept')}
              onReject={(orderId, reasonId) => handleOrderAction(orderId, 'reject', reasonId)}
              onComplete={(orderId) => handleOrderAction(orderId, 'complete')}
              actionLoading={actionLoading}
            />
          </div>

          {/* History Orders */}
          <div className="checkout-menu">
            <h2>History Pesanan</h2>
            <HistoryOrdersTable orders={historyOrders} />
          </div>
        </div>
      </div>

      <MerchantFooter />
    </div>
  );
};
//========💧AkhirRegion_MerchantDashboard_Component💧=====

//========💨AwalRegion_MerchantNavbar_Component💨=====
// Komponen navbar khusus merchant (mirip dengan user dashboard tapi tanpa navigasi ke dashboard)
const MerchantNavbar = ({ user, handleLogout }) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fungsi untuk mendapatkan data user dari props atau localStorage
  const getCurrentUser = () => {
    if (user) return user;

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    return null;
  };

  const currentUser = getCurrentUser();

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const onLogout = () => {
    if (handleLogout) {
      handleLogout();
    }
  };



  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="mobile-menu-button" onClick={toggleMobileMenu}>
            <i className='bx bx-menu'></i>
          </button>
          <div className="navbar-logo">
            <i className='bx bxs-dish' style={{ marginRight: '8px', fontSize: '1.5rem' }}></i>
            CanTake Merchant
          </div>
        </div>
        <div className="navbar-right">
          {currentUser && (
            <div className="profile-dropdown-container">
              <div className="user-profile" onClick={toggleProfileDropdown}>
                <span className="user-name">{currentUser?.first_name || currentUser?.username || 'User'}</span>
                <div className="profile-image">
                  <img
                    src="/assets/photoprofile_dummy.png"
                    alt="Profile"
                    className="profile-pic"
                  />
                </div>
              </div>

              {profileDropdownOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-item" onClick={onLogout}>
                    <i className='bx bx-log-out'></i>
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
//========💧AkhirRegion_MerchantNavbar_Component💧=====

//========💨AwalRegion_MerchantFooter_Component💨=====
// Komponen footer khusus merchant dashboard (tanpa elemen clickable)
const MerchantFooter = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Section CanTake Merchant info */}
        <div className="footer-section">
          <h3>CanTake Merchant</h3>
          <p>
            Dashboard untuk mengelola pesanan dari mahasiswa kampus.
          </p>
          <p className="copyright">
            COPYRIGHT © 2025   CANTAKE KEL 8
          </p>
        </div>

        {/* Section Merchant Dashboard info */}
        <div className="footer-section">
          <h3>MERCHANT DASHBOARD</h3>
          <p style={{ color: 'var(--text-color-light)', fontSize: '0.9rem' }}>
            Kelola pesanan dengan mudah dan efisien
          </p>
        </div>
      </div>
    </footer>
  );
};
//========💧AkhirRegion_MerchantFooter_Component💧=====

//========💨AwalRegion_MenuManagement_Component💨=====
// Komponen untuk mengelola menu items merchant (CRUD operations)
const MenuManagement = ({ merchantId, menuItems, onMenuUpdate, showAddModal, setShowAddModal }) => {
  const [editingMenu, setEditingMenu] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Handle delete menu dengan konfirmasi
  const handleDeleteMenu = async (menuId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus menu ini?')) {
      try {
        const response = await deleteMenuItem(menuId);

        if (response.status === 'success') {
          onMenuUpdate(); // Refresh menu items
        } else {
          alert(response.message || 'Failed to delete menu');
        }
      } catch (err) {
        console.error('Error deleting menu:', err);
        alert('Failed to delete menu');
      }
    }
  };

  const handleEditMenu = (menu) => {
    setEditingMenu(menu);
    setShowEditModal(true);
  };

  if (menuItems.length === 0) {
    return (
      <>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <i className='bx bx-food-menu' style={{ fontSize: '3rem', color: 'var(--text-color-light)', marginBottom: '1rem' }}></i>
          <p style={{ color: 'var(--text-color-light)' }}>Belum ada menu tersedia</p>
          <p style={{ color: 'var(--text-color-light)', fontSize: '0.9rem' }}>Klik "Tambah Menu" untuk menambahkan menu pertama</p>
        </div>

        {showAddModal && (
          <MenuModal
            isEdit={false}
            merchantId={merchantId}
            onClose={() => setShowAddModal(false)}
            onSuccess={onMenuUpdate}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="menu-table-container">
        <div className="menu-table">
          <div className="menu-table-header">
            <div className="menu-table-cell">Gambar</div>
            <div className="menu-table-cell">Nama Menu</div>
            <div className="menu-table-cell">Deskripsi</div>
            <div className="menu-table-cell">Harga</div>
            <div className="menu-table-cell">Waktu</div>
            <div className="menu-table-cell">Aksi</div>
          </div>
          {menuItems.map((item) => (
            <MenuTableRow
              key={item.id}
              item={item}
              onEdit={() => handleEditMenu(item)}
              onDelete={() => handleDeleteMenu(item.id)}
            />
          ))}
        </div>
      </div>

      {showAddModal && (
        <MenuModal
          isEdit={false}
          merchantId={merchantId}
          onClose={() => setShowAddModal(false)}
          onSuccess={onMenuUpdate}
        />
      )}

      {showEditModal && (
        <MenuModal
          isEdit={true}
          menuData={editingMenu}
          merchantId={merchantId}
          onClose={() => {
            setShowEditModal(false);
            setEditingMenu(null);
          }}
          onSuccess={onMenuUpdate}
        />
      )}
    </>
  );
};

// Menu Table Row Component
const MenuTableRow = ({ item, onEdit, onDelete }) => {
  return (
    <div className="menu-table-row">
      <div className="menu-table-cell">
        <div className="menu-thumbnail">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.name} />
          ) : (
            <div className="placeholder">
              <i className='bx bx-food-menu'></i>
            </div>
          )}
        </div>
      </div>
      <div className="menu-table-cell">
        <span className="menu-name">{item.name}</span>
      </div>
      <div className="menu-table-cell">
        <span className="menu-description">
          {item.description || 'Tidak ada deskripsi'}
        </span>
      </div>
      <div className="menu-table-cell">
        <span className="menu-price">
          Rp. {parseFloat(item.price).toLocaleString('id-ID')}
        </span>
      </div>
      <div className="menu-table-cell">
        {item.prep_time ? (
          <span className="menu-time">{item.prep_time} min</span>
        ) : (
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--text-color-light)',
            opacity: 0.6
          }}>
            -
          </span>
        )}
      </div>
      <div className="menu-table-cell">
        <div className="table-actions">
          <button
            className="table-action-button edit-button"
            onClick={onEdit}
            title="Edit Menu"
          >
            <i className='bx bx-edit'></i>
          </button>
          <button
            className="table-action-button delete-button"
            onClick={onDelete}
            title="Hapus Menu"
          >
            <i className='bx bx-trash'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

// Orders Table Component (using listOrder styling)
const OrdersTable = ({ orders, onAccept, onReject, onComplete, actionLoading }) => {
  if (orders.length === 0) {
    return (
      <div className="checkout-empty-state">
        <div className="checkout-empty-icon">
          <i className='bx bx-receipt'></i>
        </div>
        <div className="checkout-empty-text">
          <div className="checkout-empty-title">Belum ada Pesanan</div>
          <div className="checkout-empty-subtitle">Pesanan baru akan muncul di sini</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onAccept={onAccept}
          onReject={onReject}
          onComplete={onComplete}
          actionLoading={actionLoading}
        />
      ))}
    </div>
  );
};

// Order Card Component
const OrderCard = ({ order, onAccept, onReject, onComplete, actionLoading }) => {
  const [showRejectModal, setShowRejectModal] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'var(--warning-color)';
      case 'Accepted': return '#4CAF50'; // Green color for "Sedang Dibuat"
      default: return 'var(--text-color-light)';
    }
  };

  const isLoading = actionLoading[order.id];

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        {/* Order Header - Compact for sidebar */}
        <div style={{
          padding: '0.75rem',
          background: 'var(--bg-card)',
          borderRadius: 'var(--border-radius-md)',
          border: '1px solid var(--border-color-soft)',
          marginBottom: '0.75rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '0.5rem'
          }}>
            <div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--text-color)',
                marginBottom: '0.25rem'
              }}>
                #{order.id} - {order.first_name || order.username || 'Customer'}
              </div>
              <div style={{
                fontSize: '0.7rem',
                color: 'var(--text-color-light)'
              }}>
                {formatDate(order.created_at)}
              </div>
            </div>
            <div style={{
              padding: '0.2rem 0.5rem',
              background: getStatusColor(order.status_name),
              color: 'white',
              borderRadius: 'var(--border-radius-sm)',
              fontSize: '0.65rem'
            }}>
              {order.status_name}
            </div>
          </div>

          {/* Order Items - Compact */}
          <div style={{ marginBottom: '0.75rem' }}>
            {order.items && order.items.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: index < order.items.length - 1 ? '0.25rem' : '0',
                fontSize: '0.75rem'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--text-color)',
                    marginBottom: '0.1rem'
                  }}>
                    {item.menu_item_name}
                  </div>
                  <div style={{
                    fontSize: '0.65rem',
                    color: 'var(--text-color-light)'
                  }}>
                    {item.quantity}x Rp. {parseFloat(item.price_at_order).toLocaleString('id-ID')}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total - Compact */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem 0',
            borderTop: '1px solid var(--border-color-soft)',
            fontSize: '0.8rem',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--primary-color)'
          }}>
            <span>Total</span>
            <span>Rp. {order.total_amount.toLocaleString('id-ID')}</span>
          </div>

          {/* Action Buttons - Compact */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginTop: '0.75rem'
          }}>
            {order.status_name === 'Paid' && (
              <>
                <button
                  className="order-now-button"
                  onClick={() => onAccept(order.id)}
                  disabled={isLoading}
                  style={{
                    flex: 1,
                    fontSize: '0.7rem',
                    padding: '0.4rem 0.5rem',
                    background: 'var(--success-color)',
                    opacity: isLoading ? 0.7 : 1
                  }}
                >
                  {isLoading ? (
                    <><i className='bx bx-loader-alt bx-spin'></i></>
                  ) : (
                    <><i className='bx bx-check'></i> Terima</>
                  )}
                </button>
                <button
                  className="order-now-button"
                  onClick={() => setShowRejectModal(true)}
                  disabled={isLoading}
                  style={{
                    flex: 1,
                    fontSize: '0.7rem',
                    padding: '0.4rem 0.5rem',
                    background: 'var(--danger-color)',
                    opacity: isLoading ? 0.7 : 1
                  }}
                >
                  <i className='bx bx-x'></i> Tolak
                </button>
              </>
            )}

            {order.status_name === 'Accepted' && (
              <button
                className="order-now-button"
                onClick={() => onComplete(order.id)}
                disabled={isLoading}
                style={{
                  width: '100%',
                  fontSize: '0.7rem',
                  padding: '0.4rem 0.5rem',
                  background: 'var(--primary-color)',
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                {isLoading ? (
                  <><i className='bx bx-loader-alt bx-spin'></i></>
                ) : (
                  <><i className='bx bx-check-circle'></i> Siap</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <RejectModal
          onClose={() => setShowRejectModal(false)}
          onConfirm={(reasonId) => {
            onReject(order.id, reasonId);
            setShowRejectModal(false);
          }}
        />
      )}
    </>
  );
};

// Reject Modal Component
const RejectModal = ({ onClose, onConfirm }) => {
  const [selectedReason, setSelectedReason] = useState('');

  const rejectReasons = [
    { id: 1, reason: 'Sold out' },
    { id: 2, reason: 'Closed' },
    { id: 3, reason: 'Too busy' },
    { id: 4, reason: 'Invalid payment' }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'var(--bg-card)',
        padding: '2rem',
        borderRadius: 'var(--border-radius-lg)',
        border: '1px solid var(--border-color-soft)',
        maxWidth: '400px',
        width: '90%'
      }}>
        <h3 style={{
          color: 'var(--text-color)',
          marginBottom: '1rem',
          fontSize: '1.2rem'
        }}>
          Alasan Penolakan
        </h3>

        <div style={{ marginBottom: '1.5rem' }}>
          {rejectReasons.map((reason) => (
            <label key={reason.id} style={{
              display: 'block',
              marginBottom: '0.75rem',
              cursor: 'pointer',
              color: 'var(--text-color)'
            }}>
              <input
                type="radio"
                name="rejectReason"
                value={reason.id}
                onChange={(e) => setSelectedReason(e.target.value)}
                style={{ marginRight: '0.5rem' }}
              />
              {reason.reason}
            </label>
          ))}
        </div>

        <div style={{
          display: 'flex',
          gap: '0.75rem'
        }}>
          <button
            className="order-now-button"
            onClick={onClose}
            style={{
              flex: 1,
              background: 'var(--text-color-light)'
            }}
          >
            Batal
          </button>
          <button
            className="order-now-button"
            onClick={() => onConfirm(selectedReason)}
            disabled={!selectedReason}
            style={{
              flex: 1,
              background: 'var(--danger-color)',
              opacity: !selectedReason ? 0.5 : 1
            }}
          >
            Tolak Pesanan
          </button>
        </div>
      </div>
    </div>
  );
};
//========💧AkhirRegion_MenuManagement_Component💧=====

//========💨AwalRegion_MenuFormModal_Component💨=====
// Komponen modal untuk add/edit menu items dengan form dan image upload
const MenuModal = ({ isEdit, menuData, merchantId, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: isEdit ? menuData?.name || '' : '',
    description: isEdit ? menuData?.description || '' : '',
    price: isEdit ? menuData?.price || '' : '',
    prep_time: isEdit ? menuData?.prep_time || '' : '',
    available: isEdit ? menuData?.available || 1 : 1
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';

      // Upload image if a new file is selected
      if (imageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('image', imageFile);

        const uploadResponse = await fetch('http://localhost/CanTake/BackEnd/api/upload.php', {
          method: 'POST',
          body: uploadFormData,
        });

        const uploadData = await uploadResponse.json();

        if (uploadData.status === 'success') {
          imageUrl = uploadData.image_url;
        } else {
          alert(uploadData.message || 'Failed to upload image');
          setLoading(false);
          return;
        }
      }

      let response;

      if (isEdit) {
        // For update, use PUT method with JSON
        const jsonData = {
          id: menuData.id,
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          prep_time: parseInt(formData.prep_time),
          available: parseInt(formData.available)
        };

        // Only include image_url if a new image was uploaded
        if (imageUrl) {
          jsonData.image_url = imageUrl;
        }

        console.log('Updating menu with data:', jsonData);
        response = await updateMenuItem(jsonData);
        console.log('Update response:', response);
      } else {
        // For create, use POST method with JSON
        const jsonData = {
          merchant_id: merchantId,
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          prep_time: parseInt(formData.prep_time),
          available: parseInt(formData.available),
          image_url: imageUrl // Include image URL for new items
        };

        console.log('Creating menu with data:', jsonData);
        response = await createMenuItem(jsonData);
        console.log('Create response:', response);
      }

      if (response.status === 'success') {
        onSuccess();
        onClose();
      } else {
        alert(response.message || 'Failed to save menu');
      }
    } catch (err) {
      console.error('Error saving menu:', err);
      alert('Failed to save menu: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'var(--bg-card)',
        padding: '2rem',
        borderRadius: 'var(--border-radius-lg)',
        border: '1px solid var(--border-color-soft)',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h3 style={{
          color: 'var(--text-color)',
          marginBottom: '1.5rem',
          fontSize: '1.2rem'
        }}>
          {isEdit ? 'Edit Menu' : 'Tambah Menu Baru'}
        </h3>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--text-color)',
              fontSize: '0.9rem'
            }}>
              Nama Menu
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="form-input"
              placeholder="Masukkan nama menu"
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--text-color)',
              fontSize: '0.9rem'
            }}>
              Deskripsi
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Masukkan deskripsi menu"
              rows="3"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: 'var(--text-color)',
                fontSize: '0.9rem'
              }}>
                Harga (Rp)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="0"
                min="0"
                step="1000"
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: 'var(--text-color)',
                fontSize: '0.9rem'
              }}>
                Waktu Persiapan (menit)
              </label>
              <input
                type="number"
                name="prep_time"
                value={formData.prep_time}
                onChange={handleInputChange}
                className="form-input"
                placeholder="15"
                min="1"
              />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--text-color)',
              fontSize: '0.9rem'
            }}>
              Status
            </label>
            <select
              name="available"
              value={formData.available}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value={1}>Tersedia</option>
              <option value={0}>Tidak Tersedia</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--text-color)',
              fontSize: '0.9rem'
            }}>
              Gambar Menu
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-input"
              style={{ padding: '0.5rem' }}
            />
            {imagePreview && (
              <div style={{
                marginTop: '0.5rem',
                textAlign: 'center'
              }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: '150px',
                    maxHeight: '150px',
                    objectFit: 'cover',
                    borderRadius: 'var(--border-radius-md)',
                    border: '1px solid var(--border-color-soft)'
                  }}
                />
              </div>
            )}
            <small style={{ color: 'var(--text-color-light)', fontSize: '0.8rem' }}>
              Gambar akan disimpan ke folder Upload
            </small>
          </div>

          <div style={{
            display: 'flex',
            gap: '0.75rem'
          }}>
            <button
              type="button"
              className="order-now-button"
              onClick={onClose}
              style={{
                flex: 1,
                background: 'var(--text-color-light)'
              }}
            >
              Batal
            </button>
            <button
              type="submit"
              className="order-now-button"
              disabled={loading}
              style={{
                flex: 1,
                background: 'var(--primary-color)',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? (
                <><i className='bx bx-loader-alt bx-spin'></i> Menyimpan...</>
              ) : (
                <>{isEdit ? 'Update Menu' : 'Tambah Menu'}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
//========💧AkhirRegion_MenuFormModal_Component💧=====

//========💨AwalRegion_HistoryOrdersTable_Component💨=====
// Komponen tabel history orders untuk menampilkan pesanan yang sudah selesai/ditolak
const HistoryOrdersTable = ({ orders }) => {
  // Format tanggal untuk display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format rupiah untuk display
  const formatRupiah = (amount) => {
    return Math.floor(parseFloat(amount)).toLocaleString('id-ID');
  };

  if (orders.length === 0) {
    return (
      <div className="checkout-empty-state">
        <div className="checkout-empty-icon">
          <i className='bx bx-history'></i>
        </div>
        <div className="checkout-empty-text">
          <div className="checkout-empty-title">Belum ada History</div>
          <div className="checkout-empty-subtitle">Pesanan yang selesai atau ditolak akan muncul di sini</div>
        </div>
      </div>
    );
  }

  // Tampilkan hanya 3 history terakhir
  const recentOrders = orders.slice(0, 3);

  return (
    <div style={{ marginTop: '1rem' }}>
      {recentOrders.map((order) => (
        <div key={order.id} style={{ marginBottom: '0.75rem' }}>
          {/* History Order Card - Compact version */}
          <div style={{
            padding: '0.6rem',
            background: 'var(--bg-card)',
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid var(--border-color-soft)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '0.4rem'
            }}>
              <div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-color)',
                  marginBottom: '0.15rem'
                }}>
                  #{order.id} - {order.first_name || order.username || 'Customer'}
                </div>
                <div style={{
                  fontSize: '0.65rem',
                  color: 'var(--text-color-light)'
                }}>
                  {formatDate(order.created_at)}
                </div>
              </div>
              <div style={{
                padding: '0.15rem 0.4rem',
                background: order.status_name === 'Completed' ? 'var(--success-color)' : '#dc3545',
                color: 'white',
                borderRadius: 'var(--border-radius-sm)',
                fontSize: '0.6rem'
              }}>
                {order.status_name === 'Completed' ? 'Selesai' : 'Ditolak'}
              </div>
            </div>

            {/* Order Items - Very Compact */}
            <div style={{ marginBottom: '0.4rem' }}>
              {order.items && order.items.slice(0, 2).map((item, index) => (
                <div key={index} style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-color-medium)',
                  marginBottom: '0.1rem'
                }}>
                  {item.quantity}x {item.menu_item_name}
                </div>
              ))}
              {order.items && order.items.length > 2 && (
                <div style={{
                  fontSize: '0.65rem',
                  color: 'var(--text-color-light)',
                  fontStyle: 'italic'
                }}>
                  +{order.items.length - 2} item lainnya
                </div>
              )}
            </div>

            {/* Total - Compact */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '0.4rem',
              borderTop: '1px solid var(--border-color-soft)',
              fontSize: '0.75rem',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--primary-color)'
            }}>
              <span>Total</span>
              <span>Rp. {formatRupiah(order.total_amount)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
//========💧AkhirRegion_HistoryOrdersTable_Component💧=====

export default MerchantDashboard;
