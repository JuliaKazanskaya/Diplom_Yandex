//Шаблон карточки коммита
export class CommitCard {
    constructor(name, email, date, message, urlToImage) {
        this.months = [
            'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
        ];
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
        return `<div class="commits__card">
                    <time class="commits__card-date" datetime="${this.dateTime}">${this.commitDate}</time>
                    <div class="commits__who">
                    <img
                        src="${this.commitImage}"
                        alt="photo"
                        class="commits__who-pic"
                    />
                    <h4 class="commits__who-title">${this.name}</h4>
                    <a class="commits__who-subtitle" href="mailto:${this.email}">${this.email}</a>
                    </div>
                    <p class="commits__card-text">${this.message}</p>
                </div>`
    }

    textFormat(text){
        let formattedText = text;
        if (text.length > 110){
            formattedText = text.substring(0,110) + "...";
        }
        return formattedText;
    }
}