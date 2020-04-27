import './index.css';
import NewsApi from "../js/modules/NewsApi";
import {newsApiUrl,newsApiKey,countArticles} from "../js/constants/Settings";
import DataStorage from "../js/modules/DataStorage";
import {ShowMore} from "../js/modules/ShowMore";

let newsHandler = new NewsApi(newsApiUrl,newsApiKey);
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
let showMoreResultsButton = document.getElementsByClassName('content__button')[0];
showMoreResultsButton.addEventListener('click', function (event) {
    event.preventDefault();
    let query = DataStorage.getItem('query');
    let showedCardsCount = parseInt(DataStorage.getItem('showedCardsCount'));
    let data = JSON.parse(DataStorage.getItem(query));
    let notShownCardsCount = data.articles.length > countArticles ? countArticles - showedCardsCount : data.articles.length - showedCardsCount;
    let showMore = document.getElementsByClassName('content__button')[0];
    let container = document.getElementsByClassName('cards')[0];
    let showMoreResults = Promise.resolve(new ShowMore(showedCardsCount,data,notShownCardsCount,showMore,container));
    showMoreResults.then(
        function(showMore) {
            showMore.next();
        }
    );
});