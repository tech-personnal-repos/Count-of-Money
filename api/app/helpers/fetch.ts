function handleSearchParams(searchParams: undefined | Record<string, string>) {
	if (!searchParams) return;

	const keys = Object.keys(searchParams);
	if (keys.length === 0) return;

	const _searchParams = new URLSearchParams();
	keys.forEach(key => {
		_searchParams.append(key, searchParams[key]);
	});

	return _searchParams;
}

function handleHeaders(headers: undefined | Record<string, string>) {
	if (!headers) return new Headers();

	const keys = Object.keys(headers);
	if (keys.length === 0) return;

	const _headers = new Headers();
	keys.forEach(key => {
		_headers.append(key, headers[key]);
	});

	return _headers;
}

function handleRequest(url: string, options?: Options) {
	if (!options) return { uri: url, headers: new Headers(), body: undefined, options: {} };

	const searchParams = handleSearchParams(options.searchParams);
	const headers = handleHeaders(options.headers);

	const uri = searchParams ? url.replace(/(?:\?.*?)?(?=#|$)/, `?${searchParams.toString()}`) : url;
	let body = options.body ?? undefined;

	if (options.json !== undefined) {
		body = JSON.stringify(options.json);
		headers.set('content-type', headers.get('content-type') ?? 'application/json');
	}

	return { uri, headers, body, options };
}

async function request(
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
	url: string,
	query?: Options
): Promise<Response> {
	const { uri, headers, body, options } = handleRequest(url, query);

	const timeout = options.timeout ?? 30000;
	const controller = new AbortController();
	const id = setTimeout(controller.abort, timeout);

	const response = await fetch(uri, { ...options, signal: controller.signal, method: method, headers, body });
	clearTimeout(id);

	return response;
}

interface Options extends RequestInit {
	headers?: Record<string, string>;
	searchParams?: Record<string, string>;
	json?: Object;
	timeout?: number;
}

export async function get(url: string, options?: Options) {
	return await request('GET', url, options);
}

export async function post(url: string, options?: Options) {
	return await request('POST', url, options);
}

export async function put(url: string, options?: Options) {
	return await request('PUT', url, options);
}

export async function del(url: string, options?: Options) {
	return await request('DELETE', url, options);
}

export async function patch(url: string, options?: Options) {
	return await request('PATCH', url, options);
}
