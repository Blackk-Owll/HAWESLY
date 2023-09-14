import React, { Component, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import parse from 'html-react-parser';
import { ToastContainer, toast } from 'react-toastify';

function FaqV1( ){

    
        

        let publicUrl = process.env.PUBLIC_URL+'/'
        const location = useLocation();
		const navigate = useNavigate();
		let  [profile_account, setProfile] = useState({});

		useEffect(() => {
				const json = localStorage.getItem("profile1");
				const profile1 = JSON.parse(json);
				if (profile1) {
					console.log('profile1: ', profile1);
					profile_account=profile1;
				}			
		},[])

    return <div className="ltn__faq-area mb-100">
            <div className="container">
            <div className="row">
                <div className="col-lg-8">
                <div className="ltn__faq-inner ltn__faq-inner-2">

                    <div id="accordion_2">
                
                        <div className="card">
                            <h6 className="collapsed ltn__card-title" data-bs-toggle="collapse" data-bs-target="#faq-item-2-1" aria-expanded="false">
                            Comment ajouter ma propre annonce ?
                            </h6>
                            <div id="faq-item-2-1" className="collapse" data-bs-parent="#accordion_2">
                            <div className="card-body">
                                <p>Pour ajouter une annonce , il faut accéder à la page "Ajouter annonce" en appuyant sur le boutton en haut à gauche puis ajouter les informations de votre annonce.</p>
                            </div>
                            </div>
                        </div>
                    
                        <div className="card">
                            <h6 className="ltn__card-title" data-bs-toggle="collapse" data-bs-target="#faq-item-2-2" aria-expanded="true"> 
                            Est ce que je peux visualiser mes propres annonces ?
                            </h6>
                            <div id="faq-item-2-2" className="collapse show" data-bs-parent="#accordion_2">
                            <div className="card-body">
                            
                                <p>Vous trouverez tous vos propres annonces dans la page "mes annonces" ainsi que leurs détailles.</p>
                            </div>
                            </div>
                        </div>                          
                    
                        <div className="card">
                            <h6 className="collapsed ltn__card-title" data-bs-toggle="collapse" data-bs-target="#faq-item-2-3" aria-expanded="false">
                            Comment supprimer une annonce que j'ai déja ajoutée ?
                            </h6>
                            <div id="faq-item-2-3" className="collapse" data-bs-parent="#accordion_2">
                            <div className="card-body">
                                <p>Dans la liste de vos annonces , en appuyant sur l'icone de suppression , votre annonce sera bien supprimée.</p>
                            </div>
                            </div>
                        </div>
                    
                        <div className="card">
                            <h6 className="collapsed ltn__card-title" data-bs-toggle="collapse" data-bs-target="#faq-item-2-4" aria-expanded="false">
                            Comment je peux enregistrer les annonces dont je suis interessé ?
                            </h6>
                            <div id="faq-item-2-4" className="collapse" data-bs-parent="#accordion_2">
                            <div className="card-body">
                                <p>Vous pouvez ajouter l'annonce à votre liste favoris en appuyant sur l'icone de favoris en bas.</p>
                            </div>
                            </div>
                        </div>
                    
                        <div className="card">
                            <h6 className="collapsed ltn__card-title" data-bs-toggle="collapse" data-bs-target="#faq-item-2-5" aria-expanded="false">
                            Comment je peux contacter l'annonceur ?
                            </h6>
                            <div id="faq-item-2-5" className="collapse" data-bs-parent="#accordion_2">
                            <div className="card-body">
                                <p>Vous pouvez contacter l'annonceur en lui envoyant un message.</p>
                            </div>
                            </div>
                        </div>
                    </div>
                  
                   
                   
                    <div className="need-support text-center mt-100">
                    <h2>Encore besoin d'aide ? Contactez-nous alors 24/7:</h2>
                    <div className="btn-wrapper mb-30 go-top">
                        <Link to="/contact" className="theme-btn-1 btn">Contactez-nous</Link>
                    </div>
                
                    </div>
                </div>
                </div>
                <div className="col-lg-4">
                <aside className="sidebar-area ltn__right-sidebar">
                    {/* Newsletter Widget */}
                   
                    {/* Banner Widget */}
                    <div className="widget ltn__banner-widget go-top">
                    <Link to="shop.html"><img src={publicUrl+"assets/img/banner/banner-3.jpg"} alt="Banner Image" /></Link>
                    </div>
                </aside>
                </div>
            </div>
            </div>
        </div>
  
        
}

export default FaqV1