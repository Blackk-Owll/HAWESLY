import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import Pdf from './TermsOfUse/Terms.pdf';
import { useState, useEffect, useContext } from "react";
//linking frontend with backend:
import API from "../../API";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from 'react-router-dom';
import AsyncSelect from "react-select/async";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//implementing the register logic:


function Register () {

    
       // let publicUrl = process.env.PUBLIC_URL+'/'
		// State for navigating to another page after registering
		const navigate = useNavigate();
		let profile1;
		// States for registration
		const [prenom, setName] = useState('');
		const [nom, setLastName] = useState('');
		const [phone, setPhoneNumber] = useState('');
		const [email, setEmail] = useState('');
		const [adresse, setAdresse] = useState('');
	
		

		const [wilaya, setWilaya] = useState('');
      	const [commune, setCommune] = useState('');
		let [list, setList] = useState([]);
		

		const profile = { email,  nom,prenom, adresse, phone, wilaya,commune};

 		const [wilayas, setWilayas] = useState([]);
      	const [communes, setCommunes] = useState([]);

		// Handling the name change
		const handleName = (e) => {
		  setName(e.target.value);
		};

		// Handling the lastname change
		const handleLastName = (e) => {
			setLastName(e.target.value);        
		};

		// Handling the phoneNumber change
		const handlePhoneNumber = (e) => {
			setPhoneNumber(e.target.value);
		};
	   
		// Handling the email change
		const handleEmail = (e) => {
		  setEmail(e.target.value);
		};

	   // Handling the  adress change
		const handleAdresse = (e) => {
			setAdresse(e.target.value);
		};
/* 
		// Handling the  wilaya change
		const handleWilaya = value =>{
            recupererWilaya();
		};

		// Handling the  commune change
 		const handleCommune = value =>{
            setCommune(value.communeId);
			console.log('list in handleCommune1', list);
		};
/*
		const recupererWilaya = () =>{
			/*return API.get(`wilayas/`).then((res) => {
				 res = res.data;
				return res;
			   });
			
			list.map((item, index) => {
				console.log('item: ', item);
				if (item.communeId === commune){
					setWilaya(item.wilaya);
					console.log('commune:',commune);
					console.log('wilaya:',wilaya);
				}
			})
			
		}


		const recupererCommune = () =>{
			return API.get(`communes/`).then((res) => {
				 setList(res.data);
				
				 console.log('list in handleCommune12', list);

				 res = res.data;
				return res;
			   });
		}

		useEffect(() => {
			console.log('list in handleCommune3', list);
			console.log('communeId3 ', commune);
			list.map((item, index) => {
				console.log('item: ', item);
				if (item.communeId === commune){
					setWilaya(item.wilaya);
					console.log('commune:',commune);
					console.log('wilaya:',wilaya);
				}
			})
		},[commune] );
*/
		

		const saveUser = async() =>{
			profile1 = profile;
			console.log('info:', prenom, ' ,',nom, ' ,',email, ', ',phone,' ,', adresse, ' ,', wilaya, ' ,', commune);
			API.post(`/users/`,{
				//userId: null,
				email: email,
				nom: nom,
				prenom: prenom,
				adresse: adresse,
				phone: phone,
				//wilaya: wilaya,
				//commune: commune,
			  },{
				headers: {
				  "Content-Type": "application/x-www-form-urlencoded",
				},
			  }
			).then((res => {
				toast.success('Inscription réussite...veuillez vous connecter!', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					});					
			}))
		  };

		  
		  

    return  <div className="ltn__login-area pb-110">
				<div className="container">
				<div className="row">
					<div className="col-lg-12">
					<div className="section-title-area text-center">
						<h1 className="section-title">Inscription</h1>
						<p>Si vous n'avez pas de compte inscrivez-vous !</p>
					</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6 offset-lg-3">
					<div className="account-login-inner">
						<form action="#" className="ltn__form-box contact-form-box">
						<input onChange={handleName} type="text" name="firstname" placeholder="Prénom*" required/>
						<input onChange={handleLastName} type="text" name="lastname" placeholder="Nom*" required />
						<input onChange={handleAdresse} type="text" name="Adresse" placeholder="Adresse*" required />						
						 {/*
                            <div className="input-item ">
								<AsyncSelect
									cacheOptions
									defaultOptions
									value={communes}
									getOptionLabel={e => e.nom  }
									getOptionValue={e => e.communeId}
									loadOptions={recupererCommune}
									onChange={handleCommune}
									placeholder='Commune'
								/>
                                  <br></br> 
                            </div>
                        
                       
                            <div className="input-item input-item-name ltn__custom-icon">
                            	<AsyncSelect
									cacheOptions
									defaultOptions
									value={wilayas}
									getOptionLabel={e => e.nom}
									getOptionValue={e => e.wilayaId}
									loadOptions={recupererWilaya}
									onChange={handleWilaya}
									placeholder='Wilaya'
								/>
								<br></br>  <br></br>
                            </div> 
						*/}
						<input onChange={handlePhoneNumber}  type="text" name="phonenumber" placeholder="Numéro de telephone*" required />
						<input onChange={handleEmail} type="email" name="email" placeholder="Email*" required />
						<label className="checkbox-inline">
							<input type="checkbox" defaultValue required /> &nbsp;
							En appuyant sur "creer un compte", j'accepte votre politique privée.
						</label>
						<div className="btn-wrapper">
							<button onClick={saveUser} className="theme-btn-1 btn reverse-color btn-block" type="submit">CREER UN COMPTE</button>
							<ToastContainer />
						</div>
						
						</form>
						<ToastContainer />
						<div className="by-agree text-center">
						<p>En crayant un compte, vous acceptez nos:</p>
						{//I added a link to my pdf file
						}
						
						<p><a href= {Pdf} target="_blank" rel="noreferrer" >TERMES D'UTILISATION  &nbsp; &nbsp; | &nbsp; &nbsp;  POLITIQUE PRIVEE</a></p>
						<div className="go-to-btn mt-50 go-top">
							<Link to="/login">VOUS AVEZ DEJA UN COMPTE ?</Link>
						</div>
						</div>
					</div>
					</div>
				</div>
				</div>
			</div>
					
}
		


export default Register