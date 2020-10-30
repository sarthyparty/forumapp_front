import React, { Component } from "react";

class QuestionList extends Component {
    render() {
        return (
            <div>
                <h2>Some recent questions</h2>
                <p>This not a question from the database.</p>
                <ol>
                    <li>This is not an answer from the database.</li>
                </ol>
            </div>
        );
    }
}

export default QuestionList;