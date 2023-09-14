import React from 'react';
import Navbar from './global-components/navbar';
import Banner from './section-components/banner-v2';
import Features from './section-components/features-v1';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';

const Home_V2 = () => {
    return <div>
        <Navbar />
        <Banner />
        <Features customClass="ltn__feature-area section-bg-1--- pt-115 pb-90 mb-120---"/>
        <CallToActionV1 />
        <Footer />
    </div>
}

export default Home_V2

