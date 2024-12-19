import React from "react";
import Layout from "../Layout/Layout";
import Blog from "../Blog/Blog";
import { Helmet } from "react-helmet";

const BlogPage = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Blog - New Delhices</title>
      </Helmet>
      <Blog />
    </Layout>
  );
};

export default BlogPage;
