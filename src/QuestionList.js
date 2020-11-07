import React, { Component } from "react";

class QuestionList extends Component {
    state = {
        questions: []
    }
    render() {
        fetch('http://127.0.0.1:8000/api/v1/questions/?format=json')
            .then(res => res.json())
            .then((data) => {
                this.setState({ questions: data })
            })
            .catch(console.log)
        console.log(this.state.questions)
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
                        <h6 class="card-subtitle mb-2 text-muted">{question.content}</h6>
                        <p class="card-text">{question.time}</p>
                    </div>
                </div>
            ))}
        </div>
    )
};


export default QuestionList;