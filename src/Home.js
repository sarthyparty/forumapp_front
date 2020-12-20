import React, { Component } from "react";
import {NavLink} from "react-router-dom";
import {convertDateTimeToString} from "./ConvertDateTime";
import CachedSearch from "./CachedSearch";

import {url} from './ApiUrl'

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

    render() {
        const questions = new Set(localStorage.getItem('questions'))
        console.log(questions)
        fetch('http://127.0.0.1:8000/api/v1/questions').then(res => res.json)
        .then(data => 
            // this.setState({cachedQuestions: data.filter(question => questions.includes(String.valueOf(question.pk)))});
            data.filter(question => console.log(question.pk))
            )
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
                    {this.state.cachedQuestions}
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