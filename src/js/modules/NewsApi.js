import DataStorage from "./DataStorage";
import awaitAsyncGenerator from "@babel/runtime/helpers/esm/awaitAsyncGenerator";
import { NewsCardList } from "../components/NewsCardList";

export default class NewsApi {
    constructor(baseUrl, token) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    getDateInterval(days) {
        let date = new Date();
        let last = new Date(date.getTime() - ((days - 1) * 24 * 60 * 60 * 1000));
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
        const searchElement = this.getFirstElement(elementSelector, elementSelectorType);
        const searchInput = this.getFirstElement(inputSelector, inputSelectorType);
        const container = this.getFirstElement(containerSelector, containerSelectorType);
        const showMore = this.getFirstElement('content__button', 'class');
        const loaderBlock = this.getFirstElement('content__loading', 'class');
        const emptyBlock = this.getFirstElement('content__nothing', 'class');
        const resultBlock = this.getFirstElement('content__result', 'class');
        const dateInterval = this.getDateInterval(7);
        const classInstance = this;
        DataStorage.setItem('showedCardsCount', 0);
        searchElement.addEventListener(eventType, function (event) {
            event.preventDefault();
            if (searchInput.validity.valueMissing) {
                //searchInput.setCustomValidity("Нужно ввести ключевое слово");
                alert("Нужно ввести ключевое слово");
            } else {
                emptyBlock.style.display = "none";
                resultBlock.style.display = "none";
                showMore.style.display = "none";
                loaderBlock.style.display = "flex";
                DataStorage.setItem('query', searchInput.value);
                while (container.firstChild) container.removeChild(container.firstChild);
                //container.innerHTML = "";
                classInstance.getNews(dateInterval[0], dateInterval[1], searchInput.value)
                    .then(data => {
                        DataStorage.setItem(searchInput.value, JSON.stringify(data));
                        loaderBlock.style.display = "none";
                        if (data.totalResults === 0) {
                            emptyBlock.style.display = "flex";
                        } else {
                            if (data.totalResults > 3) {
                                showMore.style.display = "flex";
                                let articlesList = [data.articles[0], data.articles[1], data.articles[2]];
                                new NewsCardList(container, articlesList);
                                DataStorage.setItem('showedCardsCount', 3);
                            } else {
                                new NewsCardList(container, data.articles);
                            }
                            resultBlock.style.display = "flex";
                        }
                    });
            }
        });
        let query = DataStorage.getItem('query');
        if (query !== null && query !== "") {
            searchInput.value = DataStorage.getItem('query');
            searchElement.click();
        }
    }

    async getNews(from, to, query) {
        let response = await fetch(`${this._baseUrl}?q=${query}&from=${from}&to=${to}&pageSize=100&apiKey=${this._token}&language=ru`)
            .then(res => {
                if (res.ok) {
                    return Promise.resolve(res);
                }
                else
                    return Promise.reject(`Ошибка: ${res.status}`); 
            })
            .catch((err) => {
                console.log(err);
            });
        return await response.json();
    }
}