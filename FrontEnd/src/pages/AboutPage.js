//========💨AwalRegion_Import_Dependencies💨=====
// Import React dan dependencies untuk halaman tentang CanTake
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//========💧AkhirRegion_Import_Dependencies💧=====

//========💨AwalRegion_Navbar_Component💨=====
// Komponen navbar dengan navigasi dan user profile (sama seperti halaman lain)
const Navbar = ({ user, logout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleBestSellerClick = (e) => {
    e.preventDefault();
    navigate('/dashboard', { state: { scrollTo: 'bestseller' } });
  };

  const handleMerchantClick = (e) => {
    e.preventDefault();
    navigate('/dashboard', { state: { scrollTo: 'merchant' } });
  };

  const handleBerandaClick = () => {
    navigate('/dashboard');
  };

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  const onLogout = () => {
    if (logout) {
      logout();
      navigate('/dashboard');
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
// Komponen footer dengan navigasi dan links (sama seperti halaman lain)
const Footer = () => {
  const navigate = useNavigate();

  const scrollToBestSeller = () => {
    navigate('/dashboard', { state: { scrollTo: 'bestseller' } });
  };

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

//========💨AwalRegion_AboutPage_Component💨=====
// Komponen halaman tentang CanTake dengan info company dan team
const AboutPage = ({ user, logout }) => {
  // Data team members dengan info lengkap
  const teamMembers = [
    {
      id: 1,
      name: 'Khalfani Abrar Fathir',
      role: 'Founder & Lead Developer',
      image: '/assets/MainAssets/team-1.jpg',
      fallback: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjYwIiBmaWxsPSIjRkY4QzAwIi8+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNDUiIHI9IjE4IiBmaWxsPSIjMUExQTFBIi8+CjxwYXRoIGQ9Ik0zMCA5NUMzMCA4Mi4yIDQ2LjIgNzIgNjAgNzJTOTAgODIuMiA5MCA5NUgzMFoiIGZpbGw9IiMxQTFBMUEiLz4KPC9zdmc+'
    },
    {
      id: 2,
      name: 'Ananda Maria',
      role: 'UX/UI Designer',
      image: '/assets/MainAssets/team-2.jpg',
      fallback: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjYwIiBmaWxsPSIjRkY4QzAwIi8+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNDUiIHI9IjE4IiBmaWxsPSIjMUExQTFBIi8+CjxwYXRoIGQ9Ik0zMCA5NUMzMCA4Mi4yIDQ2LjIgNzIgNjAgNzJTOTAgODIuMiA5MCA5NUgzMFoiIGZpbGw9IiMxQTFBMUEiLz4KPC9zdmc+'
    },
    {
      id: 3,
      name: 'Thoriq Suriansyah',
      role: 'Assistant Developer',
      image: '/assets/MainAssets/team-3.jpg',
      fallback: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjYwIiBmaWxsPSIjRkY4QzAwIi8+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNDUiIHI9IjE4IiBmaWxsPSIjMUExQTFBIi8+CjxwYXRoIGQ9Ik0zMCA5NUMzMCA4Mi4yIDQ2LjIgNzIgNjAgNzJTOTAgODIuMiA5MCA5NUgzMFoiIGZpbGw9IiMxQTFBMUEiLz4KPC9zdmc+'
    },
    {
      id: 4,
      name: 'Nurul Wahyuni',
      role: 'Management',
      image: '/assets/MainAssets/team-4.jpg',
      fallback: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjYwIiBmaWxsPSIjRkY4QzAwIi8+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNDUiIHI9IjE4IiBmaWxsPSIjMUExQTFBIi8+CjxwYXRoIGQ9Ik0zMCA5NUMzMCA4Mi4yIDQ2LjIgNzIgNjAgNzJTOTAgODIuMiA5MCA5NUgzMFoiIGZpbGw9IiMxQTFBMUEiLz4KPC9zdmc+'
    }
  ];

  return (
    <div className="App">
      <Navbar user={user} logout={logout} />

      <div className="about-page">
        <div className="about-container">
          {/* Hero Section */}
          <div className="about-hero">
            <div className="hero-content">
              <h1>Tentang CanTake</h1>
              <p>Solusi inovatif untuk layanan pemesanan makanan kampus yang cepat, andal, dan ramah pengguna.</p>
            </div>
          </div>

          {/* Our Story Section */}
          <section className="story-section">
            <div className="section-header">
              <h2>Our Story</h2>
            </div>
            <div className="story-content">
              <p>
                Didirikan pada tahun 2025 oleh Eight Group, CanTake hadir sebagai solusi inovatif untuk layanan pengantaran makanan yang cepat, andal, dan ramah pengguna. Berawal dari keresahan akan lamanya pengiriman dan keterbatasan pilihan makanan, kami membangun platform yang menghubungkan pelanggan dengan restoran favorit mereka secara instan.
              </p>
              <p>
                Dengan semangat inovasi dan teknologi, CanTake kini berkembang pesat dan menjadi pilihan utama masyarakat urban untuk menikmati makanan dari mana saja, kapan saja.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="mission-section">
            <div className="section-header">
              <h2>Our Mission</h2>
            </div>
            <div className="mission-content">
              <div className="mission-card">
                <div className="mission-icon">
                  <i className='bx bx-target-lock'></i>
                </div>
                <p>
                  Misi kami adalah untuk memudahkan hidup Anda dengan menyediakan layanan pengantaran makanan yang cepat, nyaman, dan dapat diandalkan melalui teknologi yang terus berkembang.
                </p>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="team-section">
            <div className="section-header">
              <h2>Our Team</h2>
              <p>Tim profesional yang berdedikasi untuk memberikan layanan terbaik</p>
            </div>
            <div className="team-grid">
              {teamMembers.map(member => (
                <div key={member.id} className="team-card">
                  <div className="team-image">
                    <img
                      src={member.image}
                      alt={member.name}
                      onError={(e) => {
                        e.target.src = member.fallback;
                      }}
                    />
                  </div>
                  <div className="team-info">
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Values Section */}
          <section className="values-section">
            <div className="section-header">
              <h2>Our Values</h2>
            </div>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">
                  <i className='bx bx-rocket'></i>
                </div>
                <h3>Inovasi</h3>
                <p>Selalu menghadirkan solusi teknologi terdepan untuk kemudahan pengguna</p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <i className='bx bx-heart'></i>
                </div>
                <h3>Kepercayaan</h3>
                <p>Membangun hubungan yang kuat dengan pengguna dan mitra melalui layanan yang dapat diandalkan</p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <i className='bx bx-star'></i>
                </div>
                <h3>Kualitas</h3>
                <p>Berkomitmen memberikan pengalaman terbaik dalam setiap aspek layanan</p>
              </div>
            </div>
          </section>

          <div className="about-footer">
            <p>© 2025 Eight Group. All Rights Reserved.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
//========💧AkhirRegion_AboutPage_Component💧=====

export default AboutPage;
