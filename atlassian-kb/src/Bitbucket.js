import React, {Component} from 'react';

class Bitbucket extends Component{
    render(){
        var repoSlug = "";
        var repoDetails = [];
        var projDetails = [];
        var projKey = "";
        var projLink = "";
        
        //Display required data
        repoSlug = this.props.data.slug;
        repoDetails = [this.props.data.name, this.props.data.description];
        projDetails = [this.props.data.project.name, this.props.data.project.description];
        projKey = this.props.data.project.key;
        projLink = this.props.data.project.links.self[0].href;


        
        return(
            <tr>
                <td>{repoDetails[0]}</td>
                <td>{repoDetails[1]}</td>
                <td>{projDetails[0]}</td>
                <td>{projDetails[1]}</td>
                <td><a href={projLink} rel="noopener noreferrer" target="_blank">{repoSlug}({projKey})</a></td>
            </tr>
        );
    }
}

export default Bitbucket;
