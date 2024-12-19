import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import Favorites from "../Favorites/Favorites";
import Innovation from "../Innovation/Innovation";
import Layout from "../Layout/Layout";
import SpiceAndTradition from "../SpiceAndTradition/SpiceAndTradition";
import WhyChoose from "../WhyChoose/WhyChoose";
import LatestBlog from "../LatestBlog/LatestBlog";

const Home = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Welcome - New Delhices</title>
      </Helmet>
      <Banner />
      <WhyChoose />
      <SpiceAndTradition />
      <Favorites />
      <LatestBlog />
      <Innovation />
    </Layout>
  );
};

export default Home;
