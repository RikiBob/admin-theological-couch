import { errors } from '@/helpers/errors.js'
import { router } from '@/main.js';

const baseURL =  import.meta.env.VITE_SERVER_URL;

const refreshToken = async () => {
    return await fetch(`${baseURL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
    });;
};

const request = async (url, options = {}) => {
    try {
        const fullURL = baseURL + url;
        let response = await fetch(fullURL, {
            ...options,
            credentials: "include",
        });

        let data = null;

        if (url === '/auth/login' && !response.ok) {
            data = await response.json();
            console.log(data);
            throw new Error(data?.errors[0]?.message || 'Login failed');
        }

        if (response.status === 401) {
            data = await response.json();
            if (data.message === 'Unauthorized') {
                await refreshToken();

                response = await fetch(fullURL, {
                    ...options,
                    credentials: "include",
                });

                if (!response.ok) {
                    await router.push('/login');
                    throw new Error(`Request failed after token refresh: ${response.status}`);
                }
            } else {
                throw new Error(data?.errors[0]?.message);
            }
        }

        if (!response.ok) {
            data = await response.json();
            console.log(data)
            throw new Error(data?.errors[0]?.message || `Request failed with status ${response.status}`);
        }

        return response;
    } catch (error) {
        errors.value.push(error);
        throw error;
    }
};

export const api =  {
    get: async (url) => {
        return (await request(url, {method: 'GET'})).json();
    },

    post: async (url, body) => {
        return await request(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" } });
    },

    remove: async (url) => {
        return await request(url, { method: 'DELETE' });
    },

    patch: async (url, body) => {
        return await request(url, {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" }
        })
    }
}
