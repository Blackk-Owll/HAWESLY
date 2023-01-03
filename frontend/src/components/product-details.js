import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import ProductSlider from './shop-components/product-slider-v1';
import ProductDetails from './shop-components/shop-details';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';



// iport useCintext to run to pass params throw components 

const Product_Details = () => {

    /*cette page vas contenir les details d'une annonce  */
    

    return <div>
        <Navbar />
        <PageHeader headertitle="Product Details" customclass="mb-0" />
        <ProductSlider />
        <ProductDetails />
        <CallToActionV1 />
        <Footer />
    </div>
}

export default Product_Details

