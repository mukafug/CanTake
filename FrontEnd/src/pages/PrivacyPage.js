//========💨AwalRegion_Import_Dependencies💨=====
// Import React dan dependencies untuk halaman kebijakan privasi
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

//========💨AwalRegion_PrivacyPage_Component💨=====
// Komponen halaman kebijakan privasi dengan konten lengkap
const PrivacyPage = ({ user, logout }) => {
  return (
    <div className="App">
      <Navbar user={user} logout={logout} />

      <div className="privacy-page">
        <div className="privacy-container">
          <div className="privacy-header">
            <h1>Kebijakan Privasi</h1>
            <p>Terakhir diperbarui: Januari 2025</p>
          </div>

          <div className="privacy-content">
            <section className="privacy-section">
              <h2>1. Pengumpulan Data Pribadi</h2>
              <p>Kami mengumpulkan data pribadi saat Anda menggunakan aplikasi Cantake, termasuk namun tidak terbatas pada:</p>
              <ul>
                <li><strong>Data identitas:</strong> nama, alamat email, nomor telepon.</li>
                <li><strong>Data lokasi:</strong> untuk keperluan pengantaran makanan.</li>
                <li><strong>Data transaksi:</strong> riwayat pesanan, metode pembayaran.</li>
                <li><strong>Data perangkat:</strong> informasi perangkat yang digunakan untuk mengakses aplikasi.</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>2. Penggunaan Data Pribadi</h2>
              <p>Data pribadi yang kami kumpulkan digunakan untuk:</p>
              <ul>
                <li>Menyediakan dan mengelola layanan pengantaran makanan.</li>
                <li>Memproses pembayaran dan transaksi.</li>
                <li>Memberikan dukungan pelanggan dan menanggapi pertanyaan atau keluhan.</li>
                <li>Mengirimkan informasi terkait layanan, promosi, atau pembaruan aplikasi.</li>
                <li>Meningkatkan kualitas layanan dan pengalaman pengguna.</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>3. Pembagian Data Pribadi</h2>
              <p>Kami dapat membagikan data pribadi Anda kepada pihak ketiga dalam keadaan berikut:</p>
              <ul>
                <li>Kepada mitra pengantaran untuk keperluan pengiriman pesanan.</li>
                <li>Kepada penyedia layanan pembayaran untuk memproses transaksi.</li>
                <li>Kepada otoritas hukum jika diwajibkan oleh peraturan perundang-undangan yang berlaku.</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>4. Keamanan Data</h2>
              <p>Kami berkomitmen untuk melindungi data pribadi Anda dengan menerapkan langkah-langkah keamanan yang sesuai, termasuk enkripsi dan kontrol akses. Namun, perlu diketahui bahwa tidak ada sistem yang sepenuhnya aman, dan kami tidak dapat menjamin keamanan absolut dari data pribadi Anda.</p>
            </section>

            <section className="privacy-section">
              <h2>5. Retensi Data</h2>
              <p>Data pribadi Anda akan disimpan selama diperlukan untuk memenuhi tujuan pengumpulan data tersebut atau selama diwajibkan oleh hukum yang berlaku. Setelah itu, data akan dihapus atau dianonimkan.</p>
            </section>

            <section className="privacy-section">
              <h2>6. Hak Anda</h2>
              <p>Anda memiliki hak untuk:</p>
              <ul>
                <li>Meminta akses ke data pribadi Anda yang kami simpan.</li>
                <li>Meminta perbaikan atas data pribadi yang tidak akurat atau tidak lengkap.</li>
                <li>Meminta penghapusan data pribadi Anda, dengan ketentuan tertentu.</li>
                <li>Menarik persetujuan Anda atas pemrosesan data pribadi, jika pemrosesan tersebut berdasarkan persetujuan Anda.</li>
              </ul>
              <p>Untuk melaksanakan hak-hak tersebut, silakan hubungi kami melalui informasi kontak yang tersedia di bawah.</p>
            </section>

            <section className="privacy-section">
              <h2>7. Perubahan Kebijakan Privasi</h2>
              <p>Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan diberitahukan melalui aplikasi atau email. Kami menyarankan Anda untuk meninjau Kebijakan Privasi ini secara berkala.</p>
            </section>

            <section className="privacy-section">
              <h2>8. Kontak Kami</h2>
              <p>Jika Anda memiliki pertanyaan atau permintaan terkait Kebijakan Privasi ini, silakan hubungi kami di:</p>
              <div className="contact-info">
                <p><strong>Email:</strong> support@cantake.app</p>
                <p><strong>Telepon:</strong> +62-812-3456-7890</p>
              </div>
            </section>

            <div className="privacy-footer">
              <p>© 2025 Eight Group. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
//========💧AkhirRegion_PrivacyPage_Component💧=====

export default PrivacyPage;
