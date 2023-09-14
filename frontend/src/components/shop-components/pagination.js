import React, { Component } from 'react';
import { useState, useEffect} from "react";
import { Link } from 'react-router-dom';


const Pagination = ({totalposts , postsperpage, setcurrentpage, currentpage}) => {
    let pages = [];
    for (let i= 1; i<= Math.ceil(totalposts/postsperpage); i++){
        pages.push(i);
    }
    return (
       
     <div className="ltn__pagination-area text-center">
        <div className="ltn__pagination">
          <ul>
           {pages.map((page, index) => {
              return(
                <li>
               <Link   key={index} onClick={() => setcurrentpage(page)} className={page == currentpage ? 'active' : ''}>
                
                 {page}
               
                </Link>
                </li>

              )
            })
            }
            
            </ul>
          </div>
     </div>
     
    )
}
export default Pagination;