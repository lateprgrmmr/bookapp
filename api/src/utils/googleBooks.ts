import axios from "axios";


type Method = "GET" | "POST";

export const googleBooksRequest = async<T>(params: {
    method: Method;
    path: string;
    data?: any;
    headers?: Record<string, string>;
    timeout?: number;
}): Promise<T> => {
    const { method, path, data, headers, timeout } = params;
    const url = `${process.env.GOOGLE_BOOK_BASE_URL}${path}`;
    console.log({
        method,
        url,
        data,
        headers,
        timeout,
    });
    const axiosInstance = axios.create();
    try {
        const response = await axiosInstance({
            method,
            url,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            data,
            timeout: 10000,
            proxy: false,
        })
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error({
                method: method,
                url: url,
                error: error.response.data,
                status: error.response.status,
            });
        } else {
            console.error({
                method: method,
                url: url,
                error: error,
            });
        }
        throw error;
    }
};