type Method = "GET" | "POST" | "PUT" | "DELETE";

const API_BASE_PATH = 'http://localhost:5005';

// generic method to make a request to the API
const makeRequest = async <T>(
    endpoint: string,
    method: Method,
    data?: Record<string, unknown>,
    headersOverride?: Record<string, string>,
): Promise<T> => {

    const defaultHeaders: HeadersInit = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
    const headers = {
        ...defaultHeaders,
        ...headersOverride,
    }

    const options: RequestInit = {
        method,
        body: JSON.stringify(data),
        headers,
    }
    try {
        const response = await fetch(`${API_BASE_PATH}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// generic method to make a GET request
export const makeGetRequest = async <T>(url: string, headers?: Record<string, string>): Promise<T> => {
    return makeRequest(url, 'GET', undefined, headers);
};

// generic method to make a POST request
export const makePostRequest = async <T>(
    url: string,
    data: Record<string, unknown>,
    headers?: Record<string, string>,
): Promise<T> => {
    return makeRequest(url, 'POST', data, headers);
};

// generic method to make a PUT request
export const makePutRequest = async <T>(
    url: string,
    data: Record<string, unknown>,
    headers?: Record<string, string>,
): Promise<T> => {
    return makeRequest(url, 'PUT', data, headers);
};

// generic method to make a DELETE request
export const makeDeleteRequest = async <T>(url: string, headers?: Record<string, string>): Promise<T> => {
    return makeRequest(url, 'DELETE', undefined, headers);
};
