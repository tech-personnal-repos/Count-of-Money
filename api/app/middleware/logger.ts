import morgan from 'morgan';
import Logger from '../config/logger.js';

export default morgan(':method :url : :response-time[0]ms - :status', {
	stream: { write: message => Logger.http(message.substring(0, message.lastIndexOf('\n'))) }
});
