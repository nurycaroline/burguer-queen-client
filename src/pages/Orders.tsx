import { FirebaseConfigProps, getFirebaseConfig } from '@/lib/firebase';
import OrdersContainer from '@/containers/Orders';

type PedidosProps = {
  firebaseConfig: FirebaseConfigProps
}

export default function Pedidos({ firebaseConfig }: PedidosProps) {
  return <OrdersContainer firebaseConfig={firebaseConfig} />;
}

export async function getStaticProps() {
  const params = getFirebaseConfig()

  return {
    props: {
      firebaseConfig: params
    },
  }
}