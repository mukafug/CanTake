//========💨AwalRegion_Import_Dependencies💨=====
// Import React dan dependencies untuk halaman checkout
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createOrder } from '../services/api';
import 'boxicons/css/boxicons.min.css';
//========💧AkhirRegion_Import_Dependencies💧=====

//========💨AwalRegion_CheckoutPage_Component💨=====
// Komponen halaman checkout untuk pembayaran pesanan
const CheckoutPage = ({ cartData, user, logout, refreshOrders }) => {
  //========💨AwalRegion_State_Management💨=====
  // State untuk checkout dan payment
  const navigate = useNavigate();
  const { cartItems, total, currentMerchantId, currentMerchantName, clearCart, updateQuantity } = cartData;
  const [paymentMethod, setPaymentMethod] = useState('qris'); // 'cash' atau 'qris'
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState('');
  //========💧AkhirRegion_State_Management💧=====

  //========💨AwalRegion_Effect_Hooks💨=====
  // Redirect jika tidak ada item di cart atau user belum login
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      navigate('/dashboard');
      return;
    }
  }, [user, cartItems, navigate]);
  //========💧AkhirRegion_Effect_Hooks💧=====

  //========💨AwalRegion_Event_Handlers💨=====
  // Fungsi untuk menampilkan notifikasi
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  // Handle pembayaran dan create order
  const handlePayment = async () => {
    if (!user) {
      showNotification('Silakan login terlebih dahulu');
      return;
    }

    if (cartItems.length === 0) {
      showNotification('Keranjang kosong');
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare data order untuk API
      const orderData = {
        user_id: user.id,
        merchant_id: currentMerchantId,
        items: cartItems.map(item => ({
          menu_item_id: item.id,
          quantity: item.quantity,
          price_at_order: item.price
        })),
        total_amount: total,
        payment_method: paymentMethod
      };

      // API call untuk create order
      const response = await createOrder(orderData);

      if (response.status === 'success') {
        showNotification('Pesanan berhasil dibuat! Menunggu konfirmasi merchant.');
        clearCart();

        // Refresh orders untuk menampilkan order baru
        if (refreshOrders) {
          refreshOrders();
        }

        // Redirect ke dashboard setelah 2 detik
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        showNotification(response.message || 'Gagal membuat pesanan');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      showNotification('Terjadi kesalahan saat membuat pesanan');
    } finally {
      setIsProcessing(false);
    }
  };
  //========💧AkhirRegion_Event_Handlers💧=====

  //========💨AwalRegion_Conditional_Renders💨=====
  // Return null jika user belum login atau cart kosong (akan redirect di useEffect)
  if (!user || cartItems.length === 0) {
    return null;
  }
  //========💧AkhirRegion_Conditional_Renders💧=====

  //========💨AwalRegion_Render_JSX💨=====
  // Render halaman checkout dengan order list dan payment section
  return (
    <div className="w-100">
      <Navbar user={user} logout={logout} />

      {/* Notification untuk feedback user */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--primary-color)',
          color: 'var(--text-on-primary)',
          padding: '1rem 2rem',
          borderRadius: 'var(--border-radius-md)',
          zIndex: 1000,
          boxShadow: 'var(--shadow-md)',
          fontWeight: 'var(--font-weight-medium)'
        }}>
          {notification}
        </div>
      )}

      {/* Main checkout layout dengan 2 kolom */}
      <div className="page-layout checkout-page-layout" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: 'calc(100vh - 200px)',
        padding: '2rem'
      }}>
        <div className="checkout-page-container" style={{
          display: 'flex',
          gap: '2rem',
          width: '100%',
          maxWidth: '1200px',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}>
          {/* Sisi Kiri - Daftar Order */}
          <div className="checkout-menu" style={{
            flex: 1,
            maxWidth: '500px',
            width: '100%'
          }}>
            <h2>Pesanan Kamu</h2>

            {/* Badge nama merchant */}
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
              gap: '0.5rem'
            }}>
              <i className='bx bx-store' style={{ fontSize: '1rem' }}></i>
              {currentMerchantName}
            </div>

            {/* Daftar item order dengan thumbnail dan quantity controls */}
            <div className="checkout-items-container">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                    {/* Thumbnail gambar item */}
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: 'var(--border-radius-sm)',
                      overflow: 'hidden',
                      flexShrink: 0,
                      background: 'var(--bg-accent)',
                      position: 'relative'
                    }}>
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center'
                          }}
                        />
                      ) : (
                        <i className='bx bx-food-menu' style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          fontSize: '1.2rem',
                          color: 'var(--text-color-light)'
                        }}></i>
                      )}
                    </div>

                    {/* Info item (nama dan harga) */}
                    <div className="checkout-item-info">
                      <h3>{item.name}</h3>
                      <p className="checkout-item-price">
                        Rp. {item.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  {/* Kontrol quantity dengan tombol +/- */}
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

            {/* Total harga keseluruhan */}
            <div className="checkout-total">
              <span>Total</span>
              <span>Rp. {total.toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* Sisi Kanan - Payment Section */}
          <div className="checkout-menu" style={{
            flex: 1,
            maxWidth: '500px',
            width: '100%'
          }}>
            <h2>QRIS Payment</h2>

            {/* QRIS Code */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1rem',
              width: '100%',
              opacity: paymentMethod === 'cash' ? 0.4 : 1,
              transition: 'opacity 0.3s ease'
            }}>
              <div style={{
                background: paymentMethod === 'cash' ? '#f5f5f5' : '#ffffff',
                padding: '1rem',
                borderRadius: 'var(--border-radius-md)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: paymentMethod === 'cash' ? '0 1px 4px rgba(0, 0, 0, 0.05)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
                width: 'fit-content',
                transition: 'all 0.3s ease'
              }}>
                {/* QR Code Image */}
                <div style={{
                  width: '120px',
                  height: '120px',
                  background: paymentMethod === 'cash' ? '#f5f5f5' : '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  borderRadius: 'var(--border-radius-sm)',
                  filter: paymentMethod === 'cash' ? 'grayscale(100%)' : 'none',
                  transition: 'all 0.3s ease'
                }}>
                  <img
                    src={require('../assets/kode.png')}
                    alt="QR Code"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </div>

                {/* QRIS Logo */}
                <img
                  src="/assets/qrislogo.svg"
                  alt="QRIS"
                  style={{
                    height: '25px',
                    width: 'auto',
                    filter: paymentMethod === 'cash' ? 'grayscale(100%)' : 'none',
                    transition: 'filter 0.3s ease'
                  }}
                />
              </div>
            </div>

            {/* Amount */}
            <div style={{
              textAlign: 'center',
              marginBottom: '1rem',
              padding: '0.75rem',
              background: paymentMethod === 'cash' ? 'var(--bg-accent)' : 'var(--bg-dark)',
              borderRadius: 'var(--border-radius-md)',
              border: paymentMethod === 'cash' ? '1px solid var(--border-color-soft)' : '1px solid var(--border-color-medium)',
              width: '100%',
              opacity: paymentMethod === 'cash' ? 0.6 : 1,
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                fontSize: '1rem',
                fontWeight: 'var(--font-weight-bold)',
                color: paymentMethod === 'cash' ? 'var(--text-color-medium)' : 'var(--primary-color)',
                marginBottom: '0.25rem',
                transition: 'color 0.3s ease'
              }}>
                Rp. {total.toLocaleString('id-ID')}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: paymentMethod === 'cash' ? 'var(--text-color-light)' : 'var(--text-color-light)'
              }}>
                A. N. {currentMerchantName}
              </div>
            </div>

            {/* Payment Method Selection */}
            <div style={{ marginBottom: '1rem', width: '100%' }}>
              <div className="login-toggle" style={{ width: '100%' }}>
                <button
                  className={`toggle-button ${paymentMethod === 'cash' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('cash')}
                  style={{ flex: 1 }}
                >
                  <i className='bx bx-money' style={{ marginRight: '0.5rem' }}></i>
                  Cash
                </button>
                <button
                  className={`toggle-button ${paymentMethod === 'qris' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('qris')}
                  style={{ flex: 1 }}
                >
                  <i className='bx bx-qr' style={{ marginRight: '0.5rem' }}></i>
                  QRIS
                </button>
              </div>
            </div>

            {/* Payment Button */}
            <button
              className="login-submit-button"
              onClick={handlePayment}
              disabled={isProcessing}
              style={{
                width: '100%',
                fontSize: '0.85rem',
                padding: '0.75rem'
              }}
            >
              {isProcessing ? (
                <>
                  <i className='bx bx-loader-alt bx-spin' style={{ marginRight: '0.5rem' }}></i>
                  Memproses...
                </>
              ) : paymentMethod === 'cash' ? (
                <>
                  <i className='bx bx-money' style={{ marginRight: '0.5rem' }}></i>
                  Bayar Tunai Nanti
                </>
              ) : (
                <>
                  <i className='bx bx-qr' style={{ marginRight: '0.5rem' }}></i>
                  Konfirmasi Pembayaran
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
  //========💧AkhirRegion_Render_JSX💧=====
};
//========💧AkhirRegion_CheckoutPage_Component💧=====

//========💨AwalRegion_Navbar_Component💨=====
// Komponen navbar dengan navigasi dan user profile (sama seperti Dashboard dan GeraiPage)
const Navbar = ({ user, logout }) => {
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
    if (logout) {
      logout();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="mobile-menu-button" onClick={toggleMobileMenu}>
            <i className='bx bx-menu'></i>
          </button>
          <div className="navbar-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <i className='bx bxs-dish' style={{ marginRight: '8px', fontSize: '1.5rem' }}></i>
            CanTake
          </div>
        </div>

        <div className="navbar-right">
          <div className={`navbar-links ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
            <a href="#" onClick={handleBestSellerClick}>BestSeller</a>
            <a href="#" onClick={handleMerchantClick}>Merchant</a>
            <Link to="/dashboard" onClick={handleBerandaClick}>Beranda</Link>
          </div>

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

//========💨AwalRegion_Footer_Component💨=====
// Komponen footer dengan navigasi dan links (sama seperti Dashboard dan GeraiPage)
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
        <div className="footer-section">
          <h3>CanTake</h3>
          <p>
            Layanan pesan makanan untuk mahasiswa kampus.
          </p>
          <p className="copyright">
            COPYRIGHT © 2025   CANTAKE KEL 8
          </p>
        </div>

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

export default CheckoutPage;
