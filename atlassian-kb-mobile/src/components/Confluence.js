import React from 'react';
import { View, Text, FlatList, Linking } from 'react-native';

class ResultView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            confluenceData: [],
        }
        const {navigation} = this.props;
        //Get parameter from navigation
        const data = navigation.getParam('data');
        this.callData(data);
    }
    render(){
        return(
            <View>
                <View style={{width: '100%', backgroundColor: 'rgb(28, 46, 83)', padding: '10%'}}>
                    <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>Atlassian Knowledge Base</Text>
                </View>
                {/* Each Data */}
                <FlatList
                    data={this.state.confluenceData}
                    renderItem={({item}) => <Confluence data={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }

    // Call data
    callData = (data) => {
        if(data !== null){
            var confluenceRequest =  "http://localhost:3002/confluence/" + data;
            try{
                //Get Confluence data
                fetch(confluenceRequest)
                .then(res => res.json())
                .then((result) => 
                    this.getConfluenceData(result)
                );
            }catch(e){
                console.log(e);
            }
        }
    }
    getConfluenceData = (result) => {

        var data = result.results;
        this.setState({
            confluenceData: data,
        })
    }
}

export default ResultView;
const Confluence = (props) => {
    var title = "";
    var space = "";
    var createdBy = [];
    var version = [];
    var link = "";

    //Display required data 
    title = props.data.title;
    space = props.data.space.name;
    createdBy = [props.data.history.createdBy.username, props.data.history.createdDate]; 
    version = [props.data.version.by.username, props.data.version.when];
    link = props.data._links.webui;

    var createdDateModified = createdBy[1].split("T");
    var versionDateModified = version[1].split("T");

    return(
        <View style={{borderWidth: 1, borderColor: 'gray', width: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: 5, borderRadius: 5}}>
            <Text style={{padding: 5, paddingLeft: 10}} onPress={()=>Linking.openURL("http://192.168.56.142:8090" + link)}>Page Title: {title}</Text>
            <Text style={{padding: 5, paddingLeft: 10}} >Space: {space}</Text>
            <Text style={{padding: 5, paddingLeft: 10}} >Creator: {createdBy[0]}</Text>
            <Text style={{padding: 5, paddingLeft: 10}} >Creation Date: {createdDateModified[0]}</Text>
            <Text style={{padding: 5, paddingLeft: 10}} >Updator: {version[0]}</Text>
            <Text style={{padding: 5, paddingLeft: 10}} >Updation Date: {versionDateModified[0]}</Text>
        </View>
    );
}