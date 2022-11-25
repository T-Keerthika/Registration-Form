import React from "react";
import "./App.css";

class InputComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);

    };

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });


    }

    submitForm(e) {
        console.log(this.validateForm());

        e.preventDefault();
        if (this.validateForm()) {
            console.log(this.state);
            let fields = {};
            fields["username"] = "";
            fields["emailid"] = "";
            fields["mobileno"] = "";
            fields["password"] = "";
            this.setState({ fields: fields });
            console.log(this.state);
            alert("Form submitted");
        }

    }

    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "*Please enter your username.";
        }

        if (typeof fields["username"] !== "undefined") {
            if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["username"] = "*Please enter alphabet characters only.";
            }
        }

        if (!fields["emailid"]) {
            formIsValid = false;
            errors["emailid"] = "*Please enter your email-ID.";
        }

        if (typeof fields["emailid"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+))|("[\w-\s]+")([\w-]+(?:\.[\w-]+)))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!fields["emailid"].match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                formIsValid = false;
                errors["emailid"] = "*Please enter valid email-ID.";
            }
        }

        if (!fields["mobileno"]) {
            formIsValid = false;
            errors["mobileno"] = "*Please enter your mobile no.";
        }

        if (typeof fields["mobileno"] !== "undefined") {
            if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["mobileno"] = "*Please enter valid mobile no.";
            }
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        if (typeof fields["password"] !== "undefined") {
            var string = "";
            var c=0;
            if (!fields["password"].match(/^.(?=.{8,})(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[@#$%&]).$/)) {
                formIsValid = false;
            }
            if(fields["password"].length<=8){
                c++;
                string += '*Password must be at least 8 characters long.';
            }
            if(!fields['password'].match(/[0-9]/)){
                c++;
                string += '*Password must contain at least one number (0-9)!';
            }
            if(!fields['password'].match(/[a-z]/)){
                c++;
                string += "*Password must contain at least one lowercase letter (a-z)!";
            }
            if(!fields['password'].match(/[A-Z]/)){
                c++;
                string += "*Password must contain at least one uppercase letter (A-Z)!";
            }
            if(!fields['password'].match(/[@#$%&]/)){
                c++;
                string += "*Password must contain at least one special character!";
            }
            if(c===3){
                document.getElementById('pwd').style.color = 'red';
                string = "Password is Weak!"+string;
            }
            if(c===2){
                document.getElementById('pwd').style.color = 'orange';
                string = "Password is Good!"+string;
            }
            if(c===1){
                document.getElementById('pwd').style.color = 'yellow';
                string = "Password is Strong!"+string;
            }
            if(c===0){
                document.getElementById('pwd').style.color = 'green';
                string = "Password is Very Strong!"+string;
            }
            errors.password = string;
        }

        this.setState({
            errors: errors
        });
        return formIsValid;
    }



    render() {
        return (
            <div id="main-reg-container" className="form">
                <h3>Registration page</h3>
                <div id="form">
                    <form method="post" name="userRegistrationForm" onSubmit={this.submitForm} >
                        <label>Name</label><br></br>
                        <input type="text" name="username" value={this.state.fields.username} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.username}</div>
                        <label>Email ID</label><br></br>
                        <input type="text" name="emailid" value={this.state.fields.emailid} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.emailid}</div>
                        <label>Mobile No</label><br></br>
                        <input type="text" name="mobileno" value={this.state.fields.mobileno} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.mobileno}</div>
                        <label>Password</label><br></br>
                        <div id="pwd">
                        <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
                        <div >{this.state.errors.password}</div>
                        </div>
                        <input type="submit" className="button" value="Register" />
                    </form>
                </div>
            </div>

        );
    }


}

export default InputComponent