import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import API from "../../API";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Pagination2 from '../section-components/Pagination2';
import { ToastContainer, toast } from 'react-toastify';


function Comments() {

	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(3);
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	
  
	const paginate = pageNumber => setCurrentPage(pageNumber);

/*to add when having the listing*/

	 
	
	let publicUrl = process.env.PUBLIC_URL+'/'
	
 let AnnounceId = 1;
 let UserId =1;
 //console.log(idUser);
 const [MessageOff, setMessageOff] = useState([])



 	const navigate = useNavigate();
	const  [profile_account, setProfile] = useState({});
	let  profile;

	const [Users, setUsers ] = useState([])
	let tableUsers;
	const [Annonces, setAnnonces ] = useState([])
	//let tableAnnonces;

	function refreshAnnonce() {
		API.get(`/annonces/`).then((res) => {
			//tableAnnonces = res.data;
			setAnnonces(res.data);
			console.log("les annonces1 in comments: ",res.data);
			console.log("les annonces2 in comments: ",Annonces);

		});
	  }
	const refreshUsers = async (res) => {
		API.get(`/users/`).then((res) => {
			tableUsers = res.data;
			setUsers(tableUsers);
			console.log("users: ", Users)
		
		});
	  }
	 
		const  refreshMessageOff = async (res) => {
			API.get(`/messagesOffres/`).then((res) => {
				setMessageOff(res.data);
				console.log(MessageOff)
			});
		  }


		useEffect(() => {
				const json = localStorage.getItem("profile1");
				const profile1 = JSON.parse(json);
				
					console.log('profile1: ', profile1);
					profile = profile1;
					setProfile(profile);
					console.log('profile account in comments: ', profile_account);
					refreshMessageOff();
					refreshUsers();
					refreshAnnonce()
					console.log("les annonces3 in comments: ",Annonces);
		},[] );




			/* in a case of having deleted a announce randomly to keep in track with the announces id */
	
		function setTheAnnonces(id,table)
		{let i=0;
			
			console.log ( "table des annonces: ", table);
			console.log ( "table2 des annonces: ", table[i]);

			while(table[i].annonceId!==id)
			{
				i+=1;

			}
           // i-=1;
		   console.log ( "id announce est"+i);
		   console.log ( "le titre est"+table[i].titre);
			return table[i].titre;
		}
	
		const filtered = MessageOff.filter(MessageOff => {
			console.log("userId in comments: ",profile_account.userId );
			console.log("l'id de l'annonceur dans message d'offre: ", MessageOff.annonceur);
			console.log("message d'offre: ", MessageOff);
			
			return MessageOff.annonceur===profile_account.userId;
			
			
		  });
		  console.log("filtered:  ", filtered);
		 const renderListeDesMOff = (msg) => 
			
			{return msg.map((item, i)=>
			
								<li>
									<div className="ltn__comment-item clearfix">
       <div className="ltn-author-introducing clearfix">
	<h6><Link to={`/product-details/${item.Annonce}`}  className='section-subtitle section-subtitle-2 ltn__secondary-color'>{setTheAnnonces(item.Annonce,Annonces)}</Link></h6>
	<span className="product-price"> {Users[item.emetteur-1].prenom +" "+Users[item.emetteur-1].nom}</span>
	<p>{item.contenu}</p>
	<div className="ltn__comment-reply-btn" >
	<i className="icon-reply-1" />
	<a href={`mailto:` + Users[item.emetteur-1].email }>
	Contacter via mail
				  </a>  </div>
				  </div>
</div>
</li>
		
			)}
			function Reversing(table)
			{ 
		return table.reverse();
			}
		  
			   let newtable;
			   newtable =Reversing(filtered);
			  
	 
			   const currentPosts = newtable.slice(indexOfFirstPost, indexOfLastPost);
			  
  
	  
	  //const currentPosts = filtered.slice(indexOfFirstPost, indexOfLastPost);		
		  return (
			<div>
				<h4 className="title-2"> {filtered.length} Message(s) d'offre(s) </h4>
				{/*<button onClick={() => addFavorit(5,2)} className="flaticon-heart-1">Trying</button>
				*/}								
			  <ul>
			  {renderListeDesMOff(currentPosts )}
			  </ul>
			  <Pagination2
        postsPerPage={postsPerPage}
        totalPosts={filtered.length}
        paginate={paginate}
			/>
			</div>
		  );
  
        }


export default Comments