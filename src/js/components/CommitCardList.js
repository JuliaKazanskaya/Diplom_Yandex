//Контейнер для карточек новостей
export class CommitCardList {
    constructor(container, card) {
        this.card = card;
        this.container = container;
    }
    //Добавление карточки в список
    addCard(url, date, title, text, subtitle) {
        const card = this.card.create(url, date, title, text, subtitle);
        this.container.insertAdjacentHTML('beforeend', card);
    }
    //Отрисовка карточек при загрузке страницы
    render(cards) {
        cards.forEach(card => {
            this.addCard(card.url, card.date, card.title, card.text, card.subtitle);
        });
    }
}