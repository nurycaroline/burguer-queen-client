import Head from 'next/head'
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router'
import NewOrder from '@/components/NewOrder';
import { MenuItem } from '@/types/MenuItem';
import { FirebaseConfigProps } from '@/lib/firebase';
import ListOrders from '@/components/ListOrders';

type PedidosProps = {
  firebaseConfig: FirebaseConfigProps
}

function OrdersContainer({ firebaseConfig }: PedidosProps) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const router = useRouter();
  const [menu, setMenu] = useState<MenuItem[]>([]);


  const [kitchenOrders, setKitchenOrders] = useState<any[]>([]);
  const [readyOrders, setReadyOrders] = useState<any[]>([]);
  const [deliveredOrders, setDeliveredOrders] = useState<any[]>([]);

  async function getMenu() {
    const menuColection = query(collection(db, 'menu'))
    const menuSnapshot = await getDocs(menuColection);
    const menuList = menuSnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    }) as MenuItem[];

    setMenu(menuList);
  }

  async function getOldOrders() {
    const orderQuery = query(
      collection(db, 'order'),
      orderBy('created_at', 'desc')
    )

    onSnapshot(orderQuery, (querySnapshot) => {
      const orderList = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      });

      const kitchen = orderList.filter((order: any) => !order.ready && !order.delivered);
      setKitchenOrders(kitchen);

      const ready = orderList.filter((order: any) => order.ready && !order.delivered);
      setReadyOrders(ready);

      const delivered = orderList.filter((order: any) => order.delivered);
      setDeliveredOrders(delivered);

    }, (error) => console.log(error));
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
    getMenu();
    getOldOrders()
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
        <header>
          <button onClick={logoutUser}>Sair</button>
        </header>

        <br />

        <NewOrder
          menu={menu}
          app={app}
        />

        <br />

        <ListOrders
          menu={menu}
          orders={kitchenOrders}
          title="Pedidos na Cozinha"
          inputLabel="Pronto para Servir?"
          inputUpdateKey="ready"
        />

        <ListOrders
          menu={menu}
          orders={readyOrders}
          title="Pedidos Pontos para entrega"
          inputLabel="Entregue?"
          inputUpdateKey="delivered"
        />

        <ListOrders
          menu={menu}
          orders={deliveredOrders}
          title="Pedidos Entregues"
        />
      </main>
    </>
  )
}

export default OrdersContainer