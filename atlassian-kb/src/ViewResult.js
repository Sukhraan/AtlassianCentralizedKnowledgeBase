import React, {Component} from 'react';
import $ from "jquery";

import Jira from './Jira';
import Confluence from './Confluence';
import Bitbucket from './Bitbucket';

class ViewResult extends Component{
    constructor(){
        super();

        //url
        var userSearched = window.location.href.split("/");

        //default state
        this.state = {
            jiraData: [],
            confluenceData: [],
            bitbucketData: [],

            //Pagenation
            eachPageJiraData:[],
            lowestJiraPageNum: 1,
            currentJiraPageNum : 1,

            eachPageConfluenceData:[],
            lowestConfluencePageNum: 1,
            currentConfluencePageNum: 1,

            eachPageBitBucketData: [],
            lowestBitBucketPageNum: 1,
            currentBitBucketPageNum: 1,
        }
        var userSearchedRemoveSharp = userSearched[4].split("#");

        this.calldata(userSearchedRemoveSharp[0]);
    }
    
    render(){
        const jiraObj = [];
        for(var idx=0; idx<this.state.eachPageJiraData.length; idx++){
            jiraObj.push(<Jira key={idx + "." + idx} data={this.state.eachPageJiraData[idx]}/>);
        }

        if(this.state.jiraData.length === 0){
            jiraObj.push(<NoData key="0" numColumn={7}/>)
        }

        const confluenceObj = [];
        for(idx=0; idx<this.state.eachPageConfluenceData.length; idx++){
            confluenceObj.push(<Confluence key={idx} data={this.state.eachPageConfluenceData[idx]} />);
        }

        if(this.state.confluenceData.length === 0){
            confluenceObj.push(<NoData key="0" numColumn={6} />)
        }

        const bitbucketObj = [];
        for(idx=0; idx<this.state.eachPageBitBucketData.length; idx++){
            bitbucketObj.push(<Bitbucket key={idx} data={this.state.eachPageBitBucketData[idx]} />);
        }

        if(this.state.bitbucketData.length === 0){
            bitbucketObj.push(<NoData key="0" numColumn={5} />)
        }

        return(
            <div className="result">
                <div className="title logout-bg">
                    <a href="/search"><h1>Atlassian Knowledge Base</h1></a>
                    <div className="logout-form">
                        <input type="button" value="LOG OUT" id="btn-logout" onClick={this.clickToLogout}/>
                    </div>
                </div>
                <div className="result-bg">
                    <div className="result-form">
                        {/* Tap */}
                        <div className="container">
                            <ul className="nav nav-tabs">
                                <li className="active"><a href="#jira" onClick={this.clickJira}>JIRA</a></li>
                                <li><a href="#confluence" onClick={this.clickConfluence}>Confluence</a></li>
                                <li><a href="#bitbucket" onClick={this.clickBitBucket}>BitBucket</a></li>
                            </ul>

                            <div className="tab-content">
                                <div id="jira" className="tab-pane fade in active">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Issue</th>
                                                <th>Project</th>
                                                <th>Description</th>
                                                <th>Priority</th>
                                                <th>Assignee</th>
                                                <th>Creator</th>
                                                <th>Creation Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {jiraObj}
                                        </tbody>
                                    </table>
                                    <ListPage datatype="jira" length={this.state.jiraData.length} lowestPageNum={this.state.lowestJiraPageNum} currentPageNum={this.state.currentJiraPageNum} onClick={this.jiraPageClickHandler}/>
                                </div>
                                <div id="confluence" className="tab-pane fade">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Page Title</th>
                                                <th>Space</th>
                                                <th>Creator</th>
                                                <th>Creation Date</th>
                                                <th>Updator</th>
                                                <th>Updation Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {confluenceObj}
                                        </tbody>
                                    </table>
                                    <ListPage datatype="confluence" length={this.state.confluenceData.length} lowestPageNum={this.state.lowestConfluencePageNum} currentPageNum={this.state.currentConfluencePageNum} onClick={this.confluencePageClickHandler}/>
                                </div>
                                <div id="bitbucket" className="tab-pane fade">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Repository Name</th>
                                                <th>Repository Description</th>
                                                <th>Project Name</th>
                                                <th>Project Description</th>
                                                <th>Link</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bitbucketObj}
                                        </tbody>
                                    </table>    
                                    <ListPage datatype="bitbucket" length={this.state.bitbucketData.length} lowestPageNum={this.state.lowestBitBucketPageNum} currentPageNum={this.state.currentBitBucketPageNum} onClick={this.bitBucketPageClickHandler}/>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    clickConfluence = () => {
        var currentPageData = [];
        var lowestDataNum, highestDataNum;
        var lowestPageNum, currentPageNum;

        var pages = pageObj;
        currentPageNum = 1;
        highestDataNum = currentPageNum * 10;
        lowestDataNum = highestDataNum - 10;

        for(var ind=lowestDataNum; ind<highestDataNum; ind++){
            if(this.state.confluenceData[ind] !== undefined){
                currentPageData.push(this.state.confluenceData[ind]);
            }
        }

        if(currentPageNum >= 3){
            lowestPageNum = lowestDataNum / 10 - 1;
        }else if(currentPageNum < 3){
            lowestPageNum = 1;
        }

        this.setState({
            eachPageConfluenceData: currentPageData,
            lowestConfluencePageNum: lowestPageNum,
            currentConfluencePageNum: currentPageNum,
        });

        for(ind = 0; ind < pages.length; ind++){
            if(pages[ind] !== undefined){
                if(pages[ind] !== null){
                    if(pages[ind].id === currentPageNum.toString()){
                        pages[ind].style.color = "rgb(48, 48, 104)";
                    }else{
                        pages[ind].style.color = "grey";
                    }
                }
            }
        }
    }
    clickJira = () => {
        var currentPageData = [];
        var lowestDataNum, highestDataNum;
        var lowestPageNum, currentPageNum;
        var pages = pageObj;

        currentPageNum = 1;
        highestDataNum = currentPageNum * 10;
        lowestDataNum = highestDataNum - 10;

        for(var ind=0; ind<highestDataNum; ind++){
            if(this.state.jiraData[ind] !== undefined){
                currentPageData.push(this.state.jiraData[ind]);
            }
        }

        if(currentPageNum >= 3){
            lowestPageNum = lowestDataNum / 10 - 1;
        }else if(currentPageNum < 3){
            lowestPageNum = 1;
        }

        this.setState({
            eachPageJiraData: currentPageData,
            lowestJiraPageNum: lowestPageNum,
            currentJiraPageNum: currentPageNum,
        });


        for(ind = 0; ind < pages.length; ind++){
            if(pages[ind] !== undefined){
                if(pages[ind] !== null){
                    if(pages[ind].id === currentPageNum.toString()){
                        pages[ind].style.color = "rgb(48, 48, 104)";
                    }else{
                        pages[ind].style.color = "grey";
                    }
                }
            }
        }
    }
    clickBitBucket = () => {
        var currentPageData = [];
        var lowestDataNum, highestDataNum;
        var lowestPageNum, currentPageNum;
        var pages = pageObj;

        currentPageNum = 1;
        highestDataNum = currentPageNum * 10;
        lowestDataNum = highestDataNum - 10;

        for(var ind=lowestDataNum; ind<highestDataNum; ind++){
            if(this.state.bitbucketData[ind] !== undefined){
                currentPageData.push(this.state.bitbucketData[ind]);
            }
        }

        if(currentPageNum >= 3){
            lowestPageNum = lowestDataNum / 10 - 1;
        }else if(currentPageNum < 3){
            lowestPageNum = 1;
        }

        this.setState({
            eachPageBitBucketData: currentPageData,
            lowestBitBucketPageNum: lowestPageNum,
            currentBitBucketPageNum: currentPageNum,
        });
        
        for(ind = 0; ind < pages.length; ind++){
            if(pages[ind] !== undefined){
                if(pages[ind] !== null){
                    if(pages[ind].id === "1"){
                        pages[ind].style.color = "rgb(48, 48, 104)";
                    }else{
                        pages[ind].style.color = "grey";
                    }
                }
            }
        }
    }

    //Search
    calldata = (data) => {  
        if(data !== ""){
            var jiraRequest = "http://localhost:3002/jira/" + data;
            var confluenceRequest =  "http://localhost:3002/confluence/" + data;
            var bitBucketRequest = "http://localhost:3002/bitbucket/" + data;
            try{
                //Get jira data
                fetch(jiraRequest)
                .then(res => res.json())
                .then((result) => 
                    this.getJiraData(result),
                );

                //Get Confluence data
                fetch(confluenceRequest)
                .then(res => res.json())
                .then((result) => 
                    this.getConfluenceData(result)
                );

                //Bitbucket
                fetch(bitBucketRequest)
                .then(res => res.json())
                .then((result) => 
                    this.getBitBucketData(result)
                );
            }catch(e){
                console.log(e);
            }
        }
    }
    //Get data
    getJiraData = (result) => {
        console.log("Jira");
        console.log(result.issues);

        if(result.errorMessages !== undefined){
            console.log("error");
        }else{
            var data = result.issues;
            //Get 10 items for each page
            //Get first 10 items when the page is loaded
            var eachPageJiraData = [];
            for(var idx=0; idx<10; idx++){
                if(result.issues[idx] !== undefined){
                    eachPageJiraData.push(result.issues[idx]);
                }else{
                    break;
                }
            }

            this.setState({
                // jiraData: result.issues,
                jiraData: data,
                eachPageJiraData: eachPageJiraData,
            })
        }
        
    }
    getConfluenceData = (result) => {
        console.log("Confluence");
        console.log(result.results);

        var eachPageConfluenceData = [];
        var data = [];

        data = result.results;
        for(var idx=0; idx<10; idx++){
            if(data[idx] !== undefined){
                eachPageConfluenceData.push(data[idx]);
            }else{
                break;
            }
        }
        this.setState({
            // confluenceData: result.results,
            confluenceData: data,
            eachPageConfluenceData: eachPageConfluenceData
        })
    }
    getBitBucketData = (result) => {
        console.log("Bitbucket");
        console.log(result.values);

        var data = result.values;
        var eachPageBitBucketData = [];
        for(var idx=0; idx<10; idx++){
            if(data[idx] !== undefined){
                eachPageBitBucketData.push(data[idx]);
            }else{
                break;
            }
        }
        
        this.setState({
            bitbucketData: data,
            eachPageBitBucketData: eachPageBitBucketData
        })
       
    }

    //Enter data
    updateData = (event) => {
        this.setState({
            data: event.target.value
        });
    }

    //Log out
    //Click event handler
    clickToLogout = () => {
        window.location.href = "/";
    }

    //Page
    jiraPageClickHandler = (props, pages) => {
        var currentPageData = [];
        var lowestDataNum, highestDataNum;
        var lowestPageNum, currentPageNum;

        if(props.target.id === "btn-next"){
            //When user clicks the next button
            //Get corresponding data
            currentPageNum = parseInt(this.state.currentJiraPageNum) + 1;
            highestDataNum = currentPageNum * 10;
            lowestDataNum = highestDataNum - 10;

            for(var ind=lowestDataNum; ind<highestDataNum; ind++){
                if(this.state.jiraData[ind] !== undefined){
                    currentPageData.push(this.state.jiraData[ind]);
                }
            }

            //Set the lowest page number
            if(currentPageNum >= 3){
                lowestPageNum = lowestDataNum / 10 - 1;
            }else if(currentPageNum < 3){
                lowestPageNum = 1;
            }

            this.setState({
                eachPageJiraData: currentPageData,
                lowestJiraPageNum: lowestPageNum,
                currentJiraPageNum: currentPageNum,
            });

            //CSS
            for(ind = 0; ind < pages.length; ind++){
                if(pages[ind] !== undefined){
                    if(pages[ind] !== null){
                        console.log(pages[ind].id);
                        console.log(currentPageNum);
                        if(pages[ind].id === currentPageNum.toString()){
                            pages[ind].style.color = "rgb(48, 48, 104)";
                        }else{
                            pages[ind].style.color = "grey";
                        }
                    }
                }
            }

        }else if(props.target.id === "btn-prev"){
            //When user clicks on the page number itself
            //Get corresponding data
            currentPageNum = parseInt(this.state.currentJiraPageNum) - 1;
            highestDataNum = currentPageNum * 10;
            lowestDataNum = highestDataNum - 10;

            for(var inx = lowestDataNum; inx < highestDataNum; inx++){
                if(this.state.jiraData[inx] !== undefined){
                    currentPageData.push(this.state.jiraData[inx]);
                }
            }

            //Set the lowest page number
            if(currentPageNum >= 3){
                lowestPageNum = lowestDataNum / 10 - 1;
            }else if(currentPageNum < 3){
                lowestPageNum = 1;
            }

            //Set data
            this.setState({
                eachPageJiraData: currentPageData,
                lowestPageNum: lowestPageNum,
                currentPageNum: currentPageNum
            });

            for(ind = 0; ind < pages.length; ind++){
                if(pages[ind] !== undefined){
                    if(pages[ind] !== null){
                        if(pages[ind].id === currentPageNum.toString()){
                            pages[ind].style.color = "rgb(48, 48, 104)";
                        }else{
                            pages[ind].style.color = "grey";
                        }
                    }
                }
            }
        }else{
            //When user clicks fon the page number itself
            //Get corresponding data
            highestDataNum = (props.target.id) * 10;
            lowestDataNum = highestDataNum - 10;
            for(var idx = lowestDataNum; idx<highestDataNum; idx++){
                if(this.state.jiraData[idx] !== undefined){
                    currentPageData.push(this.state.jiraData[idx]);
                }
            }

            //Set the lowest page number
            if(props.target.id >= 3){
                lowestPageNum = lowestDataNum / 10 - 1;
            }else if(props.target.id < 3){
                lowestPageNum = 1;
            }

            //Set data
            currentPageNum = props.target.id;
            this.setState({
                eachPageJiraData: currentPageData,
                lowestJiraPageNum: lowestPageNum,
                currentJiraPageNum: currentPageNum
            })

            //CSS
            for(ind = 0; ind < pages.length; ind++){
                if(pages[ind] !== undefined){
                    if(pages[ind] !== null){
                        if(pages[ind].id === currentPageNum.toString()){
                            pages[ind].style.color = "rgb(48, 48, 104)";
                        }else{
                            pages[ind].style.color = "grey";
                        }
                    }
                }
            }
        }
    }

    //Page
    confluencePageClickHandler = (props, pages) => {
        var currentPageData = [];
        var lowestDataNum, highestDataNum;
        var lowestPageNum, currentPageNum;

        if(props.target.id === "btn-next"){
            //When user clicks the next button
            //Get corresponding data
            currentPageNum = parseInt(this.state.currentConfluencePageNum) + 1;
            highestDataNum = currentPageNum * 10;
            lowestDataNum = highestDataNum - 10;

            for(var ind=lowestDataNum; ind<highestDataNum; ind++){
                if(this.state.confluenceData[ind] !== undefined){
                    currentPageData.push(this.state.confluenceData[ind]);
                }
            }

            //Set the lowest page number
            if(currentPageNum >= 3){
                lowestPageNum = lowestDataNum / 10 - 1;
            }else if(currentPageNum < 3){
                lowestPageNum = 1;
            }

            this.setState({
                eachPageConfluenceData: currentPageData,
                lowestConfluencePageNum: lowestPageNum,
                currentConfluencePageNum: currentPageNum,
            });

            for(ind = 0; ind < pages.length; ind++){
                if(pages[ind] !== undefined){
                    if(pages[ind] !== null){
                        console.log(pages[ind].id);
                        console.log(currentPageNum);
                        if(pages[ind].id === currentPageNum.toString()){
                            pages[ind].style.color = "rgb(48, 48, 104)";
                        }else{
                            pages[ind].style.color = "grey";
                        }
                    }
                }
            }

        }else if(props.target.id === "btn-prev"){
            //When user clicks on the page number itself
            //Get corresponding data
            currentPageNum = parseInt(this.state.currentConfluencePageNum) - 1;
            highestDataNum = currentPageNum * 10;
            lowestDataNum = highestDataNum - 10;

            for(var inx = lowestDataNum; inx < highestDataNum; inx++){
                if(this.state.confluenceData[inx] !== undefined){
                    currentPageData.push(this.state.confluenceData[inx]);
                }
            }

            //Set the lowest page number
            if(currentPageNum >= 3){
                lowestPageNum = lowestDataNum / 10 - 1;
            }else if(currentPageNum < 3){
                lowestPageNum = 1;
            }

            //Set data
            this.setState({
                eachPageConfluenceData: currentPageData,
                lowestConfluencePageNum: lowestPageNum,
                currentConfluencePageNum: currentPageNum,
            });

            for(ind = 0; ind < pages.length; ind++){
                if(pages[ind] !== undefined){
                    if(pages[ind] !== null){
                        if(pages[ind].id === currentPageNum.toString()){
                            pages[ind].style.color = "rgb(48, 48, 104)";
                        }else{
                            pages[ind].style.color = "grey";
                        }
                    }
                }
            }
        }else{
            //When user clicks fon the page number itself
            //Get corresponding data
            highestDataNum = (props.target.id) * 10;
            lowestDataNum = highestDataNum - 10;
            for(var idx = lowestDataNum; idx<highestDataNum; idx++){
                if(this.state.confluenceData[idx] !== undefined){
                    currentPageData.push(this.state.confluenceData[idx]);
                }
            }

            //Set the lowest page number
            if(props.target.id >= 3){
                lowestPageNum = lowestDataNum / 10 - 1;
            }else if(props.target.id < 3){
                lowestPageNum = 1;
            }

            //Set data
            currentPageNum = props.target.id;
            this.setState({
                eachPageConfluenceData: currentPageData,
                lowestConfluencePageNum: lowestPageNum,
                currentConfluencePageNum: currentPageNum,
            })

            //CSS
            for(ind = 0; ind < pages.length; ind++){
                if(pages[ind] !== undefined){
                    if(pages[ind] !== null){
                        if(pages[ind].id === currentPageNum.toString()){
                            pages[ind].style.color = "rgb(48, 48, 104)";
                        }else{
                            pages[ind].style.color = "grey";
                        }
                    }
                }
            }
        }
    }
    //Page
    bitBucketPageClickHandler = (props, pages) => {
        var currentPageData = [];
        var lowestDataNum, highestDataNum;
        var lowestPageNum, currentPageNum;

        if(props.target.id === "btn-next"){
            //When user clicks the next button
            //Get corresponding data
            currentPageNum = parseInt(this.state.currentBitBucketPageNum) + 1;
            highestDataNum = currentPageNum * 10;
            lowestDataNum = highestDataNum - 10;

            for(var ind=lowestDataNum; ind<highestDataNum; ind++){
                if(this.state.bitbucketData[ind] !== undefined){
                    currentPageData.push(this.state.bitbucketData[ind]);
                }
            }

            //Set the lowest page number
            if(currentPageNum >= 3){
                lowestPageNum = lowestDataNum / 10 - 1;
            }else if(currentPageNum < 3){
                lowestPageNum = 1;
            }

            this.setState({
                eachPageBitBucketData: currentPageData,
                lowestBitBucketPageNum: lowestPageNum,
                currentBitBucketPageNum: currentPageNum,
            });

            for(ind = 0; ind < pages.length; ind++){
                if(pages[ind] !== undefined){
                    if(pages[ind] !== null){
                        if(pages[ind].id === currentPageNum.toString()){
                            pages[ind].style.color = "rgb(48, 48, 104)";
                        }else{
                            pages[ind].style.color = "grey";
                        }
                    }
                }
            }

        }else if(props.target.id === "btn-prev"){
            //When user clicks on the page number itself
            //Get corresponding data
            currentPageNum = parseInt(this.state.currentBitBucketPageNum) - 1;
            highestDataNum = currentPageNum * 10;
            lowestDataNum = highestDataNum - 10;

            for(var inx = lowestDataNum; inx < highestDataNum; inx++){
                if(this.state.bitbucketData[inx] !== undefined){
                    currentPageData.push(this.state.bitbucketData[inx]);
                }
            }

            //Set the lowest page number
            if(currentPageNum >= 3){
                lowestPageNum = lowestDataNum / 10 - 1;
            }else if(currentPageNum < 3){
                lowestPageNum = 1;
            }

            //Set data
            this.setState({
                eachPageBitBucketData: currentPageData,
                lowestBitBucketPageNum: lowestPageNum,
                currentBitBucketPageNum: currentPageNum,
            });

            for(ind = 0; ind < pages.length; ind++){
                if(pages[ind] !== undefined){
                    if(pages[ind] !== null){
                        if(pages[ind].id === currentPageNum.toString()){
                            pages[ind].style.color = "rgb(48, 48, 104)";
                        }else{
                            pages[ind].style.color = "grey";
                        }
                    }
                }
            }
        }else{
            //When user clicks fon the page number itself
            //Get corresponding data
            highestDataNum = (props.target.id) * 10;
            lowestDataNum = highestDataNum - 10;
            for(var idx = lowestDataNum; idx<highestDataNum; idx++){
                if(this.state.bitbucketData[idx] !== undefined){
                    currentPageData.push(this.state.bitbucketData[idx]);
                }
            }

            //Set the lowest page number
            if(props.target.id >= 3){
                lowestPageNum = lowestDataNum / 10 - 1;
            }else if(props.target.id < 3){
                lowestPageNum = 1;
            }

            //Set data
            currentPageNum = props.target.id;
            this.setState({
                eachPageBitBucketData: currentPageData,
                lowestBitBucketPageNum: lowestPageNum,
                currentBitBucketPageNum: currentPageNum,
            })

            //CSS
            for(ind = 0; ind < pages.length; ind++){
                if(pages[ind] !== undefined){
                    if(pages[ind] !== null){
                        if(pages[ind].id === currentPageNum.toString()){
                            pages[ind].style.color = "rgb(48, 48, 104)";
                        }else{
                            pages[ind].style.color = "grey";
                        }
                    }
                }
            }
        }
    }
}

export default ViewResult;

const NoData = (props) => {
    return(
        <tr> 
            <th colSpan={props.numColumn} style={{textAlign:"center", paddingTop: "20px"}}>
                No data to display 
            </th>
        </tr>
    );
}

var pageObj;
var firstLoadedJira, firstLoadedConfluence, firstLoadedBitBucket;
//Page
class ListPage extends Component{
    constructor(){
        super();
        firstLoadedJira = true;
        firstLoadedConfluence = true;
        firstLoadedBitBucket = true;
    }
    render(){
        const pageCounter = Math.ceil(this.props.length / 10);
        var lowestPageNum = this.props.lowestPageNum;
        var highestPageNum;
        if(pageCounter > 10){
            //If page is more than 10
            if(lowestPageNum + 9 <= pageCounter){
                highestPageNum = lowestPageNum + 9;
            }else{
                highestPageNum = pageCounter;
            }
        }else{
            //If page is less than 10
            highestPageNum = pageCounter;
        }

        const pages = [];
        for(var idx = lowestPageNum; idx<=highestPageNum; idx++){
            if(firstLoadedJira && this.props.datatype === "jira"){
                pages.push(
                    <th key={idx} ref={(obj) => this.addPageObj(obj)} id={idx} onClick={this.sendDataClickEvent}>
                        <span style={{pointerEvents: 'none', color: 'rgb(48, 48, 104)'}}>{idx}</span>
                    </th>
                );
                firstLoadedJira = false;
            }else if(firstLoadedConfluence && this.props.datatype === "confluence"){
                pages.push(
                    <th key={idx} ref={(obj) => this.addPageObj(obj)} id={idx} onClick={this.sendDataClickEvent}>
                        <span style={{pointerEvents: 'none', color: 'rgb(48, 48, 104)'}}>{idx}</span>
                    </th>
                );
                firstLoadedConfluence = false;
            }else if(firstLoadedBitBucket && this.props.datatype === "bitbucket"){
                pages.push(
                    <th key={idx} ref={(obj) => this.addPageObj(obj)} id={idx} onClick={this.sendDataClickEvent}>
                        <span style={{pointerEvents: 'none', color: 'rgb(48, 48, 104)'}}>{idx}</span>
                    </th>
                );
                console.log("hi");
                firstLoadedBitBucket = false;
            }else{
                pages.push(
                    <th key={idx} ref={(obj) => this.addPageObj(obj)} id={idx} onClick={this.sendDataClickEvent}>
                        <span style={{pointerEvents: 'none'}}>{idx}</span>
                    </th>
                );
            }
        }
    
        var pageNextBtn = [];
        var currentPageNum = this.props.currentPageNum;
        if(pageCounter > 1 && pageCounter > currentPageNum){
            pageNextBtn = <th onClick={this.sendDataClickEvent} id="btn-next"><span style={{pointerEvents: 'none'}}>NEXT</span></th>
        }
    
        var pagePrevBtn = [];
        if(parseInt(currentPageNum) !== 1){
            pagePrevBtn = <th onClick={this.sendDataClickEvent} id="btn-prev"><span style={{pointerEvents: 'none'}}>PREV</span></th>
        }

        return(
            <div className="list-page">
                <table>
                    <tbody>
                        <tr>
                            {pagePrevBtn}
                            {pages}
                            {pageNextBtn}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
    addPageObj = (obj) => {
        var exist = false;
        if(pageObj === undefined){
            pageObj = [];
        }else{
            for(var idx=0; idx<pageObj.length; idx++){
                if(pageObj[idx] === obj){
                    exist = true;
                }
            }
            if(!exist){
                pageObj.push(obj);
            }
        }
    }

    //Click Event Handler
    sendDataClickEvent = (event) => {
        this.props.onClick(event, pageObj);
    }
}


$(document).ready(function(){
    $(".nav-tabs a").click(function(){
      window.$(this).tab('show');
    });
});