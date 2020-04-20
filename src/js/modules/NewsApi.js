//Подклюение к серверу
export class NewsApi {
    constructor(options) {
        this.header = options.headers;
        this.url = options.url;
        this.token = options.headers.authorization;
    }
    //Получаем данные
    getData(res) {
        if (res.ok) {
            return res.json();
        }
        else
            return Promise.reject(`Ошибка: ${res.status}`);
    }
    //Получаем заголовки
    getHeaderName() {
        return fetch(this.url + '/users/me', {
            headers: {
                authorization: this.token
            }
        })
            .then((res) => {
                return this.getData(res);
            });
    }
    //Получаем карточки
    getCards() {
        return fetch(this.url + '/cards', {
            headers: {
                authorization: this.token
            }
        })
            .then(res => {
                return this.getData(res);
            });
    }
}