import React from "react";
import Hero from "../components/Hero";
import Overview from "../components/Overview";
import GetStarted from "../components/GetStarted";
import FeaturedTutors from "../components/FeaturedTutors";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Hero />
      <Overview />
      <FeaturedTutors />
      <GetStarted />
    </div>
  );
};

export default Home;
