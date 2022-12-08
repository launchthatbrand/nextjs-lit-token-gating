import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";

import "../styles/globals.css";
import Link from "next/link";
import { UUIDContext } from "../context";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/tailwind.css";

const id = uuid();

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  function navigate() {
    router.push(`/protected?id=${id}`);
  }

  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    // <AuthProvider>
    // <SessionProvider session={session}>
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Launch That Bot</title>
        <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
      </Head>
      <UUIDContext.Provider
        value={{
          id,
        }}
      >
        {Component.auth ? (
          // <Auth>
          <Component {...pageProps} />
        ) : (
          // </Auth>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </UUIDContext.Provider>
    </React.Fragment>
    // </SessionProvider>
    // </AuthProvider>
  );

  // return (
  //   <div>
  //     <nav>
  //       <Link href="/">
  //         <a>Home</a>
  //       </Link>
  //       <a onClick={navigate} style={{ cursor: "pointer" }}>
  //         Protected
  //       </a>
  //     </nav>
  //     <UUIDContext.Provider
  //       value={{
  //         id,
  //       }}
  //     >
  //       <Component {...pageProps} />
  //     </UUIDContext.Provider>
  //   </div>
  // );
}

export default MyApp;
