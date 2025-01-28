import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
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
import Cart from "./pages/user/cart/Cart";
import OrderList from "./pages/user/order/OrderList";
import Profile from "./pages/user/profile/Profile";
import AdminRoutes from "./protected_routes/AdminRoutes";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/resetPassword/:token' element={<ResetPassword/>}/>
        <Route path='/verify-email/:token' element={<VerifyEmail/>}/>
        
        <Route
          path="/productdescription/:id"
          element={<ProductDescription />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product" element={<ProductScreen />} />
        <Route path="/address" element={<AddressForm />} />
        <Route path="/orderlist" element={<OrderList />} />

        <Route element={<AdminRoutes />}>
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/product" element={<Product />} />
          <Route path="/admin/orders" element={<ViewOrders />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/customers" element={<ViewUsers />} />
          <Route path="/admin/update/:id" element={<UpdateProduct />} />
        </Route>
      </Routes>
      <Routes></Routes>
      <Footer />
    </Router>
  );
}
export default App;

// // export default App;
// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./App.css";

// // Components
// import Footer from "./components/footer/Footer";
// import Navbar from "./components/navbar/Navbar";

// // Pages
// import AddressForm from "./pages/address/AddressForm";
// import AboutUs from "./pages/constant/AboutUs";
// import ContactUs from "./pages/constant/Contactus";
// import ForgotPassword from "./pages/forgetpassword/ForgetPassword";
// import HomeScreen from "./pages/homepage/HomeScreen";
// import ProductScreen from "./pages/homepage/ProductScreen";
// import Login from "./pages/login/LoginScreen";
// import Register from "./pages/register/RegisterScreen";
// import Cart from "./pages/user/cart/Cart";
// import OrderList from "./pages/user/order/OrderList";
// import ProductDescription from "./pages/user/product/ProductDescription";
// import Profile from "./pages/user/profile/Profile";

// // Admin Pages
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import Category from "./pages/admin/category/Category";
// import ViewOrders from "./pages/admin/order/ViewOrders";
// import Product from "./pages/admin/product/Product";
// import UpdateProduct from "./pages/admin/product/ProductUpdate";
// import ViewUsers from "./pages/admin/users/ViewUsers";

// // Protected Routes
// import AdminRoutes from "./protected_routes/AdminRoutes";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <ToastContainer />
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<HomeScreen />} />
//         <Route path="/aboutus" element={<AboutUs />} />
//         <Route path="/contact" element={<ContactUs />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/product" element={<ProductScreen />} />
//         <Route
//           path="/productdescription/:id"
//           element={<ProductDescription />}
//         />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/orderlist" element={<OrderList />} />
//         <Route path="/address" element={<AddressForm />} />

//         {/* Admin Routes */}
//         <Route element={<AdminRoutes />}>
//           <Route path="/admin/dashboard" element={<AdminDashboard />} />
//           <Route path="/admin/category" element={<Category />} />
//           <Route path="/admin/product" element={<Product />} />
//           <Route path="/admin/update/:id" element={<UpdateProduct />} />
//           <Route path="/admin/orders" element={<ViewOrders />} />
//           <Route path="/admin/customers" element={<ViewUsers />} />
//         </Route>
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;
