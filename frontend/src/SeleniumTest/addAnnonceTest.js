import React from 'react';
import Navbar from '../components/global-components/navbar';
import PageHeader from '../components/global-components/page-header';
import AddListing from './addTest';
import CallToActionV1 from '../components/section-components/call-to-action-v1';
import Footer from '../components/global-components/footer';

const AddListing_Test= () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Ajouter Annonce" />
        <AddListing />
        <CallToActionV1 />
        <Footer />
    </div>
}

export default AddListing_Test