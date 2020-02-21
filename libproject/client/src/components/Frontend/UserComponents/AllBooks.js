import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const Book = props => (
    <tr>
        <td> <Link to={'/book/'+props.book._id}>{props.book.book_id}</Link>  </td>
        <td> {props.book.book_title} </td>
        <td> {props.book.book_category} </td>
        <td> {props.book.book_author} </td>
        <td> {props.book.book_availability.toString()} </td>
    </tr>
);
export default class AllBooks extends Component{
    constructor(props){
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.state = {
            books: [],
            search: ''
        };
    }
    componentDidMount(){
        axios.get('/books/')
            .then(response=>{
                this.setState({books: response.data})
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    onChangeSearch(e){
        this.setState({
            search : e.target.value
        })
    }
    componentDidUpdate(){
        axios.get('/books/')
            .then(response=>{
                this.setState({books: response.data})
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    bookList(props){
        return this.state.books.map(function (currentBook, i) {
            {console.log(currentBook)}
            if(props.trim()!=''){
                if(currentBook.book_id.includes(props)||currentBook.book_title.includes(props)){
                    return <Book book={currentBook} key={i}/>
                }
            }else{
                return <Book book={currentBook} key={i} />
            }
        })
    }
    render(){
        return (
            <div className="container">
                <div style={{"display": "flex","max-height": "100px"}}>
                    <div className={"spacer"}></div>
                    <center><b><h2 className={"p-3 my-3 text-dark"} color={"red"}>All Books</h2></b></center>
                    <div className={"spacer"}></div>
                    <input type="text" className="" placeholder="Search" style={{"max-height": "35px", "margin-top": "50px"}}
                           value={this.state.search} onChange={this.onChangeSearch}/>
                </div>
                <table id="example" class="table bg-white table-striped table-bordered border-0 table-hover">
                    <thead style={{"background":"#400000"}} className={"text-light"}>
                    <tr>
                        <th>Book ID</th>
                        <th>Book Title</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Availability</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.bookList(this.state.search)}
                    </tbody>
                </table>
                <br />
            </div>
        );
    }
}
