import React, { Component  , useEffect, useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { ToastContainer, toast } from 'react-toastify';

function TeamV2 () {


        let publicUrl = process.env.PUBLIC_URL+'/'
        let imagealt = 'image'

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

    return <div className="ltn__team-area pt-110--- pb-90">
				<div className="container">
				<div className="row justify-content-center go-top">
					<div className="col-lg-4 col-sm-4">
					<div className="ltn__team-item ltn__team-item-3---">
						<div className="team-img">
						<img src={publicUrl+"assets/img/team/anissa.jpg"} alt="Image" />
						</div>
						<div className="team-info">
						<h4>Belaidi Anissa Nesrine</h4>
						
						<div className="ltn__social-media">
							<ul>
							<li><a href="#"><i className="fab fa-facebook-f" /></a></li>
							<li><a href="#"><i className="fab fa-twitter" /></a></li>
							<li><a href="#"><i className="fab fa-linkedin" /></a></li>
							</ul>
						</div>
						</div>
					</div>
					</div>
					<div className="col-lg-4 col-sm-4">
					<div className="ltn__team-item ltn__team-item-3---">
						<div className="team-img">
						<img src={publicUrl+"assets/img/team/Maroua.jpg"} alt="Image" />
						</div>
						<div className="team-info">
						<h4>Amrouche Maroua</h4>
					
						<div className="ltn__social-media">
							<ul>
							<li><a href="#"><i className="fab fa-facebook-f" /></a></li>
							<li><a href="#"><i className="fab fa-twitter" /></a></li>
							<li><a href="#"><i className="fab fa-linkedin" /></a></li>
							</ul>
						</div>
						</div>
					</div>
					</div>
					<div className="col-lg-4 col-sm-4">
					<div className="ltn__team-item ltn__team-item-3---">
						<div className="team-img">
						<img src={publicUrl+"assets/img/team/amina.jpg"} alt="Image" />
						</div>
						<div className="team-info">
						<h4>Ayad Amina</h4>
					
						<div className="ltn__social-media">
							<ul>
							<li><a href="#"><i className="fab fa-facebook-f" /></a></li>
							<li><a href="#"><i className="fab fa-twitter" /></a></li>
							<li><a href="#"><i className="fab fa-linkedin" /></a></li>
							</ul>
						</div>
						</div>
					</div>
					</div>
					<div className="col-lg-4 col-sm-4">
					<div className="ltn__team-item ltn__team-item-3---">
						<div className="team-img">
						<img src={publicUrl+"assets/img/team/selina.jpg"} alt="Image" />
						</div>
						<div className="team-info">
						<h4>Sendjakeddine Selina</h4>
						
						<div className="ltn__social-media">
							<ul>
							<li><a href="#"><i className="fab fa-facebook-f" /></a></li>
							<li><a href="#"><i className="fab fa-twitter" /></a></li>
							<li><a href="#"><i className="fab fa-linkedin" /></a></li>
							</ul>
						</div>
						</div>
					</div>
					</div>
				
					
				
					<div className="col-lg-4 col-sm-6">
					<div className="ltn__team-item ltn__team-item-3---">
						<div className="team-img">
						<img src={publicUrl+"assets/img/team/rania.jpg"} alt="Image" />
						</div>
						<div className="team-info">
						<h4>Grireh Rania</h4>
						
						<div className="ltn__social-media">
							<ul>
							<li><a href="#"><i className="fab fa-facebook-f" /></a></li>
							<li><a href="#"><i className="fab fa-twitter" /></a></li>
							<li><a href="#"><i className="fab fa-linkedin" /></a></li>
							</ul>
						</div>
						</div>
					</div>
					</div>
					
				</div>
				</div>
			</div>
        
}

export default TeamV2