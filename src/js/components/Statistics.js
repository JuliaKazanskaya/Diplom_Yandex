import DataStorage from "../modules/DataStorage";
import NewsApi from "../modules/NewsApi";
import {newsApiKey, newsApiUrl, countArticles} from "../constants/Settings";

export class Statistics {
    constructor(){
        this.api = new NewsApi(newsApiUrl,newsApiKey);
        this.total = 0;
        this.headersCount = 0;
        this.byDay = {};
        this.byDayName = {};
        this.moths = [];
        this.getLastSevenDays();
    }
    analyze() {
        this.query = DataStorage.getItem('query');
        if (this.query !== null && this.query !== ""){
            let dateInterval = this.api.getDateInterval(7);
            this.api.getNews(dateInterval[0], dateInterval[1], this.query)
                .then(data => {
                    if (data.totalResults === 0){
                        this.drawResults();
                    }else{
                        this.total = data.totalResults;
                        let analyzerInstance = this;
                        function groupByDay(article, index) {
                            let lowerCaseTitle = article.title.toLowerCase();
                            let lowerCaseQuery = analyzerInstance.query.toLowerCase();
                            if(article.title !== null && lowerCaseTitle.indexOf(lowerCaseQuery) !== -1)
                                analyzerInstance.headersCount++;
                            //group by day
                            let day = new Date(article.publishedAt);
                            analyzerInstance.byDay[day.getDate()]+=1;
                        }
                        data.articles.forEach(groupByDay);
                        this.drawResults();
                    }
                });
        }else{
            this.drawResults();
        }
    }
    drawResults(){
        let analyticsName = document.getElementsByClassName("analytics__name")[0];
        let analyticsWeek = document.getElementsByClassName("analytics__week")[0];
        let analyticsSubtitle = document.getElementsByClassName("analytics__subtitle")[0];
        let diagramTableNamesBlock = document.getElementsByClassName("diagram__table-col")[0];
        let diagramTableCells = diagramTableNamesBlock.getElementsByClassName("diagram__table-cell");
        let diagramTableBlocks = document.getElementsByClassName("diagram__table-col")[1];
        let diagramTableValues = diagramTableBlocks.getElementsByClassName("diagram__table-cell");
        let diagramTableTitle = document.getElementsByClassName("diagram__title-table")[0];
        if (this.moths.length === 1){
            diagramTableTitle.innerText = "дата (" + this.moths[0] + ")";
        }else{
            diagramTableTitle.innerText = "дата (" + this.moths[0] + " - " + this.moths[0] + ")";
        }
        analyticsName.innerText = this.query;
        analyticsWeek.innerText = this.total;
        analyticsSubtitle.innerText = this.headersCount;
        let domIterator = 0;
        for(let day in this.byDay) {
            diagramTableCells[domIterator].innerText = this.byDayName[day];
            diagramTableValues[domIterator].innerText = this.byDay[day];
            let diagramTableBlockWidth = 0;
            if (this.total < countArticles){
                diagramTableBlockWidth = (this.total * this.byDay[day] / this.total) * 85 / this.total;
            }else{
                diagramTableBlockWidth = (countArticles * this.byDay[day] / countArticles) * 85 / countArticles;
            }
            diagramTableValues[domIterator].style = "width:"+diagramTableBlockWidth+"vw!important";
            domIterator++;
        }
    }
    getDateName(dateString){
        let days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        let d = new Date(dateString);
        let dayName = days[d.getDay()];
        return d.getDate()+ ", " + dayName;
    }
    getLastSevenDays(){
        let date = new Date();
        let monthNames = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
        for (let i=0; i < 7; i++){
            let day = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000));
            this.byDay[day.getDate()] = 0;
            this.byDayName[day.getDate()] = this.getDateName(day);
            if (!this.moths.includes(monthNames[day.getMonth()])){
                this.moths.push(monthNames[day.getMonth()]);
            }
        }
    }
}