import React, { Component } from 'react';

class FeaturesV1 extends Component {

    render() {

    let publicUrl = process.env.PUBLIC_URL+'/'

    let customClass = this.props.customClass ? this.props.customClass :''

    return <div className={ customClass } >
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-title-area ltn__section-title-2--- text-center">
                      <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">Nos Services</h6>
                      <h1 data-testid ="nosService" className="section-title">Nos services</h1>
                    </div>
                  </div>
                </div>
                <div className="row ltn__custom-gutter--- justify-content-center go-top">
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
                      <div className="ltn__feature-icon">
                        <img src={publicUrl+"assets/img/icons/icon-img/21.png"} alt="#" />
                      </div>
                      <div className="ltn__feature-info">
                        <h3>Acheter</h3>
                        <p>Plus de 1000 biens immobilés à vendre sont disponibles sur le site , explorez les et decidez lesquels vous plaisent.</p>
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1 active">
                      <div className="ltn__feature-icon">
                        <img src={publicUrl+"assets/img/icons/icon-img/22.png"} alt="#" />
                      </div>
                      <div className="ltn__feature-info">
					  <h3>Louer</h3>
                
                        <p>Environs 1500 biens immobiliers à louer sont disponibles sur "Hawesly" , trouvez vos besoins avec le prix qui vous convient.</p>
                       
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
                      <div className="ltn__feature-icon">
                        <img src={publicUrl+"assets/img/icons/icon-img/23.png"} alt="#" />
                      </div>
                      <div className="ltn__feature-info">
					  <h3>Vendre</h3>
                        <p>Voulez-vous vendre une maison,terrain ou appartement ? connectez-vous alors et déposez votre bien.</p>
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }
}

export default FeaturesV1