//========💨AwalRegion_Import_Dependencies💨=====
// Import React dan dependencies untuk halaman signup
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
//========💧AkhirRegion_Import_Dependencies💧=====

//========💨AwalRegion_Signup_Component💨=====
// Komponen halaman signup untuk registrasi user baru
const Signup = () => {
  //========💨AwalRegion_State_Management💨=====
  // State untuk form data signup
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    roleId: 1 // Default ke buyer role
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  // Handle perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle submit form signup dengan validasi dan API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validasi form - cek password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // API call untuk registrasi user baru
      const response = await fetch('http://localhost/CanTake/BackEnd/api/user.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'register',
          username: formData.username,
          email: formData.email,
          password: formData.password,
          first_name: formData.firstName,
          last_name: formData.lastName,
          role_id: formData.roleId
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Redirect ke login page setelah berhasil registrasi
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };
  //========💧AkhirRegion_Event_Handlers💧=====

  //========💨AwalRegion_Render_JSX💨=====
  // Render halaman signup dengan form registrasi dan banner
  return (
    <div className="w-100">
      <div className="page-layout" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div className="auth-container">
          {/* Container form signup */}
          <div className="login-container">
            {/* Logo CanTake */}
            <div className="login-logo-small" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
              <i className='bx bxs-dish'></i>
              <span>CanTake</span>
            </div>

            {/* Header signup */}
            <div className="login-header">
              <h1 className="login-title">Sign Up</h1>
            </div>

            {/* Subtitle welcome message */}
            <p className="login-subtitle">
              Join CanTake and start ordering.
            </p>

            {/* Error message display */}
            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            {/* Form signup */}
            <form onSubmit={handleSubmit} className="login-form">
              {/* Input username */}
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter username"
                />
              </div>

              {/* Input email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter your email"
                />
              </div>

              {/* Row untuk first name dan last name */}
              <div className="form-row">
                <div className="form-group form-group-half">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter first name"
                  />
                </div>

                <div className="form-group form-group-half">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              {/* Input password dengan toggle show/hide */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Enter password"
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
              </div>

              {/* Input confirm password dengan toggle show/hide */}
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Confirm password"
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

              {/* Submit button */}
              <button
                type="submit"
                className="login-submit-button"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            {/* Footer dengan link signin dan back to home */}
            <div className="login-footer">
              <p>
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
              <p className="back-to-home">
                <Link to="/dashboard"><i className='bx bx-arrow-back'></i> Back to Home</Link>
              </p>
            </div>
          </div>

          {/* Banner image */}
          <div className="auth-image">
            <img src={require('../assets/banner_login.png')} alt="Signup Banner" className="auth-banner-image" />
          </div>
        </div>
      </div>
    </div>
  );
  //========💧AkhirRegion_Render_JSX💧=====
};
//========💧AkhirRegion_Signup_Component💧=====

export default Signup;
