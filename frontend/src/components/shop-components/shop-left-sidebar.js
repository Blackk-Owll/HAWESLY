import React, { Component } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { useState, useEffect} from "react";
import API from '../../API';
import AsyncSelect from 'react-select/async';
import FilterAnnonce from './filter_sidebar';
import Pagination from './pagination';
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ShopAnnonce() {
 
    let publicUrl = process.env.PUBLIC_URL+"/"
    const location = useLocation();
    const navigate = useNavigate();

    let   profile;
    const  [profile_account, setProfile] = useState("");

    let cpt= [];
        const [annonces, setAnnonce] = useState([]);
        const [types, setType] = useState([]);
        const [users, setUser] = useState([]);
        const [wilayas, setWilaya] = useState([]);
        const [photos, setPhotos] = useState([]);
        const [selectedwilayas, setselectedWilaya] = useState([]);
        const [searchItem, setsearchItem] = useState("");
        const[filters, updatefilter] = useState('');
        const [currentpage, setcurrentpage] = useState(1);
        const [postperpage, setpostperpage] = useState(4);
        // les filtres 
        const filterAnnoncelist = annonces.filter((annonce) => {
           for(let i=1; i<59; i++){ 
             if(selectedwilayas.wilayaId === i  && filters === "Terrain") {
                return annonce.wilaya === i && annonce.type === 1;
             }else
             if(selectedwilayas.wilayaId === i  && filters === "Terrain Agricole") {
                return annonce.wilaya === i && annonce.type === 2;
             }else
             if(selectedwilayas.wilayaId === i  && filters === "Appartement") {
                return annonce.wilaya === i && annonce.type === 3;
             }else
             if(selectedwilayas.wilayaId === i  && filters === "Maison") {
                return annonce.wilaya === i && annonce.type === 4;
             }else
             if(selectedwilayas.wilayaId === i  && filters === "Bungalow") {
                return annonce.wilaya === i && annonce.type === 5;
             }else 
             if(selectedwilayas.wilayaId === i && filters === "All"){
                return annonce.wilaya === i;
             }else 
             if(selectedwilayas.wilayaId === i && filters === ""){
                return annonce.wilaya === i;
             }
           }
           if(filters === "Terrain"){
             return annonce.type === 1;
           }else
            if(filters === "Terrain Agricole"){
                return annonce.type === 2;
            }else
            if(filters === "Appartement"){
                return annonce.type === 3;
            }else
            if(filters === "Maison"){
                return annonce.type === 4;
            }else
            if(filters === "Bungalow"){
                return annonce.type === 5;
            }else
            if(filters === "All"){
                 return annonce;
                 
            }else
            if(searchItem === ""){
                return annonce;
            }else 
            if(annonce.titre.toLowerCase().includes(searchItem.toLowerCase()) || annonce.description.toLowerCase().includes(searchItem.toLowerCase())){
            
                return annonce;
            }
        })
        
         //recuperer les photos de l'annonce
        function recupererPhotos() {
          API.get(`/photos/`).then((res) => {
            setPhotos(res.data);
           });
        }
        
        // recupere l'annonce
        function recupererAnnonce() {
            API.get(`/annonces/`).then((res) => {
              setAnnonce(res.data);
            });
            
        }
       // recupere les types
        function recupererType() {
            API.get(`/types/`).then((res) => {
              setType(res.data);
            });
            
        }
      //handle input change event
        const handleInputChange = value => {
            setWilaya(value);
            
        };
     // handle selection
        const handleChange = value => {
            setselectedWilaya(value);
        };
      //recuperer les wilayas
        function recupererWilaya() {
            return API.get(`/wilayas/`).then((res) => {
              setWilaya(res.data);
              return res.data;
            });
            
        }
        //recuperer les utilisateurs
        function recupererUser() {
            API.get(`/users/`).then((res) => {
              setUser(res.data);
            });
            
        }
        
        
        function onFilterSelected(filtervalue){
            updatefilter(filtervalue);
        }
      // handle search changes
        const handlechangesearch = event =>{
            setsearchItem(event.target.value);
        }

        const lastpostindex = currentpage * postperpage;
        const firstpostindex =lastpostindex - postperpage;
        //const currentPosts = filterAnnoncelist.slice(firstpostindex, lastpostindex);

        function Reversing(table)
        { 
    return table.reverse();
        }
      
           let newtable;
           newtable =Reversing(filterAnnoncelist);
          
 
           const currentPosts = newtable.slice(firstpostindex, lastpostindex);
          

  
  //const currentPosts = filtered.slice(indexOfFirstPost, indexOfLastPost);

        function addFavoris(id,user) {
            console.log('profile_account2 id: ', profile_account.userId);

            API.post(`/favoris/`,{
                "user": profile_account.userId,
               "annonce": id
       },)
          .then((response) => {
           
            console.log(response);
            toast.success("Favoris ajoutée avec succés! ", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            toast.success("Favoris ajoutée avec succés  ");
         } )}
        
        useEffect(() => {
            const isAuthenticated = localStorage.getItem("isAuthenticated");

			if(isAuthenticated){
                const json = localStorage.getItem("profile1");
                const profile1 = JSON.parse(json);
                if (profile1) {
                    console.log('profile1: ', profile1);
                    profile=profile1; 
                    setProfile(profile);
                    console.log('profile_account id: ', profile_account.userId);
                    console.log('profile_account ', profile_account);

                }
                recupererAnnonce();
                
                recupererType();
                recupererWilaya();
                recupererUser();
                recupererPhotos();
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
        
       

	
    return (
        <div>
            <div className="ltn__product-area ltn__product-gutter">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 order-lg-2 mb-100">
                            <div className="ltn__shop-options">
                            <ul className="justify-content-start">
                                <li>
                                <div className="ltn__grid-list-tab-menu ">
                                    <div className="nav">
                                    <a className="active show" data-bs-toggle="tab" href="#liton_product_grid"><i className="fas fa-th-large" /></a>
                                    <a data-bs-toggle="tab" href="#liton_product_list"><i className="fas fa-list" /></a>
                                    </div>
                                </div>
                                </li>
                                <li className="d-none">
                                <div className="showing-product-number text-right">
                                    <span>Showing 1–12 of 18 results</span>
                                </div> 
                                </li>

                                <li>
                                <div className="short-by text-center" >
                                 <AsyncSelect 
                                 cacheOptions
                                 defaultOptions
                                 value={selectedwilayas}
                                 getOptionLabel={e => e.nom}
                                 getOptionValue={e => e.wilayaId}
                                 loadOptions={recupererWilaya}
                                 onInputChange={handleInputChange}
                                 onChange={handleChange}
                                 placeholder="Filtrer Par Wilaya"
                                 />
 
                                    
                                </div> 
                                </li>
                            </ul>
                            </div>
                            <div className="tab-content">
                            <div className="tab-pane fade active show" id="liton_product_grid">
                                <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                                <div className="row">
                                  <div className="col-lg-12">
                                   <div className="ltn__search-widget mb-30">
                                     <form>
                                     <input  type="text" id="searchInput" placeholder="Rechercher par mots..." onChange={handlechangesearch} />
                                     <button type="button" disabled={true} ><i className="fa-solid fa-magnifying-glass"></i></button>
                                     </form>
                                   </div>
                                  </div>
                                    
                    
                                    {currentPosts.map((annonce, index) => {
                                    return(
                                    <div className="col-xl-6 col-sm-6 col-12">
                                    <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5 text-center---">
                                        
                                        <div className="product-img go-top">
                                        {photos.map((photo, ind) => {
                                            if(photo.annonce == annonce.annonceId && cpt[annonce.annonceId-1] == null){
                                            cpt[annonce.annonceId-1]++;
                                            return(
                                         <Link to={`/product-details/${annonce.annonceId}`}><img src={photo.image}  
                                         style={{
                                            width: "1904px",
                                            height: "380px",
                                            marginTop: "10px",
                                          }}
                                         /></Link>
                                        )}
                                        })}
                                        
                                        </div>
                                        
                                        <div className="product-info">
                                        
                                        <div className="product-badge">

                                            <ul>
                                            <li className="sale-badg" >{types[(currentPosts[index].type)-1].type}</li>
                                            </ul>
                                            
                                        </div>
                                        
                                        <h2 className="product-title go-top" >{annonce.titre}</h2>
                                        <div className="product-img-location go-top">
                                            <ul>
                                            <li>
                                             <i className="flaticon-pin" /> {annonce.adresse}
                                            </li>
                                            </ul>
                                        </div>
                                        <ul className="ltn__list-item-2--- ltn__list-item-2-before--- ltn__plot-brief">
                                          <li className="sale-badg" >{users[(currentPosts[index].user)-1].nom}  {users[(currentPosts[index].user)-1].prenom}</li>
                                        </ul>
                                        <div className="product-hover-action">
                                            <ul>
                                            <li>
                                                <a href="/wishlist" title="Favoris" data-bs-toggle="modal" data-bs-target="#liton_wishlist_modal" onClick={() => {addFavoris(annonce.annonceId,profile_account.userId); toast.success("Favoris ajoutée avec succés! ", {
                                                    position: "top-right",
                                                    autoClose: 5000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                    });}}>
                                                <Link to ="/wishlist"><i className="flaticon-heart-1"/></Link>
                                                
                                                
                                                </a>
                                                <ToastContainer/>
                                            </li>
                                            <li className="go-top">
                                                <Link to={`/product-details/${annonce.annonceId}`} title="Product Details">
                                                <i className="flaticon-add" />
                                                </Link>
                                            </li>
                                            </ul>
                                            
                                        </div>
                                        </div>
                                        <div className="product-info-bottom">
                                        <div className="product-price">
                                            <span >{annonce.prix + ' DA'}</span>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    );
                                    })}
                                    
                                    
                                    
                                
                                </div>
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
                        <FilterAnnonce filtervalueselected={onFilterSelected} />
                      
                        
                        
                    </div>
                </div>
            </div>
                        
            

            
            </div>

        );
}

export default ShopAnnonce;