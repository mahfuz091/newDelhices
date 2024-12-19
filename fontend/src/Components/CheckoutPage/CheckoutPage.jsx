import { Helmet } from "react-helmet";
import Checkout from "../Checkout/Checkout";
import Cta from "../Cta/Cta";
import Layout from "../Layout/Layout";
import PageHeader from "../PageHeader/PageHeader";

const CheckoutPage = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Vérifier - New Delhices</title>
      </Helmet>
      <Checkout />
    </Layout>
  );
};

export default CheckoutPage;
