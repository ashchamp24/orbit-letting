import Layout from "./Layout.jsx";

import Home from "./Home";

import Properties from "./Properties";

import PropertyDetails from "./PropertyDetails";

import Apply from "./Apply";

import Dashboard from "./Dashboard";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    Properties: Properties,
    
    PropertyDetails: PropertyDetails,
    
    Apply: Apply,
    
    Dashboard: Dashboard,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/Properties" element={<Properties />} />
                
                <Route path="/PropertyDetails" element={<PropertyDetails />} />
                
                <Route path="/Apply" element={<Apply />} />
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}