import { FaThList } from 'react-icons/fa';

import React from 'react'
import styles from './styles.module.css';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <nav className={styles.nav}>
          <Link href="/">
            <FaThList className={styles.logo}/>
          </Link>
          <Link href="/dashboard" className={styles.link}>
            Meu painel
          </Link>
        </nav>

        <button className={styles.loginButton}>Acessar</button>
      </section>
    </header>
  )
}
