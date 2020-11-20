import React, { Component } from "react";
import {NavLink} from "react-router-dom";

class QuestionList extends Component {
    state = {
        questions: []
    }
    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/v1/questions/')
            .then(res => res.json())
            .then((data) => {
                this.setState({ questions: data })
            })
            .catch(console.log)
        console.log(this.state.questions)
    }

    render() {

        return (
            <Questions questions={this.state.questions} />
        )
    }
}
const Questions = ({ questions }) => {
    return (
        <div>
            <h1>Question List</h1>
            {questions.map((question) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{question.pk}</h5>
                        <NavLink to={{
                            pathname: '/question-detail/',
                            questionProps: question}}>{question.content}</NavLink>
                        <p class="card-text">{question.time_asked}</p>
                    </div>
                </div>
            ))}
        </div>
    )
};


export default QuestionList;