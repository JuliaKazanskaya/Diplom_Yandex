//Шаблон карточки коммита
export class CommitCard {
    constructor(url, date, title, text, subtitle) {
        this.url = url;
        this.date = date;
        this.title = title;
        this.text = text;
        this.subtitle = subtitle;
        this.create(this.url, this.date, this.title, this.text, this.subtitle);
    }
    //Создание карточки
    //Формат даты
    create(url, date, title, text, subtitle) {
        return `<div class="commits__card">
                    <time class="commits__card-date" datetime="${date}">${date}</time>
                    <div class="commits__who">
                    <img
                        src="${url}"
                        alt="photo"
                        class="commits__who-pic"
                    />
                    <h4 class="commits__who-title">${title}</h4>
                    <a
                    class="commits__who-subtitle"
                    href="mailto:${subtitle}"
                    >${subtitle}</a
                  >
                    <h6 class="commits__who-subtitle">${subtitle}</h6>
                    </div>
                    <p class="commits__card-text">${text}</p>
                </div>`
    }
}