import {titleLength, textLength, month} from "../constants/Data"
import SanitizeHTML from "../utils/SanitizeHTML"
//Шаблон карточки новости
export class NewsCard {
    constructor(url, date, title, text, author, urlToImage) {
        const publishedAt = date !== null ? new Date(date) : new Date();
        this.url = url !== null ? url : "#";
        this.date = publishedAt.getDate() + " " + month[publishedAt.getMonth()] + ", " + publishedAt.getFullYear();
        this.title = title !== null ? this.textFormat(title,"title") : "Untitled";
        this.text = text !== null ? this.textFormat(text,"text") : "There is no Description";
        this.author = author !== null ? author : "Media Share";
        this.urlToImage = urlToImage !== null ? urlToImage : './images/example.jpg';
        this.dateTime = publishedAt.getFullYear() + "-" + ("0"+(publishedAt.getMonth()+1)).slice(-2) + "-" + ("0" + publishedAt.getDate()).slice(-2);
    }
    //Создание карточки
    //Формат даты
    create() {
        const tmp = new SanitizeHTML();
        
        return `<a href="${tmp.check(this.url)}" target="_blank">
                    <article class="card">
                        <img
                            src="${tmp.check(this.urlToImage)}"
                            alt="Фото статьи"
                            class="card__img"
                        />
                        <time class="card__date" datetime="${tmp.check(this.dateTime)}">${tmp.check(this.date)}</time>
                        <h4 class="card__title">${tmp.check(this.title)}</h4>
                        <p class="card__text">${tmp.check(this.text)}</p>
                        <p class="card__author">${tmp.check(this.author)}</p>
                    </article>
                </a>`
    }

    textFormat(text,type){
        let formattedText = text;
        if (type === "text" && text.length > textLength){
            formattedText = text.substring(0,textLength) + "...";
        }
        if (type === "title" && text.length > titleLength){
            formattedText = text.substring(0,titleLength) + "...";
        }
        return formattedText;
    }
}