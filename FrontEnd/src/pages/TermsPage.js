//========💨AwalRegion_Import_Dependencies💨=====
// Import React dan dependencies untuk halaman syarat dan ketentuan
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

//========💨AwalRegion_TermsPage_Component💨=====
// Komponen halaman syarat dan ketentuan dengan konten lengkap
const TermsPage = ({ user, logout }) => {
  return (
    <div className="App">
      <Navbar user={user} logout={logout} />

      <div className="terms-page">
        <div className="terms-container">
          <div className="terms-header">
            <h1>Syarat dan Ketentuan</h1>
            <p>Terakhir diperbarui: Januari 2025</p>
          </div>

          <div className="terms-content">
            <section className="terms-section">
              <h2>1. Definisi</h2>
              <p>Dalam Syarat dan Ketentuan ini:</p>
              <ul>
                <li><strong>"Aplikasi"</strong> berarti aplikasi seluler Cantake yang disediakan oleh Eight Group.</li>
                <li><strong>"Pengguna"</strong> berarti individu yang menggunakan Aplikasi untuk memesan layanan pengantaran makanan.</li>
                <li><strong>"Mitra"</strong> berarti restoran atau penyedia makanan yang bekerja sama dengan Cantake.</li>
              </ul>
            </section>

            <section className="terms-section">
              <h2>2. Penggunaan Aplikasi</h2>
              <p>Dengan menggunakan Aplikasi Cantake, Pengguna setuju untuk mematuhi Syarat dan Ketentuan ini serta Kebijakan Privasi yang berlaku.</p>
            </section>

            <section className="terms-section">
              <h2>3. Layanan Cantake</h2>
              <p>Cantake menyediakan platform untuk memfasilitasi pemesanan dan pengantaran makanan antara Pengguna dan Mitra. Cantake bukan penyedia makanan dan tidak bertanggung jawab atas kualitas makanan yang disediakan oleh Mitra.</p>
            </section>

            <section className="terms-section">
              <h2>4. Kewajiban Pengguna</h2>
              <ul>
                <li>Memberikan informasi yang akurat dan lengkap saat mendaftar dan menggunakan Aplikasi.</li>
                <li>Menjaga kerahasiaan akun dan kata sandi.</li>
                <li>Tidak menggunakan Aplikasi untuk tujuan yang melanggar hukum atau merugikan pihak lain.</li>
              </ul>
            </section>

            <section className="terms-section">
              <h2>5. Kewajiban Mitra</h2>
              <ul>
                <li>Menyediakan informasi menu, harga, dan ketersediaan makanan yang akurat.</li>
                <li>Menjaga kualitas dan keamanan makanan sesuai dengan standar yang berlaku.</li>
                <li>Memproses pesanan dengan tepat waktu dan profesional.</li>
              </ul>
            </section>

            <section className="terms-section">
              <h2>6. Pembayaran</h2>
              <p>Pembayaran atas pesanan dilakukan melalui metode pembayaran yang tersedia di Aplikasi. Cantake berhak menetapkan biaya layanan atas setiap transaksi yang dilakukan melalui Aplikasi.</p>
            </section>

            <section className="terms-section">
              <h2>7. Pembatalan dan Pengembalian Dana</h2>
              <p>Pembatalan pesanan dan pengembalian dana tunduk pada kebijakan yang ditetapkan oleh Cantake dan Mitra. Pengguna disarankan untuk membaca kebijakan tersebut sebelum melakukan pemesanan.</p>
            </section>

            <section className="terms-section">
              <h2>8. Batasan Tanggung Jawab</h2>
              <p>Cantake tidak bertanggung jawab atas kerugian atau kerusakan yang timbul dari:</p>
              <ul>
                <li>Kesalahan atau kelalaian Mitra dalam penyediaan makanan.</li>
                <li>Gangguan teknis pada Aplikasi yang berada di luar kendali Cantake.</li>
                <li>Penggunaan Aplikasi yang tidak sesuai dengan Syarat dan Ketentuan ini.</li>
              </ul>
            </section>

            <section className="terms-section">
              <h2>9. Perubahan Syarat dan Ketentuan</h2>
              <p>Cantake berhak untuk mengubah Syarat dan Ketentuan ini sewaktu-waktu. Perubahan akan diberitahukan melalui Aplikasi atau email. Penggunaan Aplikasi setelah perubahan dianggap sebagai persetujuan terhadap Syarat dan Ketentuan yang baru.</p>
            </section>

            <section className="terms-section">
              <h2>10. Hukum yang Berlaku</h2>
              <p>Syarat dan Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum yang berlaku di Republik Indonesia.</p>
            </section>

            <section className="terms-section">
              <h2>11. Kontak Kami</h2>
              <p>Jika Anda memiliki pertanyaan atau keluhan terkait Syarat dan Ketentuan ini, silakan hubungi kami di:</p>
              <div className="contact-info">
                <p><strong>Email:</strong> support@cantake.app</p>
                <p><strong>Telepon:</strong> +62-812-3456-7890</p>
              </div>
            </section>

            <div className="terms-footer">
              <p>© 2025 Eight Group. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
//========💧AkhirRegion_TermsPage_Component💧=====

export default TermsPage;
