import React from 'react';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View, Button, ReactNativeComponentTree} from 'react-native';
// import ReactNativeComponentTree from 'react-native/Libraries/Renderer/shims/ReactNativeComponentTree';
export default class SearchView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            term: "",
            searchedTerm: [],
        }

        //MongoDB data call
        this.callSearchedData();
    }
    render(){
        const searchedTerm = [];
        searchedTerm.push(this.state.searchedTerm.map(data => 
            <TouchableOpacity key={data} onPress={() => this.directToResult(data)}>
                <Text style={{padding: 5}}>{data}</Text>
            </TouchableOpacity>
        ));
        
        var term = "";
        if(this.state.term !== ""){
            term = this.state.term;
        }

        return(
            <View>
                {/* Title */}
                <View style={{width: '100%', backgroundColor: 'rgb(28, 46, 83)', padding: '10%'}}>
                    <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>Atlassian Knowledge Base</Text>
                </View>
                {/* User Input*/}
                <TextInput  placeholder={"Enter the term"} value={term} onChangeText={(term) => this.setState({term})} style={{width: '80%', marginTop: '5%',marginLeft: 'auto', marginRight: 'auto', paddingLeft: '8%',height: '12%', borderWidth: 1, borderColor: 'gray'}} />
                <View style={{backgroundColor: 'rgb(28, 46, 83)', width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '5%', borderRadius: 5}}>
                    <Button title="SEARCH" onPress={this.clickToSearch} color="white" />
                </View>
                {/* Popular Term of month */}
                <View style={{width: '90%', marginLeft:'auto', marginTop: '5%',marginRight: 'auto', borderWidth: 1, borderColor: 'gray', borderRadius: 5}}>
                    {/* Title */}
                    <View style={{backgroundColor: 'rgb(214, 209, 209)'}}>
                        <Text style={{padding: 5}}>
                            Popular Searched Terms This Month
                        </Text>
                    </View>
                    {/* Data */}
                    <View>
                        {searchedTerm}
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={this.clickToSignOut}>
                        <Text style={{padding: 10, paddingLeft: 30}}>Click here to sign out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    // Search Data
    clickToSearch = () => {
        if(this.state.term !== ""){
            var term = this.state.term;

            // Routing
            const {navigate} = this.props.navigation;

            //Store searched term in mongoDB through url
            var requestURL = "http://localhost:3002/search/" + term;
            const Http = new XMLHttpRequest();
            Http.open("GET", requestURL);
            Http.send();

            this.setState({
                term: "",
            });

            //Redirect user to next page
            // window.location.href = "search/" + this.state.data;
            navigate('ResultView', {data: term});
        }
    }
    clickToSignOut = () => {
        // Routing
        const {navigate} = this.props.navigation;
        navigate('LoginView', {data: null});
    }

    //Get data from mongoDB
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
    directToResult = (data) => {
        const {navigate} = this.props.navigation;
        navigate('ResultView', {data: data});
    }
}