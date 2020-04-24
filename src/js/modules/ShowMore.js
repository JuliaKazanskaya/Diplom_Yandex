import DataStorage from "./DataStorage";
import {NewsCardList} from "../components/NewsCardList";

export class ShowMore {
    constructor(showedCardsCount,data,notShownCardsCount,showMore,container) {
        this.showedCardsCount = showedCardsCount;
        this.data = data;
        this.showMore = showMore;
        this.notShownCardsCount = notShownCardsCount;
        this.container = container;
    }

    next() {
        if (this.notShownCardsCount > 3){
            let articlesList = [
                this.data.articles[this.showedCardsCount+1],
                this.data.articles[this.showedCardsCount+2],
                this.data.articles[this.showedCardsCount+3]
            ];
            new NewsCardList(this.container,articlesList);
            DataStorage.setItem('showedCardsCount', this.showedCardsCount + 3);
        }else{
            let articlesList;
            switch (this.notShownCardsCount) {
                case 1:
                    articlesList = [this.data.articles[this.showedCardsCount]];
                    break;
                case 2:
                    articlesList = [
                        this.data.articles[this.showedCardsCount],
                        this.data.articles[this.showedCardsCount+1]
                    ];
                    break;
                case 3:
                    articlesList = [
                        this.data.articles[this.showedCardsCount],
                        this.data.articles[this.showedCardsCount+1],
                        this.data.articles[this.showedCardsCount+2]
                    ];
            }
            new NewsCardList(this.container,articlesList);
            let showMore = document.getElementsByClassName('content__button')[0];
            this.showMore.style.display = "none";
        }
    }
}