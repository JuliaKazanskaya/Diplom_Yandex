export default class NewsApi {
    constructor(baseUrl, token) {
        this._baseUrl = baseUrl;
        this._token = token;
    }
    getNews(from, to, query) {
        this._url = `${this._baseUrl}q=${query}&from=${from}&to=${to}&pageSize=100&apiKey=${this._token}&language=ru`;
        this.request = fetch(this._url)
            .then(res => {
                if (res.ok) {
                    return Promise.resolve(res.json());
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
        return this.request;
    }
}