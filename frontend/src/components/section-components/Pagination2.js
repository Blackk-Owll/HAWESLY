import React from 'react';
import { Link } from 'react-router-dom';
const Pagination2 = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="ltn__pagination-area text-center">
    <div className="ltn__pagination">
    <ul>
        {pageNumbers.map(number => (
          <li><Link key={number} className='page-item' onClick={() => paginate(number)}  >
            
              {number}
           
            </Link>
          </li>
        ))}
    </ul>
    </div>
    </div>
    
  );
};

export default Pagination2;
