import React from 'react';
import { View, Text, FlatList, Linking} from 'react-native';

class ResultView extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            bitbucketData: [],
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
                    data={this.state.bitbucketData}
                    renderItem={({item}) => <Bitbucket data={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }

    // Call data
    callData = (data) => {
        if(data !== null){
            var bitBucketRequest = "http://localhost:3002/bitbucket/" + data;
            try{
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
    getBitBucketData = (result) => {
        console.log("Bitbucket");
        console.log(result.values);

        var data = result.values;
        this.setState({
            bitbucketData: data
        })
    }
}

export default ResultView;

const Bitbucket = (props) => {
    var repoSlug = "";
    var repoDetails = [];
    var projDetails = [];
    var projKey = "";
    var projLink = "";
    
    //Display required data
    repoSlug = props.data.slug;
    repoDetails = [props.data.name, props.data.description];
    projDetails = [props.data.project.name, props.data.project.description];
    projKey = props.data.project.key;
    projLink = props.data.project.links.self[0].href;

    return(
        <View style={{borderWidth: 1, borderColor: 'gray', width: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: 5, borderRadius: 5}}>
            <Text style={{padding: 5, paddingLeft: 10}} >Repository Name: {repoDetails[0]}</Text>
            <Text style={{padding: 5, paddingLeft: 10}} >Repository Description: {repoDetails[1]}</Text>
            <Text style={{padding: 5, paddingLeft: 10}} >Project Name: {projDetails[0]}</Text>
            <Text style={{padding: 5, paddingLeft: 10}} >Project Description: {projDetails[1]}</Text>
            <Text style={{padding: 5, paddingLeft: 10}} onPress={()=>Linking.openURL(projLink)}>Link: {repoSlug}({projKey})</Text>
        
        </View>
    );
}