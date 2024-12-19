import { Helmet } from "react-helmet";
import Contact from "../Contact/Contact";
import Cta from "../Cta/Cta";
import Layout from "../Layout/Layout";
import MeetOurChef from "../MeetOurChef/MeetOurChef";
import PageHeader from "../PageHeader/PageHeader";

const ContactPage = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Contact - New Delhices</title>
      </Helmet>
      <Contact />
    </Layout>
  );
};

export default ContactPage;
