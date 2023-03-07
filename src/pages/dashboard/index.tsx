import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Textarea } from "../../components/textarea";

import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

import { db } from "../../services/firebaseConnection";

import {
  addDoc,
  collection,
  query, orderBy,
  where,
  onSnapshot,
  doc,
  deleteDoc
} from 'firebase/firestore';

import styles from "./styles.module.css";
import Head from "next/head";
import Link from "next/link";

interface HomeProps {
  user: {
    email: string;
  }
}

interface TaskProps {
  id: string;
  created: Date;
  public: boolean;
  tarefa: string;
  user: string;
}

export default function Dashboard({ user }: HomeProps) {
  const [ input, setInput ] = useState("");
  const [ publicTask, setPublicTask ] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>([])

  useEffect (() => {
    async function loadTarefas() {
      const tarefasRef = collection(db, "tarefas");
      const q = query(
        tarefasRef,
        orderBy("created", "desc"),
        where("user", "==", user?.email )
      );

      onSnapshot(q, (snapshot) => {
        let lista = [] as TaskProps[];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            tarefa: doc.data().tarefa,
            created: doc.data().created,
            user: doc.data().user,
            public: doc.data().public,
          });
        });

        setTasks(lista);
      });
    }

    loadTarefas();
  }, [user?.email]);

  function handleChangePublic(event: ChangeEvent<HTMLInputElement>){
    setPublicTask(event.target.checked);
  }

  async function handleRegisterTask(event: FormEvent){
    event.preventDefault();

    if(input === '') return;

    try{
      await addDoc(collection(db, "tarefas"), {
        tarefa: input,
        created: new Date(),
        user: user?.email,
        public: publicTask
      });

      setInput("");
      setPublicTask(false);

    }catch(err){

    }
  }

  async function handleShare(id: string){
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/task/${id}`
    );
    alert("url copiada com sucesso");
  }

  async function handleDeleteTask(id: string){
    const docRef = doc(db, "tarefas", id)
    await deleteDoc(docRef)
  }


  return (
    <div className={styles.container}>

      <Head>
        <title>Meu painel de tarefas</title>
      </Head>
      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual sua tarefa?</h1>

            <form onSubmit={handleRegisterTask}>
              <Textarea
                placeholder="Digite qual sua tarefa..."
                value={input}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(event.target.value)}
              />
              <div className={styles.checkboxArea}>
                <input 
                  type="checkbox"
                  className={styles.checkbox}
                  checked={publicTask}
                  onChange={handleChangePublic}
                />
                <label>Deixar tarefa publica?</label>
              </div>

              <button className={styles.button} type="submit">
                Registrar
              </button>
            </form>
          </div>
        </section>

        <section className={styles.taskContainer}>
          <h1>Minhas tarefas</h1>

          {tasks.map((item) => (
            <article key={item.id} className={styles.task}>
              {item.public && (
                <div className={styles.tagContainer}>
                  <label className={styles.tag}>PUBLICO</label>
                  <button className={styles.shareButton} onClick={() => handleShare(item.id)}>
                    <FiShare2 size={22} color="#3183ff" />
                  </button>
                </div>
              )}

              <div className={styles.taskContent}>

                {item.public ? (
                  <Link href={`/task/${item.id}`}>
                    <p>{item.tarefa}</p>
                  </Link>
                ) : (
                  <p>{item.tarefa}</p>
                )}

                <button
                  className={styles.trashButton}
                  onClick={() => handleDeleteTask(item.id)}
                >
                  <FaTrash size={24} color="#ea3140" />
                </button>
              </div>
            </article>
          ))}

        </section>
      </main>

    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  // console.log(session);

  if (!session?.user) {
    // Se nao tem usuario vamos redirecionar para  /
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        email: session?.user?.email,
      },
    },
  };
};
