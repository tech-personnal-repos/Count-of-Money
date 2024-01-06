import dotenv from 'dotenv';
dotenv.config();

import crypto from 'crypto';
import inquirer from 'inquirer';

import path from 'path';
import { fileURLToPath } from 'url';

const nodePath = path.resolve(process.argv[1]);
const modulePath = path.resolve(fileURLToPath(import.meta.url));

(async () => {
	if (nodePath === modulePath) {
		const answers = await inquirer.prompt({
			type: 'input',
			name: 'pass',
			message: 'Mot de passe'
		});
		const secret = process.env.SECRET_HASH;

		const hash = crypto.createHmac('sha256', secret).update(answers.pass).digest('hex');

		console.log(`Hash: ${hash}`);
	}
})();

export default function password(password) {
	const secret = process.env.SECRET_HASH;
	const hash = crypto.createHmac('sha256', secret).update(password).digest('hex');

	console.log(`Password: ${password}`);
	console.log(`Hash: ${hash}`);
}
