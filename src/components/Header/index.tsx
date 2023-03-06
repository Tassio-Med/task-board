import { FaThList } from 'react-icons/fa';

import React from 'react'
import styles from './styles.module.css';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';


export default function Header() {

  const { data: session, status } = useSession();

  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <nav className={styles.nav}>
          <Link href="/">
            <FaThList className={styles.logo}/>
          </Link>
          {session?.user && (
            <Link href="/dashboard" className={styles.link}>
              Meu painel
            </Link>
          )}
        </nav>

        {status === 'loading' ? (
          <></>
        ) : session ? (
          <button className={styles.loginButton} onClick={() => signOut()}>
            Olá {session?.user?.name}
          </button>
        ) : (
          <button className={styles.loginButton} onClick={() => signIn("google")}>
            Acessar
          </button>
        )}
      </section>
    </header>
  )
}

