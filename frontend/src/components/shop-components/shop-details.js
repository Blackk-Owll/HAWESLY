/* Auteur : AMROUCHE Maroua */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useState, useEffect, useContext } from "react";
import {refreshAnnonce,getChamps,getAnnoncerAdress,postMessageOffre} from "../../Controllers/detailsController"
import { toast } from "react-toastify";
// implementation de la logique de requetes api
import API from "../../API";
import { useParams } from "react-router-dom";

function ShopDetails() {
  // recuperer le id de l'annonce et ses details

  let publicUrl = process.env.PUBLIC_URL + "/";

  const [annonce, setAnnonce] = useState({});
  const [categorie, setCategorie] = useState("");
  const [type, setType] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [commune, setCommune] = useState("");
  // les info du contact
  const [annonceur, setAnnonceur] = useState({});
  const [annonceurWilaya, setAnnonceurWilaya] = useState("");
  const [annonceurCommune, setAnnonceurCommune] = useState("");
  const [annonceurId, setAnnonceurId] = useState(0);

  // on recuperer le id passé evec le lien

  let idAnnonce = useParams().id;
 let x= 5;
  // charger l'annonce au chergement de la page
  useEffect(() => {
    // recupere l'annonce
    refreshAnnonce(setAnnonce,idAnnonce);
    console.log(annonce);
    
  }, []);

  // chrger les coordonnée du map  google map

  function chargerMap() {
    const iframeData = document.getElementById("map");
    const lat = annonce.mapX;
    const lon = annonce.mapY;
    const zoom = annonce.zoom;

    iframeData.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=es&z=${zoom}&amp;&output=embed`;
    console.log(iframeData.src);
  }
  useEffect(() => {
    chargerMap();
  }, [annonce]);

  // recupere les chemps ( clés etrangères ) externe en texte

  useEffect(() => {
   getChamps(annonce,setCategorie,setType,setAnnonceur,setWilaya,setCommune);
  }, [annonce]);

  // charger l'asresse de l'annonceur

  useEffect(() => {
   getAnnoncerAdress(annonceur,setAnnonceurWilaya,setAnnonceurCommune,setAnnonceurId)
  }, [annonceur]);

  //--------- envois des messsage d'offre
  const [contenu, setContenu] = useState("");
  const [messageOffre, setMessageOffre] = useState({});

  
  function envoieMessage (e) {
    e.preventDefault();
    // l'emetteur sera l'utilisateur authentifié
    let emetteur = 1;
    /*********************** */
    postMessageOffre(contenu,idAnnonce,emetteur);
    toast.success("Message d'offre envoyé avec succès !");

      }

  return (
    <div className="ltn__shop-details-area pb-10">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <div className="ltn__shop-details-inner ltn__page-details-inner mb-60">
              <div className="ltn__blog-meta">
                <ul>
                  <li className="ltn__blog-category">
                    <Link to="#"> {categorie}</Link>
                  </li>
                  <li className="ltn__blog-category">
                    <Link className="bg-orange" to="#">
                      {type}
                    </Link>
                  </li>
                  <li className="ltn__blog-date">
                    <i className="far fa-calendar-alt" />
                    Publiée le {annonce.date && annonce.date}
                  </li>
                  <li>
                    <Link to="#">
                      <i className="far fa-comments" />
                      35 Comments
                    </Link>
                  </li>
                </ul>
              </div>
              <h1>{annonce.titre} </h1>
              <label>
                <span className="ltn__secondary-color">
                  <i className="flaticon-pin" />
                </span>{" "}
                {wilaya}, {commune} , {annonce.adresse}
              </label>
              <h4 className="title-2">Description</h4>
              <p>{annonce.description}</p>
              <h4 className="title-2">Plus de details </h4>
              <div className="property-detail-info-list section-bg-1 clearfix mb-60">
                <ul>
                  <li>
                    <label>ID :</label> <span>{annonce.annonceId}</span>
                  </li>
                  <li>
                    <label>Surface: </label> <span>{annonce.surface} m²</span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <label>Prix:</label> <span> {annonce.prix}</span>
                  </li>
                  <li>
                    <label>Mit pour</label> <span>{categorie}</span>
                  </li>
                </ul>
              </div>
              {/*<h4 className="title-2">Facts and Features</h4>
              <div className="property-detail-feature-list clearfix mb-45">
                <ul>
                  <li>
                    <div className="property-detail-feature-list-item">
                      <i className="flaticon-double-bed" />
                      <div>
                        <h6>Living Room</h6>
                        <small>20 x 16 sq feet</small>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="property-detail-feature-list-item">
                      <i className="flaticon-double-bed" />
                      <div>
                        <h6>Garage</h6>
                        <small>20 x 16 sq feet</small>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="property-detail-feature-list-item">
                      <i className="flaticon-double-bed" />
                      <div>
                        <h6>Dining Area</h6>
                        <small>20 x 16 sq feet</small>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="property-detail-feature-list-item">
                      <i className="flaticon-double-bed" />
                      <div>
                        <h6>Bedroom</h6>
                        <small>20 x 16 sq feet</small>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="property-detail-feature-list-item">
                      <i className="flaticon-double-bed" />
                      <div>
                        <h6>Bathroom</h6>
                        <small>20 x 16 sq feet</small>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="property-detail-feature-list-item">
                      <i className="flaticon-double-bed" />
                      <div>
                        <h6>Gym Area</h6>
                        <small>20 x 16 sq feet</small>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="property-detail-feature-list-item">
                      <i className="flaticon-double-bed" />
                      <div>
                        <h6>Garden</h6>
                        <small>20 x 16 sq feet</small>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="property-detail-feature-list-item">
                      <i className="flaticon-double-bed" />
                      <div>
                        <h6>Parking</h6>
                        <small>20 x 16 sq feet</small>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
             {/*} <h4 className="title-2">From Our Gallery</h4>
              <div className="ltn__property-details-gallery mb-30">
                <div className="row">
                  <div className="col-md-6">
                    <a
                      href={publicUrl + "assets/img/others/14.jpg"}
                      data-rel="lightcase:myCollection"
                    >
                      <img
                        className="mb-30"
                        src={publicUrl + "assets/img/others/14.jpg"}
                        alt="Image"
                      />
                    </a>
                    <a
                      href={publicUrl + "assets/img/others/15.jpg"}
                      data-rel="lightcase:myCollection"
                    >
                      <img
                        className="mb-30"
                        src={publicUrl + "assets/img/others/15.jpg"}
                        alt="Image"
                      />
                    </a>
                  </div>
                  <div className="col-md-6">
                    <a
                      href={publicUrl + "assets/img/others/16.jpg"}
                      data-rel="lightcase:myCollection"
                    >
                      <img
                        className="mb-30"
                        src={publicUrl + "assets/img/others/16.jpg"}
                        alt="Image"
                      />
                    </a>
                  </div>
                </div>
              </div>
             {/* <h4 className="title-2 mb-10">Amenities</h4>
              <div className="property-details-amenities mb-60">
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="ltn__menu-widget">
                      <ul>
                        <li>
                          <label className="checkbox-item">
                            Air Conditioning
                            <input type="checkbox" defaultChecked="checked" />
                            <span className="checkmark" />
                          </label>
                        </li>
                        <li>
                          <label className="checkbox-item">
                            Gym
                            <input type="checkbox" defaultChecked="checked" />
                            <span className="checkmark" />
                          </label>
                        </li>
                        <li>
                          <label className="checkbox-item">
                            Microwave
                            <input type="checkbox" defaultChecked="checked" />
                            <span className="checkmark" />
                          </label>
                        </li>
                        <li>
                          <label className="checkbox-item">
                            Swimming Pool
                            <input type="checkbox" defaultChecked="checked" />
                            <span className="checkmark" />
                          </label>
                        </li>
                        <li>
                          <label className="checkbox-item">
                            WiFi
                            <input type="checkbox" defaultChecked="checked" />
                            <span className="checkmark" />
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="ltn__menu-widget">
                      <ul>
                        <li>
                          <label className="checkbox-item">
                            Barbeque
                            <input type="checkbox" defaultChecked="checked" />
                            <span className="checkmark" />
                          </label>
                        </li>
                        <li>
                          <label className="checkbox-item">
                            Recreation
                            <input type="checkbox" defaultChecked="checked" />
                            <span className="checkmark" />
                          </label>
                        </li>
                        <li>
                          <label className="checkbox-item">
                            Microwave
                            <input type="checkbox" defaultChecked="checked" />
                            <span className="checkmark" />
                          </label>
                        </li>
                        <li>
                          <label className="checkbox-item">
                            Basketball Cout
                            <input type="checkbox" defaultChecked="checked" />
                            <span className="checkmark" />
                          </label>
                        </li>
                        <li>
                          <label className="checkbox-item">
                            Fireplace
                            <input type="checkbox" defaultChecked="checked" />
                            <span className="checkmark" />
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="ltn__menu-widget">
                      <ul>
                        <li>
                          <label className="checkbox-item">
                            Refrigerator
                            <input type="checkbox" defaultChecked="checked" />
                            <span className="checkmark" />
                          </label>
                        </li>
                        <li>
                          <label className="checkbox-item">
                            Window Coverings
                            <input type="checkbox" defaultChecked="checked" />
                            <span className="checkmark" />
                          </label>
                        </li>
                        <li>
                          <label className="checkbox-item">
                            Washer
                            <input type="checkbox" defaultChecked="checked" />
                            <span className="checkmark" />
                          </label>
                        </li>
                        <li>
                          <label className="checkbox-item">
                            24x7 Security
                            <input type="checkbox" defaultChecked="checked" />
                            <span className="checkmark" />
                          </label>
                        </li>
                        <li>
                          <label className="checkbox-item">
                            Indoor Game
                            <input type="checkbox" defaultChecked="checked" />
                            <span className="checkmark" />
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
  </div>*/}
              <h4 className="title-2">Localisation</h4>
              <div className="property-details-google-map mb-60">
                <iframe
                  id="map"
                  // src="https://maps.google.com/maps?q=+36.722766877219634,3.1850375926974666&hl=es&z=14&amp;output=embed"
                  width="100%"
                  height="100%"
                  frameBorder={0}
                  allowFullScreen
                  aria-hidden="false"
                  tabIndex={0}
                ></iframe>
              </div>

              <div className="ltn__shop-details-tab-content-inner--- ltn__shop-details-tab-inner-2 ltn__product-details-review-inner mb-60">
                {/* comment-reply */}
                <div className="ltn__comment-reply-area ltn__form-box mb-30">
                  <form action="#">
                    <h4>Envoyer un message d'offre</h4>
                    <div className="mb-30">
                      <div className="add-a-review"></div>
                    </div>
                    <div className="input-item input-item-textarea ltn__custom-icon">
                      <textarea
                        onChange={(e) => setContenu(e.target.value)}
                        placeholder="Ecrivez vos commentaire et messages d'offres ...."
                        defaultValue={""}
                      />
                    </div>

                    <div className="btn-wrapper">
                      <button
                        onClick={envoieMessage}
                        className="btn theme-btn-1 btn-effect-1 text-uppercase"
                        type="submit"
                      >
                        Envoyer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <h4 className="title-2"> peut être interessant </h4>
              <div className="row">
                {/* ltn__product-item */}
                <div className="col-xl-6 col-sm-6 col-12 go-top">
                  <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5 text-center---">
                    <div className="product-img">
                      <Link to="/shop">
                        <img
                          src={publicUrl + "assets/img/product-3/1.jpg"}
                          alt="#"
                        />
                      </Link>
                      <div className="real-estate-agent">
                        <div className="agent-img">
                          <Link to="/team-details">
                            <img
                              src={publicUrl + "assets/img/blog/author.jpg"}
                              alt="#"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="product-info">
                      <div className="product-badge">
                        <ul>
                          <li className="sale-badg">For Rent</li>
                        </ul>
                      </div>
                      <h2 className="product-title">
                        <Link to="/shop">New Apartment Nice View</Link>
                      </h2>
                      <div className="product-img-location">
                        <ul>
                          <li>
                            <Link to="/shop">
                              <i className="flaticon-pin" /> Belmont Gardens,
                              Chicago
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <ul className="ltn__list-item-2--- ltn__list-item-2-before--- ltn__plot-brief">
                        <li>
                          <span>3 </span>
                          Bedrooms
                        </li>
                        <li>
                          <span>2 </span>
                          Bathrooms
                        </li>
                        <li>
                          <span>3450 </span>
                          square Ft
                        </li>
                      </ul>
                      <div className="product-hover-action">
                        <ul>
                          <li>
                            <a
                              href="#"
                              title="Quick View"
                              data-bs-toggle="modal"
                              data-bs-target="#quick_view_modal"
                            >
                              <i className="flaticon-expand" />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              title="Wishlist"
                              data-bs-toggle="modal"
                              data-bs-target="#liton_wishlist_modal"
                            >
                              <i className="flaticon-heart-1" />
                            </a>
                          </li>
                          <li>
                            <Link to="/shop" title="Compare">
                              <i className="flaticon-add" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="product-info-bottom">
                      <div className="product-price">
                        <span>
                          $349,00<label>/Month</label>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ltn__product-item */}
                <div className="col-xl-6 col-sm-6 col-12 go-top">
                  <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5 text-center---">
                    <div className="product-img">
                      <Link to="/shop">
                        <img
                          src={publicUrl + "assets/img/product-3/2.jpg"}
                          alt="#"
                        />
                      </Link>
                      <div className="real-estate-agent">
                        <div className="agent-img">
                          <Link to="/team-details">
                            <img
                              src={publicUrl + "assets/img/blog/author.jpg"}
                              alt="#"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="product-info">
                      <div className="product-badge">
                        <ul>
                          <li className="sale-badg">For Sale</li>
                        </ul>
                      </div>
                      <h2 className="product-title">
                        <Link to="/shop">New Apartment Nice View</Link>
                      </h2>
                      <div className="product-img-location">
                        <ul>
                          <li>
                            <Link to="/shop">
                              <i className="flaticon-pin" /> Belmont Gardens,
                              Chicago
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <ul className="ltn__list-item-2--- ltn__list-item-2-before--- ltn__plot-brief">
                        <li>
                          <span>3 </span>
                          Bedrooms
                        </li>
                        <li>
                          <span>2 </span>
                          Bathrooms
                        </li>
                        <li>
                          <span>3450 </span>
                          square Ft
                        </li>
                      </ul>
                      <div className="product-hover-action">
                        <ul>
                          <li>
                            <a
                              href="#"
                              title="Quick View"
                              data-bs-toggle="modal"
                              data-bs-target="#quick_view_modal"
                            >
                              <i className="flaticon-expand" />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              title="Wishlist"
                              data-bs-toggle="modal"
                              data-bs-target="#liton_wishlist_modal"
                            >
                              <i className="flaticon-heart-1" />
                            </a>
                          </li>
                          <li>
                            <a href="portfolio-details.html" title="Compare">
                              <i className="flaticon-add" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="product-info-bottom">
                      <div className="product-price">
                        <span>
                          $349,00<label>/Month</label>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar---">
              {/* Author Widget */}
              <h4 className="title-2">Contactez le propriétaire</h4>
              <div className="widget ltn__author-widget">
                <div className="ltn__author-widget-inner text-center">
                  <img src={publicUrl + "assets/img/team/4.jpg"} alt="Image" />
                  <h5>
                    {" "}
                    {annonceur.nom} {annonceur.prenom}{" "}
                  </h5>
                  <small>
                    Vous pouvez contactez le propriétaire pour négocier{" "}
                  </small>
                  <div className="product-ratting">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fas fa-star" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fas fa-star" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fas fa-star" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fas fa-star-half-alt" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="far fa-star" />
                        </a>
                      </li>
                      <li className="review-total">
                        {" "}
                        <a href="#"> ( 1 Reviews )</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="ltn__author-widget-inner text-left">
                  <div className="property-detail-info-list section-bg-1 clearfix mb-60">
                    <ul>
                      <li>
                        <label>
                          <span className="ltn__secondary-color">
                            <i className="icon-mail" />
                          </span>

                          <a href={`mailto:` + annonceur.email}>
                            {"  "}
                            {annonceur.email}
                          </a>
                        </label>
                      </li>

                      <li>
                        <label>
                          <p>
                            <span className="ltn__secondary-color">
                              <i className="icon-call" />
                            </span>
                            {"  "}
                            <a href={"tel:?" + annonceur.phone}>
                              {" :" + " 0" + annonceur.phone}
                            </a>
                          </p>
                        </label>
                      </li>
                      <li>
                        <label>
                          <p>
                            <span className="ltn__secondary-color">
                              <i className="icon-placeholder" />
                            </span>{" "}
                            <a
                              href={
                                "https://www.google.com/maps?q=" +
                                annonceurWilaya +
                                "," +
                                annonceurCommune +
                                "," +
                                annonceur.adresse
                              }
                            >
                              {"  "}
                              {annonceurWilaya} , {" " + annonceurCommune} ,{" "}
                              {" " + annonceur.adresse}{" "}
                            </a>
                          </p>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Banner Widget */}
              <div className="widget ltn__banner-widget d-none go-top">
                <Link to="/shop">
                  <img src={publicUrl + "assets/img/banner/2.jpg"} alt="#" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopDetails;
