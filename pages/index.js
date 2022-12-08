import { useState, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import LitJsSdk from "lit-js-sdk";
import Cookies from "js-cookie";
import { UUIDContext } from "../context";
import Navbar from "../components/Navbars/AuthNavbar";

const accessControlConditions = [
  {
    contractAddress: "0xd07dc4262bcdbf85190c01c996b4c06a461d2430",
    standardContractType: "ERC1155",
    chain: "ethereum",
    method: "balanceOf",
    parameters: [":userAddress", "730724"],
    returnValueTest: {
      comparator: ">",
      value: "0",
    },
  },
];

export default function Home() {
  const [connected, setConnected] = useState();
  const { id } = useContext(UUIDContext);

  async function connect() {
    const resourceId = {
      baseUrl: "http://localhost:3000",
      path: "/protected",
      orgId: "",
      role: "",
      extraData: id,
    };

    const client = new LitJsSdk.LitNodeClient({ alertWhenUnauthorized: false });
    await client.connect();
    const authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: "ethereum",
    });

    await client.saveSigningCondition({
      accessControlConditions,
      chain: "ethereum",
      authSig,
      resourceId,
    });
    try {
      const jwt = await client.getSignedToken({
        accessControlConditions,
        chain: "ethereum",
        authSig,
        resourceId: resourceId,
      });
      Cookies.set("lit-auth", jwt, { expires: 1 });
    } catch (err) {
      console.log("error: ", err);
    }
    setConnected(true);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar transparent />
      <main>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            {/* <h1>Developer DAO Access</h1>
            {!connected && <button onClick={connect}>Connect</button>} */}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
