import React, {Component} from 'react';

class ClassTest extends Component{
    //how to create the state
    state = {
        test: "From Parent",
        valueOfInput: "",
    }

    render(){
        var int = 1;
        return(
            <div>
                {int}
                {this.state.test}
                {/* Child Component */}
                <ConstTest hello="not hello" hi="not hi"/>

                {/* Form */}
                <input type="text" value={this.state.valueOfInput} onChange={this.function1}/>
            </div>
        );
    }

    //function
    function1 = (param) => {
        //change the state value so input text can be updated
        console.log(param.target.value);
        this.setState({
            valueOfInput: param.target.value,
        })
    }
}

export default ClassTest;

const ConstTest = (props) => { // in case, you dont want to use state and function
    return(
        <div>
            From Child
            <br />
            {props.hello}
            <br />
            {props.hi}
        </div>
    );
}