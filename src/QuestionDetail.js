
import { Component } from'react';
import {convertDateTimeToString} from './ConvertDateTime'
import {url} from './ApiUrl'


class QuestionDetail extends Component {
    constructor (){
        super();

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
    }
    state = {
        answers: [],
        content: '',
        email: '',
        author: '',
        filteredAnswers: [],
        filteredQuestion: []
    }

    handleChangeAuthor(event){
        this.setState({author: event.target.value});
    }

    handleChangeContent(event){
        this.setState({content: event.target.value});
    }

    handleChangeEmail(event){
        this.setState({email: event.target.value});
    }

    handleSubmit(event){
        fetch('http://127.0.0.1:8000/api/v1/answers/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: this.state.content,
                email: this.state.email,
                has_answer: true,
                question: this.state.filteredQuestion.pk,
                author: this.state.author
            })
        })
        window.location.reload(false);
        // return <Redirect to={'/question-detail/'.concat(this.state.filteredQuestion.pk)}></Redirect>
    }

    componentDidMount(){
        const temp = window.location.href.split('/');
        const len = temp.length
        const pk = temp[len - 1];
        localStorage.setItem('questions', localStorage.getItem('questions')+'/'.concat(pk))
        console.log(new Set(localStorage.getItem('questions')))
        console.log(pk)
        fetch(url.concat('answers/?format=json'))
        .then(res => res.json())
        .then((data) => {
            this.setState({answers: data})
            console.log(this.state.answers)
        })
        .catch(console.log)
        fetch(url.concat('questions/'.concat(pk)))
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
                <form onSubmit={this.handleSubmit}>
                <label>
                    Answer:
                    <input type="text" value={this.state.content} onChange={this.handleChangeContent} />
                </label>
                <label>
                    Email:
                    <input type="text" value={this.state.email} onChange={this.handleChangeEmail} />
                </label>
                <label>
                    Author:
                    <input type="text" value={this.state.author} onChange={this.handleChangeAuthor}/>
                </label>
                <input type="submit" value="Submit" />
                </form>
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
                        <div>Answered At: {answer.created_at}</div>
                    </li>
                </ul>))}
                <form onSubmit={this.handleSubmit}>
                <label>
                    Answer:
                    <input type="text" value={this.state.content} onChange={this.handleChangeContent} />
                </label>
                <label>
                    Email:
                    <input type="text" value={this.state.email} onChange={this.handleChangeEmail} />
                </label>
                <label>
                    Author:
                    <input type="text" value={this.state.author} onChange={this.handleChangeAuthor}/>
                </label>
                <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
export default QuestionDetail;