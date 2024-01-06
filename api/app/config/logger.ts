import { monthNames } from '../helpers/dates.js';

function pad(n: number) {
	return n < 10 ? `0${n}` : n;
}

function formattedDate() {
	const date = new Date();

	const hours = pad(date.getHours());
	const minutes = pad(date.getMinutes());
	const seconds = pad(date.getSeconds());
	const day = pad(date.getDate());
	const month = date.getMonth();
	const year = date.getFullYear();

	return `${hours}:${minutes}:${seconds} ${day} ${monthNames[month].slice(0, 3)} ${year}`;
}

const isSilent = process.env.NODE_ENV === 'TEST';

const silent = {
	error(_: string) {},
	info(_: string) {},
	http(_: string) {},
	verbose(_: string) {},
	debug(_: string) {}
};

const loggers = {
	error(message: string) {
		console.error(`\x1b[38;5;251m[${formattedDate()}] \x1b[31m${message}\x1b[0m`);
	},

	info(message: string) {
		console.log(`\x1b[38;5;251m[${formattedDate()}] \x1b[32m${message}\x1b[0m`);
	},

	http(message: string) {
		console.log(`\x1b[38;5;251m[${formattedDate()}]\x1b[0m ${message}`);
	},

	verbose(message: string) {
		console.log(`\x1b[38;5;251m[${formattedDate()}] \x1b[33m${message}\x1b[0m`);
	},

	debug(message: string) {
		console.log(`\x1b[38;5;251m[${formattedDate()}] \x1b[34m${message}\x1b[0m`);
	}
};

export default isSilent ? silent : loggers;
