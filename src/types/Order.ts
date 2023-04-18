import { Timestamp } from "firebase/firestore";

export type Order = {
	id: string;
	total: number;
	client_name: string;
	created_at: Timestamp;
	items: string[];
	ready: boolean;
	delivered: boolean;
}