import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import Launches from '../components/Launches';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Data SpaceX launches</title>
                <meta name="description" content="Data SpaceX launches" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Data <a href="#">SpaceX</a> launches
                </h1>

                <Launches />
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
            </footer>
        </div>
    );
}
