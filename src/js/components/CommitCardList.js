//Контейнер для карточек новостей
import {CommitCard} from "./CommitCard";
import Flickity from "flickity";

export class CommitCardList {
    constructor(container, cards) {
        this.cards = cards;
        this.container = container;
    }
    //Добавление карточки в список
    addCard(name, email, date, message, urlToImage) {
        const cardInstance = new CommitCard(name, email, date, message, urlToImage);
        const card = cardInstance.create();
        this.container.insertAdjacentHTML('beforeend', card);
    }
    //Отрисовка карточек при загрузке страницы
    render() {
        //кол-во карточек для отрисовки
        let count = 20;
        this.cards.forEach(card => {
            if (count >= 0){
                let imageUrl = "./images/me.jpg";
                if (card.author !== null){
                    imageUrl = card.author.avatar_url;
                }else if(card.committer !== null){
                    imageUrl = card.committer.avatar_url;
                }
                const cardDetails = {
                    name: card.commit.committer.name,
                    email: card.commit.committer.email,
                    date: card.commit.author.date,
                    message: card.commit.message,
                    imageUrl: imageUrl
                };
                this.addCard(cardDetails.name, cardDetails.email, cardDetails.date, cardDetails.message, cardDetails.imageUrl);
            }
            count--;
        });
        new Flickity( ".commits__cards", {
            groupCells: true
        });
    }
}