import React, { Component } from "react";
import {NavLink} from "react-router-dom";
import {convertDateTimeToString} from "./ConvertDateTime";
import CachedSearch from "./CachedSearch";

import {url} from './ApiUrl'
// import {Questions} from './UnansweredQuestions'

class Home extends Component {
    constructor(props) {
        super(props);

        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleResults = this.handleResults.bind(this);
        this.CachedSearch = new CachedSearch(this.handleResults);
    }
    state = {
        query: "",
        results: [],
        cachedQuestions: []
    };

    handleQueryChange(query) {
        this.setState({ query });
        this.CachedSearch.changeQuery(query);
    }
    handleResults(results) {
        this.setState({results})
    }

    toInt(str){
        return parseInt(str)
    }

    componentDidMount(){
        const questions = localStorage.getItem('questions').split('/');
        var intquestion = []
        for (var i = 0; i < 5; i++){
            intquestion.push(parseInt(questions[questions.length - i - 1]))
        }
        console.log(questions)
        console.log(intquestion)
        fetch(url.concat('questions/'))
        .then(res => res.json())
        .then((data) => {
            this.setState({cachedQuestions: data.filter(question => intquestion.includes(question.pk))})
        })
        .catch(console.log)

    }

    render() {
        
        return (
            <div>
                <h2>Hello there!</h2>
                <p>This is a forum for EPHS students who have questions.</p>

                <p>If you've wandered here you're probably in need of a little help,
                    or you're here to help someone. Ask a question to get started! </p>
                <h3>Cache Based Search</h3>
                <form>
                    <label>Search: </label>
                    <input
                        onChange={({ target: { value } }) => this.handleQueryChange(value)}
                    />
                </form>

                <Questions questions={this.state.results} />
                <h3>Query Count: {this.CachedSearch.queryCount}</h3>
                <h3>Cache Hits: {this.CachedSearch.cacheHits}</h3>
                <div>
                <div>
                    <Questions questions={this.state.cachedQuestions}></Questions>
                    </div>
                </div>
            </div>
        );
    }
}

const Questions = ({ questions }) => {
    return (
        <div>
            {questions.map((question) => (
                <div class="card">
                    <div class="card-body">
                        <NavLink to={{
                            pathname: '/questions/'.concat(question.pk),
                            questionProps: question}}>{question.content}</NavLink>
                        <p class="card-text">{convertDateTimeToString(question.created_at)}</p>
                    </div>
                </div>
            ))}
        </div>
    )
};



export default Home;