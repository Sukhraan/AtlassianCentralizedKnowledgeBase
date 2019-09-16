import React, {Component} from 'react';

class Search extends Component{
    constructor(){
        super();

        //get searched terminology from mongoDB
        this.callSearchedData();
    }
    state = {
        data: "",
        searchedTerm: [],
    }

    render(){
        const searchedTerms = [];
        //Searched terms
        for(var idx=0; idx<this.state.searchedTerm.length; idx= idx+5){
            var item1 = <td></td>;
            var item2 = <td></td>;
            var item3 = <td></td>;
            var item4 = <td></td>;
            var item5 = <td></td>;

            item1 = <td>
            <a href={"search/"+this.state.searchedTerm[idx]}>
            {this.state.searchedTerm[idx]}</a></td>;

            if(this.state.searchedTerm[idx+1] !== undefined){
                item2 = <td>
                <a href={"search/"+this.state.searchedTerm[idx+1]}>
                {this.state.searchedTerm[idx+1]}</a></td>;
            }
            if(this.state.searchedTerm[idx+2] !== undefined){
                item3 = <td>
                <a href={"search/"+this.state.searchedTerm[idx+2]}>
                {this.state.searchedTerm[idx+2]}</a></td>;
            }
            if(this.state.searchedTerm[idx+3] !== undefined){
                item4 = <td>
                <a href={"search/"+this.state.searchedTerm[idx+3]}>
                {this.state.searchedTerm[idx+3]}</a></td>;
            }
            if(this.state.searchedTerm[idx+4] !== undefined){
                item5 = <td>
                <a href={"search/"+this.state.searchedTerm[idx+4]}>
                {this.state.searchedTerm[idx+4]}</a></td>;
            }
            searchedTerms.push(
                <tr key={idx}>
                    {item1}
                    {item2}
                    {item3}
                    {item4}
                    {item5}
                </tr>
            );
        }

        return(
            <div className="search">
                <div className="title logout-bg">
                    <a href="/search"><h1>Atlassian Knowledge Base</h1></a>
                    <div className="logout-form">
                        <input type="button" value="Sign out" id="btn-logout" onClick={this.clickToLogout}/>
                    </div>
                </div>
                <div className="search-bg">
                    <div className="search-form">
                        {/* <form> */}
                            <input placeholder="What are we looking for?" type="text" id="input-data" value={this.state.data} onChange={this.updateData}/> 
                            <input type="button" value="SEARCH" id="btn-search" onClick={this.clickToSearch}/>
                            {/* Retrieve mongo DB data */}
                            <div className="data">
                                <table>
                                    <thead>
                                        <tr>
                                            <th colSpan={5}>
                                                Popular Searched Terms This Month
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchedTerms}
                                    </tbody>
                                </table>
                            </div>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        );
    }

    updateData = (event) => {
        this.setState({
            data: event.target.value,
        });
    }

    clickToSearch = () => {
        if(this.state.data !== ""){
            //Store searched term in mongoDB through url
            var requestURL = "http://localhost:3002/search/" + this.state.data;
            const Http = new XMLHttpRequest();
            Http.open("GET", requestURL);
            Http.send();

            //Direct user to result view
            window.location.href = "search/" + this.state.data;
        }
    }

    //Get data
    callSearchedData = () => {
        var url = "http://localhost:3002/searchterms";
        fetch(url)
        .then(res => res.json())
        .then((result) => 
            this.setSearchedTerms(result),
            // console.log(result)
        );
    }

    setSearchedTerms = (result) => {
        this.setState({
            searchedTerm: result,
        })
    }

    //Click event handler
    //Logout
    clickToLogout = () => {
        window.location.href = "/";
    }
}

export default Search;

