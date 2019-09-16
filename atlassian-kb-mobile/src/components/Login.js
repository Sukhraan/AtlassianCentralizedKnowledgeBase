import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { View, Button, Text} from 'react-native';

class LoginView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: "",
            pwd: "",
            msg: <Text></Text>,
        }
    }

    render(){
        var id = "";
        var pwd = "";

        if(this.state.id !== ""){
            id = this.state.id;
        }

        if(this.state.pwd !== ""){
            pwd = this.state.pwd;
        }
        return(
            <View>
                <View style={{width: '100%', backgroundColor: 'rgb(28, 46, 83)', padding: '10%'}}>
                    <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>Atlassian Knowledge Base</Text>
                </View>
                <View>
                    {this.state.msg}
                </View>
                <TextInput placeholder={"ID"} value={id} onChangeText={(id)=> this.setState({id})} style={{width: '80%', height: '15%',marginLeft: 'auto', marginRight: 'auto', paddingLeft: '10%', marginTop: '2%', borderWidth: 1, borderColor: 'gray'}}/>
                <TextInput placeholder={"PASSWORD"} value={pwd} onChangeText={(pwd)=> this.setState({pwd})} style={{width: '80%', marginTop: '2%',marginLeft: 'auto', marginRight: 'auto', paddingLeft: '10%',height: '15%', borderWidth: 1, borderColor: 'gray'}} />
                <View style={{backgroundColor: 'rgb(28, 46, 83)', width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '5%', borderRadius: 5}}>
                    <Button title="LOGIN" onPress={this.clickOnLogin} color="white"/>
                </View>
            </View>
        ); 
    }

    clickOnLogin = () => {
        // Routing
        const {navigate} = this.props.navigation;
        if(this.state.id !== "" && this.state.pwd !== ""){
            // if(this.state.id === "jiraadmin" && this.state.pwd === "PA$$word1"){
            if(this.state.id="Tester1" && this.state.pwd === "1"){
                this.setState({
                    id: "",
                    pwd: "",
                })
                navigate('SearchView');
            }else{
                this.setState({
                    msg: <Text style={{color: 'red'}}>
                        Invalid Login Attempt
                    </Text>
                })
            }
        }else{
            this.setState({
                msg: <Text style={{color: 'red'}}>
                    Enter ID and Password
                </Text>
            })
        }
    }
}

export default LoginView;