import React from 'react'
import ReactDOM from 'react-dom'
import {Component} from 'react'

const componentElement = document.getElementById('root');

class IssueComponent extends Component{
    constructor(){
        super();
        this.state = {issues:[]}
        this.createIssue = this.createIssue.bind(this);
    }

    componentDidMount(){
        this.loadData();
    }

    loadData(){
        fetch('api/issues').then(response =>{
            if(response.ok){
                response.json().then(data => {
                    data.records.forEach( issue =>{
                        issue.date = new Date(issue.date);
                    });
                    this.setState({issues:data.records})
                }).catch(err =>{
                    console.log(err);
                })
            }else{
                response.json().then(error =>{
                    alert("Failed to fetch issues" + error.message)
                })
            }
        }).catch(err => {
            alert("Error fetching data from server", err);
        });
    }

    createIssue(issue){
        fetch('api/issues',{
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(issue)
        }).then(response =>{
            if(response.ok){
                response.json().then(addedIssue =>{
                    addedIssue.date = new Date(addedIssue.date);
                    const newIssues = this.state.issues.concat(addedIssue);
                    this.setState({issues:newIssues});
                })
            }else{
                response.json().then(error =>{
                    alert("Failed to add issue: " + error.message);
                });
            }
        }).catch(err =>{
            alert("Failed in sending data to server" + err.message);
        })
    }

    render(){
        
        return (
            <div>
                <IssueFilter/>
                <IssueList issues={this.state.issues}/>
                <IssueAdd createIssue={this.createIssue}/>
            </div>
        )

        
    }
}

class IssueFilter extends Component{
    render(){
        return(
            <h1>This is the filter</h1>
        )
    }
}

function IssueList(props){
    const issues = props.issues.map(issue => <IssueRow key={issue._id} issue={issue}/>);
  
        return(
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {issues}
                </tbody>
            </table>
        )
    }

class IssueAdd extends Component{
    constructor(){
        super();
        this.submitHandler = this.submitHandler.bind(this);
    }

    submitHandler(e){
        e.preventDefault();
        const form = document.forms.IssueAddForm;
        this.props.createIssue(
            {
                name: form.name.value,
                title: form.title.value,
                date: form.date.value
            }
        );

        form.name.value = "";
        form.title.value = "";
        form.date.value = "";


    }

    render(){
        return(
            <form name="IssueAddForm" onSubmit={this.submitHandler}>
                <input type="text" name="name"/>
                <input type="text" name="title"/>
                <input type="hidden" name="date"/>
                <button>Submit</button>
            </form>
        )
    }
}

function IssueRow(props){
    const issue = props.issue;
    return(
        <tr>
            <td>{issue.name}</td>
            <td>{issue.title}</td>
            <td>{issue.date.toDateString()}</td>
        </tr>
    )
    
}

ReactDOM.render(<IssueComponent/>, componentElement);