import React, { Component } from "react";
import {NavLink} from "react-router-dom";
import {convertDateTimeToString} from './ConvertDateTime'

class QuestionList extends Component {
    state = {
        questions: []
    }
    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/v1/questions/recent')
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
            <h1>Unanswered Questions</h1>
            {questions.map((question) => (
                <div class="card">
                    <div class="card-body">
                        <NavLink to={{
                            pathname: '/question-detail/'.concat(question.pk),
                            questionProps: question}}>{question.content}</NavLink>
                        <p class="card-text">{convertDateTimeToString(question.created_at)}</p>
                    </div>
                </div>
            ))}
        </div>
    )
};




export default QuestionList;