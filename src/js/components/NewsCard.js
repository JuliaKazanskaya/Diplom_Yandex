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
        return `<article class="card">
                    <img
                        src="${url}"
                        alt="Фото статьи"
                        class="card__img"
                    />
                    <time class="card__date">${date}</time>
                    <h4 class="card__title">${title}</h4>
                    <p class="card__text">${text}</p>
                    <p class="card__author">${author}</p>
              </article>`
    }
}