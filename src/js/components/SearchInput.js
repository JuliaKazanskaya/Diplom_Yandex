import NewsApi from "../modules/NewsApi";
import { newsApiUrl, newsApiKey } from "../constants/Settings";
import DataStorage from "../modules/DataStorage";

export class SearchInput {
    constructor(){
        this.api = new NewsApi(newsApiUrl,newsApiKey);
    }
    search(query) {
        DataStorage.setItem('query', query);

        var d = new Date();
        this.api.getNews(d.getDate()-7, d , query);
        //if ok:add cards?
    }
}