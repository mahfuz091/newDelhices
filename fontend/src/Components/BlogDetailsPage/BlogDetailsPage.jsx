import React from "react";
import Layout from "../Layout/Layout";
import { Helmet } from "react-helmet";
import BlogDetails from "../BlogDetails/BlogDetails";
import PageHeader from "../PageHeader/PageHeader";

const BlogDetailsPage = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Blog - New Delhices</title>
      </Helmet>
      <PageHeader subTitle='Blog' title='Détails du blog' />
      <BlogDetails />
    </Layout>
  );
};

export default BlogDetailsPage;
