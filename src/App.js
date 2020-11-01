import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Home from "./Home";
import AskQuestion from "./AskQuestion";
import QuestionList from "./QuestionList";

class App extends Component {
  render() {
    return (
        <HashRouter>
            <div>
                <h1>EPHS Forum</h1>
                <ul className="header">
                    <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink to="/questions">Browse Questions</NavLink></li>
                    <li><NavLink to="/ask-question">Ask a Question</NavLink></li>
                </ul>
                <div className="content">
                    <Route exact path="/" component={Home}/>
                    <Route path="/questions" component={QuestionList}/>
                    <Route path="/ask-question" component={AskQuestion}/>
                </div>
            </div>
        </HashRouter>
    );
  }
}

export default App;