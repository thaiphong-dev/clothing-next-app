import Layout from "../components/common/layout/layout";
import "../styles/globals.css";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
