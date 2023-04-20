import LoginContainer from '../containers/Login';
import { FirebaseConfigProps, getFirebaseConfig } from '@/lib/firebase';

type PedidosProps = {
	firebaseConfig: FirebaseConfigProps
}

export default function Login({ firebaseConfig }: PedidosProps) {
	return <LoginContainer firebaseConfig={firebaseConfig} />;
}

export async function getStaticProps() {
	const params = getFirebaseConfig()

	return {
		props: {
			firebaseConfig: params
		},
	}
}