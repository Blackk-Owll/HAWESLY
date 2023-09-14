
import React, { Component } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

class BannerV2 extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    let imagealt = "image";

    return (
      <div className="ltn__slider-area ltn__slider-11  ltn__slider-11-slide-item-count-show--- ltn__slider-11-pagination-count-show--- section-bg-1">
        <div className="ltn__slider-11-inner">
          <div className="ltn__slider-11-active">
            {/* slide-item */}
            <div className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-3-normal ltn__slide-item-3 ltn__slide-item-11">
              <div className="ltn__slide-item-inner">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 align-self-center">
                      <div className="slide-item-info">
                        <div className="slide-item-info-inner ltn__slide-animation">
                          <div className="slide-video mb-50 d-none">
                            <a
                              className="ltn__video-icon-2 ltn__video-icon-2-border"
                              href="https://www.youtube.com/embed/tlThdr3O5Qo"
                              data-rel="lightcase:myCollection"
                            >
                              <i className="fa fa-play" />
                            </a>
                          </div>
                          <h6 className="slide-sub-title white-color--- animated">
                            <span>
                              <i className="fas fa-home" />
                            </span>{" "}
                            Annonces immobilières
                          </h6>
                          <h1 className="slide-title animated ">
                           Le bon <span>réflexe </span>pour  <br />
                            bien se loger
                          </h1>
                          <div className="slide-brief animated">
                            <p>
                              Bosoin d'acheter, louer ou vendre un Immobiler ?
                              <br/>Maison, Villa, Appartement, Terrain ou
                              autres ? 
                              <br/>HAWESLY est le meiller étage de l'immobilier!
                            </p>
                          </div>
                          <div className="btn-wrapper animated">
                            <Link
                              to="/login"
                              className="theme-btn-1 btn btn-effect-1"
                            >
                              SE CONNECTER
                            </Link>
                            <Link
                              to="/register"
                              className="btn btn-transparent btn-effect-3"
                            >
                              S'INSCRIRE
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="slide-item-img">
                        <img
                          src={publicUrl + "assets/img/slider/PhotoHome1.jpg"}
                          alt="#"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* slide-item */}
            <div className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-3-normal ltn__slide-item-3 ltn__slide-item-11">
              <div className="ltn__slide-item-inner">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 align-self-center">
                      <div className="slide-item-info">
                        <div className="slide-item-info-inner ltn__slide-animation">
                          <div className="slide-video mb-50 d-none">
                            <a
                              className="ltn__video-icon-2 ltn__video-icon-2-border"
                              href="https://www.youtube.com/embed/tlThdr3O5Qo"
                              data-rel="lightcase:myCollection"
                            >
                              <i className="fa fa-play" />
                            </a>
                          </div>
                          <h6 className="slide-sub-title white-color--- animated">
                            <span>
                              <i className="fas fa-home" />
                            </span>{" "}
                            Annonces immobilières
                          </h6>
                          <h1 className="slide-title animated ">
                            Terrains <br /> agricoles
                          </h1>
                          <div className="slide-brief animated">
                            <p>
                              Trouvez des terrains agricoles dans tous les wilayas d'Algerie !  
                            </p>
                          </div>
                          <div id="btn-se-connecter" className="btn-wrapper animated">
                            <Link 
                              to="/login"
                              className="theme-btn-1 btn btn-effect-1"
                            >
                              SE CONNECTER
                              
                            </Link>
                            <Link
                              to="/about"
                              className="btn btn-transparent btn-effect-3"
                            >
                              S'INSCRIRE
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="slide-item-img">
                        <img
                          src={publicUrl + "assets/img/slider/AGRICOL.jpg"}
                          alt="#"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* slide-item */}
            <div className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-3-normal ltn__slide-item-3 ltn__slide-item-11">
              <div className="ltn__slide-item-inner">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 align-self-center">
                      <div className="slide-item-info">
                        <div className="slide-item-info-inner ltn__slide-animation">
                          <div className="slide-video mb-50 d-none">
                            <a
                              className="ltn__video-icon-2 ltn__video-icon-2-border"
                              href="https://www.youtube.com/embed/tlThdr3O5Qo"
                              data-rel="lightcase:myCollection"
                            >
                              <i className="fa fa-play" />
                            </a>
                          </div>
                          <h6 className="slide-sub-title white-color--- animated">
                            <span>
                              <i className="fas fa-home" />
                            </span>{" "}
                            Annonces immobilières
                          </h6>
                          <h1 className="slide-title animated ">
                            L'appartement <br />de vos rèves
                          </h1>
                          <div className="slide-brief animated">
                            <p>
                              Louer et acheter des appartements avec bons prix..Toujours la négociation avant l'habitation ! 
                            </p>
                          </div>
                          <div className="btn-wrapper animated">
                            <Link
                              to="/service"
                              className="theme-btn-1 btn btn-effect-1"
                            >
                              SE CONNECTER
                            </Link>
                            <Link
                              to="/about"
                              className="btn btn-transparent btn-effect-3"
                            >
                              S'INSCRIRE
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="slide-item-img">
                        <img
                          src={publicUrl + "assets/img/slider/HOME4.jpg"}
                          alt="#"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* slide-item */}
            <div className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-3-normal ltn__slide-item-3 ltn__slide-item-11">
              <div className="ltn__slide-item-inner">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 align-self-center">
                      <div className="slide-item-info">
                        <div className="slide-item-info-inner ltn__slide-animation">
                          <div className="slide-video mb-50 d-none">
                            <a
                              className="ltn__video-icon-2 ltn__video-icon-2-border"
                              href="https://www.youtube.com/embed/tlThdr3O5Qo"
                              data-rel="lightcase:myCollection"
                            >
                              <i className="fa fa-play" />
                            </a>
                          </div>
                          <h6 className="slide-sub-title white-color--- animated">
                            <span>
                              <i className="fas fa-home" />
                            </span>{" "}
                            Annonces immobilières
                          </h6>
                          <h1 className="slide-title animated ">
                            Passez de<span> merveilleux</span> <br /> vacances
                          </h1>
                          <div className="slide-brief animated">
                            <p>
                              En louant des bangalows dans des endroits exceptionnelles !  
                            </p>
                          </div>
                          <div className="btn-wrapper animated">
                            <Link
                              to="/service"
                              className="theme-btn-1 btn btn-effect-1"
                            >
                              SE CONNECTER
                            </Link>
                            <Link
                              to="/about"
                              className="btn btn-transparent btn-effect-3"
                            >
                              S'INSCRIRE
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="slide-item-img">
                        <img
                          src={publicUrl + "assets/img/slider/BANGALO.jpg"}
                          alt="#"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>

          {/* slider-4-pagination */}
          <div className="ltn__slider-11-pagination-count">
            <span className="count" />
            <span className="total" />
          </div>
          {/* slider-sticky-icon */}
          <div className="slider-sticky-icon-2">
            <ul>
              <li>
                <a href="#" title="Facebook">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li>
                <a href="#" title="Twitter">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li>
                <a href="#" title="Linkedin">
                  <i className="fab fa-linkedin" />
                </a>
              </li>
            </ul>
          </div>
          {/* slider-4-img-slide-arrow */}
          <div className="ltn__slider-11-img-slide-arrow">
            <div className="ltn__slider-11-img-slide-arrow-inner">
              <div className="ltn__slider-11-img-slide-arrow-active">
                <div className="image-slide-item">
                  <img
                    src={publicUrl + "assets/img/slider/PhotoHome1.jpg"}
                    alt="Flower Image"
                  />
                </div>
                <div className="image-slide-item">
                  <img
                    src={publicUrl + "assets/img/slider/AGRICOL.jpg"}
                    alt="Flower Image"
                  />
                </div>
                <div className="image-slide-item">
                  <img
                    src={publicUrl + "assets/img/slider/HOME4.jpg"}
                    alt="Flower Image"
                  />
                </div>
                <div className="image-slide-item">
                  <img
                    src={publicUrl + "assets/img/slider/BANGALO.jpg"}
                    alt="Flower Image"
                  />
                </div>
              </div>
              {/* slider-4-slide-item-count */}
              <div className="ltn__slider-11-slide-item-count">
                <span className="count" />
                <span className="total" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BannerV2;