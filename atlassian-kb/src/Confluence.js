import React, {Component} from 'react';

class Confluence extends Component{
    render(){
        var title = "";
        var space = "";
        var createdBy = [];
        var version = [];
        var link = "";

        //Display required data 
        title = this.props.data.title;
        space = this.props.data.space.name;
        createdBy = [this.props.data.history.createdBy.username, this.props.data.history.createdDate]; 
        version = [this.props.data.version.by.username, this.props.data.version.when];
        link = this.props.data._links.webui;

        var createdDateModified = createdBy[1].split("T");
        var versionDateModified = version[1].split("T");

        return(
            <tr>
                <td><a href={"http://192.168.56.142:8090" + link} rel="noopener noreferrer" target="_blank">{title}</a></td>
                <td>{space}</td>
                <td>{createdBy[0]}</td>
                <td>{createdDateModified[0]}</td>
                <td>{version[0]}</td>
                <td>{versionDateModified[0]}</td>
            </tr>
        );
    }
}

export default Confluence;
