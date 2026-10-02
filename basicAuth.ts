import { type Handle } from '@sveltejs/kit/hooks';

// load from .env
const username = '';
const password = '';

export const basicAuth: Handle = async ({ event, resolve }) => {
	const auth = event.request.headers.get('authorization');

	if (auth !== 'Basic ' + btoa(`${username}:${password}`)) {
		return new Response(null, {
			status: 401,
			headers: {
				'WWW-Authenticate': 'Basic realm="restricted", charset="UTF-8"'
			}
		});
	}

	return await resolve(event);
};
