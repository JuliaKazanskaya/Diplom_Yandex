<<<<<<< Updated upstream
=======
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
    create(url, date, title, text, subtitle) {
        return `<div class="commits__card">
                    <h5 class="commits__card-date">${date}</h5>
                    <div class="commits__who">
                    <img
                        src="${url}"
                        alt="photo"
                        class="commits__who-pic"
                    />
                    <h4 class="commits__who-title">${title}</h4>
                    <h6 class="commits__who-subtitle">${subtitle}</h6>
                    </div>
                    <p class="commits__card-text">${text}</p>
                </div>`
                `            <div class="commits__card">
                <h5 class="commits__card-date">14 августа, 2019</h5>
                <div class="commits__who">
                  <img
                    src="<%= require('./images/me.jpg')%>"
                    alt="Фото с гитхаба"
                    class="commits__who-pic"
                  />
                  <h4 class="commits__who-title">Юлия Болелова</h4>
                  <a
                    href="mailto:forgetmenot8@yandex.ru"
                    class="commits__who-subtitle"
                    >forgetmenot8@yandex.ru</a
                  >
                </div>
                <p class="commits__card-text">
                  Emmet (formerly Zen Coding) is a web- developer’s toolkit that
                  can greatly improve your HTML & CSS workflow.
                </p>
              </div>`
    }
}
>>>>>>> Stashed changes
