import './index.css';
import NewsApi from "../js/modules/NewsApi";
import {newsApiUrl, newsApiKey} from "../js/constants/Settings";
import DataStorage from "../js/modules/DataStorage";
import {ShowMore} from "../js/modules/ShowMore";
import {countArticles} from "../js/constants/Data"

const newsHandler = new NewsApi(newsApiUrl,newsApiKey);
newsHandler.setEventHandler(
    'click',
    'header__button','class',
    'header__field', 'class',
    'cards','class'
);
newsHandler.setEventHandler(
    'submit',
    'header__search','class',
    'header__field', 'class',
    'cards','class'
);
const showMoreResultsButton = document.getElementsByClassName('content__button')[0];
showMoreResultsButton.addEventListener('click', function (event) {
    event.preventDefault();
    const query = DataStorage.getItem('query');
    const showedCardsCount = parseInt(DataStorage.getItem('showedCardsCount'));
    const data = JSON.parse(DataStorage.getItem(query));
    const notShownCardsCount = data.articles.length > countArticles ? countArticles - showedCardsCount : data.articles.length - showedCardsCount;
    const showMore = document.getElementsByClassName('content__button')[0];
    const container = document.getElementsByClassName('cards')[0];
    const showMoreResults = Promise.resolve(new ShowMore(showedCardsCount,data,notShownCardsCount,showMore,container));
    showMoreResults.then(
        function(showMore) {
            showMore.next();
        }
    );
});