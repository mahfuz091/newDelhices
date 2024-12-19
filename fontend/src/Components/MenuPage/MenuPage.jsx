import { Helmet } from "react-helmet";
import Category from "../Category/Category";
import Contact from "../Contact/Contact";
import Cta from "../Cta/Cta";
import Layout from "../Layout/Layout";
import PageHeader from "../PageHeader/PageHeader";

const MenuPage = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet='utf-8' />
        <title>The Map - New Delhices</title>
      </Helmet>
      <Category />
    </Layout>
  );
};

export default MenuPage;
