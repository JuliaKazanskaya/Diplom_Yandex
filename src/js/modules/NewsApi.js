import DataStorage from "./DataStorage";
import awaitAsyncGenerator from "@babel/runtime/helpers/esm/awaitAsyncGenerator";
import {NewsCardList} from "../components/NewsCardList";

export default class NewsApi {
    constructor(baseUrl, token) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    getDateInterval(days) {
        let date = new Date();
        let last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
        return [
            last.getFullYear() + "-" + (last.getMonth() + 1) + "-" + last.getDate(),
            date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        ];
    }

    getFirstElement(elementSelector, selectorType) {
        let element;
        if (selectorType === 'id') {
            element = document.getElementById(elementSelector)
        } else if (selectorType === 'class') {
            element = document.getElementsByClassName(elementSelector)[0];
        }
        return element;
    }

    setEventHandler(eventType, elementSelector, elementSelectorType, inputSelector, inputSelectorType, containerSelector, containerSelectorType) {
        let searchElement = this.getFirstElement(elementSelector, elementSelectorType);
        let searchInput = this.getFirstElement(inputSelector, inputSelectorType);
        let container = this.getFirstElement(containerSelector, containerSelectorType);
        let showMore = this.getFirstElement('content__button', 'class');
        let loader_block = this.getFirstElement('content__loading', 'class');
        let empty_block = this.getFirstElement('content__nothing', 'class');
        let result_block = this.getFirstElement('content__result', 'class');
        let dateInterval = this.getDateInterval(7);
        let classInstance = this;
        DataStorage.setItem('showedCardsCount', 0);
        searchElement.addEventListener(eventType, function (event) {
            event.preventDefault();
            if (searchInput.value === ""){
                alert("Нужно ввести ключевое слово");
            }else{
                empty_block.style.display = "none";
                result_block.style.display = "none";
                showMore.style.display = "none";
                loader_block.style.display = "flex";
                DataStorage.setItem('query', searchInput.value);
                container.innerHTML = "";
                classInstance.getNews(dateInterval[0], dateInterval[1], searchInput.value)
                    .then(data => {
                        DataStorage.setItem(searchInput.value, JSON.stringify(data));
                        loader_block.style.display = "none";
                        if (data.totalResults === 0){
                            empty_block.style.display = "flex";
                        }else{
                            if (data.totalResults > 3){
                                showMore.style.display = "flex";
                                let articlesList = [data.articles[0],data.articles[1],data.articles[2]];
                                new NewsCardList(container,articlesList);
                                DataStorage.setItem('showedCardsCount', 3);
                            }else{
                                new NewsCardList(container,data.articles);
                            }
                            result_block.style.display = "flex";
                        }
                    });
            }
        });
    }

    async getNews(from, to, query) {
        let response = await fetch(`${this._baseUrl}?q=${query}&from=${from}&to=${to}&pageSize=100&apiKey=${this._token}&language=ru`);
        return await response.json();
    }
}