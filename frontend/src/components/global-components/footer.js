import React, { Component } from 'react';
import Copyright from './copyright';

class Footer_v1 extends Component {

    componentDidMount() {

    	const $ = window.$;
    	
        let publicUrl = process.env.PUBLIC_URL+'/'
        const minscript = document.createElement("script");
        minscript.async = true;
        minscript.src = publicUrl + "assets/js/main.js";

        document.body.appendChild(minscript);

         $('.go-top').find('a').on('click', function () {

			$(".quarter-overlay").fadeIn(1);

				$(window).scrollTop(0);

			setTimeout(function(){
			    	$(".quarter-overlay").fadeOut(300);
				}, 800);

        });


		$(document).on('click','.theme-btn-1 ', function(){ 
            $( 'div' ).removeClass( 'modal-backdrop' );
            $( 'div' ).removeClass( 'show' );
            $( 'div' ).removeClass( 'fade' );
			$('body').attr("style", "");
        });
    }

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'
        let imgattr = "Footer logo"

        return (
				<footer className="ltn__footer-area  ">
				  <div className="footer-top-area  section-bg-2 plr--5">
				          <div className="footer-widget footer-about-widget">
				            <div className="footer-logo">
				              <div className="site-logo">
				                <img src={publicUrl+"assets/img/logo-2.png"} alt="Logo" />
				              </div>
				            </div>
				          </div>
				  </div>
				  <Copyright />
				</footer>
        )
    }
}


export default Footer_v1