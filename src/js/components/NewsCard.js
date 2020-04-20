//Шаблон карточки новости
export class NewsCard {
    constructor(url, date, title, text, author) {
        this.url = url;
        this.date = date;
        this.title = title;
        this.text = text;
        this.author = author;
        this.create(this.url, this.date, this.title, this.text, this.author);
    }
    //Создание карточки
    create(url, date, title, text, author) {
        return `<div class="card">
                    <img
                        src="${url}"
                        alt="card"
                        class="card__img"
                    />
                    <h6 class="card__date">${date}</h6>
                    <h4 class="card__title">${title}</h4>
                    <p class="card__text">${text}</p>
                    <h5 class="card__author">${author}</h5>
                </div>`
    }
}