import { Timestamp } from "firebase/firestore";

const calcDuration = (start: Timestamp, end: Timestamp) => {
	console.log(start, end);
	if (!start || !end) return;

	const created_at = start.toDate();
	const updated_at = end.toDate();
	const diff = updated_at.getTime() - created_at.getTime();

	const time = {
		day: Math.floor(diff / 86400000),
		hour: Math.floor(diff / 3600000) % 24,
		minute: Math.floor(diff / 60000) % 60,
		second: Math.floor(diff / 1000) % 60,
		millisecond: Math.floor(diff) % 1000
	};
	
	return Object.entries(time)
		.filter(val => val[1] !== 0)
		.map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
		.join(', ');
}

export default calcDuration;