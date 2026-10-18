import { v4 as uuidv4 } from 'uuid';

import { Timer } from '../types/index.types';


export function millisecondsToHuman(ms: number) {
	const seconds = Math.floor((ms / 1000) % 60);
	const minutes = Math.floor((ms / 1000 / 60) % 60);
	const hours = Math.floor(ms / 1000 / 60 / 60);

	const humanized = [
		pad(hours.toString(), 2),
		pad(minutes.toString(), 2),
		pad(seconds.toString(), 2),
	].join(':');

	return humanized;
};


function pad(numberString: string, size: number) {
	let padded = numberString;
	while (padded.length < size) {
		padded = `0${padded}`;
	}
	return padded;
};


export function newTimer(title: string, category: string): Timer {
	const timer: Timer = {
		title,
		category,
		id: uuidv4(),
		elapsed: 0,
		isRunning: false,
	};

	return timer;
};