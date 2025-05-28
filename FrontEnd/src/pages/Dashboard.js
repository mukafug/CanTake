//========💨AwalRegion_Import_Dependencies💨=====
// Import React dan dependencies utama
import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cancelOrder } from '../services/api';
import 'boxicons/css/boxicons.min.css';
//========💧AkhirRegion_Import_Dependencies💧=====

//========💨AwalRegion_Dashboard_Main_Component💨=====
// Komponen utama Dashboard dengan semua props dan state management
const Dashboard = ({ bannerData, cartData, userOrders, merchantList, additionalMerchants, bestSellerList, reasons, greetingText, loading, user, logout, refreshOrders }) => {
  // Refs untuk scroll ke section tertentu
  const topWarungRef = useRef(null);
  const bestSellerRef = useRef(null);

  // State untuk toggle tampilan merchant
  const [showAllMerchants, setShowAllMerchants] = useState(false);
  const location = useLocation();

  // Fungsi untuk scroll ke section Top Warung
  const scrollToTopWarung = () => {
    topWarungRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fungsi untuk scroll ke section Best Seller
  const scrollToBestSeller = () => {
    bestSellerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Toggle tampilan semua merchant dan scroll ke section
  const toggleShowAllMerchants = () => {
    setShowAllMerchants(!showAllMerchants);
    // Scroll ke section Top Warung juga
    scrollToTopWarung();
  };

  // Handle logout user
  const handleLogout = () => {
    if (logout) {
      logout();
    }
  };

  // Handle scroll ke section saat navigasi dari halaman lain
  useEffect(() => {
    if (location.state?.scrollTo) {
      // Delay kecil untuk memastikan halaman sudah fully rendered
      setTimeout(() => {
        if (location.state.scrollTo === 'bestseller') {
          scrollToBestSeller();
        } else if (location.state.scrollTo === 'merchant') {
          setShowAllMerchants(true);
          scrollToTopWarung();
        }
      }, 100);
    }
  }, [location.state]);

  // Render komponen Dashboard
  return (
    <div className="w-100">
      {/* Navbar dengan navigasi dan user profile */}
      <Navbar
        toggleShowAllMerchants={toggleShowAllMerchants}
        scrollToBestSeller={scrollToBestSeller}
        user={user}
        handleLogout={handleLogout}
      />

      {/* Layout utama dengan sidebar */}
      <div className="page-layout">
        {/* Konten utama */}
        <div className="main-content">
          {/* Area fitur atas - Banner dan User Greeting */}
          <div className="top-feature-container">
            <Banner bannerData={bannerData} />
            <UserGreeting
              greetingText={greetingText}
              onOrderNowClick={scrollToTopWarung}
              user={user}
            />
          </div>

          {/* Section Top Warung */}
          <section className="section" ref={topWarungRef}>
            <div className="section-header">
              <h2 className="section-title">Top Warung</h2>
              <button onClick={toggleShowAllMerchants} className="see-all-link">
                {showAllMerchants ? (
                  <>Tutup <i className='bx bx-chevron-up'></i></>
                ) : (
                  <>Lihat Semua <i className='bx bx-chevron-down'></i></>
                )}
              </button>
            </div>
            <ListMerchant
              merchantList={merchantList}
              additionalMerchants={additionalMerchants}
              showAllMerchants={showAllMerchants}
              loading={loading?.merchants}
              user={user}
            />
          </section>

          {/* Section Best Seller */}
          <section className="section" ref={bestSellerRef}>
            <div className="section-header">
              <h2 className="section-title">Best Seller</h2>
              {/* Button See All dihapus sesuai permintaan */}
            </div>
            <ListBestSeller bestSellerList={bestSellerList} loading={loading?.bestSellers} user={user} />
          </section>

          {/* Section Kenapa Pilih CanTake */}
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Kenapa Pilih CanTake?</h2>
            </div>
            <KenapaPilihCanTake reasons={reasons} />
          </section>
        </div>

        {/* Sidebar dengan Checkout Menu */}
        <div className="sidebar">
          <CheckoutMenu cartData={cartData} userOrders={userOrders} loading={loading} refreshOrders={refreshOrders} />
        </div>
      </div>

      {/* Footer */}
      <Footer
        scrollToBestSeller={scrollToBestSeller}
        toggleShowAllMerchants={toggleShowAllMerchants}
      />
    </div>
  );
};
//========💧AkhirRegion_Dashboard_Main_Component💧=====

//========💨AwalRegion_Navbar_Component💨=====
// Komponen Navbar dengan navigasi, user profile, dan mobile menu
const Navbar = ({ toggleShowAllMerchants, scrollToBestSeller, user, handleLogout }) => {
  // State untuk mobile menu dan profile dropdown
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);
  const navigate = useNavigate();

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Handle click merchant navigation
  const handleMerchantClick = (e) => {
    e.preventDefault();
    toggleShowAllMerchants();
  };

  // Handle click best seller navigation
  const handleBestSellerClick = (e) => {
    e.preventDefault();
    scrollToBestSeller();
  };

  // Handle click beranda navigation
  const handleBerandaClick = () => {
    // Refresh halaman untuk Beranda
    // Tidak perlu prevent default karena Link sudah handle
  };

  // Handle click logo untuk navigate ke dashboard
  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  // Handle logout dan redirect ke dashboard
  const onLogout = () => {
    handleLogout();
    navigate('/dashboard');
  };

  // Tutup dropdown saat click di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownOpen && !event.target.closest('.profile-dropdown-container')) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen]);

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
            <Link to="/dashboard" className="active" onClick={handleBerandaClick}>Beranda</Link>
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

//========💨AwalRegion_Banner_Component💨=====
// Komponen Banner dengan slider dan transisi smooth
const Banner = ({ bannerData }) => {
  const { currentSlide, setCurrentSlide, banners, isTransitioning } = bannerData;
  const [prevSlide, setPrevSlide] = React.useState(0);

  // Track slide sebelumnya untuk arah animasi
  React.useEffect(() => {
    if (currentSlide !== prevSlide) {
      setPrevSlide(currentSlide === 0 && prevSlide === banners.length - 1
        ? banners.length - 1
        : currentSlide - 1 >= 0 ? currentSlide - 1 : banners.length - 1);
    }
  }, [currentSlide, banners.length, prevSlide]);

  // Import gambar banner
  const bannerImages = [
    require('../assets/banner_1.png'),
    require('../assets/banner_2.png')
  ];

  // Render banner dengan background image dan slider
  return (
    <div className="banner" style={{
      backgroundImage: `url(${bannerImages[currentSlide % bannerImages.length]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: 0,
      position: 'relative',
      transition: 'background-image 0.5s ease',
      overflow: 'hidden'
    }}>
      {/* Overlay gelap untuk readability text */}
      <div className="banner-overlay" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '1.5rem'
      }}>
        {/* Slider content dengan transisi */}
        <div className="banner-slider">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`banner-content ${
                index === currentSlide
                  ? 'active'
                  : index === prevSlide
                    ? 'prev'
                    : ''
              }`}
            >
              <h2>{banner.title}</h2>
              <p>{banner.description}</p>
            </div>
          ))}
        </div>

        {/* Dots indicator untuk navigasi slide */}
        <div className="banner-dots">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`banner-dot ${index === currentSlide ? 'active' : ''}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
//========💧AkhirRegion_Banner_Component💧=====

//========💨AwalRegion_UserGreeting_Component💨=====
// Komponen User Greeting dengan sapaan berdasarkan waktu
const UserGreeting = ({ greetingText, onOrderNowClick, user }) => {
  // Split greeting untuk highlight waktu
  const [greeting, timeOfDay] = greetingText.split(' ');

  // Ambil nama user atau default ke "User"
  const userName = user ? (user.first_name || user.username) : "User";

  return (
    <div className="user-greeting">
      <div>
        <h2>{greeting} <span style={{ color: 'var(--primary-color)' }}>{timeOfDay}</span>, {userName}!</h2>
        <p>Pesan Makanan Sekarang</p>
      </div>
      <button className="order-now-button" onClick={onOrderNowClick}>Order Now!</button>
    </div>
  );
};
//========💧AkhirRegion_UserGreeting_Component💧=====

//========💨AwalRegion_ListMerchant_Component💨=====
// Komponen untuk menampilkan daftar merchant dengan loading state dan navigation
const ListMerchant = ({ merchantList, additionalMerchants, showAllMerchants, loading, user }) => {
  const navigate = useNavigate();

  // Handle click merchant untuk navigasi ke gerai page
  const handleMerchantClick = (merchantId) => {
    // Cek apakah user sudah login
    if (!user) {
      // Redirect ke login page jika belum login
      navigate('/login');
      return;
    }

    // Navigate ke gerai page jika sudah login
    navigate(`/gerai/${merchantId}`);
  };

  // Loading skeleton saat data merchant sedang dimuat
  if (loading) {
    return (
      <div className="merchant-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div key={item} className="merchant-card" style={{ opacity: 0.7 }}>
            <div className="merchant-image" style={{ backgroundColor: '#e2e2e2' }}>
              <i className='bx bx-loader-alt bx-spin' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></i>
            </div>
            <div className="merchant-info">
              <div style={{ height: '0.9rem', width: '80%', backgroundColor: '#e2e2e2', marginBottom: '0.5rem', borderRadius: '4px' }}></div>
              <div style={{ height: '0.7rem', width: '60%', backgroundColor: '#e2e2e2', marginBottom: '0.5rem', borderRadius: '4px' }}></div>
              <div style={{ height: '0.7rem', width: '40%', backgroundColor: '#e2e2e2', borderRadius: '4px' }}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // State ketika tidak ada merchant ditemukan
  if ((!merchantList || merchantList.length === 0) && (!additionalMerchants || additionalMerchants.length === 0)) {
    return (
      <div className="text-center py-4">
        <p>Tidak ada data merchant tersedia (N/A)</p>
      </div>
    );
  }

  // Render daftar merchant utama dan tambahan
  return (
    <div>
      {/* Grid merchant utama (10 pertama) */}
      <div className="merchant-grid">
        {merchantList.map((merchant) => (
          <div
            key={merchant.id}
            className="merchant-card"
            onClick={() => handleMerchantClick(merchant.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="merchant-image">
              {merchant.imageUrl ? (
                <img
                  src={merchant.imageUrl}
                  alt={merchant.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    aspectRatio: '1/1'
                  }}
                />
              ) : (
                <i className='bx bx-store' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></i>
              )}
            </div>
            <div className="merchant-info">
              <h3 className="merchant-name">{merchant.name}</h3>
              <p className="merchant-category">{merchant.category}</p>
              <div className="merchant-rating">
                <i className='bx bx-food-menu' style={{ color: 'var(--primary-color)' }}></i>
                <span>{merchant.menuCount >= 12 ? `${merchant.menuCount}+` : merchant.menuCount} Menu</span>
              </div>
              <div style={{ flex: 1 }}></div> {/* Spacer untuk push content ke atas */}
            </div>
          </div>
        ))}
      </div>

      {/* Dropdown untuk merchant tambahan */}
      {additionalMerchants && additionalMerchants.length > 0 && (
        <div className={`merchant-dropdown ${showAllMerchants ? 'open' : ''}`}>
          <div className="merchant-dropdown-content">
            <div className="merchant-dropdown-header">
              Warung Lainnya
            </div>
            <div className="merchant-grid">
              {additionalMerchants.map((merchant) => (
                <div
                  key={merchant.id}
                  className="merchant-card"
                  onClick={() => handleMerchantClick(merchant.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="merchant-image">
                    {merchant.imageUrl ? (
                      <img
                        src={merchant.imageUrl}
                        alt={merchant.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          aspectRatio: '1/1'
                        }}
                      />
                    ) : (
                      <i className='bx bx-store' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></i>
                    )}
                  </div>
                  <div className="merchant-info">
                    <h3 className="merchant-name">{merchant.name}</h3>
                    <p className="merchant-category">{merchant.category}</p>
                    <div className="merchant-rating">
                      <i className='bx bx-food-menu' style={{ color: 'var(--primary-color)' }}></i>
                      <span>{merchant.menuCount >= 12 ? `${merchant.menuCount}+` : merchant.menuCount} Menu</span>
                    </div>
                    <div style={{ flex: 1 }}></div> {/* Spacer untuk push content ke atas */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
//========💧AkhirRegion_ListMerchant_Component💧=====

//========💨AwalRegion_ListBestSeller_Component💨=====
// Komponen untuk menampilkan daftar best seller items dengan navigation
const ListBestSeller = ({ bestSellerList, loading, user }) => {
  const navigate = useNavigate();

  // Handle click best seller item untuk navigasi ke gerai page
  const handleBestSellerClick = (item) => {
    // Cek apakah user sudah login
    if (!user) {
      // Redirect ke login page jika belum login
      navigate('/login');
      return;
    }

    // Navigate ke gerai page jika sudah login
    // Cari merchant_id dari item best seller
    if (item.merchant_id) {
      navigate(`/gerai/${item.merchant_id}`);
    } else {
      // Jika tidak ada merchant_id, tidak bisa navigate ke gerai spesifik
      console.warn('No merchant_id found for best seller item:', item);
    }
  };

  // Loading skeleton saat data best seller sedang dimuat
  if (loading) {
    return (
      <div className="merchant-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div key={item} className="merchant-card" style={{ opacity: 0.7 }}>
            <div className="merchant-image" style={{ backgroundColor: '#e2e2e2' }}>
              <i className='bx bx-loader-alt bx-spin' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></i>
            </div>
            <div className="merchant-info">
              <div style={{ height: '0.9rem', width: '80%', backgroundColor: '#e2e2e2', marginBottom: '0.5rem', borderRadius: '4px' }}></div>
              <div style={{ height: '0.7rem', width: '60%', backgroundColor: '#e2e2e2', marginBottom: '0.5rem', borderRadius: '4px' }}></div>
              <div style={{ height: '0.7rem', width: '40%', backgroundColor: '#e2e2e2', borderRadius: '4px' }}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // State ketika tidak ada best seller ditemukan
  if (!bestSellerList || bestSellerList.length === 0) {
    return (
      <div className="text-center py-4">
        <p>Tidak ada data best seller tersedia (N/A)</p>
      </div>
    );
  }

  // Render daftar best seller items
  return (
    <div className="merchant-grid">
      {bestSellerList.map((item) => (
        <div
          key={item.id}
          className="merchant-card"
          onClick={() => handleBestSellerClick(item)}
          style={{ cursor: 'pointer' }}
        >
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
          <div className="merchant-info">
            <h3 className="merchant-name">{item.name}</h3>
            <p className="merchant-category">{item.restaurant}</p>
            <p style={{
              color: 'var(--primary-color)',
              fontWeight: 'var(--font-weight-semibold)',
              marginTop: '0.25rem',
              fontSize: '0.85rem'
            }}>
              Rp. {item.price.toLocaleString('id-ID')}
            </p>
            {item.order_count > 0 && (
              <div style={{ fontSize: '0.7rem', color: 'var(--text-color-medium)', marginTop: '0.15rem' }}>
                <i className='bx bx-purchase-tag-alt' style={{ marginRight: '0.25rem' }}></i>
                <span>Terjual: {item.order_count}</span>
              </div>
            )}
            <div style={{ flex: 1 }}></div> {/* Spacer untuk push content ke atas */}
          </div>
        </div>
      ))}
    </div>
  );
};
//========💧AkhirRegion_ListBestSeller_Component💧=====

//========💨AwalRegion_KenapaPilihCanTake_Component💨=====
// Komponen untuk menampilkan alasan memilih CanTake dengan icon box
const KenapaPilihCanTake = ({ reasons }) => {
  // Map emoji icons ke box icons
  const getBoxIcon = (icon) => {
    switch(icon) {
      case '⚡': return <i className='bx bxs-bolt' style={{ fontSize: '1.5rem', color: 'white' }}></i>;
      case '🍽️': return <i className='bx bx-restaurant' style={{ fontSize: '1.5rem', color: 'white' }}></i>;
      case '💰': return <i className='bx bx-money' style={{ fontSize: '1.5rem', color: 'white' }}></i>;
      default: return <i className='bx bx-check' style={{ fontSize: '1.5rem', color: 'white' }}></i>;
    }
  };

  return (
    <div className="reasons-grid">
      {reasons.map((reason) => (
        <div key={reason.id} className="reason-card">
          <div className="reason-icon">{getBoxIcon(reason.icon)}</div>
          <div className="reason-content">
            <h3>{reason.title}</h3>
            <p>{reason.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
//========💧AkhirRegion_KenapaPilihCanTake_Component💧=====

//========💨AwalRegion_Helper_Functions💨=====
// Fungsi helper untuk order status dan cancel order logic

// Fungsi untuk cek apakah order bisa dibatalkan (dalam 2 menit dan belum diterima)
const canCancelOrder = (createdAt, statusName) => {
  const now = new Date();
  const orderTime = new Date(createdAt);
  const timeDiffMinutes = Math.floor((now - orderTime) / (1000 * 60));

  // Bisa cancel jika dalam 2 menit dan status masih Pending atau Paid
  return timeDiffMinutes <= 2 && (statusName === 'Pending' || statusName === 'Paid');
};

// Fungsi untuk mendapatkan info status order dengan warna dan icon
const getOrderStatusInfo = (statusName, acceptedAt, completedAt) => {
  const now = new Date();
  const acceptTime = acceptedAt ? new Date(acceptedAt) : null;
  const completeTime = completedAt ? new Date(completedAt) : null;

  switch (statusName) {
    case 'Pending':
      return {
        text: 'Menunggu Konfirmasi',
        color: '#ff8c00',
        icon: 'bx-time-five',
        description: 'Pesanan sedang menunggu konfirmasi dari merchant'
      };
    case 'Paid':
      return {
        text: 'Sedang Diproses',
        color: '#ff8c00',
        icon: 'bx-time-five',
        description: 'Pesanan sedang menunggu konfirmasi dari merchant'
      };
    case 'Accepted':
      const timeSinceAccepted = acceptTime ? Math.floor((now - acceptTime) / (1000 * 60)) : 0;
      return {
        text: 'Sedang Dibuat',
        color: '#4CAF50',
        icon: 'bx-restaurant',
        description: `Pesanan sedang dibuat (${timeSinceAccepted} menit yang lalu)`
      };
    case 'Completed':
      const timeSinceCompleted = completeTime ? Math.floor((now - completeTime) / (1000 * 60)) : 0;
      return {
        text: 'Siap Diambil',
        color: '#28a745',
        icon: 'bx-check-circle',
        description: `Pesanan sudah siap diambil (${timeSinceCompleted} menit yang lalu)`
      };
    default:
      return {
        text: statusName,
        color: '#666',
        icon: 'bx-info-circle',
        description: 'Status pesanan'
      };
  }
};
//========💧AkhirRegion_Helper_Functions💧=====

//========💨AwalRegion_CancelOrderModal_Component💨=====
// Modal untuk cancel order dengan pilihan alasan pembatalan
const CancelOrderModal = ({ isOpen, onClose, onConfirm, loading }) => {
  const [selectedReason, setSelectedReason] = useState('');

  // Daftar alasan pembatalan order
  const cancelReasons = [
    { id: 5, reason: 'Berubah pikiran' },
    { id: 6, reason: 'Salah pesan' },
    { id: 7, reason: 'Terlalu lama menunggu' },
    { id: 8, reason: 'Alasan lain' }
  ];

  // Handle konfirmasi pembatalan
  const handleConfirm = () => {
    if (selectedReason) {
      onConfirm(parseInt(selectedReason));
      setSelectedReason('');
    }
  };

  // Handle tutup modal
  const handleClose = () => {
    setSelectedReason('');
    onClose();
  };

  // Jangan render jika modal tidak terbuka
  if (!isOpen) return null;

  // Render modal dengan overlay dan form
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      {/* Modal container */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--border-radius-lg)',
        padding: '1.5rem',
        width: '90%',
        maxWidth: '400px',
        border: '1px solid var(--border-color-medium)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Modal header */}
        <h3 style={{
          margin: '0 0 1rem 0',
          color: 'var(--text-color-dark)',
          fontSize: '1.1rem',
          fontWeight: 'var(--font-weight-semibold)'
        }}>
          Batalkan Pesanan
        </h3>

        {/* Modal description */}
        <p style={{
          margin: '0 0 1rem 0',
          color: 'var(--text-color-medium)',
          fontSize: '0.85rem'
        }}>
          Pilih alasan pembatalan pesanan:
        </p>

        {/* Radio buttons untuk alasan */}
        <div style={{ marginBottom: '1.5rem' }}>
          {cancelReasons.map((reason) => (
            <label key={reason.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.75rem',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: 'var(--border-radius-sm)',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-accent)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <input
                type="radio"
                name="cancelReason"
                value={reason.id}
                checked={selectedReason === reason.id.toString()}
                onChange={(e) => setSelectedReason(e.target.value)}
                style={{
                  accentColor: 'var(--primary-color)'
                }}
              />
              <span style={{
                fontSize: '0.85rem',
                color: 'var(--text-color-medium)'
              }}>
                {reason.reason}
              </span>
            </label>
          ))}
        </div>

        {/* Modal buttons */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={handleClose}
            disabled={loading}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--border-color-medium)',
              background: 'var(--bg-accent)',
              color: 'var(--text-color-medium)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedReason || loading}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--border-radius-md)',
              border: 'none',
              background: selectedReason ? '#dc3545' : '#666',
              color: 'white',
              fontSize: '0.85rem',
              cursor: selectedReason ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? (
              <>
                <i className='bx bx-loader-alt bx-spin' style={{ marginRight: '0.5rem' }}></i>
                Membatalkan...
              </>
            ) : (
              'Batalkan Pesanan'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
//========💧AkhirRegion_CancelOrderModal_Component💧=====

//========💨AwalRegion_CheckoutMenu_Component💨=====
// Komponen sidebar checkout menu dengan cart dan orders management
const CheckoutMenu = ({ cartData, userOrders, refreshOrders }) => {
  const { cartItems, updateQuantity, total, currentMerchantName } = cartData;
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [notification, setNotification] = useState('');

  // Cek apakah user memiliki pesanan aktif dan item di cart
  const hasActiveOrders = userOrders && userOrders.length > 0;
  const hasCartItems = cartItems.length > 0;

  // Fungsi untuk menampilkan notifikasi
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  // Handle cancel order - buka modal
  const handleCancelOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setShowCancelModal(true);
  };

  // Konfirmasi cancel order dengan API call
  const confirmCancelOrder = async (reasonId) => {
    if (!selectedOrderId) return;

    setCancelLoading(true);
    try {
      const response = await cancelOrder(selectedOrderId, reasonId);

      if (response.status === 'success') {
        showNotification('Pesanan berhasil dibatalkan');
        setShowCancelModal(false);
        setSelectedOrderId(null);

        // Refresh orders untuk update UI secara langsung
        if (refreshOrders) {
          refreshOrders();
        }
      } else {
        showNotification(response.message || 'Gagal membatalkan pesanan');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      showNotification('Terjadi kesalahan saat membatalkan pesanan');
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <div className="checkout-menu">
      <h2>Pesanan Kamu</h2>

      {/* Show active orders if any */}
      {hasActiveOrders ? (
        <>
          {userOrders.map((order) => {
            const statusInfo = getOrderStatusInfo(order.status_name, order.accepted_at, order.completed_at);

            return (
              <div key={order.id} style={{ marginBottom: '1rem' }}>
                {/* Merchant Name */}
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
                  <span style={{ position: 'relative', zIndex: 1 }}>{order.merchant_name}</span>
                </div>

                {/* Order Status */}
                <div style={{
                  background: 'var(--bg-dark)',
                  border: '1px solid var(--border-color-medium)',
                  borderRadius: 'var(--border-radius-md)',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: statusInfo.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <i className={`bx ${statusInfo.icon}`} style={{ fontSize: '1.2rem' }}></i>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontWeight: 'var(--font-weight-semibold)',
                        color: statusInfo.color,
                        fontSize: '0.9rem',
                        marginBottom: '0.25rem'
                      }}>
                        {statusInfo.text}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-color-light)'
                      }}>
                        {statusInfo.description}
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div style={{
                    borderTop: '1px solid var(--border-color-soft)',
                    paddingTop: '0.75rem'
                  }}>
                    {order.items && order.items.map((item, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: index < order.items.length - 1 ? '0.5rem' : '0'
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontSize: '0.8rem',
                            fontWeight: 'var(--font-weight-medium)',
                            color: 'var(--text-color)',
                            marginBottom: '0.1rem'
                          }}>
                            {item.menu_item_name}
                          </div>
                          <div style={{
                            fontSize: '0.7rem',
                            color: 'var(--text-color-light)'
                          }}>
                            {item.quantity}x Rp. {parseFloat(item.price_at_order).toLocaleString('id-ID')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div style={{
                    borderTop: '1px solid var(--border-color-soft)',
                    paddingTop: '0.75rem',
                    marginTop: '0.75rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '0.85rem',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--text-color)'
                    }}>
                      Total
                    </span>
                    <span style={{
                      fontSize: '0.85rem',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--primary-color)'
                    }}>
                      Rp. {parseFloat(order.total_amount).toLocaleString('id-ID')}
                    </span>
                  </div>

                  {/* Cancel Button - Show only if order can be cancelled */}
                  {canCancelOrder(order.created_at, order.status_name) && (
                    <div style={{
                      borderTop: '1px solid var(--border-color-soft)',
                      paddingTop: '0.75rem',
                      marginTop: '0.75rem'
                    }}>
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          borderRadius: 'var(--border-radius-md)',
                          border: '1px solid #dc3545',
                          background: 'transparent',
                          color: '#dc3545',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontWeight: 'var(--font-weight-medium)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#dc3545';
                          e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.color = '#dc3545';
                        }}
                      >
                        <i className='bx bx-x' style={{ marginRight: '0.5rem' }}></i>
                        Batalkan Pesanan
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}


        </>
      ) : hasCartItems ? (
        <>
          {/* Show cart items if no active orders */}
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

          <div className="checkout-items-container">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <div className="checkout-item-info">
                  <h3>{item.name}</h3>
                  <p className="checkout-item-price">
                    Rp. {item.price.toLocaleString('id-ID')}
                  </p>
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

          <div className="checkout-total">
            <span>Total</span>
            <span>Rp. {total.toLocaleString('id-ID')}</span>
          </div>
          <button className="checkout-button" onClick={() => navigate('/checkout')}>
            <i className='bx bx-shopping-bag'></i>
            Checkout
          </button>
        </>
      ) : (
        /* Empty state when no orders and no cart items */
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
      )}

      {/* Cancel Order Modal */}
      <CancelOrderModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={confirmCancelOrder}
        loading={cancelLoading}
      />

      {/* Notification */}
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
          fontWeight: 'var(--font-weight-medium)',
          fontSize: '0.85rem'
        }}>
          {notification}
        </div>
      )}
    </div>
  );
};
//========💧AkhirRegion_CheckoutMenu_Component💧=====

//========💨AwalRegion_Footer_Component💨=====
// Komponen footer dengan navigasi dan links ke halaman lain
const Footer = ({ scrollToBestSeller, toggleShowAllMerchants }) => {
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

export default Dashboard;
