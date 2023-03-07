import { GetStaticProps } from 'next';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/home.module.css'

import heroImage from '../../assets/hero.png';

import { db } from '../services/firebaseConnection';
import { collection, getDocs } from 'firebase/firestore';

interface HomeProps{
  posts: number;
  comments: number;
}

export default function Home({ posts, comments }: HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>
          Tasks | Home
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
        <div className={styles.infoContext}>
          <section className={styles.box}>
            <span>+{posts} posts</span>
          </section>
          <section className={styles.box}>
            <span>+{comments} comentários</span>
          </section>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  const commentRef = collection(db, "comments")
  const postRef = collection(db, "tarefas")
  const commentSnapshot = await getDocs(commentRef)
  const postSnapshot = await getDocs(postRef);

  return {
    props: {
      posts: postSnapshot || 0,
      comments: commentSnapshot.size || 0,
    },
    revalidate: 60,
  }
}