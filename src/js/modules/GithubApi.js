import {CommitCardList} from "../components/CommitCardList";

export default class NewsApi {
    constructor(baseUrl, username, repository) {
        this._baseUrl = baseUrl;
        this._username = username;
        this._repository = repository;
    }
    render(){
        this.getCommits().then(data => {
            let container = document.getElementsByClassName('commits__cards')[0];
            let commitCards = new CommitCardList(container,data);
            console.log(data);
            commitCards.render();
        })
    }

    async getCommits() {
        let response = await fetch(`${this._baseUrl}/repos/${this._username}/${this._repository}/commits`)
            .then(res => {
            if (res.ok) {
                return Promise.resolve(res);
            }
            return Promise.reject(`Ошибка:`);
        });
        return await response.json();
    }
}