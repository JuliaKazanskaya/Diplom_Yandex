export class Statistics {
    constructor(){
        this.api = new NewsApi(newsApiUrl,newsApiKey);
    }
    analyze() {
        query = DataStorage.getItem('query');

        var d = new Date();
        data = this.api.getNews(d.getDate()-7, d , query);
        this.total = data.totalResults;
        this.headersCount = 0;//data.articles.filter(article=>article.title.include(query)).length; //как второй вариант
        byday={};
        for(article in data.articles)
        {
            if(article.title.include(qeury))
                this.headersCount++;

            //group by day
            d = new Date(article.publishedAt);
            d = Math.floor(d.getTime()/(1000*60*60*24));
            
            byday[d]=byday[d]||0;
            byday[d]+=1;
        }        
        //дальше отрисовка из byday, это кол-во статей по дням
    }
}