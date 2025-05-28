//========💨AwalRegion_Import_Dependencies💨=====
// Import React dan dependencies untuk halaman forgot password
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
//========💧AkhirRegion_Import_Dependencies💧=====

//========💨AwalRegion_ForgotPassword_Component💨=====
// Komponen halaman forgot password untuk reset password user
const ForgotPassword = () => {
  //========💨AwalRegion_State_Management💨=====
  // State untuk form forgot password
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  //========💧AkhirRegion_State_Management💧=====

  //========💨AwalRegion_Effect_Hooks💨=====
  // Scroll ke atas saat komponen dimount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //========💧AkhirRegion_Effect_Hooks💧=====

  //========💨AwalRegion_Event_Handlers💨=====
  // Handle click logo untuk navigate ke dashboard
  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  // Simple captcha text - dalam aplikasi nyata, ini akan di-generate server-side
  const captchaText = "ini adalah benar akun saya";

  // Handle submit form forgot password dengan validasi dan API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validasi input form
    if (!email || !newPassword || !confirmPassword || !captchaInput) {
      setError('Semua field harus diisi');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Password baru dan konfirmasi password tidak cocok');
      return;
    }

    if (captchaInput.toLowerCase() !== captchaText.toLowerCase()) {
      setError('Captcha tidak cocok. Silakan ketik ulang dengan benar');
      return;
    }

    setLoading(true);

    try {
      // API call untuk reset password
      const response = await fetch('http://localhost/CanTake/BackEnd/api/reset_password.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          new_password: newPassword
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setSuccess('Password berhasil diubah! Silakan login dengan password baru Anda.');

        // Redirect ke login page setelah 3 detik
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(data.message || 'Gagal mengubah password. Silakan coba lagi.');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi nanti.');
      console.error('Password reset error:', err);
    } finally {
      setLoading(false);
    }
  };
  //========💧AkhirRegion_Event_Handlers💧=====

  //========💨AwalRegion_Render_JSX💨=====
  // Render halaman forgot password dengan form reset dan banner
  return (
    <div className="w-100">
      <div className="page-layout" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div className="auth-container">
          {/* Container form forgot password */}
          <div className="login-container">
            {/* Logo CanTake */}
            <div className="login-logo-small" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
              <i className='bx bxs-dish'></i>
              <span>CanTake</span>
            </div>

            {/* Header dan subtitle */}
            <h1 className="login-title">Lupa Password</h1>
            <p className="login-subtitle">Masukkan email dan password baru Anda</p>

            {/* Error message display */}
            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            {/* Success message display */}
            {success && (
              <div style={{
                backgroundColor: 'rgba(0, 128, 0, 0.1)',
                borderLeft: '3px solid #00cc00',
                color: '#00cc00',
                padding: '0.75rem',
                marginBottom: '1rem',
                borderRadius: 'var(--border-radius-sm)',
                fontSize: '0.85rem'
              }}>
                {success}
              </div>
            )}

            {/* Form forgot password */}
            <form onSubmit={handleSubmit} className="login-form">
              {/* Input email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                  placeholder="Masukkan email Anda"
                />
              </div>

              {/* Input password baru dengan toggle show/hide */}
              <div className="form-group">
                <label htmlFor="newPassword">Password Baru</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="form-input"
                    placeholder="Masukkan password baru"
                  />
                  <i
                    className={`bx ${showNewPassword ? 'bx-hide' : 'bx-show'}`}
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      color: 'var(--text-color-light)'
                    }}
                  ></i>
                </div>
              </div>

              {/* Input konfirmasi password dengan toggle show/hide */}
              <div className="form-group">
                <label htmlFor="confirmPassword">Konfirmasi Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="form-input"
                    placeholder="Konfirmasi password baru"
                  />
                  <i
                    className={`bx ${showConfirmPassword ? 'bx-hide' : 'bx-show'}`}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      color: 'var(--text-color-light)'
                    }}
                  ></i>
                </div>
              </div>

              {/* Input captcha untuk konfirmasi */}
              <div className="form-group">
                <label htmlFor="captcha">Ketik "{captchaText}" untuk konfirmasi</label>
                <input
                  type="text"
                  id="captcha"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  required
                  className="form-input"
                  placeholder="Ketik teks di atas"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="login-submit-button"
                disabled={loading}
              >
                {loading ? 'Memproses...' : 'Reset Password'}
              </button>
            </form>

            {/* Footer dengan link login dan back to home */}
            <div className="login-footer">
              <p>
                Ingat password Anda? <Link to="/login">Login</Link>
              </p>
              <p className="back-to-home">
                <Link to="/dashboard"><i className='bx bx-arrow-back'></i> Kembali ke Beranda</Link>
              </p>
            </div>
          </div>

          {/* Banner image */}
          <div className="auth-image">
            <img src={require('../assets/banner_login.png')} alt="Login Banner" className="auth-banner-image" />
          </div>
        </div>
      </div>
    </div>
  );
  //========💧AkhirRegion_Render_JSX💧=====
};
//========💧AkhirRegion_ForgotPassword_Component💧=====

export default ForgotPassword;
