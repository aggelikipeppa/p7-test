import React from 'react';
import Header from '../components/header';
import { ToastContainer } from 'react-toastify';

import "../style.scss"
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Layout =({children}) =>{
    return(
        <>
            <Header/>
            <main className="main-wrapper">
                {children}
                <ToastContainer />
            </main>
        </>
    )
}

export default Layout;