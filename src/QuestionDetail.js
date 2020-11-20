
import { Component } from'react';

class QuestionDetail extends Component {
    constructor(props){
        super(props)
    }
    state = {
        answers: []
    }

    componentDidMount(){
        
        fetch('http://127.0.0.1:8000/api/v1/answers/')
            .then(res => res.json())
            .then((data) => {
                this.setState({ answers: data })
            })
            .catch(console.log)
        console.log(this.state.answers)
    }


    render() {
        const filtereAnswers = this.state.answers.filter(answer => answer.question === this.props.location.questionProps.pk)
        console.log(filtereAnswers)
        if (filtereAnswers.length === 0){
            return(
                <div>
                    <h1>Question: </h1>
                <p>{ this.props.location.questionProps.content }</p>
                <p>Time asked: {this.props.location.questionProps.time_asked}</p>
                <h1>There are not yet any answers for this questions. </h1>
                </div>
            )
        }
        return(

            <div>
                <h1>Question: </h1>
                <p>{ this.props.location.questionProps.content }</p>
                <p>Time asked: {this.props.location.questionProps.time_asked}</p>
                <h1>Answers:</h1>
                
                {filtereAnswers.map(answer => (<ul>
                    <li>
                        <div>{answer.content}</div>
                        <div>Time Answered: {answer.time_asked}</div>
                    </li>
                </ul>))}
            </div>
        )
    }
}
export default QuestionDetail;