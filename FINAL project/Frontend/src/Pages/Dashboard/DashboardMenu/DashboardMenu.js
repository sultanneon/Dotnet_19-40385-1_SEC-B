import React from 'react';
import { FaBars, FaUser, FaUserEdit } from "react-icons/fa";
import { Link, Switch, useRouteMatch } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import AdminRoute from '../../Login/AdminRoute/AdminRoute';
import DashboardHome from '../DashboardHome/DashboardHome';
import MyProfile from '../MyProfile/MyProfile';
import ManageProduct from '../ManageProduct/ManageProduct';
import ManageCart from '../ManageCart/ManageCart';
import ManageOrders from '../ManageOrders/ManageOrders';
import MostPopular from '../MostPopular/MostPopular';
import ProductDiscounted from '../ProductDiscounted/ProductDiscounted';
import OrderDetails from '../OrderDetails/OrderDetails';
import ManageReview from '../ManageReview/ManageReview';
import ManageMyVoucher from '../ManageMyVoucher/ManageMyVoucher';

const DashboardMenu = () => {
    let { path, url } = useRouteMatch();
    const {user,logOut,admin}=useAuth();
    
    return (


            <div className="container-fluid">
                <div className="row flex-nowrap">
                <div className='dashboard'>
                    <div className="dashboard-nav">
                    <header>
                        
                        <Link to={`${url}`} className="brand-logo"><span>BRAND</span></Link></header>
                         <nav className="dashboard-nav-list">
                             <Link to={`${url}/dashboardHome`} className="dashboard-nav-item"><i><FaUser/></i> Dashboard </Link>
                             <Link to={`${url}/profiles`} className="dashboard-nav-item"><i><FaUser/></i> Profile </Link>
                            
                            
                             <Link to={`${url}/discounted`} className="dashboard-nav-item"><i><FaUserEdit/></i>Discount available</Link>
                             <Link to={`${url}/voucher`} className="dashboard-nav-item"><i><FaUserEdit/></i>My Voucher</Link>
                             <Link to={`${url}/popular`} className="dashboard-nav-item"><i><FaUserEdit/></i>Popular Products</Link>
                             <Link to={`${url}/product`} className="dashboard-nav-item"><i><FaUserEdit/></i>Products</Link>
                             <Link to={`${url}/orderdetails`} className="dashboard-nav-item"><i><FaUserEdit/></i>History</Link>
                             <Link to={`${url}/cart`} className="dashboard-nav-item"><i><FaUserEdit/></i>Cart</Link>
                             <Link to={`${url}/orders`} className="dashboard-nav-item"><i><FaUserEdit/></i>Orders</Link>
                             <Link to={`${url}/review`} className="dashboard-nav-item"><i><FaUserEdit/></i>Reviews</Link>
                         

                              <div className="nav-item-divider"></div>
                              <Link to={`${url}`} className="dashboard-nav-item">
                              <i className="fas fa-sign-out-alt"></i> Logout
                              </Link>
                         </nav>
                    </div>

                    <div className='dashboard-app'>
                         <header className='dashboard-toolbar'>
                              <a href="#!" className="menu-toggle"><i ><FaBars/></i></a>
                         </header>
                         <div className='dashboard-content'>
                              
                         
                    <div className="col py-3">
                        <Switch>
                            <AdminRoute exact path={`${path}/dashboardHome`}>
                            <DashboardHome></DashboardHome>
                            </AdminRoute>
                            <AdminRoute path={`${path}/profiles`}>
                            <MyProfile></MyProfile>
                            </AdminRoute>                       
                            <AdminRoute path={`${path}/product`}>
                            <ManageProduct></ManageProduct>
                            </AdminRoute>
                            <AdminRoute path={`${path}/cart`}>
                            <ManageCart></ManageCart>
                            </AdminRoute>
                            <AdminRoute path={`${path}/orders`}>
                            <ManageOrders></ManageOrders>
                            </AdminRoute>
                            <AdminRoute path={`${path}/popular`}>
                            <MostPopular></MostPopular>
                            </AdminRoute>
                            <AdminRoute path={`${path}/discounted`}>
                            <ProductDiscounted></ProductDiscounted>
                            </AdminRoute>
                            <AdminRoute path={`${path}/orderdetails`}>
                            <OrderDetails></OrderDetails>
                            </AdminRoute>
                            <AdminRoute path={`${path}/review`}>
                            <ManageReview></ManageReview>
                            </AdminRoute>
                            <AdminRoute path={`${path}/voucher`}>
                            <ManageMyVoucher></ManageMyVoucher>
                            </AdminRoute>

                            {/* Admin Route  */}
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    );
};

export default DashboardMenu;