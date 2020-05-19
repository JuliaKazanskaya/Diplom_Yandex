//Контейнер для карточек новостей
import {NewsCard} from "./NewsCard";

export class NewsCardList {
    constructor(container, cards) {
        this.cards = cards;
        this.container = container;
        this.render(this.cards);
    }
    //Добавление карточки в список
    addCard(url, date, title, text, author, urlToImage) {
        const card = new NewsCard(url, date, title, text, author, urlToImage);
        this.container.insertAdjacentHTML('beforeend', card.create());
    }
    //Отрисовка карточек при загрузке страницы
    render(cards) {
        cards.forEach(card => {
            this.addCard(card.url, card.publishedAt, card.title, card.description, card.author, card.urlToImage);
        });
    }
}