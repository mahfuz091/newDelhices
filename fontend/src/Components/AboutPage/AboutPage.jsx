import Layout from "../Layout/Layout";
import PageHeader from "../PageHeader/PageHeader";
import MeetOurChef from "../MeetOurChef/MeetOurChef";

import WhyChoose from "../WhyChoose/WhyChoose";
import Testimonials from "../Testimonials/Testimonials";
import Mission from "../Mission/Mission";
import Innovation from "../Innovation/Innovation";
import { Helmet } from "react-helmet";

const AboutPage = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet='utf-8' />
        <title>About - New Delhices</title>
      </Helmet>
      <PageHeader
        subTitle='À propos de nous'
        title='Passion pour la nourriture, engagement pour la qualité'
      />
      <WhyChoose />
      <Mission />
      <MeetOurChef />
      <Testimonials />
      <Innovation />
    </Layout>
  );
};

export default AboutPage;
