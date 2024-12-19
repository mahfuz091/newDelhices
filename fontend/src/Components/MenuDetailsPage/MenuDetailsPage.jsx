import Contact from "../Contact/Contact";
import Cta from "../Cta/Cta";
import Layout from "../Layout/Layout";
import MenuDetails from "../MenuDetails/MenuDetails";
import PageHeader from "../PageHeader/PageHeader";
import RelatedProducts from "../RelatedProducts/RelatedProducts";

const MenuDetailsPage = () => {
  return (
    <Layout>
      <PageHeader subTitle='Menu' title='Menu Details' />
      <MenuDetails />
      <RelatedProducts />
      <Contact />
      <Cta />
    </Layout>
  );
};

export default MenuDetailsPage;
