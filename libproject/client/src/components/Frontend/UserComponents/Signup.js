import React,{Component} from 'react';
import axios from 'axios';

export default class Signup extends Component{
    constructor(props) {
        super(props);

        this.onChangeUsrId = this.onChangeUsrId.bind(this);
        this.onChangeUsrEmail = this.onChangeUsrEmail.bind(this);
        this.onChangeUsrName = this.onChangeUsrName.bind(this);
        this.onChangeUsrPassword = this.onChangeUsrPassword.bind(this);
        this.onConfirmUsrPassword = this.onConfirmUsrPassword.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state={
            user_id:"",
            user_email:"",
            user_name:"",
            user_password:"",
            user_confirm_password:""
        }
    }
    onChangeUsrId(e){
        this.setState({
            user_id : e.target.value
        })
    }
    onChangeUsrName(e){
        this.setState({
            user_name : e.target.value
        })
    }
    onChangeUsrEmail(e){
        this.setState({
            user_email : e.target.value
        })
    }
    onChangeUsrPassword(e){
        this.setState({
            user_password : e.target.value
        })
    }
    onConfirmUsrPassword(e){
        this.setState({
            user_confirm_password:e.target.value
        })
    }
    onSubmit(e) {
        if(this.state.user_password===this.state.user_confirm_password){
            e.preventDefault();

            const newUser = {
                user_id: this.state.user_id,
                user_name: this.state.user_name,
                user_email: this.state.user_email,
                user_password: this.state.user_password
            };
            axios.post('/users/user_signup', newUser)
                .then(res=>{
                    alert(res.data)
                }).catch(err=>{
                    alert(err)
                });
            this.setState({
                user_id: '',
                user_name: '',
                user_email: '',
                user_password: '',
                user_confirm_password:''
            });
        }else{
            alert("Password does not match");
            e.preventDefault();
        }
    }
    render() {
        return (
            <div className="login-form">
                <div className={"frm"}>
                    <button type="button" className="close " data-dismiss="modal" style={{"padding-right": "10px", "color": "white"}}><i className="fa fa-close"/></button>
                    <center><h2 className="text-light"> Sign up</h2></center>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <p className={"txt"}>Student Id :</p>
                        <input type="text" className="form-control" placeholder="Student ID" required="required"
                        value={this.state.user_id} onChange={this.onChangeUsrId}/>
                    </div>
                    <div className="form-group">
                        <p className={"txt"}>Email :</p>
                        <input type="email" className="form-control" placeholder="Email" required="required"
                        value={this.state.user_email} onChange={this.onChangeUsrEmail}/>
                    </div>
                    <div className="form-group">
                        <p className={"txt"}>Name With Initials :</p>
                        <input type="text" className="form-control" placeholder="Name With Initials"
                               required="required"
                        value={this.state.user_name} onChange={this.onChangeUsrName}/>
                    </div>
                    <div className="form-group">
                        <p className={"txt"}>Password :</p>
                        <input type="password" className="form-control" placeholder="Password" required="required"
                        value={this.state.user_password} onChange={this.onChangeUsrPassword}/>
                    </div>
                    <div className="form-group">
                        <p className={"txt"}>Confirm Password :</p>
                        <input type="password" className="form-control" placeholder="Confirm Password"
                               required="required"
                        value={this.state.user_confirm_password} onChange={this.onConfirmUsrPassword}/>
                    </div> <br/>
                    <div className="form-group">
                        <button type={"submit"} className={"btn btn-primary btn-block"} style={{"background": "#400000"}}>Sign up</button>
                    </div>
                </form>
            </div>
        );
    }
}

