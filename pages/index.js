import Head from "next/head";
import Image from "next/image";
import Calculator from "../components/Calculator.tsx";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Keyzy: Luke Ryan</title>
        <meta name="description" content="Project from Luke Ryan on behalf of Keyzy." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Keyzy: A project by Luke Ryan</h1>
        <p className={styles.description}>
          {/* add github link */}
          Please find the repository at <a href="#">@lukeryandev</a>
        </p>
        <div className={styles.grid}>
          <Calculator />
        </div>
      </main>

      <footer className={styles.footer}>Luke Ryan © </footer>
    </div>
  );
}
