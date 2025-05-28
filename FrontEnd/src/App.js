//========💨AwalRegion_Import_Dependencies💨=====
// Import React dan dependencies utama
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import semua halaman/pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import GeraiPage from './pages/GeraiPage';
import CheckoutPage from './pages/CheckoutPage';
import MerchantDashboard from './pages/MerchantDashboard';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import AboutPage from './pages/AboutPage';

// Import styles dan API functions
import './App.css';
import { getTopMerchants, getTopSellingMenuItems, getOrdersByUserId } from './services/api';
//========💧AkhirRegion_Import_Dependencies💧=====

//========💨AwalRegion_Banner_Slide_Management💨=====
// Custom hook untuk mengelola banner slide dengan transisi smooth
const useBannerSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Data banner dengan teks
  const banners = [
    {
      id: 1,
      title: 'Lapar? Nasi Goreng Gak Sih..',
      description: 'Jaminan 15 menit dimasak jadi.'
    },
    {
      id: 2,
      title: 'Ramein Kantin Teknik',
      description: 'Cari diskon up to 20% untuk mahasiswa.'
    },
    {
      id: 3,
      title: 'Pesan Sekarang, Ambil Nanti',
      description: 'Ambil pesanan tanpa ngantri lagi.'
    },
  ];

  // Fungsi untuk pindah ke slide berikutnya dengan smooth transition
  const goToNextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));

      // Reset state transisi setelah animasi selesai
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500); // Sesuaikan dengan durasi CSS transition
    }
  };

  // Auto slide setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length, isTransitioning]);

  // Setter slide custom yang menghormati transisi
  const setSlideWithTransition = (index) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  };

  return {
    currentSlide,
    setCurrentSlide: setSlideWithTransition,
    banners,
    isTransitioning
  };
};
//========💧AkhirRegion_Banner_Slide_Management💧=====

//========💨AwalRegion_Utility_Functions💨=====
// Fungsi utility untuk greeting berdasarkan waktu
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Selamat Pagi';
  if (hour < 18) return 'Selamat Siang';
  return 'Selamat Malam';
};
//========💧AkhirRegion_Utility_Functions💧=====

//========💨AwalRegion_Cart_Management💨=====
// Custom hook untuk mengelola cart/keranjang belanja
const useCartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [currentMerchantId, setCurrentMerchantId] = useState(null);
  const [currentMerchantName, setCurrentMerchantName] = useState('');

  // Fungsi untuk tambah item ke cart
  const addToCart = (item, merchantId, merchantName) => {
    // Cek apakah cart sudah ada item dari merchant berbeda
    if (currentMerchantId && currentMerchantId !== merchantId) {
      // Return error message jika merchant berbeda
      return {
        success: false,
        message: `Selesaikan pesanan dari ${currentMerchantName} terlebih dahulu sebelum memesan dari toko lain.`
      };
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        // Jika item sudah ada, tambah quantity
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Jika item belum ada, tambah item baru dengan quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });

    // Set merchant saat ini jika ini item pertama
    if (!currentMerchantId) {
      setCurrentMerchantId(merchantId);
      setCurrentMerchantName(merchantName);
    }

    return { success: true };
  };

  // Fungsi untuk update quantity item
  const updateQuantity = (id, change) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean); // Hapus item null (ketika quantity jadi 0)

      // Jika cart kosong, reset tracking merchant
      if (updatedItems.length === 0) {
        setCurrentMerchantId(null);
        setCurrentMerchantName('');
      }

      return updatedItems;
    });
  };

  // Fungsi untuk hapus item dari cart
  const removeFromCart = (id) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== id);

      // Jika cart kosong, reset tracking merchant
      if (updatedItems.length === 0) {
        setCurrentMerchantId(null);
        setCurrentMerchantName('');
      }

      return updatedItems;
    });
  };

  // Fungsi untuk clear semua cart
  const clearCart = () => {
    setCartItems([]);
    setCurrentMerchantId(null);
    setCurrentMerchantName('');
  };

  // Hitung total harga
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    total,
    currentMerchantId,
    currentMerchantName
  };
};
//========💧AkhirRegion_Cart_Management💧=====

