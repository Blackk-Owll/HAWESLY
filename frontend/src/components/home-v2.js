import React from 'react';
import Navbar from './global-components/navbar-v2';
import Banner from './section-components/banner-v2';
import Aboutv3 from './section-components/about-v3';
import Features from './section-components/features-v1';
import CallToActionV3 from './section-components/call-to-action-v3';
import Footer from './global-components/footer';

const Home_V2 = () => {
    return <div>
        <Navbar />
        <Banner />
        <Aboutv3 />
        <Features customClass="ltn__feature-area section-bg-1--- pt-115 pb-90 mb-120---"/>
        <CallToActionV3 />
        <Footer />
    </div>
}

export default Home_V2;

