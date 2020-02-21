import React, {Component} from 'react';
import axios from 'axios';

export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            _id : '',
            book_id : '',
            book_title : '',
            book_category : '',
            book_author : '',
            book_isbn: '',
            book_edition: '',
            book_year: '',
            book_availability: ''
        };
    }
    componentDidMount(){
        axios.get('/books/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    _id: response.data._id,
                    book_id: response.data.book_id,
                    book_title: response.data.book_title,
                    book_category: response.data.book_category,
                    book_author: response.data.book_author,
                    book_isbn: response.data.book_isbn,
                    book_edition: response.data.book_edition,
                    book_year: response.data.book_year,
                    book_availability: response.data.book_availability.toString()
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render(){
        return (
            <div className="container">
                <br/><br/><br/>
                <center>
                <h2>{this.state.book_id}</h2>
                <table style={{"max-width":"500px", "min-width":"300px"}}>
                    <tr>
                        <td>ISBN : </td>
                        <td>{this.state.book_isbn}</td>
                    </tr>
                    <tr>
                        <td>Title : </td>
                        <td>{this.state.book_title}</td>
                    </tr>
                    <tr>
                        <td>Category :</td>
                        <td>{this.state.book_category}</td>
                    </tr>
                    <tr>
                        <td>Author : </td>
                        <td>{this.state.book_author}</td>
                    </tr>
                    <tr>
                        <td>Edition :</td>
                        <td>{this.state.book_edition}</td>
                    </tr>
                    <tr>
                        <td>Year : </td>
                        <td>{this.state.book_year}</td>
                    </tr>
                    <tr>
                        <td>Availability : </td>
                        <td>{this.state.book_availability}</td>
                    </tr>
                    <tr>
                        <td>Obj : </td>
                        <td>{this.state._id}</td>
                    </tr>
                </table>
                    {(localStorage.userrole==='student'&&this.state.book_availability==='true') ? <button onClick={()=>{
                        axios.post('/users/reserve', {
                            token: localStorage.usertoken, book_id: this.state.book_id, ref_id: this.state._id
                        })
                            .then(res=>{
                                alert(res.data);
                                this.setState({
                                    book_availability: 'false'
                                });
                            })
                            .catch(err=>{
                                alert(err);
                            })
                    }}>Reserve</button> : ''}

                </center>
            </div>
        )
    }
}
