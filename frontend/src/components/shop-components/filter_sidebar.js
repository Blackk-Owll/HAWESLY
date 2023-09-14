import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ShopAnnonce from './shop-left-sidebar';

let FilterAnnonce = (props) => {
    let publicUrl = process.env.PUBLIC_URL+'/'
    function onFilterByType(event){
        console.log(event.target.value);
        props.filtervalueselected(event.target.value)
     }
   
 return(
    <div className="col-lg-4  mb-100">
      <h5>Filtrer :</h5>
            <div className="widget ltn__menu-widget">
                <h4 className="ltn__widget-title">Par Type</h4>
                <ul>
                <li>
                    
                    <input type="radio" name="type" onChange={onFilterByType} value="All"/>
                    <label className="radio-item">All
                    <span className="checkmark" />
                    </label>
                    
                </li>
                <li>
                    
                    <input type="radio" name="type" onChange={onFilterByType} value="Terrain" />
                    <label className="radio-item">Terrain
                    <span className="checkmark" />
                    </label>
                    
                </li>
                <li>
                    
                    <input type="radio" name="type" onChange={onFilterByType} value="Terrain Agricole" />
                    <label className="radio-item">Terrain Agricole
                    <span className="checkmark" />
                    </label>
                    
                </li>
                <li>
                    
                    <input type="radio" name="type" onChange={onFilterByType} value="Appartement"/>
                    <label className="radio-item">Appartement
                    <span className="checkmark" />
                    </label>
                    
                </li>
                <li>
                    
                    <input type="radio" name="type" onChange={onFilterByType} value="Maison" />
                    <label className="radio-item">Maison
                    <span className="checkmark" />
                    </label>
                    
                </li>
                <li>
                    
                    <input type="radio" name="type" onChange={onFilterByType} value="Bungalow"/>
                    <label className="radio-item">Bungalow
                    <span className="checkmark" />
                    </label>
                    
                </li>
                
                </ul>
                <hr />
            </div>
    </div>
   )
}
export default FilterAnnonce;