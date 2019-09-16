import React, {Component} from 'react';

class Jira extends Component{
    render(){
        var key = "";
        var assignee= [];
        var created = "";
        var creator = [];
        var description = "";
        var priorityName = "";
        var projectName = "";

        //Display required data
        key = this.props.data.key;
        assignee = [this.props.data.fields.assignee.name, this.props.data.fields.assignee.emailAddress];
        created = this.props.data.fields.created;
        creator = [this.props.data.fields.creator.name, this.props.data.fields.creator.emailAddress];
        description = this.props.data.fields.description;
        priorityName = this.props.data.fields.priority.name;
        projectName = this.props.data.fields.project.name;

        var createdDateModified = created.split("T");
        return(
            <tr>
                <td><a href={"http://192.168.56.141:8080/browse/"+key} rel="noopener noreferrer" target="_blank">{key}</a></td>
                <td>{projectName}</td>
                <td>{description}</td>
                <td>{priorityName}</td>
                <td><a href ={"mailto:"+assignee[1]}>{assignee[0]}</a></td>
                <td><a href={"mailto:"+creator[1]}>{creator[0]}</a></td>
                <td>{createdDateModified[0]}</td>
            </tr>
        );
    }
}

export default Jira;
