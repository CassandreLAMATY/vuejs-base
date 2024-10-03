export class ApiHandler {
    private API_URL: string = import.meta.env.VITE_BACKEND_LOCAL_URL;

    public async request<T>(
        url: string,
        options: RequestInit = {},
        authToken: string | null
    ): Promise<T> {
        const response = await fetch(`${this.API_URL}${url}`, {
            ...options,
            headers: {
                ...options.headers,
                'Content-Type': 'application/json',
                'User-Agent': import.meta.env.VITE_USER_AGENT + import.meta.env.VITE_VERSION,
                Authorization: authToken ? `Bearer ${authToken}` : ''
            }
        });

        if (!response.ok) {
            throw new Error(`An error has occured: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    }

    public async get<T>(
        url: string,
        params: Record<string, string> = {},
        authToken: string | null
    ): Promise<T> {
        const queryParams = new URLSearchParams(params);
        const apiUrl = `${url}?${queryParams}`;
        return await this.request<T>(apiUrl, {}, authToken);
    }

    public async post<T>(url: string, data: any = {}, authToken: string | null): Promise<T> {
        return await this.request<T>(
            url,
            {
                method: 'POST',
                body: JSON.stringify(data)
            },
            authToken
        );
    }

    public async patch<T>(url: string, data: any = {}, authToken: string | null): Promise<T> {
        return await this.request<T>(
            url,
            {
                method: 'PATCH',
                body: JSON.stringify(data)
            },
            authToken
        );
    }

    public async delete<T>(url: string, authToken: string | null): Promise<T> {
        return await this.request<T>(
            url,
            {
                method: 'DELETE'
            },
            authToken
        );
    }

    public async put<T>(url: string, data: any = {}, authToken: string | null): Promise<T> {
        return await this.request<T>(
            url,
            {
                method: 'PUT',
                body: JSON.stringify(data)
            },
            authToken
        );
    }
}
