import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";

import DeliveryLocation from "../DeliveryLocation/DeliveryLocation";

import Favorites from "../Favorites/Favorites";
import Innovation from "../Innovation/Innovation";

import Layout from "../Layout/Layout";
import SpiceAndTradition from "../SpiceAndTradition/SpiceAndTradition";

import WhyChoose from "../WhyChoose/WhyChoose";

const Home = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Welcome - New Dehices</title>
      </Helmet>
      <Banner />
      <WhyChoose />
      <SpiceAndTradition />
      <Favorites />
      <DeliveryLocation />
      <Innovation />
    </Layout>
  );
};

export default Home;
