import React, { Component } from 'react';
import { Link , useLocation, useNavigate} from 'react-router-dom';
import { useState, useEffect} from "react";
import API from '../../API';
import Pagination from './pagination';
import { ToastContainer, toast } from 'react-toastify';
import Comments from "../blog-components/comments";
import { useGoogleLogout } from 'react-google-login';
import 'react-toastify/dist/ReactToastify.css';


function MyAccount () {

	let pattern = /^[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ ]*$/g;
	const [Name, setName ] = useState("")
	const [LastName, setLastName ] = useState("")
	const [Phone, setPhone ] = useState("")
	const [Mail, setMail ] = useState("")
	const [Adresse, setAdresse ] = useState("")
	const [ChEff, setChEff] = useState(false)
	const [Validate, setValidate] = useState(false)
	const [Res, setRes] = useState(false)



  let publicUrl = process.env.PUBLIC_URL+'/'
   let cpt= [];
   const [annonces, setAnnonce] = useState([]);
   const [photos, setPhotos] = useState([]);
   const [currentpage, setcurrentpage] = useState(1);
   const [postperpage, setpostperpage] = useState(5);
	


 //sso authentication:
 const navigate = useNavigate();
 const clientId = '918287164878-8mg8s8pth9r2717nnhturhrk27co99ap.apps.googleusercontent.com';


 let  profile;
const  [profile_account, setProfile] = useState({});
	
	
 let [wilaya, setWilaya] = useState({});
 let [commune, setCommune] = useState({});

 const [wilaya1, setWilaya1] = useState({});
 const [commune1, setCommune1] = useState({});

 let [list, setList] = useState([]);

 
 //links the variable sent from the login page with ou variable:
 

 useEffect(() => {
	 const isAuthenticated = localStorage.getItem("isAuthenticated");
	 if(isAuthenticated){
		const json = localStorage.getItem("profile1");
		const profile1 = JSON.parse(json);
		if (profile1) {
			console.log('profile1: ', profile1);
			profile = profile1; 
			setProfile(profile);
			console.log('profile_account: ', profile_account);
		}
		 
		 console.log("in my account: ", profile_account);
		 console.log('userId:' , profile_account.userId);
		 console.log("in my account: ", profile_account.email);
		 console.log('profile wilaya: ', profile_account.wilaya);

		 
/*
		 API.get(`wilayas/${profile_account.wilaya}`).then(res => {
			 wilaya = res.data;
			 setWilaya1(wilaya);
			 console.log('wilaya: ', wilaya, wilaya.nom, ' hi');
			 console.log('wilaya1: ',wilaya1);
		 });	
		 API.get(`communes/${profile_account.commune}`).then((res) => {
			 commune = res.data;
			 setCommune1(commune);
			 console.log('commune: ', commune, commune.nom, ' hi2');
			 
		 });
		 */
	 }else{
		
		toast.error("Veuillez-vous connecter à votre compte pour pouvoir y accéder!", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			});
			navigate('/login');		 
			
	 }

 }, []);

 useEffect(() => {
	//setting variables:
	console.log("profile account2: ", profile_account);
	setLastName(profile_account.nom);
	setName(profile_account.prenom);
	setMail(profile_account.email);
	setPhone(profile_account.phone);
	setAdresse(profile_account.adresse);
	 ///////////////////

	 recupererAnnonce();
	 recupererPhotos();		
},[profile_account])


	function ValiderNum(number)
	{console.log( number);
		setRes( pattern.test(number));
	    console.log('res is'+ Res);
		if (Res==true){setValidate(false);}
		else
		 {if ((number>500000000 )&& (number < 799999999 ))
	 {
		 setValidate(true) ;
	 }
	 else{
		
		
		setValidate(false);
		//toast.error("veuillez verifier la validite de votre numero telephone");
	 }
	// console.log(Validate)
	
	}
	 //console.log(Valide)


	}
	const ModifProfil = (e) => {
		e.preventDefault();
		//let UserId = 1 ;
		
	  if(ChEff)
		{API.patch(`/users/${profile_account.userId}/`,{
			
				"nom":LastName,
				"prenom":Name,
				"phone":Phone,
				"adresse":Adresse,
			
		  }, 
			)
			  .then((response) => {
				if(Validate){
				//	console.log(Valide);
				console.log("response in modiefier:",response);
				toast.success('Changement effectués avec succéss!', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					});
										setChEff(false)}
				else{
					//console.log(Validate);
					toast.error('Veuillez vérifier la validité de votre numéro de téléphone!', {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						});				}
			  })
			  .catch((error) => {
				console.log(error.response);
			  });}
		
	  };

   
   const UserAnnonces = annonces.filter((annonce) =>{
      if(annonce.user === profile_account.userId){
        return annonce;
      }else
      return null;
   })
   
   //delete annonce:
    function Delete(id)  {     
      API.delete(`/annonces/${id}/`,{

          headers: {
            "Content-Type": "application/json",
          }
        })
        .then(function (response) {
			toast.success('Annonce supprimmée avec succéss!', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				});	
        })
        .catch((error) => {
            toast.error("Une erreur s'est produite lors de la suppression de l'annonce!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				});	
          })
  }

   // recupere l'annonce
        function recupererAnnonce() {
            API.get(`/annonces`).then((res) => {
              setAnnonce(res.data);
            });
            
        }
       //recuperer les photos de l'annonce
        function recupererPhotos() {
            API.get(`/photos`).then((res) => {
              setPhotos(res.data);
             });
        }
        
        const lastpostindex = currentpage * postperpage;
        const firstpostindex =lastpostindex - postperpage;
        const currentPosts = UserAnnonces.slice(firstpostindex, lastpostindex);

