import React from 'react'
import ReactDOM from 'react-dom'
import {Component} from 'react'

const componentElement = document.getElementById('root');

class IssueComponent extends Component{
    constructor(){
        super();
        this.state = {issues:[]}
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
        }).catch(error => {
            alert("Error fetching data from server", err);
        });
    }
    render(){
        
        return (
            <div>
                <IssueFilter/>
                <IssueList issues={this.state.issues}/>
                <IssueAdd/>
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
    render(){
        return(
            <h2>This is the add form</h2>
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