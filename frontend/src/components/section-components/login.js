import React, { useState, useEffect } from 'react';
import { Link,useNavigate, useLocation } from 'react-router-dom';
import parse from 'html-react-parser';

//for the sso authentication:
import { useGoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { toast} from "react-toastify";
import axios from 'axios';
import API from "../../API";
import qs from 'qs';


//class Login extends Component 
function Login(props) {


    let publicUrl = process.env.PUBLIC_URL+'/';
	
	//const location = useLocation();


	let  profile1;
	const [profile, setprofile] = useState([]);
	const navigate = useNavigate();
	const clientId = '918287164878-8mg8s8pth9r2717nnhturhrk27co99ap.apps.googleusercontent.com';
	const [list, setList ] = useState([]);

	useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });


	useEffect(() => {
		console.log('profile email : ', profile.email);
			list.map((item, index) => {
				console.log('item: ', item);
				console.log('profile email : ', profile.email);
				if (item.email === profile.email){
					profile1 = item;
					localStorage.setItem("isAuthenticated", "true");
					const json = JSON.stringify(profile1);
  					localStorage.setItem("profile1", json);
					//setprofile(item);
					navigate('/my-account');
				}
				else{
					//I need to display an error message in order to inform the user that 
					//he's not authentified so either he changes the email or he registers.
					console.log('Veuillez introduire une adresse valide'); 
				}
			})
    },[list] );


    const onSuccess = async (res) => {
		//profile = res.profileObj;
		setprofile(res.profileObj);
		
		console.log('Google Login Name', res.profileObj);
		
		API.get(`/users/`).then(res => {

			console.log('profile email: ', profile.email);
			setList(res.data);
		})
		
	};    

    const onFailure = (res) => {
    	console.log('Login failed: res:', res);
    };

	const { signIn } = useGoogleLogin({
		onSuccess,
		onFailure,
		clientId,
		isSignedIn: true,
		accessType: 'offline',
	  });



    return	<div>
			 <div className="ltn__login-area pb-65">
				<div className="container">
				<div className="row">
					<div className="col-lg-12">
					<div className="section-title-area text-center">
						<h1 className="section-title">Connexion</h1>
						<p>Connectez-vous à votre compte pour une meilleure experience</p>
					</div>
					<div className="account-login-inner">
								<div className="btn-wrapper go-top" >
									<div className="account-login-inner text-center pt-50" >
									
										<div className="theme-btn-1 btn black-btn  " onClick={signIn} >
											SE CONNECTER AVEC GOOGLE
										</div>
										
									</div>
								</div>
						</div>
					</div>
					
				</div>
				<br/>
				<div className="row">
						
					
					
					<div className="account-create text-center pt-50">
						<h4>VOUS N'AVEZ PAS DE COMPTE?</h4>
						<p>Créer un compte pour avoir l'accés aux differentes fonctionnalités de cette application</p>
						<br/>
						<div className="btn-wrapper go-top">
							<Link to="/register" className="theme-btn-1 btn black-btn">CREER UN COMPTE</Link>
						</div>
					</div>
					
				</div>
				</div>
				</div>
				</div>
}



export default Login