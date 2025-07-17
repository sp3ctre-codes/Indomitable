import React, { useState } from 'react';
import Home from "../components/Home";
import { Helmet } from "react-helmet";

function HomePage() {

  return (
    <>
      <Helmet>
        <title>Mkurugenzi</title>
      </Helmet>
      <div className="min-h-screen bg-white text-black dark:text-white">
        <Home />
      </div>
    </>
  );
}

export default HomePage;

