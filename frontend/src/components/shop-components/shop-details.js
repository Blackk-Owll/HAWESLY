import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { useState, useEffect, useContext } from "react";

import {
	postMessageOffre,
  } from "../../functionEnvoiMessage/envoyerMessageOffre";
import { ToastContainer, toast } from "react-toastify";
// implementation de la logique de requetes api
import API from "../../API";
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';


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

  const navigate = useNavigate();
  let profile;
	const   [profile_account, setProfile] = useState({});

  function refreshAnnonce() {
    API.get(`/annonces/${idAnnonce}`).then((res) => {
      setAnnonce(res.data);
      console.log("res", res.data);
    });
  }

  // on recuperer le id passé evec le lien
  let idAnnonce = useParams().id;

  // charger l'annonce au chergement de la page

  useEffect(() => {
    // recupere l'annonce
    const isAuthenticated = localStorage.getItem("isAuthenticated");
			if(isAuthenticated){
				const json = localStorage.getItem("profile1");
				const profile1 = JSON.parse(json);
				if (profile1) {
					console.log('profile1: ', profile1);
          profile=profile1;
          setProfile(profile);
          refreshAnnonce();
          console.log(annonce);
				}			
			}
			else{
        toast.error("Veuillez-vous connecter à votre compte pour pouvoir y accéder!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });					navigate('/login');
			}
  }, []);

  function getChamps(
    annonce,
    setCategorie,
    setType,
    setAnnonceur,
    setWilaya,
    setCommune
  ) {
    if (annonce !== undefined) {
      console.log("annonce.categories in shop details: ",annonce.categorie ); 
      console.log("annonce.commune in shop details: ",annonce.commune ); 

      API.get(`/categories/${annonce.categorie}`).then((res) => {
        setCategorie(res.data.label);
        // console.log(res.data.label);
      });

      API.get(`/types/${annonce.type}`).then((res) => {
        setType(res.data.type);
        // console.log(res.data.type);
      });
      console.log("annonce.wilaya in shop details: ",annonce.wilaya ); 
      API.get(`/wilayas/${annonce.wilaya}`).then((res) => {
        console.log("res",res.data.nom);
        setWilaya(res.data.nom);
        // console.log(res.data);
      });
      console.log("annonce.commune in shop details: ",annonce.commune ); 
      API.get(`/communes/${annonce.commune}`).then((res) => {
        setCommune(res.data.nom);
        // console.log(res.data.nom);
      });

      // recuperé le propriètaire de l'annocnce
      API.get(`/users/${annonce.user}`).then((res) => {
        setAnnonceur(res.data);
      });
    }
  }

  // chrger les coordonnée du map  google map

  function chargerMap() {
    const iframeData = document.getElementById("map");
    const lat = annonce.mapX;
    const lon = annonce.mapY;

    iframeData.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=es&z=20&amp;&output=embed`;
    console.log(iframeData.src);
  }

  // charger la localisation de l'Annonce
  useEffect(() => {
    chargerMap();
  }, [annonce]);

  // recuperer les photos de l'annonce
  const [photos, setPhotos] = useState([]);
  function getPhotos(idAnnonce) {
    API.get(`/photos/`).then((res) => {
      console.log(res.data);
      setPhotos(res.data);
    });
  }

  // recupere les chemps ( clés etrangères ) externe en texte

  useEffect(() => {
    getChamps(
      annonce,
      setCategorie,
      setType,
      setAnnonceur,
      setWilaya,
      setCommune
    );
    getPhotos(idAnnonce);
  }, [annonce]);
/*
  function getAnnoncerAdress() {
    console.log("annonceur,annonceur", annonceur);
    console.log("annonceur.wilaya ", annonceur.wilaya);
    API.get(`/wilayas/${annonceur.wilaya}`).then((res) => {
      setAnnonceurWilaya(res.data.nom);
    });

    API.get(`/communes/${annonceur.commune}`).then((res) => {
      setAnnonceurCommune(res.data.nom);
      setAnnonceurId(annonceur.annonceurId);
    });
  }
*/
  // charger l'asresse de l'annonceur
/*
  useEffect(() => {
    getAnnoncerAdress(
      annonceur,
      //setAnnonceurWilaya,
      setAnnonceurCommune,
      setAnnonceurId
    );
  }, [annonceur]);
*/
  //--------- envois des messsage d'offre
  const [contenu, setContenu] = useState("");
  const [messageOffre, setMessageOffre] = useState({});

  function envoieMessage(e) {
    e.preventDefault();
    // l'emetteur sera l'utilisateur authentifié
    let emetteur = profile_account.userId;
    /*********************** */
    console.log(" avant appel ");
    postMessageOffre(contenu, idAnnonce, emetteur, annonceur.userId);
    toast.success("Message d'offre envoyé avec succès !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
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
                    <label>Titre :</label> <span>{annonce.titre}</span>
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
                      <ToastContainer/>
                    </div>
                  </form>
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
                  <img src={publicUrl + "assets/img/user/author.jpg"} alt="Image" />
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

                          <a href={`mailto: ` + annonceur.email}>
                            {"  "}
                            { " "+ annonceur.email}
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
                              { "  0" + annonceur.phone}
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
                                
                                annonceur.adresse
                              }
                            >
                              
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