/*
        useEffect(() => {
            recupererAnnonce();
            recupererPhotos();
        }, []);
*/

		//sso functions:
		const onLogoutSuccess = () => {
			console.log('Logged out Successfully');
			console.log('profile after login out: ', profile_account);
			localStorage.removeItem('loginID');
			localStorage.clear();
			navigate('/login');
		};
	
		const onFailure = (res) => {
			console.log('Login failed: res:', res);
		};
	
		const { signOut } = useGoogleLogout({
			clientId,
			onLogoutSuccess,
			onFailure,
		});
	///////////////////////	

    return(
     <div className="liton__wishlist-area pb-70">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* PRODUCT TAB AREA START */}
            <div className="ltn__product-tab-area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="ltn__tab-menu-list mb-50">
                      <div className="nav">                                            
                      <a className="active show" data-bs-toggle="tab" href="#ltn_tab_1_1">Tableau de bord <i className="fas fa-home" /></a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_2">Mon profil <i className="fas fa-user" /></a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_9">Modifier les informations personnelles <i className="fas fa-user" /></a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_5">Mes Annonces <i className="fa-solid fa-list" /></a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_3">Messages d'offres<i className="fa-solid fa-money-check-dollar" /></a>
						<div>
							<a data-bs-toggle="tab" href="#ltn_tab_1_9">
								
										<div className="theme-btn-1 btn black-btn" onClick={signOut} >
												Se Déconnecter
										</div>
								
								<i className="fas fa-sign-out-alt" />
							</a>
						</div>
					  </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="tab-content">
                    <div className="tab-pane fade active show" id="ltn_tab_1_1">
                      <div className="ltn__myaccount-tab-content-inner">
                        <p>Bonjour <strong>{Name+" "+ LastName} </strong></p>
                        <p>A partir de tableau de bord de votre compte vous pouvez:  <ul> <li><span>Voir vos Annonces</span></li> <li><span>Modifier vos coordonnées personnelles</span></li>  <li><span>Consulter La listes des annonces favoris</span></li><li><span>Consulter les messages d'offres </span></li>{/*to add the others if they're done*/}</ul></p>
                      </div>
                    </div>
                      
                    <div className="tab-pane fade" id="ltn_tab_1_2">
						<div className="ltn__myaccount-tab-content-inner">
						  {/* comment-area */}
						  <div className="ltn__comment-area mb-50">
							<div className="ltn-author-introducing clearfix">
							<div className="author-img">
								<img src={publicUrl+"assets/img/user/author.jpg"} alt="Author Image" />
							  </div>
							  <div className="author-info">
								
								<h2>{Name} {LastName}</h2>
								<div className="footer-address">
								  <ul>
									<li>
									  
									  <div className="footer-address-info">
										<p><span className="ltn__secondary-color">
											<i className="icon-placeholder" />
											</span>{" "}
											<a href={"https://www.google.com/maps?q=" +Adresse}>
												{" " + Adresse}{" "}
											</a>
										</p>
									  </div>
									</li>
									<li>
									  
									  <div className="footer-address-info">
										<p><span className="ltn__secondary-color"><i className="icon-call" /></span>
											{"  "}<a href={"tel:?" + Phone}>{ "  0" + Phone}</a>
										</p>
									  </div>
									</li>
									<li>
									  
									  <div className="footer-address-info">
										<p><span className="ltn__secondary-color">
												<i className="icon-mail" />
											</span>

											<a href={`mailto: ` + Mail}>
												{"  "}
												{ " "+ Mail}
											</a>
										</p>
									  </div>
									</li>
								  </ul>
								</div>
							  </div>
							</div>
							
							  
						  </div>
						</div>
					  </div>

            <div className="tab-pane fade" id="ltn_tab_1_4">
						<div className="ltn__myaccount-tab-content-inner">
						  <div className="ltn__form-box">
							<form action="#">
							
							  
							  <div className="col-md-6">
										  <div className="input-item input-item-name ltn__custom-icon">
										  <input rows="2" cols="5" 
                        onChange={((e) => {setName(e.target.value); setChEff(true)})  }
                        placeholder= {'Le prenom'}
                        defaultValue={Name}
                      />
										  </div>
										</div>
										<div className="col-md-6">
										  <div className="input-item input-item-name ltn__custom-icon">
										  <input rows="2" cols="5" 
                        onChange={((e) => {setLastName(e.target.value); setChEff(true)})}
                        placeholder={"Le nom"}
                        defaultValue={LastName}
						
                      />
										  </div>
										</div>
										<div className="col-md-6">
										  <div className="input-item input-item-name ">
										  <input rows="2" cols="5" 
                        onChange={((e) => {setAdresse(e.target.value);setChEff(true)})}
                        placeholder={"l'adresse"}
                        defaultValue={Adresse}
                      />
										  </div>
										</div>
										
										<div className="col-md-6">
										  <div className="input-item input-item-phone ltn__custom-icon">
										  <input rows="2" cols="5" 
                        onChange={((e) => {setPhone(e.target.value);setChEff(true)})}
                        placeholder={"Numéro de téléphone"}
                        defaultValue={Phone}
                      />
										  </div>
										</div>
										<div className="btn-wrapper">
										<a data-bs-toggle="tab" href="#ltn_tab_1_2">
								<button 
								onClick={ModifProfil}
								className="btn theme-btn-1 btn-effect-1 text-uppercase">Enregistrer</button></a>
								
							  </div>
						
							  </form>
							 
							 
							
						  </div>
						</div>
					  </div>
					  <div className="tab-pane fade" id="ltn_tab_1_9">
						<div className="ltn__myaccount-tab-content-inner">
						
						  <div className="ltn__form-box">
							<form action="#">
							  <div className="row mb-50">
								<div className="col-md-6">
								  <label>Nom:</label>
								  <input type="text"  onChange={((e) => {setLastName(e.target.value); setChEff(true)})}
                        placeholder={"Le nom"}
                        defaultValue={LastName}
						 />
								</div>
								<div className="col-md-6">
								  <label>Prenom: </label>
								  <input type="text" onChange={((e) => {setName(e.target.value); setChEff(true)})  }
                        placeholder= {'Le prenom'}
                        defaultValue={Name}
						 />
								</div>
								<div className="col-md-6">
								  <label>L'adresse:</label>
								  <input type="text"  onChange={((e) => {setAdresse(e.target.value);setChEff(true)})}
                        placeholder={"l'adresse"}
                        defaultValue={Adresse} />
								</div>
								<div className="col-md-6">
								  <label>Numéro de téléphone</label>
								  <input type="text"    onChange={((e) => { /*ValiderNum(parseInt(e.target.value, 10))*/ ValiderNum(e.target.value);if(Validate) {setPhone(e.target.value);setChEff(true)}})}
                        placeholder={"Numéro de téléphone:"}
                        defaultValue={Phone} />
								</div>
							  </div>
							  
							  <div className="btn-wrapper">
										<a data-bs-toggle="tab" href="#ltn_tab_1_2">
								<button 
								onClick={ModifProfil}
								className="btn theme-btn-1 btn-effect-1 ">Enregistrer</button></a>
								 <ToastContainer/>
								
							  </div>
							</form>
						  </div>
						</div>
					  </div>

            <div className="tab-pane fade" id="ltn_tab_1_3">
                     <Comments/>
					
						</div>
                      <div className="tab-pane fade" id="ltn_tab_1_5">
                        <div className="ltn__myaccount-tab-content-inner">
                          <div className="ltn__my-properties-table table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">Mes Annonces</th>
                                  <th scope="col" />
                                  <th scope="col">Prix</th>
                                  <th scope="col">Supprimer</th>
                                </tr>
                              </thead>
                              <tbody>
                              {currentPosts.map((annonce, index) => {
                                return (
                                <tr>
                                    
                                  <td className="ltn__my-properties-img go-top">
                                  {photos.map((photo, ind) => {
                                         if(photo.annonce == annonce.annonceId && cpt[annonce.annonceId-1] == null){
                                         cpt[annonce.annonceId-1]++;
                                         return(
                                           <Link to={`/product-details/${annonce.annonceId}`}><img src={photo.image} alt="#" /></Link>
                                         )}
                                  })}
                                  </td>
                                  <td>
                                    <div className="ltn__my-properties-info">
                                      <h6 className="mb-10 go-top"><Link to={`/product-details/${annonce.annonceId}`}>{annonce.titre}</Link></h6>
                                      <small><i className="icon-placeholder" /> {annonce.adresse}</small>
                                      
                                    </div>
                                  </td>
                                  <td>{annonce.prix}</td>
                                  <button ><i className="fa-solid fa-trash-can" onClick={()=>{Delete(annonce.annonceId);document.location.reload()}}/></button>
								  <ToastContainer/>
								</tr>
                                );
                              })}
                                
                              </tbody>
                            </table>
                          </div>
                          <Pagination 
                          totalposts={annonces.length} 
                          postsperpage={postperpage}
                          setcurrentpage={setcurrentpage} 
                          currentpage={currentpage}
                          />
                        </div>
                        </div>
                      </div>
                      
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* PRODUCT TAB AREA END */}
          </div>
        </div>
      
    </div>
    
    )
}

export default MyAccount;