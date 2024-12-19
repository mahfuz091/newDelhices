import { Helmet } from "react-helmet";
import Cta from "../Cta/Cta";
import Layout from "../Layout/Layout";
import PageHeader from "../PageHeader/PageHeader";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import ShoppingCart from "../ShoppingCart/ShoppingCart";

const CartPage = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Cart - New Dehices</title>
      </Helmet>
      <PageHeader subTitle='Cart' title='Cart' />
      <ShoppingCart />
      <RelatedProducts />
      <Cta />
    </Layout>
  );
};

export default CartPage;
