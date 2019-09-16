import React, {Component} from 'react';

class Login extends Component{
    state = {
        id: "",
        pwd: "",
        errMsg: "",
    }

    render(){
        return(
            <div className="login">
                <div className="title">
                    <h1>Atlassian Knowledge Base</h1>
                </div>
                <div className="login-bg">
                    <div className="login-form">
                        <h6>SIGN IN</h6>
                        {this.state.errMsg}
                        <input placeholder="ID" type="text" value={this.state.id} id="input-id" onChange={this.updateId}/> <br />
                        <input placeholder="PASSWORD" type="password" value={this.state.pwd} id="input-pwd" onChange={this.updatePwd}/> <br /><br />
                        <input type="button" value="SIGN IN" id="btn-login" onClick={this.clickLoginEvent} />
                    </div>
                </div>
            </div>
        );
    }

    //Login button Clicked
    clickLoginEvent = () => {
        if(this.state.id === "jiraadmin" && this.state.pwd === "PA$$word1"){
            //Redirect to ViewSearch.js
            window.location.href = "/search";

            this.setState({
                errMsg: ""
            });
        }else{
            this.setState({
                errMsg: <p style={{color: "red", fontSize: "0.8em"}}>Invalid login attempt</p>
            })
        }
    }

    //Update id and password
    updateId = (event) => {
        this.setState({
             id: event.target.value.trim(),
         })
    }
    updatePwd = (event) => {
        this.setState({
            pwd: event.target.value.trim(),
        })
    }
}

export default Login;
