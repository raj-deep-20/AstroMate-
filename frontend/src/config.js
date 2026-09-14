const configuredApiUrl = import.meta.env.VITE_API_URL;

export const API_BASE_URL = (configuredApiUrl || 'http://127.0.0.1:8000').replace(/\/$/, '');

export async function requestJson(path, options = {}) {
	const response = await fetch(`${API_BASE_URL}${path}`, {
		headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
		...options,
	});

	const data = await response.json().catch(() => ({}));
	if (!response.ok) {
		throw new Error(data.detail || data.message || `Request failed (${response.status})`);
	}

	return data;
}