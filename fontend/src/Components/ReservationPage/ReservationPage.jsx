import React from "react";
import Layout from "../Layout/Layout";
import PageHeader from "../PageHeader/PageHeader";
import Cta from "../Cta/Cta";
import Reservation from "../Reservation/Reservation";
import { Helmet } from "react-helmet";

const ReservationPage = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Reservation - New Delhices</title>
      </Helmet>
      <Reservation />
    </Layout>
  );
};

export default ReservationPage;
