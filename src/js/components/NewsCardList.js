//Контейнер для карточек новостей
export class NewsCardList {
    constructor(container, card) {
        this.card = card;
        this.container = container;
    }
    //Добавление карточки в список
    addCard(url, date, title, text, author) {
        const card = this.card.create(url, date, title, text, author);
        this.container.insertAdjacentHTML('beforeend', card);
    }
    //Отрисовка карточек при загрузке страницы
    render(cards) {
        cards.forEach(card => {
            this.addCard(card.url, card.date, card.title, card.text, card.author);
        });
    }
}