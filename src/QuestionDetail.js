
import { Component } from'react';
import {convertDateTimeToString} from './ConvertDateTime'


class QuestionDetail extends Component {
    state = {
        answers: [],
        submitAnswer: '',
        email: '',
        filteredAnswers: [],
        filteredQuestion: []
    }

    componentDidMount(){
        const temp = window.location.href.split('/');
        const len = temp.length
        const pk = temp[len - 1];
        console.log(pk)
        fetch('http://127.0.0.1:8000/api/v1/answers/?format=json')
        .then(res => res.json())
        .then((data) => {
            this.setState({answers: data})
            console.log(this.state.answers)
        })
        .catch(console.log)
        fetch('http://127.0.0.1:8000/api/v1/questions/'.concat(pk))
            .then(res => res.json())
            .then((data) => {
                this.setState({ filteredQuestion: data})
                console.log(this.state.filteredQuestion)
                this.setState({filteredAnswers: this.state.answers.filter(answer => this.state.filteredQuestion.answers.includes(answer.pk))})
                console.log(this.state.filteredAnswers)
                
            })
            .catch(console.log)
    }


    render() {
        if (this.state.filteredAnswers.length === 0){
            return(
                <div>
                    <h1>Question: </h1>
                <p>{this.state.filteredQuestion.content}</p>
                <p>Time asked: {this.state.filteredQuestion.created_at}</p>
                <h1>There are not yet any answers for this questions. </h1>
                </div>
            )
        }
        return(

            <div>
                <h1>Question: </h1>
                <p>{ this.state.filteredQuestion.content }</p>
                <p>Time asked: {this.state.filteredQuestion.created_at}</p>
                <h1>Answers:</h1>
                
                {this.state.filteredAnswers.map(answer => (<ul>
                    <li>
                        <div>{answer.content}</div>
                        <div>Time Answered: {answer.created_at}</div>
                    </li>
                </ul>))}
            </div>
        )
    }
}
export default QuestionDetail;