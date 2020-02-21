import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const Book = props => (
    <tr>
        <td> <Link to={'/book/'+props.book._id}>{props.book.book_id}</Link>  </td>
        <td> {props.book.user_id} </td>
        <td> {formatDate(props.book.reserved_date)} </td>
        <td>
            <button onClick={()=>{
                issue(props.book.user_id, props.book.book_id, props.book.ref_id)
            }} type="button" className="btn btn-outline-success">Issue</button> &nbsp;
            <button onClick={()=>{
                cancel(props.book.book_id, props.book.ref_id)
            }} type="button" className="btn btn-outline-danger">Cancel</button>
        </td>
    </tr>
);
function formatDate(dt) {
    var date = new Date(dt);
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hour + ':'  + min + ':' + sec;
}
function issue(user_id, book_id, ref_id){
    axios.post('/users/issue', {
        token:localStorage.usertoken,
        book_id: book_id,
        user_id: user_id,
        ref_id: ref_id
    })
        .then(response=>{
            alert(response.data)
        })
        .catch(function (error) {
            alert(error)
        });
}
function cancel(book_id, ref_id){
    axios.post('/users/cancel', {
        token:localStorage.usertoken,
        book_id: book_id,
        ref_id: ref_id
    })
        .then(response=>{
            alert(response.data)
        })
        .catch(function (error) {
            alert(error)
        });
}
export default class AllReservedBooks extends Component{
    constructor(props){
        super(props);
        this.state = {books: []};
    }
    componentDidMount(){
        axios.post('/users/all_reserved_books', {token:localStorage.usertoken})
            .then(response=>{
                this.setState({books: response.data})
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    componentDidUpdate(){
        axios.post('/users/all_reserved_books',{token:localStorage.usertoken})
            .then(response=>{
                this.setState({books: response.data})
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    bookList(){
        return this.state.books.map(function (currentBook, i) {
            {console.log(currentBook)}
            return <Book book={currentBook} key={i} />
        })
    }
    render(){
        return (
            <div className="container">
                <center><b><h2 className={"p-3 my-3 table text-dark"} color={"red"}>Reserved Books</h2></b></center>
                <table className="table table-hover">
                    <thead className="thead-dark">
                    <tr>
                        <th>Book ID</th>
                        <th>Student ID</th>
                        <th>Reserved Date</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.bookList()}
                    </tbody>
                </table>
                <br />
            </div>
        );
    }
}