//========💨AwalRegion_Merchant_Data_Management💨=====
// Custom hook untuk fetch dan kelola data merchant dari API
const useMerchantList = () => {
  const [allMerchants, setAllMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        setLoading(true);
        // Ambil semua merchant (asumsi ada 13 total merchant)
        const response = await getTopMerchants(13);

        if (response.status === 'success' && response.data) {
          // Transform data sesuai format yang dibutuhkan
          const formattedMerchants = response.data.map(merchant => ({
            id: merchant.id,
            name: merchant.merchant_name,
            category: `Warung-${merchant.id}`,
            menuCount: parseInt(merchant.menu_count) || 0,
            imageUrl: merchant.image_url ? merchant.image_url.replace('CanTake/FrontEnd/public/', '') : '',
          }));

          setAllMerchants(formattedMerchants);
        } else {
          // Jika API gagal, set list kosong
          setAllMerchants([]);
        }
      } catch (err) {
        console.error('Error fetching merchants:', err);
        setError(err.message);

        // Jika API gagal, set list kosong
        setAllMerchants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMerchants();
  }, []);

  // Bagi merchant menjadi yang ditampilkan (10 pertama) dan tambahan (sisanya)
  const merchantList = allMerchants.slice(0, 10);
  const additionalMerchants = allMerchants.slice(10);

  return { merchantList, additionalMerchants, allMerchants, loading, error };
};
//========💧AkhirRegion_Merchant_Data_Management💧=====

