//========💨AwalRegion_Import_Dependencies💨=====
// Import React dan dependencies untuk halaman login
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
//========💧AkhirRegion_Import_Dependencies💧=====

//========💨AwalRegion_Login_Component💨=====
// Komponen halaman login untuk user dan merchant
const Login = ({ onLoginSuccess }) => {
  //========💨AwalRegion_State_Management💨=====
  // State untuk form login dan UI
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMerchant, setIsMerchant] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  // Handle submit form login dengan API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // API call untuk login user atau merchant
      const response = await fetch('http://localhost/CanTake/BackEnd/api/user.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'login',
          email,
          password,
          is_merchant: isMerchant
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Simpan data user di localStorage
        localStorage.setItem('user', JSON.stringify(data.data));

        // Panggil callback onLoginSuccess dengan data user
        if (onLoginSuccess) {
          onLoginSuccess(data.data);
        }

        // Redirect berdasarkan role user
        if (isMerchant && data.data.role_name === 'merchant') {
          navigate('/merchant-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };
  //========💧AkhirRegion_Event_Handlers💧=====



  //========💨AwalRegion_Render_JSX💨=====
  // Render halaman login dengan form dan banner
  return (
    <div className="w-100">
      <div className="page-layout" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div className="auth-container">
          {/* Container form login */}
          <div className="login-container">
            {/* Logo CanTake */}
            <div className="login-logo-small" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
              <i className='bx bxs-dish'></i>
              <span>CanTake</span>
            </div>

            {/* Header dengan toggle user/merchant */}
            <div className="login-header">
              <h1 className="login-title">Log in</h1>
              <div className="login-toggle">
                <button
                  className={`toggle-button ${!isMerchant ? 'active' : ''}`}
                  onClick={() => setIsMerchant(false)}
                >
                  User
                </button>
                <button
                  className={`toggle-button ${isMerchant ? 'active' : ''}`}
                  onClick={() => setIsMerchant(true)}
                >
                  Merchant
                </button>
              </div>
            </div>

            {/* Subtitle welcome message */}
            <p className="login-subtitle">
              {isMerchant
                ? 'Welcome back, merchant.'
                : 'Welcome back. '}
            </p>

            {/* Error message display */}
            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            {/* Form login */}
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
                  placeholder="Enter your email"
                />
              </div>

              {/* Input password dengan toggle show/hide */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input"
                    placeholder="Enter your password"
                  />
                  <i
                    className={`bx ${showPassword ? 'bx-hide' : 'bx-show'}`}
                    onClick={() => setShowPassword(!showPassword)}
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
                <div className="forgot-password">
                  <Link to="/forgot-password">Lupa Password?</Link>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="login-submit-button"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Footer dengan link signup dan back to home */}
            <div className="login-footer">
              {!isMerchant ? (
                <p>
                  Don't you have account? <Link to="/signup">Sign up</Link>
                </p>
              ) : (
                <p>
                  <small>Merchants can only login with credentials provided by admin</small>
                </p>
              )}
              <p className="back-to-home">
                <Link to="/dashboard"><i className='bx bx-arrow-back'></i> Back to Home</Link>
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
//========💧AkhirRegion_Login_Component💧=====

export default Login;
