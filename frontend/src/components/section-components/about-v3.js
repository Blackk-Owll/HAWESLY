import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class AboutV3 extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return  <div className="ltn__about-us-area pt-115 pb-100 ">
			  <div className="container">
			    <div className="row">
			      <div className="col-lg-6 align-self-center">
			        <div className="about-us-img-wrap about-img-left">
			          <img src={publicUrl+"assets/img/others/11.jpg"} alt="About Us Image" />
			          <div className="about-us-img-info about-us-img-info-2 about-us-img-info-3 d-none">
			            <div className="ltn__video-img ltn__animation-pulse1">
			              <img src={publicUrl+"assets/img/others/8.png"} alt="video popup bg image" />
			              <a className="ltn__video-icon-2 ltn__video-icon-2-border---" href="https://www.youtube.com/embed/X7R-q9rsrtU?autoplay=1&showinfo=0" data-rel="lightcase:myCollection">
			                <i className="fa fa-play" />
			              </a>
			            </div>
			          </div>
			        </div>
			      </div>
			      <div className="col-lg-6 align-self-center">
			        <div className="about-us-info-wrap">
			          <div className="section-title-area ltn__section-title-2--- mb-30">
			            <h6 className="section-subtitle section-subtitle-2--- ltn__secondary-color">About Us</h6>
			            <h1 className="section-title">Deposez et explorer les annonces immobilères</h1>
			            <p> 
							Hously est le site qui vous permet de promouvoir vos annonces immobilière , de different types que se soit maisons , vila terrain agricol ou autres 
						</p>
			          </div>                        
			          <div className="ltn__feature-item ltn__feature-item-3">
			            <div className="ltn__feature-icon">
			              <span><i className="flaticon-house-3" /></span>
			            </div>
			            <div className="ltn__feature-info">
			              <h4><a href="service-details.html">Déposez vos annonces</a></h4>
			              <p> déposer, chercher et filtrer les annonces selon le prix qui vous convient , et négocier avec le propriètaire</p>
			            </div>
			          </div>
			          <div className="ltn__feature-item ltn__feature-item-3">
			            <div className="ltn__feature-icon">
			              <span><i className="flaticon-loupe" /></span>
			            </div>
			            <div className="ltn__feature-info">
			              <h4><a href="service-details.html">Explorer d'autre annonces </a></h4>
			              <p> si vous vous interessez à une annonce ,vous pouver alors directement appeler le propriètaire ou le contacter par mail </p>
			            </div>
			          </div>
			          <div className="ltn__feature-item ltn__feature-item-3">
			            <div className="ltn__feature-icon">
			              <span><i className="flaticon-maps-and-location" /></span>
			            </div>
			            <div className="ltn__feature-info">
			              <h4><a href="service-details.html">Choisissez la localisation</a></h4>
			              <p> deposer et explorer les annonces avec leur emplacement exact de l'immobiler à travers google map </p>
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
        }
}

export default AboutV3