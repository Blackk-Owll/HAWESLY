import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import API from "../../API";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Pagination2 from './Pagination2';
import 'react-toastify/dist/ReactToastify.css';


function WishList() {
    let publicUrl = process.env.PUBLIC_URL+'/'
 let cpt= [];
 
 const [Fav, setFav] = useState([]);
    const [Name, setName ] = useState("");
    const [Annonce, setAnnonce ] = useState("");
    const [photos, setPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(4);

    const navigate = useNavigate();
    let  [profile_account, setProfile] = useState({});
   const [UserId, setUserId] = useState({});

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    
  
    const paginate = pageNumber => setCurrentPage(pageNumber);

    function deleteFav(id){
        API.delete(`/favoris/${id}/`).then((res) =>{console.log("Annonce supprimée des favoris");   
    });
        
    }

    function refreshsetAnnonce() {
        API.get(`/annonces/`).then((res) => {
            setAnnonce(res.data);
        
        });
      }
        
        function refreshFav() {
            API.get(`/favoris/`).then((res) => {
                setFav(res.data);
            });
       }
       //recuperer les photos de l'annonce
        function recupererPhotos() {
            API.get(`/photos`).then((res) => {
              setPhotos(res.data);
             });
        }
        
        useEffect(() => {
            const isAuthenticated = localStorage.getItem("isAuthenticated");

            if(isAuthenticated){
                const json = localStorage.getItem("profile1");
                const profile1 = JSON.parse(json);
                if (profile1) {
                    console.log('profile1: ', profile1);
                    profile_account=profile1; 
                    console.log('profile_account: ', profile_account); 
                    setUserId(profile_account.userId); 
                    console.log('userId: ', UserId);
                 
                    refreshFav();
                    refreshsetAnnonce();
                    recupererPhotos();
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
        },[] );
        
        
        function setTheAnnoncesPrice(id,table)
        {let i=0;
            
            while(table[i].annonceId!==id)
            {
                i+=1;

            }
         
            return table[i].prix;
        }
        /* in a case of having deleted a announce randomly to keep in track */
        function setTheAnnoncesTitle(id,table)
        {let i=0;
            while(table[i].annonceId!==id)
            {
                i+=1;

            }
         
            return table[i].titre;
        }
    
        const filtered = Fav.filter(Fav => {
            console.log('userId: ', UserId);

            return Fav.user === UserId;
            
          });


    
          function Reversing(table)
		  { 
	  return table.reverse();
		  }
		
			 let newtable;
			 newtable =Reversing(filtered);
			
   
			 const currentPosts = newtable.slice(indexOfFirstPost, indexOfLastPost);
			

	
	//const currentPosts = filtered.slice(indexOfFirstPost, indexOfLastPost);    
         const renderListOfFav = (fav) => {
            
            return fav.map((item, i)=>
            <tr>
                <td ><button onClick={() =>{deleteFav(item.favoriId);toast.success('Annonce supprimée avec success!', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					});;document.location.reload()}} className="fa-solid fa-trash-can"   ></button></td>
                
                                
                <td className="cart-product-image">
                 {photos.map((photo, ind) => {
                     if(photo.annonce == item.annonce && cpt[item.annonce-1] == null){
                        cpt[item.annonce-1]++;
                        return(
                         <Link to={`/product-details/${item.annonce}`}><img src={photo.image} /></Link>
                        )}
                 })}
                </td>
                <td className="cart-product-info">
                  <h4 className="go-top"><Link to={`/product-details/${item.annonce}`}>{setTheAnnoncesTitle(item.annonce,Annonce)}</Link></h4>
                </td>
                <td className="cart-product-price">{setTheAnnoncesPrice(item.annonce,Annonce)+' DA'}</td>
                <td className="cart-product-add-cart">
                </td>
            </tr>
            )
          }
          useEffect(() => {
            renderListOfFav( filtered );
            },[Fav] );
        
        
    return <div className="liton__wishlist-area mb-105">
        
        <h4 className="title-2" align='center'> {filtered.length} Annonce(s) enregistrée(s)</h4>
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <div className="shoping-cart-inner">
                        <div className="shoping-cart-table table-responsive">
                        <table className="table">
                            <tbody>
                            {renderListOfFav(currentPosts )}
                            <Pagination2
                             postsPerPage={postsPerPage}
                             totalPosts={filtered.length}
                             paginate={paginate}
                               />
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>

        }


export default WishList;