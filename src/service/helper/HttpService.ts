import axios, {AxiosInstance} from "axios";

export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
}

export class HttpService {
    private readonly client: AxiosInstance;

    /**
     *
     * @param baseURL
     * @param headers   object, where property key equals to header name and property value equals to header value
     */
    constructor(baseURL: string, headers: any) {
        this.client = axios.create({
            baseURL,
            headers,
        });
    }

    /**
     *
     * @param url           relative path
     * @param method        http method
     * @param data          request payload
     */
    public async callApiAsync(url: string, method: HttpMethod = HttpMethod.GET, data: any = null): Promise<any> {
        try {
            const result = await this.client({url, method, data});

            return result.data;
        } catch (error) {
            if (error.response) {
                throw error.response.data;
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                throw error.request;
            } else {
                throw error.message;
            }
        }
    }
}
