//========💨AwalRegion_Import_Dependencies💨=====
// Import React dan dependencies untuk halaman gerai merchant
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMerchantById, getMenuItemsByMerchantId } from '../services/api';
import 'boxicons/css/boxicons.min.css';
//========💧AkhirRegion_Import_Dependencies💧=====


// Komponen halaman gerai untuk menampilkan detail merchant dan menu
const GeraiPage = ({ cartData, user, logout }) => {

  //========💨AwalRegion_State_Management💨=====
  // State untuk data merchant, menu, dan UI
  const { id } = useParams();
  const [merchant, setMerchant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState('');
  //========💧AkhirRegion_State_Management💧=====

  //========💨AwalRegion_Effect_Hooks💨=====
  // Effect untuk fetch data merchant dan menu saat komponen dimount
  useEffect(() => {
    // Scroll ke atas saat komponen dimount
    window.scrollTo(0, 0);

    // Fungsi untuk fetch data merchant dan menu items
    const fetchMerchantData = async () => {
      try {
        setLoading(true);
        // Fetch data merchant berdasarkan ID
        const merchantResponse = await getMerchantById(id);

        if (merchantResponse.status === 'success' && merchantResponse.data) {
          setMerchant({
            id: merchantResponse.data.id,
            name: merchantResponse.data.merchant_name,
            imageUrl: merchantResponse.data.image_url ? merchantResponse.data.image_url.replace('CanTake/FrontEnd/public/', '') : '',
          });

          // Fetch menu items untuk merchant ini
          const menuResponse = await getMenuItemsByMerchantId(id);

          if (menuResponse.status === 'success' && menuResponse.data) {
            const formattedMenuItems = menuResponse.data.map(item => ({
              id: item.id,
              name: item.name,
              description: item.description || 'Tidak ada deskripsi',
              price: parseFloat(item.price),
              prepTime: item.prep_time,
              available: item.available === 1,
              imageUrl: item.image_url ? item.image_url.replace('CanTake/FrontEnd/public/', '/') : '',
            }));

            setMenuItems(formattedMenuItems);
          } else {
            setMenuItems([]);
          }
        } else {
          setError('Merchant tidak ditemukan');
          setMerchant(null);
        }
      } catch (err) {
        console.error('Error fetching merchant data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMerchantData();
  }, [id]);
  //========💧AkhirRegion_Effect_Hooks💧=====

  //========💨AwalRegion_Event_Handlers💨=====
  // Handle logout user
  const handleLogout = () => {
    if (logout) {
      logout();
    }
  };

  // Fungsi untuk menampilkan notifikasi
  const showNotification = (message) => {
    setNotification(message);
    // Clear notification setelah 4 detik
    setTimeout(() => setNotification(''), 4000);
  };
  //========💧AkhirRegion_Event_Handlers💧=====

  //========💨AwalRegion_Conditional_Renders💨=====
  // Loading state - tampilkan spinner saat data sedang dimuat
  if (loading) {
    return (
      <div className="w-100">
        <Navbar user={user} handleLogout={handleLogout} />
        <div className="page-layout">
          <div className="main-content">
            <div className="section" style={{ textAlign: 'center', padding: '3rem' }}>
              <i className='bx bx-loader-alt bx-spin' style={{ fontSize: '3rem', color: 'var(--primary-color)' }}></i>
              <p>Memuat data merchant...</p>
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
        <Navbar user={user} handleLogout={handleLogout} />
        <div className="page-layout">
          <div className="main-content">
            <div className="section" style={{ textAlign: 'center', padding: '3rem' }}>
              <i className='bx bx-error-circle' style={{ fontSize: '3rem', color: 'var(--primary-color)' }}></i>
              <p>{error || 'Merchant tidak ditemukan'}</p>
              <Link to="/dashboard" className="order-now-button" style={{ marginTop: '1rem', display: 'inline-block' }}>
                Kembali ke Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  //========💧AkhirRegion_Conditional_Renders💧=====

  //========💨AwalRegion_Render_JSX💨=====
  // Render halaman gerai dengan banner merchant, menu items, dan checkout sidebar
  return (
    <div className="w-100">
      <Navbar user={user} handleLogout={handleLogout} />

      {/* Notification Bar untuk pesan error */}
      {notification && <NotificationBar message={notification} />}

      {/* Main Layout dengan Sidebar */}
      <div className="page-layout">
        {/* Main content area */}
        <div className="main-content">
          {/* Banner Merchant dengan info detail */}
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
              {/* Overlay gradient untuk readability */}
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
                {/* Info merchant */}
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
                    {merchant.name}
                  </h1>
                  <div className="merchant-banner-subtitle" style={{
                    fontSize: '1.1rem',
                    opacity: '0.95',
                    marginBottom: '0.5rem'
                  }}>
                    Merchant ID: #{merchant.id}
                  </div>
                  <div className="merchant-banner-info" style={{
                    fontSize: '1rem',
                    opacity: '0.9',
                    display: 'flex',
                    gap: '1.5rem',
                    flexWrap: 'wrap'
                  }}>
                    <span>📍 Kantin Kampus PNJ</span>
                    <span>⏰ Buka Setiap Hari</span>
                    <span>🍽️ {menuItems.length} Menu Tersedia</span>
                  </div>
                  <div className="merchant-banner-price" style={{
                    fontSize: '0.9rem',
                    opacity: '0.8',
                    marginTop: '0.5rem',
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    {menuItems.length > 0 && (
                      <>
                        <span>💰 Mulai dari Rp {Math.min(...menuItems.map(item => item.price)).toLocaleString('id-ID')}</span>
                        <span>🔥 Hingga Rp {Math.max(...menuItems.map(item => item.price)).toLocaleString('id-ID')}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Menu Items */}
          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Menu</h2>
            </div>

            {/* Tampilkan menu items atau pesan kosong */}
            {menuItems.length === 0 ? (
              <div className="text-center py-4">
                <p>Tidak ada menu tersedia (N/A)</p>
              </div>
            ) : (
              <div className="merchant-grid">
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    addToCart={cartData.addToCart}
                    merchantId={merchant.id}
                    merchantName={merchant.name}
                    showNotification={showNotification}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar dengan Checkout Menu */}
        <div className="sidebar">
          <CheckoutMenu cartData={cartData} />
        </div>
      </div>

      <Footer />
    </div>
  );
  //========💧AkhirRegion_Render_JSX💧=====
};
//========💧AkhirRegion_GeraiPage_Component💧=====

//========💨AwalRegion_NotificationBar_Component💨=====
// Komponen notification bar untuk menampilkan pesan error/info
const NotificationBar = ({ message }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '70px', // Di bawah navbar
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#ff4444',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: 'var(--border-radius-md)',
      boxShadow: 'var(--shadow-lg)',
      zIndex: 1000,
      fontSize: '0.9rem',
      fontWeight: 'var(--font-weight-medium)',
      maxWidth: '90%',
      textAlign: 'center',
      animation: 'slideDown 0.3s ease-out'
    }}>
      <i className='bx bx-error-circle' style={{ marginRight: '0.5rem' }}></i>
      {message}
    </div>
  );
};
//========💧AkhirRegion_NotificationBar_Component💧=====

//========💨AwalRegion_Navbar_Component💨=====
// Komponen navbar dengan navigasi dan user profile (sama seperti Dashboard)
const Navbar = ({ user, handleLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Handle click best seller - navigate ke dashboard dengan scroll target
  const handleBestSellerClick = (e) => {
    e.preventDefault();
    navigate('/dashboard', { state: { scrollTo: 'bestseller' } });
  };

  // Handle click merchant - navigate ke dashboard dengan scroll target
  const handleMerchantClick = (e) => {
    e.preventDefault();
    navigate('/dashboard', { state: { scrollTo: 'merchant' } });
  };

  // Handle click beranda - navigate ke dashboard
  const handleBerandaClick = () => {
    navigate('/dashboard');
  };

  // Handle click logo - navigate ke dashboard
  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  // Handle logout
  const onLogout = () => {
    if (handleLogout) {
      handleLogout();
    }
  };

  // Render navbar JSX
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Bagian kiri navbar - logo dan mobile menu */}
        <div className="navbar-left">
          <button className="mobile-menu-button" onClick={toggleMobileMenu}>
            <i className='bx bx-menu'></i>
          </button>
          <div className="navbar-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <i className='bx bxs-dish' style={{ marginRight: '8px', fontSize: '1.5rem' }}></i>
            CanTake
          </div>
        </div>

        {/* Bagian kanan navbar - navigasi dan user profile */}
        <div className="navbar-right">
          <div className={`navbar-links ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
            <a href="#" onClick={handleBestSellerClick}>BestSeller</a>
            <a href="#" onClick={handleMerchantClick}>Merchant</a>
            <Link to="/dashboard" onClick={handleBerandaClick}>Beranda</Link>
          </div>

          {/* Tampilkan profile jika user login, atau login button jika belum */}
          {user ? (
            <div className="profile-dropdown-container">
              <div className="user-profile" onClick={toggleProfileDropdown}>
                <span className="user-name">{user.first_name || user.username}</span>
                <div className="profile-image">
                  <img
                    src="/assets/photoprofile_dummy.png"
                    alt="Profile"
                    className="profile-pic"
                  />
                </div>
              </div>

              {/* Dropdown menu profile */}
              {profileDropdownOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-item" onClick={onLogout}>
                    <i className='bx bx-log-out'></i>
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="login-button">Login</Link>
              <div className="cart-icon"><i className='bx bx-user'></i></div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
//========💧AkhirRegion_Navbar_Component💧=====

//========💨AwalRegion_MenuItem_Component💨=====
// Komponen menu item dengan tombol add to cart
const MenuItem = ({ item, addToCart, merchantId, merchantName, showNotification }) => {
  // Handle add to cart dengan validasi
  const handleAddToCart = () => {
    if (addToCart) {
      const result = addToCart(item, merchantId, merchantName);
      if (!result.success) {
        showNotification(result.message);
      }
    }
  };

  return (
    <div className="merchant-card">
      {/* Image menu item */}
      <div className="merchant-image">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              aspectRatio: '1/1'
            }}
          />
        ) : (
          <i className='bx bx-food-menu' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></i>
        )}
      </div>

      {/* Info menu item */}
      <div className="merchant-info">
        <h3 className="merchant-name">{item.name}</h3>
        <p className="merchant-category">{item.description}</p>
        <p style={{
          color: 'var(--primary-color)',
          fontWeight: 'var(--font-weight-semibold)',
          marginTop: '0.25rem',
          fontSize: '0.85rem'
        }}>
          Rp. {item.price.toLocaleString('id-ID')}
        </p>
        {/* Prep time jika ada */}
        {item.prepTime && (
          <div style={{ fontSize: '0.7rem', color: 'var(--text-color-medium)', marginTop: '0.15rem' }}>
            <i className='bx bx-time' style={{ marginRight: '0.25rem' }}></i>
            <span>{item.prepTime} menit</span>
          </div>
        )}
        <div style={{ flex: 1 }}></div> {/* Spacer untuk push content ke atas */}

        {/* Tombol add to cart */}
        <div className="menu-item-actions" style={{ marginTop: '0.5rem' }}>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            <i className='bx bx-plus'></i>
            Pesan
          </button>
        </div>
      </div>
    </div>
  );
};
//========💧AkhirRegion_MenuItem_Component💧=====

//========💨AwalRegion_CheckoutMenu_Component💨=====
// Komponen checkout menu sidebar (sama seperti Dashboard)
const CheckoutMenu = ({ cartData }) => {
  const { cartItems, updateQuantity, total, currentMerchantName } = cartData;
  const navigate = useNavigate();

  return (
    <div className="checkout-menu">
      <h2>Pesanan Kamu</h2>

      {/* Badge merchant name jika ada item di cart */}
      {cartItems.length > 0 && (
        <div style={{
          background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark-color) 100%)',
          color: 'var(--text-on-primary)',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--border-radius-md)',
          marginBottom: '1rem',
          fontSize: '0.85rem',
          fontWeight: 'var(--font-weight-semibold)',
          textAlign: 'left',
          boxShadow: '0 2px 8px rgba(255, 140, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '6px',
            left: '6px',
            right: '6px',
            bottom: '6px',
            border: '2px dashed rgba(0, 0, 0, 0.3)',
            borderRadius: 'var(--border-radius-sm)',
            pointerEvents: 'none'
          }}></div>
          <i className='bx bx-store' style={{ fontSize: '1rem', position: 'relative', zIndex: 1 }}></i>
          <span style={{ position: 'relative', zIndex: 1 }}>{currentMerchantName}</span>
        </div>
      )}

      {/* Empty state atau daftar cart items */}
      {cartItems.length === 0 ? (
        <div className="checkout-empty-state">
          <div className="checkout-empty-icon">
            <i className='bx bx-receipt'></i>
          </div>
          <div className="checkout-empty-text">
            <div className="checkout-empty-title">Belum ada Orderan</div>
            <div className="checkout-empty-subtitle">Pilih menu favorit Anda untuk memulai pesanan</div>
          </div>
          <button className="checkout-button checkout-button-disabled" disabled>
            <i className='bx bx-shopping-bag' style={{ marginRight: '0.5rem' }}></i>
            Checkout
          </button>
        </div>
      ) : (
        <>
          {/* Daftar cart items */}
          <div className="checkout-items-container">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <div className="checkout-item-info">
                  <h3>{item.name}</h3>
                  <p className="checkout-item-price">Rp. {item.price.toLocaleString('id-ID')}</p>
                </div>
                <div className="checkout-item-quantity">
                  <button
                    className="quantity-button quantity-decrease"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="quantity-button quantity-increase"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total harga */}
          <div className="checkout-total">
            <span>Total</span>
            <span>Rp. {total.toLocaleString('id-ID')}</span>
          </div>

          {/* Tombol checkout */}
          <button className="checkout-button" onClick={() => navigate('/checkout')}>
            <i className='bx bx-shopping-bag'></i>
            Checkout
          </button>
        </>
      )}
    </div>
  );
};
//========💧AkhirRegion_CheckoutMenu_Component💧=====

//========💨AwalRegion_Footer_Component💨=====
// Komponen footer dengan navigasi dan links (sama seperti Dashboard)
const Footer = () => {
  const navigate = useNavigate();

  // Navigate ke dashboard dengan scroll target best seller
  const scrollToBestSeller = () => {
    navigate('/dashboard', { state: { scrollTo: 'bestseller' } });
  };

  // Navigate ke dashboard dengan scroll target merchant
  const toggleShowAllMerchants = () => {
    navigate('/dashboard', { state: { scrollTo: 'merchant' } });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Section CanTake info */}
        <div className="footer-section">
          <h3>CanTake</h3>
          <p>
            Layanan pesan makanan untuk mahasiswa kampus.
          </p>
          <p className="copyright">
            COPYRIGHT © 2025   CANTAKE KEL 8
          </p>
        </div>

        {/* Section Beranda links */}
        <div className="footer-section">
          <h3>BERANDA</h3>
          <ul className="footer-links">
            <li>
              <Link to="/dashboard">Home</Link>
            </li>
            <li>
              <a href="#" onClick={(e) => {
                e.preventDefault();
                scrollToBestSeller();
              }}>Best Seller</a>
            </li>
          </ul>
        </div>

        {/* Section Merchant links */}
        <div className="footer-section">
          <h3>MERCHANT</h3>
          <ul className="footer-links">
            <li>
              <a href="#" onClick={(e) => {
                e.preventDefault();
                toggleShowAllMerchants();
              }}>Lihat Semua Merchant</a>
            </li>
          </ul>
        </div>

        {/* Section Tentang links */}
        <div className="footer-section">
          <h3>TENTANG</h3>
          <ul className="footer-links">
            <li>
              <Link to="/tentang">Tentang Kami</Link>
            </li>
            <li>
              <Link to="/syarat-ketentuan">Syarat & Ketentuan</Link>
            </li>
            <li>
              <Link to="/kebijakan-privasi">Kebijakan Privasi</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
//========💧AkhirRegion_Footer_Component💧=====

export default GeraiPage;
