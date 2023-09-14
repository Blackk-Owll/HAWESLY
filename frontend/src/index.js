import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import AddListing_Test from "./SeleniumTest/addAnnonceTest" ; 
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Routes,
  Switch,
} from "react-router-dom";

import HomeV2 from "./components/home-v2";
import Team from "./components/team";
import Faq from "./components/faq";
import Error from "./components/404";
import ProdductDetails from "./components/product-details";
import ShopLeftSidebar from "./components/shop-left-sidebar";
import Contact from "./components/contact";
import Checkout from "./components/checkout";
import MyAccount from "./components/my-account";
import Login from "./components/login";
import Register from "./components/register";
import AddListing from "./components/add-listing";
import Wishlist from "./components/wishlist";


import ErrorPage from "./components/404";
class Root extends Component {
  render() {
    return (
      <div id="App">
        <Router>
          <Routes>
          
            <Route path="/" element={<HomeV2 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/team" element={<Team />/*done*/} />
            <Route path="/faq" element={<Faq />/*done*/} />
            <Route path="/404" element={<Error />} />
            <Route path="/shop-left-sidebar" element={<ShopLeftSidebar />/*done*/} />
            <Route exact path='/product-details/:id' element={<ProdductDetails />/*done*/} />
            <Route path="/contact" element={<Contact />/*done*/} />
            <Route path="/checkout" element={<Checkout />/*done*/} />
            <Route path="/my-account" element={<MyAccount />/*done*/} />
            <Route path="/add-listing" element={<AddListing />/*done*/} />
            <Route path="/wishlist" element={<Wishlist />/*done*/} />
           // <Route path="/add-listing-test" element={<AddListing_Test />/*done*/} />

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
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
