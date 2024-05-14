import './App.scss';
// react router v6
import {BrowserRouter, Route, Routes} from 'react-router-dom';
// pages
import {Cart, CategoryProduct, Home, ProductSingle, Search} from "./pages/index";
// components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import {Provider} from "react-redux";
// import Login from "./components/Login/Login";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import React from "react";

import DisplayAddress from "./components/Shop/address/DisplayAddress";
import DashBoard from "./pages/ShopManagement";
import ListProduct from "./pages/ShopManagement/ListProduct";
import OrderManagement from "./pages/ShopManagement/OrderManagement";
import Profile from "./pages/ShopManagement/Profile";
import UpdateProduct from "./pages/ShopManagement/UpdateProduct";
import Images from "./pages/ShopManagement/Images";
import CreateProduct from "./pages/ShopManagement/CreateProduct";
import Pending from "./components/Order/Pending";
import AllOrder from "./components/Order/AllOrder";
import Shipping from "./components/Order/Shipping";
import Reject from "./components/Order/Reject";
import Cancel from "./components/Order/Cancel";
import Done from "./components/Order/Done";
import UserManagement from "./pages/UserManagement";
import ProfileUser from "./pages/UserManagement/ProfileUser";
import ChangePassword from "./pages/UserManagement/ChangePassword";
import {AppProvider} from "./Context/AppContext";
import Info from "./pages/BillPage/Info";
import Bill from "./pages/BillPage/Bill";


import OrderUser from "./pages/BillPage/OrderUser";
import PendingUser from "./components/OrderUser/PendingUser";
import ShippingUser from "./components/OrderUser/ShippingUser";
import CancelUser from "./components/OrderUser/CancelUser";
import DoneUser from "./components/OrderUser/DoneUser";

import {ForgotPass} from "./pages/UserManagement/ForgotPass";
import {PasswordNew} from "./pages/UserManagement/PasswordNew";
import ShopProfile from "./pages/ShopManagement/ShopProfile";
import Comment from "./pages/CommentPage/Comment";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CancelShop from "./components/OrderUser/CancelShop";
import ChatRoom from "./components/chat/chatRoom";
import TotalWeek from "./pages/ShopManagement/TotalWeek";
import TotalMonth from "./pages/ShopManagement/TotalMonth";
import DashBoardAdmin from "./components/Admin/DashBoardAdmin";
import ListAccount from "./components/Admin/ListAccount";
import ListAccountManager from "./components/Admin/ListAccountManager";


function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <AppProvider >
                <BrowserRouter>


                    {/*{check && <Header a={test}/>}*/}
                    {/*{!isLoginPage && <Sidebar />}*/}
                    <Header/>
                    <Sidebar/>
                    <Routes>
                        {/* home page route */}
                        <Route path="/" element={<Home/>}/>
                        <Route path="/address" element={<DisplayAddress/>}/>
                        <Route path="/images" element={<Images/>}/>

            {/* single product route */}
            <Route path = "/product/:id" element = {<ProductSingle />} />
            {/* category wise product listing route */}
            <Route path = "/category/:category" element = {<CategoryProduct />} />
            {/* cart */}
            <Route path = "/cart" element = {<Cart />} />
            <Route path = "/cart/info" element = {<Info/>} />
            <Route path = "/bill" element = {<Bill />} />
            <Route path = "/chat" element = {<ChatRoom />} />

            {/* searched products */}
            <Route path = "/search/:searchTerm" element = {<Search />} />
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/forgotPass"} element={<ForgotPass/>}/>
            <Route path={"/password-new/:id"} element={<PasswordNew/>}/>
            <Route path={"/register"} element={<Register/>}/>
            <Route path = "/profile" element = {<Profile />} />

                        {/* single product route */}
                        <Route path="/product/:id" element={<ProductSingle/>}/>
                        <Route path="/address" element={<DisplayAddress/>}/>
                        {/* category wise product listing route */}
                        <Route path="/category/:category" element={<CategoryProduct/>}/>
                        {/* cart */}
                        <Route path="/cart" element={<Cart/>}/>
                        {/* searched products */}
                        <Route path="/search/:searchTerm" element={<Search/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path={"/register"} element={<Register/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path={"/comment"} element={<Comment/>}/>
                        <Route path="/user-management" element={<UserManagement/>}>
                            <Route index element={<ProfileUser/>}/>
                            <Route path="/user-management/profile" element={<ProfileUser/>}/>
                            <Route path="/user-management/change-password" element={<ChangePassword/>}/>
                            <Route path="/user-management/order" element={<OrderUser/>}>
                                <Route index element={<PendingUser/>}/>
                                <Route path="/user-management/order/confirm" element={<PendingUser/>}/>
                                <Route path="/user-management/order/shipping" element={<ShippingUser/>}/>
                                <Route path="/user-management/order/cancel" element={<CancelUser/>}/>
                                <Route path="/user-management/order/cancelShop" element={<CancelShop/>}/>
                                <Route path="/user-management/order/done" element={<DoneUser/>}/>
                            </Route>
                        </Route>
                        <Route path={"/admin"} element={<DashBoardAdmin/>}>
                            <Route index element={<ProfileUser/>}/>
                            <Route path="/admin/profile" element={<ProfileUser/>}/>
                            <Route path="/admin/list-account" element={<ListAccount/>}/>
                            <Route path="/admin/list-manager" element={<ListAccountManager/>}/>
                        </Route>

                        <Route path="/shop-management" element={<DashBoard/>}>
                            <Route index element={<Profile/>}/>
                            <Route path="/shop-management/list-product" element={<ListProduct/>}/>
                            <Route path="/shop-management/create" element={<CreateProduct/>}/>
                            <Route path="/shop-management/order-management" element={<OrderManagement/>}>
                                <Route index element={<AllOrder/>}/>
                                <Route path="/shop-management/order-management/allOrder" element={<AllOrder/>}/>
                                <Route path="/shop-management/order-management/confirm" element={<Pending/>}/>
                                <Route path="/shop-management/order-management/shipping" element={<Shipping/>}/>
                                <Route path="/shop-management/order-management/cancel" element={<Cancel/>}/>
                                <Route path="/shop-management/order-management/reject" element={<Reject/>}/>
                                <Route path="/shop-management/order-management/done" element={<Done/>}/>
                            </Route>
                            <Route path="/shop-management/report" element={<TotalWeek/>}/>
                            <Route path="/shop-management/report/month" element={<TotalMonth/>}/>
                            {/*<Route path="/shop-management/report" element={<Report/>}/>*/}
                            <Route path="/shop-management/profile" element={<Profile/>}/>
                            <Route path="/shop-management/:id" element={<UpdateProduct/>}/>


                        </Route>


                        {/*<Route path={"/login"} element={<Login b={test1}/>}/>*/}
                        <Route path="/shop-management/shop-profile/:id" element={<ShopProfile />}/>

                    </Routes>
                    <Footer/>
                </BrowserRouter></AppProvider>
            </Provider>
            <ToastContainer style={{fontSize : '13px'}}/>
        </div>
    );
}

export default App;
