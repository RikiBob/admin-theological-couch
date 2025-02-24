import { errors } from '@/helpers/errors.js'
import { router } from '@/main.js';

const baseURL =  import.meta.env.VITE_SERVER_URL;

const refreshToken = async () => {

    const response = await fetch(`${baseURL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
    });

    if (response.ok) {
        return response;
    } else {
        await router.push('/login');
        throw new Error('Failed to refresh token');
    }
};

const request = async (url, options = {}) => {
    try {
        const fullURL = baseURL + url;
        let response = await fetch(fullURL, {
            ...options,
            credentials: "include",
        });

        if (url === '/auth/login' && !response.ok) {
            const data = await response.json();
            throw new Error(data.errors[0].message);
        } else if(response.status === 500) {
            const data = await response.json();
            if (data.message === 'Unauthorized') {
                await refreshToken();

                response = await fetch(fullURL, {
                    ...options,
                    credentials: "include",
                });
            } else {
                throw new Error(data.message);
            }
        }

        return response;
    } catch (error) {
        errors.value.push(error);
        throw error;
    }
};

export const api =  {
    get: async (url) => {
        const response = await request(url, { method: 'GET' });
        return await response.json();
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
