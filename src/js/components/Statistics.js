import DataStorage from "../modules/DataStorage";
import NewsApi from "../modules/NewsApi";
import {newsApiKey, newsApiUrl} from "../constants/Settings";
import {interval, monthIP, daysCount, week, diagramWidth, countArticles} from "../constants/Data"

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
            const dateInterval = this.api.getDateInterval(interval);
            this.api.getNews(dateInterval[0], dateInterval[1], this.query)
                .then(data => {
                    if (data.totalResults === 0){
                        this.drawResults();
                    }else{
                        this.total = data.totalResults;
                        const analyzerInstance = this;
                        function groupByDay(article, index) {
                            const lowerCaseTitle = article.title.toLowerCase();
                            const lowerCaseQuery = analyzerInstance.query.toLowerCase();
                            if(article.title !== null && lowerCaseTitle.indexOf(lowerCaseQuery) !== -1)
                                analyzerInstance.headersCount++;
                            //group by day
                            const day = new Date(article.publishedAt);
                            analyzerInstance.byDay[day.getDate()]+=1;
                        }
                        data.articles.forEach(groupByDay);
                        this.drawResults();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }else{
            this.drawResults();
        }
    }
    drawResults(){
        const analyticsName = document.getElementsByClassName("analytics__name")[0];
        const analyticsWeek = document.getElementsByClassName("analytics__week")[0];
        const analyticsSubtitle = document.getElementsByClassName("analytics__subtitle")[0];
        const diagramTableNamesBlock = document.getElementsByClassName("diagram__table-col")[0];
        const diagramTableCells = diagramTableNamesBlock.getElementsByClassName("diagram__table-cell");
        const diagramTableBlocks = document.getElementsByClassName("diagram__table-col")[1];
        const diagramTableValues = diagramTableBlocks.getElementsByClassName("diagram__table-cell");
        const diagramTableTitle = document.getElementsByClassName("diagram__title-table")[0];
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
                diagramTableBlockWidth = (this.total * this.byDay[day] / this.total) * diagramWidth / this.total;
            }else{
                diagramTableBlockWidth = (countArticles * this.byDay[day] / countArticles) * diagramWidth / countArticles;
            }
            diagramTableValues[domIterator].style = "width:"+diagramTableBlockWidth+"vw!important";
            domIterator++;
        }
    }
    getDateName(dateString){
        const days = week;
        const d = new Date(dateString);
        const dayName = days[d.getDay()];
        return d.getDate()+ ", " + dayName;
    }
    getLastSevenDays(){
        const date = new Date();
        const monthNames = monthIP;
        for (let i=0; i < 7; i++){
            const day = new Date(date.getTime() - (i * daysCount));
            this.byDay[day.getDate()] = 0;
            this.byDayName[day.getDate()] = this.getDateName(day);
            if (!this.moths.includes(monthNames[day.getMonth()])){
                this.moths.push(monthNames[day.getMonth()]);
            }
        }
    }
}