//========💨AwalRegion_BestSeller_Data_Management💨=====
// Custom hook untuk fetch data best seller menu items dari API
const useBestSellerList = (allMerchants = []) => {
  const [bestSellerList, setBestSellerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        const response = await getTopSellingMenuItems(10);

        if (response.status === 'success' && response.data) {
          // Transform data sesuai format yang dibutuhkan
          const formattedItems = response.data.map(item => {
            // Cari nama merchant berdasarkan merchant_id
            const merchantName = item.merchant_name ||
              allMerchants.find(m => m.id === item.merchant_id)?.name ||
              `Warung ${item.merchant_id}`;

            return {
              id: item.id,
              name: item.name,
              price: parseFloat(item.price),
              restaurant: merchantName,
              merchant_id: item.merchant_id,
              order_count: item.order_count || 0,
              imageUrl: item.image_url ? item.image_url.replace('CanTake/FrontEnd/public/', '') : '',
              merchantImageUrl: item.merchant_image_url ? item.merchant_image_url.replace('CanTake/FrontEnd/public/', '') : '',
            };
          });

          setBestSellerList(formattedItems);
        } else {
          // Jika API gagal, set list kosong
          setBestSellerList([]);
        }
      } catch (err) {
        console.error('Error fetching best sellers:', err);
        setError(err.message);

        // Jika API gagal, set list kosong
        setBestSellerList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return { bestSellerList, loading, error };
};
//========💧AkhirRegion_BestSeller_Data_Management💧=====

//========💨AwalRegion_Static_Data💨=====
// Data statis untuk alasan memilih CanTake
const reasons = [
  {
    id: 1,
    icon: '⚡',
    title: 'Cepat & Efisien',
    description: 'Pesanan Anda akan diproses dengan cepat dan efisien, siap untuk diambil.'
  },
  {
    id: 2,
    icon: '🍽️',
    title: 'Beragam Pilihan',
    description: 'Tersedia berbagai pilihan makanan dari vendor-vendor terbaik di kampus.'
  },
  {
    id: 3,
    icon: '💰',
    title: 'Tanpa Antri',
    description: 'Pesan dari mana saja, ambil tanpa perlu mengantri lagi di kantin.'
  }
];
//========💧AkhirRegion_Static_Data💧=====

//========💨AwalRegion_User_Orders_Management💨=====
// Custom hook untuk fetch dan kelola pesanan user dari API
const useUserOrders = (user) => {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!user || !user.id) {
        setUserOrders([]);
        return;
      }

      try {
        setLoading(true);
        const response = await getOrdersByUserId(user.id);

        if (response.status === 'success' && response.data) {
          // Filter pesanan aktif dan yang baru selesai (dalam 30 menit)
          const now = new Date();
          const activeOrders = response.data.filter(order => {
            // Selalu tampilkan pesanan yang belum selesai dan tidak ditolak
            if (order.status_name !== 'Completed' && order.status_name !== 'Rejected') {
              return true;
            }

            // Tampilkan pesanan selesai hanya jika selesai dalam 30 menit terakhir
            if (order.status_name === 'Completed' && order.completed_at) {
              const completedTime = new Date(order.completed_at);
              const timeDiffMinutes = Math.floor((now - completedTime) / (1000 * 60));
              return timeDiffMinutes <= 30; // Tampilkan selama 30 menit setelah selesai
            }

            return false; // Sembunyikan pesanan ditolak dan pesanan lama
          });
          setUserOrders(activeOrders);
        } else {
          setUserOrders([]);
        }
      } catch (err) {
        console.error('Error fetching user orders:', err);
        setError(err.message);
        setUserOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [user]);

  // Fungsi untuk refresh pesanan
  return { userOrders, loading, error, refreshOrders: () => {
    if (user && user.id) {
      const fetchUserOrders = async () => {
        try {
          setLoading(true);
          const response = await getOrdersByUserId(user.id);
          if (response.status === 'success' && response.data) {
            // Filter pesanan aktif dan yang baru selesai (dalam 30 menit)
            const now = new Date();
            const activeOrders = response.data.filter(order => {
              // Selalu tampilkan pesanan yang belum selesai dan tidak ditolak
              if (order.status_name !== 'Completed' && order.status_name !== 'Rejected') {
                return true;
              }

              // Tampilkan pesanan selesai hanya jika selesai dalam 30 menit terakhir
              if (order.status_name === 'Completed' && order.completed_at) {
                const completedTime = new Date(order.completed_at);
                const timeDiffMinutes = Math.floor((now - completedTime) / (1000 * 60));
                return timeDiffMinutes <= 30; // Tampilkan selama 30 menit setelah selesai
              }

              return false; // Sembunyikan pesanan ditolak dan pesanan lama
            });
            setUserOrders(activeOrders);
          }
        } catch (err) {
          console.error('Error refreshing orders:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchUserOrders();
    }
  }};
};
//========💧AkhirRegion_User_Orders_Management💧=====

//========💨AwalRegion_Authentication_Management💨=====
// Custom hook untuk cek status login user dan kelola auth
const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Cek localStorage untuk data user saat component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Fungsi untuk handle logout
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, setUser, logout };
};
//========💧AkhirRegion_Authentication_Management💧=====

//========💨AwalRegion_Main_App_Component💨=====
// Komponen utama aplikasi dengan routing dan state management
function App() {
  // Inisialisasi semua state dan data
  const bannerData = useBannerSlide();
  const cartData = useCartItems();
  const { user, setUser, logout } = useAuth();
  const { userOrders, loading: ordersLoading, refreshOrders } = useUserOrders(user);
  const greetingText = getGreeting();
  const { merchantList, additionalMerchants, allMerchants, loading: merchantsLoading } = useMerchantList();
  const { bestSellerList, loading: bestSellersLoading } = useBestSellerList(allMerchants);

  return (
    <div className="App w-100">
      <Routes>
        {/* Redirect root ke dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Halaman utama dashboard */}
        <Route path="/dashboard" element={
          <Dashboard
            bannerData={bannerData}
            cartData={cartData}
            userOrders={userOrders}
            merchantList={merchantList}
            additionalMerchants={additionalMerchants}
            bestSellerList={bestSellerList}
            reasons={reasons}
            greetingText={greetingText}
            loading={{
              merchants: merchantsLoading,
              bestSellers: bestSellersLoading,
              orders: ordersLoading
            }}
            user={user}
            logout={logout}
            refreshOrders={refreshOrders}
          />
        } />

        {/* Halaman detail merchant/gerai */}
        <Route path="/gerai/:id" element={
          <GeraiPage
            cartData={cartData}
            user={user}
            logout={logout}
          />
        } />

        {/* Halaman checkout */}
        <Route path="/checkout" element={
          <CheckoutPage
            cartData={cartData}
            user={user}
            logout={logout}
            refreshOrders={refreshOrders}
          />
        } />

        {/* Halaman authentication */}
        <Route path="/login" element={<Login onLoginSuccess={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard merchant */}
        <Route path="/merchant-dashboard" element={
          <MerchantDashboard
            user={user}
            logout={logout}
          />
        } />

        {/* Halaman footer/legal */}
        <Route path="/syarat-ketentuan" element={
          <TermsPage
            user={user}
            logout={logout}
          />
        } />
        <Route path="/kebijakan-privasi" element={
          <PrivacyPage
            user={user}
            logout={logout}
          />
        } />
        <Route path="/tentang" element={
          <AboutPage
            user={user}
            logout={logout}
          />
        } />
      </Routes>
    </div>
  );
}

export default App;
//========💧AkhirRegion_Main_App_Component💧=====
