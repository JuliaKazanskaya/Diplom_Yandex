import { CommitCardList } from "../components/CommitCardList";

export default class NewsApi {
    constructor(baseUrl, username, repository) {
        this._baseUrl = baseUrl;
        this._username = username;
        this._repository = repository;
    }
    render() {
        this.getCommits().then(data => {
            const container = document.getElementsByClassName('commits__cards')[0];
            const commitCards = new CommitCardList(container, data);
            commitCards.render();
        })
    }

    async getCommits() {
        let response = await fetch(`${this._baseUrl}/repos/${this._username}/${this._repository}/commits`)
            .then(res => {
                if (res.ok) {
                    return Promise.resolve(res);
                }
                else
                    return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            });
        return await response.json();
    }
}