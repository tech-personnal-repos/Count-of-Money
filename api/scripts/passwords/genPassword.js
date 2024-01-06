import generate from './hashPassword.js';

generate(Math.random().toString(36).substring(2, 15));
