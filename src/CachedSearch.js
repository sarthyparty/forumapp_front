export default class CachedSearch {
    constructor(resultsHandler) {
        this.resultsHandler = resultsHandler;

        this.query = "";
        this.queryCount = 0;
        this.cache = {};
        this.cacheHits = 0;
        this.cacheHitsHistory = [];
    }

    changeQuery(query) {
        if (query.length < 3) {
            // noop
            this.resultsHandler([]);
            return;
        }
        if (this.cache[query]) {
            this.cacheHits = this.cacheHits + 1;
            this.queryCount = this.queryCount + 1;
            this.cacheHitsHistory.concat(query);
            console.log("query retrieved from cache:", query);
            this.resultsHandler(this.cache[query]);
        } else {
            fetch('http://127.0.0.1:8000/api/v1/questions/?search='+query + '&search_fields=content')
                .then(res => res.json())
                .then((data) => {
                    this.cache[query] = data;
                    this.queryCount = this.queryCount + 1;
                    console.log("query added to cache:", query);
                    this.resultsHandler(data);
                })
                .catch(console.log)

        }
    }
}