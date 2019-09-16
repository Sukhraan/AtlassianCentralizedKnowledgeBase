import React from 'react';
import { View, Text, FlatList, Linking } from 'react-native';
import { HeaderStyleInterpolator } from 'react-navigation';

class ResultView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            jiraData: [],
        }
        //Call Jira Data
        const {navigation} = this.props;
        const data = navigation.getParam('data');
        this.callData(data);
    }
    render(){
        console.log(this.state.jiraData);
        return(
            <View>
                <View style={{width: '100%', backgroundColor: 'rgb(28, 46, 83)', padding: '10%'}}>
                    <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>Atlassian Knowledge Base</Text>
                </View>
                {/* Each Data */}
                <FlatList
                    data={this.state.jiraData}
                    renderItem={({item}) => <Jira key={item.key} data={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }

    // Call data
    callData = (data) => {
        if(data !== null){
            var jiraRequest = "http://localhost:3002/jira/" + data;
            try{
                //Get jira data
                fetch(jiraRequest)
                .then(res => res.json())
                .then((result) => 
                    this.getJiraData(result),
                );
            }catch(e){
                console.log(e);
            }
        }
    }
    //Get data
    getJiraData = (result) => {
        if(result.errorMessages !== undefined){
            console.log("error");
        }else{
            var data = result.issues;
            this.setState({
                // jiraData: result.issues,
                jiraData: data,
            })
        }
    }
}

export default ResultView;

const Jira = (props) => {
    var key = "";
    var assignee= [];
    var created = "";
    var creator = [];
    var description = "";
    var priorityName = "";
    var projectName = "";

    //Display required data
    key = props.data.key;
    assignee = [props.data.fields.assignee.name, props.data.fields.assignee.emailAddress];
    created = props.data.fields.created;
    creator = [props.data.fields.creator.name, props.data.fields.creator.emailAddress];
    description = props.data.fields.description;
    priorityName = props.data.fields.priority.name;
    projectName = props.data.fields.project.name;
    var createdDateModified = created.split("T");
    
    return(
        <View style={{borderWidth: 1, borderColor: 'gray', width: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: 5, borderRadius: 5}}>
            <Text style={{padding: 5, paddingLeft: 10}} onPress={()=>Linking.openURL("http://192.168.56.141:8080/browse/"+key)}>Issue: {key}</Text>
            <Text style={{padding: 5, paddingLeft: 10}}>Project: {projectName}</Text>
            <Text style={{padding: 5, paddingLeft: 10}}>Description: {description}</Text>
            <Text style={{padding: 5, paddingLeft: 10}}>Priority: {priorityName}</Text>
            <Text style={{padding: 5, paddingLeft: 10}} onPress={() => Linking.openURL("mailto:"+assignee[1])}>Assignee: {assignee[0]}</Text>
            <Text style={{padding: 5, paddingLeft: 10}} onPress={() => Linking.openURL("mailto:"+creator[1])}>Creator: {creator[0]}</Text>
            <Text style={{padding: 5, paddingLeft: 10}}>Creation Date: {createdDateModified[0]}</Text>
        </View>
    );
}