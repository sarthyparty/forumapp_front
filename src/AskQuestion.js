import React, { Component } from "react";

class AskQuestion extends Component {
    state = {
        question: null
    }
    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/v1/questions/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: "This is a question from the frontend",
                time_asked: "2020-11-13T16:30:45.421158Z",
                email: "person@example.com",
                has_answer: false,
            })
        })
    }

    render() {
        return (
            <div>
                <h2>GOT QUESTIONS?</h2>
                <p>You're in the right place!</p>
            </div>
        );
    }
}

export default AskQuestion;