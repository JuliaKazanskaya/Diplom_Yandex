//Шаблон карточки новости
export class NewsCard {
    constructor(url, date, title, text, author, urlToImage) {
        let months = [
            'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
        ];
        let publishedAt = date !== null ? new Date(date) : new Date();
        this.url = url !== null ? url : "#";
        this.date = publishedAt.getDate() + " " + months[publishedAt.getMonth()] + ", " + publishedAt.getFullYear();
        this.title = title !== null ? this.textFormat(title,"title") : "Untitled";
        this.text = text !== null ? this.textFormat(text,"text") : "There is no Description";
        this.author = author !== null ? author : "Media Share";
        this.urlToImage = urlToImage !== null ? urlToImage : './images/example.jpg';
        this.dateTime = publishedAt.getFullYear() + "-" + ("0"+(publishedAt.getMonth()+1)).slice(-2) + "-" + ("0" + publishedAt.getDate()).slice(-2);
    }
    //Создание карточки
    //Формат даты
    create() {
        return `<a href="${this.url}" target="_blank">
                    <article class="card">
                        <img
                            src="${this.urlToImage}"
                            alt="Фото статьи"
                            class="card__img"
                        />
                        <time class="card__date" datetime="${this.dateTime}">${this.date}</time>
                        <h4 class="card__title">${this.title}</h4>
                        <p class="card__text">${this.text}</p>
                        <p class="card__author">${this.author}</p>
                    </article>
                </a>`
    }

    textFormat(text,type){
        let formattedText = text;
        if (type === "text" && text.length > 185){
            formattedText = text.substring(0,185) + "...";
        }
        if (type === "title" && text.length > 33){
            formattedText = text.substring(0,33) + "...";
        }
        return formattedText;
    }
}