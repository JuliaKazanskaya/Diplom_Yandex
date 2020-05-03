import DataStorage from "./DataStorage";
import awaitAsyncGenerator from "@babel/runtime/helpers/esm/awaitAsyncGenerator";
import { NewsCardList } from "../components/NewsCardList";
import { daysCount, interval, stepShow, errorMessage} from "../constants/Data"

export default class NewsApi {
    constructor(baseUrl, token) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    getDateInterval(days) {
        const date = new Date();
        const last = new Date(date.getTime() - ((days - 1) * daysCount));
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
        const errorElement = this.getFirstElement('error-message', 'class');
        const dateInterval = this.getDateInterval(interval);
        const classInstance = this;
        DataStorage.setItem('showedCardsCount', 0);
        searchElement.addEventListener(eventType, function (event) {
            event.preventDefault();
            if (!searchInput.validity.valid) {
                //alert("Нужно ввести ключевое слово");
                    errorElement.classList.add('error_invalid');
                    errorElement.classList.remove('error-message');
                    switch (true) {
                        case searchInput.validity.valueMissing:
                            errorElement.innerHTML = errorMessage.requiredText;
                            break;
                        case searchInput.validity.tooShort:
                            errorElement.innerHTML  = errorMessage.lengthText;
                            break;
                        }
            } else {
                errorElement.classList.remove('error_invalid');
                errorElement.classList.add('error-message');
                errorElement.innerHTML  = '';

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
                            if (data.totalResults > stepShow) {
                                showMore.style.display = "flex";
                                const articlesList = [data.articles[0], data.articles[1], data.articles[2]];
                                new NewsCardList(container, articlesList);
                                DataStorage.setItem('showedCardsCount', stepShow);
                            } else {
                                new NewsCardList(container, data.articles);
                            }
                            resultBlock.style.display = "flex";
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
        const query = DataStorage.getItem('query');
        if (query !== null && query !== "") {
            searchInput.value = DataStorage.getItem('query');
            searchElement.click();
        }
    }

    async getNews(from, to, query) {
        const response = await fetch(`${this._baseUrl}?q=${query}&from=${from}&to=${to}&pageSize=100&apiKey=${this._token}&language=ru`)
        if (response.ok) return await response.json();
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}