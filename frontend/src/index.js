import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import HomeV1 from "./components/home-v1";
import HomeV2 from "./components/home-v2";
import HomeV3 from "./components/home-v3";
import HomeV4 from "./components/home-v4";
import HomeV5 from "./components/home-v5";
import HomeV6 from "./components/home-v6";
import HomeV7 from "./components/home-v7";
import HomeV8 from "./components/home-v8";
import HomeV9 from "./components/home-v9";
import HomeV10 from "./components/home-v11";

import About from "./components/about";
import Service from "./components/service";
import ServiceDetails from "./components/service-details";
import Portfolio from "./components/portfolio";
import PortfolioV2 from "./components/portfolio-v2";
import PortfolioDetails from "./components/portfolio-details";
import Team from "./components/team";
import TeamDetails from "./components/team-details";
import Faq from "./components/faq";
import ComingSoon from "./components/coming-soon";
import Error from "./components/404";
import Location from "./components/location";

import Shop from "./components/shop";
import ShopGrid from "./components/shop-grid";
import ProdductDetails from "./components/product-details";
import ShopLeftSidebar from "./components/shop-left-sidebar";
import ShopRightSidebar from "./components/shop-right-sidebar";

import BlogGrid from "./components/blog-grid";
import BlogLeftSidebar from "./components/blog-left-sidebar";
import BlogRightSidebar from "./components/blog-right-sidebar";
import Blog from "./components/blog";

import BlogDetails from "./components/blog-details";
import Contact from "./components/contact";
import Cart from "./components/cart";
import Checkout from "./components/checkout";
import MyAccount from "./components/my-account";
import Login from "./components/login";
import Register from "./components/register";
import AddListing from "./components/add-listing";
import Wishlist from "./components/wishlist";
import OrderTracking from "./components/order-tracking";
import History from "./components/history";

import ErrorPage from "./components/404";
class Root extends Component {
  render() {
    return (
      <div id="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<HomeV1 />} />
            <Route exact path="/home-v2" element={<HomeV2 />} />
            <Route exact path="/home-v3" element={<HomeV3 />} />
            <Route exact path="/home-v4" element={<HomeV4 />} />
            <Route exact path="/home-v5" element={<HomeV5 />} />
            <Route exact path="/home-v6" element={<HomeV6 />} />
            <Route exact path="/home-v7" element={<HomeV7 />} />
            <Route exact path="/home-v8" element={<HomeV8 />} />
            <Route exact path="/home-v9" element={<HomeV9 />} />
            <Route exact path="/home-v10" element={<HomeV10 />} />

            <Route exact path="/about" element={<About />} />
            <Route exact path="/service" element={<Service />} />
            <Route exact path="/service-details" element={<ServiceDetails />} />
            <Route exact path="/portfolio" element={<Portfolio />} />
            <Route exact path="/portfolio-v2" element={<PortfolioV2 />} />
            <Route exact path="/portfolio-details" element={<PortfolioDetails />} />
            <Route exact path="/team" element={<Team />} />
            <Route exact path="/team-details" element={<TeamDetails />} />
            <Route exact path="/faq" element={<Faq />} />
            <Route exact path="/coming-soon" element={<ComingSoon />} />
            <Route exact path="/404" element={<Error />} />
            <Route exact path="/location" element={<Location />} />
            <Route exact path="/shop" element={<Shop />} />
            <Route exact path="/shop-grid" element={<ShopGrid />} />
            <Route exact path="/shop-left-sidebar" element={<ShopLeftSidebar />} />
            <Route exact path="/shop-right-sidebar" element={<ShopRightSidebar />} />

            <Route exact path='/product-details/:id' element={<ProdductDetails />} />
            {/* blog */}
            <Route exact path="/blog-grid" element={<BlogGrid />} />
            <Route exact path="/blog-left-sidebar" element={<BlogLeftSidebar />} />
            <Route exact path="/blog-right-sidebar" element={<BlogRightSidebar />} />
            <Route exact path="/blog" element={<Blog />} />

            <Route exact path="/blog-details" element={<BlogDetails />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path="/my-account" element={<MyAccount />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/add-listing" element={<AddListing />} />
            <Route exact path="/wishlist" element={<Wishlist />} />
            <Route exact path="/order-tracking" element={<OrderTracking />} />
            <Route exact path="/history" element={<History />} />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default Root;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <Root />

);
