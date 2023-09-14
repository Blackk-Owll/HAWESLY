import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Social from '../section-components/social';

function Navbar () {
    
  
        let publicUrl = process.env.PUBLIC_URL+'/'
        const isAuthenticated = localStorage.getItem("isAuthenticated");

        return (
        <div>
           <header className="ltn__header-area ltn__header-5 ltn__header-transparent--- gradient-color-4---">
            <div className="ltn__header-top-area section-bg-6 top-area-color-white---">
                <div className="container">
                <div className="row">
                    <div className="col-md-7">
                    <div className="ltn__top-bar-menu">
                        <ul>
                        <li><a href="mailto:info@webmail.com?Subject=Flower%20greetings%20to%20you"><i className="icon-mail" />service@esi.dz</a></li>
                        <li><a href="locations.html"><i className="icon-placeholder" />Alger,Oued Smar,Algérie</a></li>
                        </ul>
                    </div>
                    </div>
                    <div className="col-md-5">
                    <div className="top-bar-right text-end">
                        <div className="ltn__top-bar-menu">
                        <ul>
                            
                            <li>
                                <Social />
                            </li>
                            <li>
                            {/* header-top-btn */}
                            <div className="header-top-btn">
                                <Link to="/add-listing">Ajouter Annonce</Link>
                            </div>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="ltn__header-middle-area ltn__header-sticky ltn__sticky-bg-white">
                <div className="container">
                <div className="row">
                    <div className="col">
                    <div className="site-logo-wrap">
                        <div className="site-logo go-top">
                        <Link to="/"><img src={publicUrl+"assets/img/logo.png"} alt="Logo" /></Link>
                        </div>
                        
                    </div>
                    </div>
                    <div className="col header-menu-column">
                    <div className="header-menu d-none d-xl-block">
                        <nav>
                        <div className="ltn__main-menu go-top">
                            { isAuthenticated
                                ? <ul>
                                    <li className="menu-icon"><Link to="/team">À propos</Link>
                                        <ul>
                                            <li><Link to="/team"> Notre Équipe</Link></li>
                                            <li><Link to="/faq">FAQ</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="/shop-left-sidebar">Annonces</Link></li>
                                    <li><Link to="/wishlist">Favoris</Link></li>
                                    <li><Link to="/contact">Contact</Link></li>
                                </ul>
                                : <ul>
                                    <li ><Link to="/">Acceuil</Link></li>
                                    <li className="menu-icon"><Link to="/team">À propos</Link>
                                        <ul>
                                            <li><Link to="/team"> Notre Équipe</Link></li>
                                            <li><Link to="/faq">FAQ</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="/shop-left-sidebar">Annonces</Link></li>
                                    <li><Link to="/wishlist">Favoris</Link></li>
                                    <li><Link to="/contact">Contact</Link></li>
                                </ul>
                            }
                        </div>
                        </nav>
                    </div>
                    </div>
                    <div className="col ltn__header-options ltn__header-options-2 mb-sm-20">
                
                    {/* user-menu */}
                    <div className="ltn__drop-menu user-menu">
                        <ul>
                        <li>
                            <Link to="#"><i className="icon-user" /></Link>
                            {isAuthenticated
                                ? <ul className="go-top">
                                    <li><Link to="/my-account">Mon profil</Link></li>
                                </ul>
                                : <ul>
                                    <li><Link to="/login">Se connecter</Link></li>
                                    <li><Link to="/register">S'inscrire</Link></li>
                                </ul>
                            }
                        </li>
                        </ul>
                    </div>
                    
                    </div>
                </div>
                </div>
            </div>
            </header>
            <div id="ltn__utilize-mobile-menu" className="ltn__utilize ltn__utilize-mobile-menu">
                <div className="ltn__utilize-menu-inner ltn__scrollbar">
                    <div className="ltn__utilize-menu-head">
                    <div className="site-logo">
                        <Link to="/"><img src={publicUrl+"assets/img/logo.png"} alt="Logo" /></Link>
                    </div>
                    <button className="ltn__utilize-close">×</button>
                    </div>
                    <div className="ltn__utilize-menu-search-form">
                    <form action={"#"}>
                        <input type="text" placeholder="Search..." />
                        <button><i className="fas fa-search" /></button>
                    </form>
                    </div>
                    <div className="ltn__utilize-menu">
                    <ul>
                        <li><a href="#">Acceuil</a>
                        <ul className="sub-menu">
                        <li><Link to="/">Acceuil</Link></li>
                        <li><Link to="/home-v2">Acceuil</Link></li>
                    
                        </ul>
                        </li>
                        <li><Link to="/about">Acceuil</Link>
                        <ul className="sub-menu">
                            <li><Link to="/about">Acceuil</Link></li>
                        
                            <li><Link to="/team">Team</Link></li>
                        
                            <li><Link to="/faq">FAQ</Link></li>
                        
                        </ul>
                        </li>
                        <li><Link to="/shop-left-sidebar">Annonces</Link>
                        <ul className="sub-menu">
                            
                            <li><Link to="/product-details"> Détails Annonce</Link></li>
                        
                            
                        </ul>
                        </li>
                    
                        <li><Link to="#">Pages</Link>
                            <ul className="sub-menu">
                                <li><Link to="/about">Acceuil</Link></li>
                        
                                <li><Link to="/team">Notre Équipe</Link></li>
                                
                                <li><Link to="/faq">FAQ</Link></li>
                            
                                <li><Link to="/add-listing">Ajouter Annonce</Link></li>
                                
                                <li><Link to="/404">404</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                                
                            </ul>
                        </li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                    </div>
                    <div className="ltn__utilize-buttons ltn__utilize-buttons-2">
                    <ul>
                        <li>
                        <Link to="/my-account" title="My Account">
                            <span className="utilize-btn-icon">
                            <i className="far fa-user" />
                            </span>
                            Mon Profil
                        </Link>
                        </li>
                        <li>
                        <Link to="/wishlist" title="Wishlist">
                            <span className="utilize-btn-icon">
                            <i className="far fa-heart" />
                            <sup>3</sup>
                            </span>
                            Liste Des Favoris
                        </Link>
                        </li>
                        <li>
                    
                        
                        </li>
                    </ul>
                    </div>
                    <div className="ltn__social-media-2">
                    <ul>
                        <li><a href="#" title="Facebook"><i className="fab fa-facebook-f" /></a></li>
                        <li><a href="#" title="Twitter"><i className="fab fa-twitter" /></a></li>
                        <li><a href="#" title="Linkedin"><i className="fab fa-linkedin" /></a></li>
                        <li><a href="#" title="Instagram"><i className="fab fa-instagram" /></a></li>
                    </ul>
                    </div>
                </div>
            </div>

        </div>
        )
    
}


export default Navbar
