import Head from 'next/head'
import { initializeApp } from 'firebase/app';
import { DocumentData, collection, getDocs, getFirestore, query, where } from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router'

const firebaseConfig = {
  apiKey: 'AIzaSyCKGMH0D7vAgZGtlVwHm4LjtMaVIeS6p48',
  authDomain: "burger-queen-29c57.firebaseapp.com",
  databaseURL: "https://burger-queen-29c57-default-rtdb.firebaseio.com",
  projectId: "burger-queen-29c57",
  storageBucket: "burger-queen-29c57.appspot.com",
  messagingSenderId: "432702061693",
  appId: "1:432702061693:web:fe7637a581c518be310514"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Pedidos() {
  const router = useRouter();
  const [menu, setMenu] = useState<DocumentData>();

  async function getMenu(type: 'day' | 'breakfast') {
    const menuColection = query(collection(db, 'menu'), where('menu_type', '==', type));
    const menuSnapshot = await getDocs(menuColection);
    const menuList = menuSnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    });
    setMenu(menuList);
  }

  const logoutUser = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMenu('breakfast');
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <button onClick={logoutUser}>Sair</button>
        <h1>Hello World</h1>

        <div>
          <button onClick={() => getMenu('breakfast')}>Café da manhã</button>
          <button onClick={() => getMenu('day')}>Dia</button>
        </div>

        <details open>
          <summary>Menu</summary>
          <ul>
            {
              menu?.map((item: any) => (
                <li key={item.id}>
                  <p>{item.item_name} - R$ {item.item_price}</p>
                </li>
              ))
            }
          </ul>
        </details>
      </main>
    </>
  )
}
