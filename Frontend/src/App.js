import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import AddressForm from "./pages/address/AddressForm";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Category from "./pages/admin/category/Category";
import Product from "./pages/admin/product/Product";
import UpdateProduct from "./pages/admin/product/ProductUpdate";
import ProductDescription from "./pages/user/product/ProductDescription";
// import CartScreen from "./pages/cart/CartScreen";
import ViewOrders from "./pages/admin/order/ViewOrders";
import ViewUsers from "./pages/admin/users/ViewUsers";
import AboutUs from "./pages/constant/AboutUs";
import Contactus from "./pages/constant/Contactus";
import ForgotPassword from "./pages/forgetpassword/ForgetPassword";
import HomeScreen from "./pages/homepage/HomeScreen";
import ProductScreen from "./pages/homepage/ProductScreen";
import Login from "./pages/login/LoginScreen";
import Register from "./pages/register/RegisterScreen";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import Cart from "./pages/user/cart/Cart";
import OrderList from "./pages/user/order/OrderList";
import Profile from "./pages/user/profile/Profile";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";
import AdminRoutes from "./protected_routes/AdminRoutes";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/aboutus' element={<AboutUs />} />
        {/* <Route path='/' element={<Contactus />} /> */}
        <Route path='/' element={<HomeScreen />} />
        <Route path='/contact' element={<Contactus />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/productdescription/:id' element={<ProductDescription />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/product' element={<ProductScreen />} />
        <Route path='/address' element={<AddressForm />} />
        <Route path='/orderlist' element={<OrderList />} />
        <Route path='/verify-email/:token' element={<VerifyEmail />} />
        <Route path='/resetPassword/:token' element={<ResetPassword />} />

        <Route element={<AdminRoutes />}>
          <Route path='/admin/category' element={<Category />} />
          <Route path='/admin/product' element={<Product />} />
          <Route path='/admin/orders' element={<ViewOrders />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/customers" element={<ViewUsers />} />
          <Route path='/admin/update/:id' element={<UpdateProduct />} />
        </Route>

      </Routes>
      <Routes>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

// import { useEffect } from "react";
// import { Helmet, HelmetProvider } from "react-helmet-async";
// import {
//   Route,
//   BrowserRouter as Router,
//   Routes
// } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './App.css';
// import Footer from "./components/footer/Footer";
// import Navbar from "./components/navbar/Navbar";
// import AddressForm from "./pages/address/AddressForm";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import Category from "./pages/admin/category/Category";
// import ViewOrders from "./pages/admin/order/ViewOrders";
// import Product from "./pages/admin/product/Product";
// import UpdateProduct from "./pages/admin/product/ProductUpdate";
// import ViewUsers from "./pages/admin/users/ViewUsers";
// import AboutUs from "./pages/constant/AboutUs";
// import Contactus from "./pages/constant/Contactus";
// import ForgotPassword from "./pages/forgetpassword/ForgetPassword";
// import HomeScreen from "./pages/homepage/HomeScreen";
// import ProductScreen from "./pages/homepage/ProductScreen";
// import Login from "./pages/login/LoginScreen";
// import Register from "./pages/register/RegisterScreen";
// import ResetPassword from "./pages/resetPassword/ResetPassword";
// import Cart from "./pages/user/cart/Cart";
// import OrderList from "./pages/user/order/OrderList";
// import ProductDescription from "./pages/user/product/ProductDescription";
// import Profile from "./pages/user/profile/Profile";
// import VerifyEmail from "./pages/verifyEmail/VerifyEmail";
// import AdminRoutes from "./protected_routes/AdminRoutes";

// function App() {
//   useEffect(() => {
//     // Prevent right-click to disable inspect element
//     document.addEventListener("contextmenu", (e) => e.preventDefault());

//     // Detect DevTools (F12 or Inspect Element)
//     const detectDevTools = () => {
//       const threshold = 160;
//       const widthDiff = window.outerWidth - window.innerWidth > threshold;
//       const heightDiff = window.outerHeight - window.innerHeight > threshold;
//       if (widthDiff || heightDiff) {
//         document.body.innerHTML = "<h1>Unauthorized Access Detected</h1>";
//         console.clear();
//         alert("Developer Tools are disabled for security reasons.");
//       }
//     };
//     window.addEventListener("resize", detectDevTools);

//     return () => {
//       document.removeEventListener("contextmenu", (e) => e.preventDefault());
//       window.removeEventListener("resize", detectDevTools);
//     };
//   }, []);

//   return (
//     <HelmetProvider>
//       <Helmet>
//         <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none';" />
//         <meta http-equiv="X-Content-Type-Options" content="nosniff" />
//         <meta http-equiv="X-Frame-Options" content="DENY" />
//       </Helmet>

//       <Router>
//         <Navbar />
//         <ToastContainer />
//         <Routes>
//           <Route path='/' element={<HomeScreen />} />
//           <Route path='/aboutus' element={<AboutUs />} />
//           <Route path='/contact' element={<Contactus />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/register' element={<Register />} />
//           <Route path='/productdescription/:id' element={<ProductDescription />} />
//           <Route path='/cart' element={<Cart />} />
//           <Route path='/forgot-password' element={<ForgotPassword />} />
//           <Route path='/profile' element={<Profile />} />
//           <Route path='/product' element={<ProductScreen />} />
//           <Route path='/address' element={<AddressForm />} />
//           <Route path='/orderlist' element={<OrderList />} />
//           <Route path='/verify-email/:token' element={<VerifyEmail />} />
//           <Route path='/resetPassword/:token' element={<ResetPassword />} />

//           {/* Secure Admin Routes */}
//           <Route element={<AdminRoutes />}>
//             <Route path='/admin/category' element={<Category />} />
//             <Route path='/admin/product' element={<Product />} />
//             <Route path='/admin/orders' element={<ViewOrders />} />
//             <Route path="/admin/dashboard" element={<AdminDashboard />} />
//             <Route path="/admin/customers" element={<ViewUsers />} />
//             <Route path='/admin/update/:id' element={<UpdateProduct />} />
//           </Route>
//         </Routes>
//         <Footer />
//       </Router>
//     </HelmetProvider>
//   );
// }

// export default App;
