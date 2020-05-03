import {commitText, month} from "../constants/Data"
import SanitizeHTML from "../utils/SanitizeHTML"
//Шаблон карточки коммита 
export class CommitCard {
    constructor(name, email, date, message, urlToImage) {
        this.months = month;
        this.name = name;
        this.email = email;
        this.publishedAt = date !== null ? new Date(date) : new Date();
        this.dateTime = this.publishedAt.getFullYear() + "-" + ("0"+(this.publishedAt.getMonth()+1)).slice(-2) + "-" + ("0" + this.publishedAt.getDate()).slice(-2);
        this.commitDate = this.publishedAt.getDate() + " " + this.months[this.publishedAt.getMonth()] + ", " + this.publishedAt.getFullYear();
        this.message = message !== null ? this.textFormat(message) : "";
        this.commitImage = urlToImage; 
    }
    //Создание карточки
    //Формат даты
    create() {
        const tmp = new SanitizeHTML();
        return `<div class="commits__card">
                    <time class="commits__card-date" datetime=" ${tmp.check(this.dateTime)}">${tmp.check(this.commitDate)}</time>
                    <div class="commits__who">
                    <img
                        src="${tmp.check(this.commitImage)}"
                        alt="photo"
                        class="commits__who-pic"
                    />
                    <h4 class="commits__who-title">${tmp.check(this.name)}</h4>
                    <a class="commits__who-subtitle" href="mailto:${tmp.check(this.email)}">${tmp.check(this.email)}</a>
                    </div>
                    <p class="commits__card-text">${tmp.check(this.message)}</p>
                </div>`
    }

    textFormat(text){
        let formattedText = text;
        if (text.length > commitText){
            formattedText = text.substring(0,commitText) + "...";
        }
        return formattedText;
    }
}