import React, {Component} from 'react';
import axios from 'axios';

export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id : '',
            user_name: '',
            user_email: '',
            user_phone_number: '',
            user_role: '',
            _id: ''
        };
    }
    componentDidMount(){
        var usertoken = localStorage.usertoken;
        if(usertoken!=null){
            axios.post('/users/profile', {token: usertoken})
                .then(response=>{
                    this.setState({
                        user_id: response.data.user_id,
                        user_name: response.data.user_name,
                        user_email: response.data.user_email,
                        user_phone_number: response.data.user_phone_number,
                        user_role: response.data.user_role,
                        _id: response.data._id
                    })
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
    }


    render(){
        const modal = document.getElementById('id01');

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };

        return (
            <div className="container">
                <br/><br/><br/>
                <center>
                    <h2>{this.state.user_id}</h2>
                    <table style={{"max-width":"500px", "min-width":"300px", "font-size": "20px"}}>
                        <tr>
                            <td>Name : </td>
                            <td>&nbsp;</td>
                            <td>{this.state.user_name}</td>
                        </tr>
                        <tr>
                            <td>Email : </td>
                            <td>&nbsp;</td>
                            <td>{this.state.user_email}</td>
                        </tr>
                        <tr>
                            <td>Phone Number :</td>
                            <td>&nbsp;</td>
                            <td>{this.state.user_phone_number}</td>
                        </tr>
                    </table> </center>
            </div>
        )
    }
}
