import React, { Component } from 'react';
import  { useState, useEffect, useHistory } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import L from "leaflet";
import AsyncSelect from 'react-select/async' ;
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet';
import {Button} from 'react-bootstrap-buttons';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import API from "../../API";
<script></script>
const AddListing = () => {
    //let history = useHistory();
      let publicUrl = process.env.PUBLIC_URL + "/" ;
      const [user, setUser] = useState({});
      const [description, setDescription] = useState("");
      const [prix, setPrix] = useState(0);
      const [surface, setSurface] = useState(0);
      const [wilaya, setWilaya] = useState('');
      const [commune, setCommune] = useState('');
      const [adresse, setAdresse] = useState("");
      const [categorie, setCategorie] = useState('');
      const [categories, setCategories] = useState([]);
      const [types, setTypes] = useState([]);
      const [wilayas, setWilayas] = useState([]);
      const [communes, setCommunes] = useState([]);
      const [type, setType] = useState('');
      const [titre, setTitre] = useState("");
      const [mapX, setMapX] = useState(0);
      const [mapY, setMapY] = useState(0);
      const [zoom, setZoom] = useState(0); 
      const [photo, setPhoto] = useState([]);

      const navigate = useNavigate();
      const  [profile_account, setProfile] = useState({});
     let profile
     // const history = useHistory();

      //const handleSubmit = (event) => {
       // event.preventDefault();
        // Perform form submission logic...
    
        // Navigate to another page after successful submission
        //history.push("shop-components/shop-grid-v1.js");
      //};

        const handleChangeCat = value =>{
        setCategorie(value.categorieId);
        console.log("categorie",categorie)}

        const handleChangeWil = value =>{
            setWilaya(value.wilayaId);
            console.log("wilaya",wilaya)}


        const handleChangeTy = value =>{
        setType(value.typeId);
        console.log("type",type)}

        const handleChangeCom = value =>{
            setCommune(value.communeId);
            console.log("commune",commune)}


      const recupererCategorie = () =>{
        return API.get(`categories/`).then((res) => {
             res = res.data;
            return res;
           });
    }

    const recupererWilaya = () =>{
        return API.get(`wilayas/`).then((res) => {
             res = res.data;
            return res;
           });
    }

    const recupererType = () =>{
        return API.get(`types/`).then((res) => {
             res = res.data;
            return res;
           });
    }

    const recupererCommune = () =>{
        return API.get(`communes/`).then((res) => {
             res = res.data;
            return res;
           });
    }

        

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
			if(isAuthenticated){
				const json = localStorage.getItem("profile1");
				const profile1 = JSON.parse(json);
				if (profile1) {
					console.log('profile1: ', profile1);
                    profile=profile1; 
                    setProfile(profile);                    
                    recupererType();
                    recupererCategorie();
                    recupererWilaya();
                    recupererCommune();            
				}			
			}
			else{
                toast.error("veuillez-vous connecter d'abord à votre compte pour pouvoir y acceder!", {
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

 const Addmap= (e) => {
        
let mapOptions = {
    center:[51.958, 9.141],
    zoom:10,
    height:80
}

let map = new L.map('map' , mapOptions);
let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

map.addLayer(layer);
const myIcon = L.icon({
    iconUrl:"logo192.png",
    iconSize: [20, 20],
    iconAnchor: [2, 2],
    popupAnchor: [0, -2]
    // ...
 });
 
let marker = null;
map.on('click', (event)=> {
    if(marker !== null){
        map.removeLayer(marker);
    }
     
    marker = L.marker([event.latlng.lat , event.latlng.lng ], {icon: myIcon}).addTo(map);
   
    document.getElementById('latitude').value = event.latlng.lat;
    document.getElementById('longitude').value = event.latlng.lng;
    
    setMapX( document.getElementById('latitude').value );
    setMapY( document.getElementById('longitude').value);
    console.log(map.getBounds());
    console.log ( myIcon);

    
})}
        
        
    const addNewAnnonce = (e) => {
                console.log('userId',profile_account.userId );
                e.preventDefault();
                
                API.post(`annonces/`,{
            
                "description":description,
                "adresse":adresse,
                "categorie": categorie,
                "date":'',
                "mapX": mapX,
                "mapY": mapY,
                "zoom":zoom,
                "commune": commune ,
                "type": type,
            "user": profile_account.userId,  
            "wilaya": wilaya,
            
            "prix": prix,
            
            "surface": surface,
            "titre":titre,
      
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                })
                .then((response) => {
                
                    console.log(response);
                    console.log("Ajout avec succés , id annonce est : ",response.data.annonceId);
                    toast.success('Annonce ajoutée avec succéss!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });	
                    var i=0 ; 
                while ((photo[i]) !== undefined)
                {

            let formData = new FormData();
                formData.append("image", photo[i]);
                formData.append("annonce", response.data.annonceId);
                API.post(`/photos/`,formData ,{
                
                
                    headers: {
                        'Content-Type' : 'application/json',
                        'Content-Type': 'multipart/form-data'
                
                },
                }) 
                
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error.response);
                    
                })
                i++;  }
            
            })
        }
    
    return <div className="ltn__appointment-area pb-120">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <div className="ltn__appointment-inner">
                        <form action="#">
                        <h2>1. Description  </h2>
                       
                        <h6>Description du bien</h6>
                        
                        <div className="row">
                            <div className="col-md-12">
                           
                            <div className="input-item input-item-textarea ltn__custom-icon">
                                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}  name="description" required/>
                            </div>
                            </div>
                        </div>

                        <br></br>
                        <h6>Titre</h6>
                        <div className="row">
                            <div className="col-md-6">
                            <div className="input-item input-item-name ltn__custom-icon">
                                <input type="text"  placeholder="Titre" name="prix" value={titre} onChange={(e) => setTitre(e.target.value)} required/>
                            </div>
                            </div></div>
                     

                    
                        <br></br>
                        
                        <div className="row">
                            <div className="col-md-6">
                            <h6>Prix</h6>
                            <div className="input-item input-item-name ltn__custom-icon">
                              
                                <input type="text"  placeholder="Prix en Dinar algerien (juste le nombre)" name="prix" value={prix} onChange={(e) => setPrix(e.target.value)} required/>
                            </div>
                            </div>
                         
                            <div className="col-md-6"> 
                            <h6>Surface</h6>
                            <div className="input-item input-item-name ltn__custom-icon">
                                   
                                <input type="text"  placeholder="surface en m2 (juste le nombre)" name="surface" value={surface} onChange={(e) => setSurface(e.target.value)} required/>
                            </div>
                            </div>
                          
                        </div>


                        
                        <div className="row">
                            <div className="col-md-6"  >
                            <div className="input-item">
                            <h6>Catégorie du bien </h6>
                            <AsyncSelect
                                 cacheOptions
                                 defaultOptions
                                 value={categories}
                                 getOptionLabel={e => e.label}
                                 getOptionValue={e => e.categorieId}
                                 loadOptions={recupererCategorie}
                                 onChange={handleChangeCat}
                                 placeholder='Categorie'
                                 />
                            </div>
                            </div>
                            <div className="col-md-6">
                            
                            <div className="input-item">
                            <h6>Type du bien </h6>
                            <AsyncSelect
                                 cacheOptions
                                 defaultOptions
                                 value={types}
                                 getOptionLabel={e => e.type}
                                 getOptionValue={e => e.typeId}
                                 loadOptions={recupererType}
                                 onChange={handleChangeTy}
                                 placeholder='Type'
                                 />
                            </div>
                            <br></br> 
                            </div>
                            
                        </div>


                        <h2>2. Media</h2>
                        <h6>Photos du bien</h6>
                        <div className="container">
                           <input type="file" id="file-input" accept="image/png, image/jpeg" onChange={(e) => setPhoto(e.target.files)}  multiple ></input>
                           <label htmlFor="file-input">
                      </label>
                       <div id="images"></div>
                          </div>
                     <br></br>



                        <h2>3.Emplacement</h2>
                    
                        <div className="row">
                            
                            <div className="col-md-6">
                            <div className="input-item input-item-name ltn__custom-icon">
                            <AsyncSelect
                                 cacheOptions
                                 defaultOptions
                                 value={wilayas}
                                 getOptionLabel={e => e.nom}
                                 getOptionValue={e => e.wilayaId}
                                 loadOptions={recupererWilaya}
                                 onChange={handleChangeWil}
                                 placeholder='Wilaya'
                                 />
                            </div> </div>
                            <div className="col-md-6">
                            <div className="input-item input-item-name ltn__custom-icon">
                            <AsyncSelect
                                 cacheOptions
                                 defaultOptions
                                 value={communes}
                                 getOptionLabel={e => e.nom  }
                                 getOptionValue={e => e.communeId}
                                 loadOptions={recupererCommune}
                                 onChange={handleChangeCom}
                                 placeholder='Commune'
                                 />
                                  <br></br>  <br></br>  <br></br>
                            </div>
                            </div>

                            <div className="col-md-6">
                            <div className="input-item input-item-name ltn__custom-icon">
                                <input type="text" name="adresse" placeholder="Adresse"  value={adresse} onChange={(e) => setAdresse(e.target.value)} required />
                            </div>
                           
                            </div>
                           
                         <div    id="map" align='center'>
                         <div   onClick={Addmap} id="map">
                                <h3> Cliquez dans le blanc pour ajouter la localisation Map </h3>
                           
                           <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br> <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                         <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-md-6">
                            <div className="input-item input-item-name ltn__custom-icon">
                            <input type="text" id="latitude" placeholder="latitude" value={mapX} onChange={(e) => setMapX(e.target.value)}/>
                            </div>
                            </div>
                            <div className="col-md-6">
                            <div className="input-item input-item-name ltn__custom-icon">
                            <input type="text" id="longitude" placeholder="longitude" value={mapY} onChange={(e) => setMapY(e.target.value)}/>
                            </div>
                            </div>
                            </div>
                    
                           
                        </div>
                       
                                      
            
                        <div className="alert alert-warning d-none" role="alert">
                            Please note that the date and time you requested may not be available. We will contact you to confirm your actual appointment details.
                        </div>
                        <form><div className="btn-wrapper text-center mt-30">
                            <button onClick={addNewAnnonce} type="submit" className="btn theme-btn-1 btn-effect-1 text-uppercase"><Link to = "/my-account" >Confirmer</Link></button>
                            <ToastContainer/>
                        </div></form>
                        
                        
                        </form>
                    </div>
                    </div>
                </div>
                </div>
                
            </div>


        }

export default AddListing