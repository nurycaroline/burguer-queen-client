export type FirebaseConfigProps = {
	apiKey: string
	authDomain: string
	databaseURL: string
	projectId: string
	storageBucket: string
	messagingSenderId: string
	appId: string
}

export function getFirebaseConfig(): FirebaseConfigProps {
	return {
		apiKey: process.env.APIKEY || '',
		authDomain: process.env.AUTHDOMAIN || '',
		databaseURL: process.env.DATABASEURL || '',
		projectId: process.env.PROJECTID || '',
		storageBucket: process.env.STORAGEBUCKET || '',
		messagingSenderId: process.env.MESSAGINGSENDERID || '',
		appId: process.env.APPID || '',
	};
}
