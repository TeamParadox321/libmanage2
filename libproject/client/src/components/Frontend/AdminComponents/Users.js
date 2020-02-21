import React, {Component} from 'react';
import axios from 'axios';
import AddBooks from "./AddBooks";

const ADD = () => (
    <div className="container">
        <div className="modal close" id="myModal" data-dismiss="modal">
            <div>
                <AddBooks/>
            </div>
        </div>
    </div>
);

const User = props => (
    <tr>
        <td> {props.user.user_id} </td>
        <td> {props.user.user_name} </td>
        <td> {props.user.user_email} </td>
        <td> {props.user.user_phone_number} </td>
    </tr>
);
export default class Users extends Component{
    constructor(props){
        super(props);
        this.state = {users: []};
    }
    componentDidMount(){
        axios.get('/users/')
            .then(response=>{
                this.setState({users: response.data})
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    componentDidUpdate(){
        axios.get('/users/')
            .then(response=>{
                this.setState({users: response.data})
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    studentList(){
        return this.state.users.map(function (currentUser, i) {
            return <User user={currentUser} key={i} />
        })
    }
    render(){
        return (
            <div className="container">
                <div style={{"display": "flex","max-height": "100px"}}>
                    <button style={{"max-height":"40px","margin-top":"40px"}} type="button" className="btn btn-outline-success" data-toggle="modal" data-target="#myModal1">Add Student</button>
                    <div className={"spacer"}></div>
                    <center><b><h2 className={"p-3 my-3 text-dark"} color={"red"}>All Students</h2></b></center>
                    <div className={"spacer"}></div>
                </div>
                <table className="table text-light bg-secondary table-hover">
                    <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.studentList()}
                    </tbody>
                </table>
                <br />
                <br />
                <ADD/>
            </div>
        )
    }
}
