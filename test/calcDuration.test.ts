import calcDuration from "../src/helpers/CalcDuration";
import { Timestamp } from "firebase/firestore";

describe('calcDuration - should return time difference', () => {
	test('Millisecond', () => {
		const start = Timestamp.fromDate(new Date(2021, 0, 1, 0, 0, 0));
		const end = Timestamp.fromDate(new Date(2021, 0, 1, 0, 0, 0, 1));

		expect(calcDuration(start, end)).toBe('1 millisecond');
	})

	test('Second', () => {
		const start = Timestamp.fromDate(new Date(2021, 0, 1, 0, 0, 0));
		const end = Timestamp.fromDate(new Date(2021, 0, 1, 0, 0, 1));

		expect(calcDuration(start, end)).toBe('1 second');
	})

	test('Minute', () => {
		const start = Timestamp.fromDate(new Date(2021, 0, 1, 0, 0, 0));
		const end = Timestamp.fromDate(new Date(2021, 0, 1, 0, 1, 0));

		expect(calcDuration(start, end)).toBe('1 minute');
	})

	test('Hour', () => {
		const start = Timestamp.fromDate(new Date(2021, 0, 1, 0, 0, 0));
		const end = Timestamp.fromDate(new Date(2021, 0, 1, 1, 0, 0));

		expect(calcDuration(start, end)).toBe('1 hour');
	})

	test('Day', () => {
		const start = Timestamp.fromDate(new Date(2021, 0, 1, 0, 0, 0));
		const end = Timestamp.fromDate(new Date(2021, 0, 2, 0, 0, 0));

		expect(calcDuration(start, end)).toBe('1 day');
	})
})
