import Head from 'next/head'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import {
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from 'react-toastify';
import { initializeApp } from 'firebase/app';
import { FirebaseConfigProps } from '@/lib/firebase';
import * as S from './styles'

type PedidosProps = {
	firebaseConfig: FirebaseConfigProps
}

const LoginContainer = ({ firebaseConfig }: PedidosProps) => {
	initializeApp(firebaseConfig);
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const loginUser = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		try {
			const auth = getAuth();
			const user = await signInWithEmailAndPassword(auth, username, password);
			console.log("User logged in", user);
			router.push('Orders')
		} catch (error: any) {
			const errorCode = error.code;
			switch (errorCode) {
				case "auth/invalid-email":
					toast.warn("Email inválido");
					break;
				case "auth/user-not-found":
				case "auth/wrong-password":
					toast.warn("Usuário ou Senha incorreta");
					break;
				default:
					toast.warn("Erro desconhecido");
			}
		}
	};

	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				router.push('Orders')
			}
		});
	}, [router])

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<S.Main>
				<h1>Login</h1>
				<form onSubmit={loginUser}>
					<label htmlFor="user">
						<span>Email: </span>
						<S.Input
							onChange={(event) => {
								setUsername(event.target.value);
							}}
							name="user"
							required
						/>
					</label>

					<label htmlFor="password">
						<span>Password: </span>
						<S.Input
							onChange={(event) => {
								setPassword(event.target.value);
							}}
							name="password"
							type="password"
							required
						/>
					</label>

					<S.ButtonSend name="login" type="submit" value="Entrar" />
				</form>

				<br />
				<br />

				{/* <a href="/signup">Sign Up</a> */}
			</S.Main>
		</>
	)
}

export default LoginContainer
