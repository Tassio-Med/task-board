import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/home.module.css'

import heroImage from '../../assets/hero.png';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>
          Tarefas + | IHUUUUU
        </title>
      </Head>
      <main className={styles.main}>
        <div className={styles.logoContent}>
          <Image
            className={styles.hero}
            alt="Lista de tarefas"
            src={heroImage}
            priority
          />
        </div>
        <h1 className={styles.title}>
          Seu sistema para organizar <br />
          tarefas e estudos
        </h1>
      </main>
    </div>
  )
}
