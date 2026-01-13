import React from "react";
import About from "../components/About";
import { Helmet } from "react-helmet";

function AboutPage(){
    return(
        <>
        <Helmet>
            <title>About Us</title>
        </Helmet>
        <div className="min-h-screen bg-white text-black dark:text-white">
            <About />
        </div>
    </>
    );
}

export default AboutPage;