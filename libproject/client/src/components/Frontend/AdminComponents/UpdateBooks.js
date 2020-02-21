import React, {Component} from 'react';
import  axios from 'axios';
import Close from "./close.png";
export default class UpdateBook extends Component{
    constructor(props){
        super(props);
        this.onChangeBookId = this.onChangeBookId.bind(this);
        this.onChangeBookTitle = this.onChangeBookTitle.bind(this);
        this.onChangeBookCategory = this.onChangeBookCategory.bind(this);
        this.onChangeBookAuthor = this.onChangeBookAuthor.bind(this);
        this.onChangeBookEdition = this.onChangeBookEdition.bind(this);
        this.onChangeBookIsbn = this.onChangeBookIsbn.bind(this);
        this.onChangeBookYear = this.onChangeBookYear.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            book_id : '',
            book_title : '',
            book_category : '',
            book_author : '',
            book_isbn: '',
            book_edition: '',
            book_year: ''
        };
    }
    componentDidMount(){
        axios.get('/books/'+this.props.id)
            .then(response => {
                this.setState({
                    book_id: response.data.book_id,
                    book_title: response.data.book_title,
                    book_category: response.data.book_category,
                    book_author: response.data.book_author,
                    book_isbn: response.data.book_isbn,
                    book_edition: response.data.book_edition,
                    book_year: response.data.book_year
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeBookId(e){
        this.setState({
            book_id: e.target.value
        });
    }
    onChangeBookTitle(e){
        this.setState({
            book_title: e.target.value
        });
    }
    onChangeBookCategory(e){
        this.setState({
            book_category: e.target.value
        });
    }

    onChangeBookAuthor(e){
        this.setState({
            book_author: e.target.value
        });
    }
    onChangeBookEdition(e){
        this.setState({
            book_edition : e.target.value
        })
    }
    onChangeBookIsbn(e){
        this.setState({
            book_isbn : e.target.value
        })
    }
    onChangeBookYear(e){
        this.setState({
            book_year : e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault()
        const obj = {
            book_id: this.state.book_id,
            book_title: this.state.book_title,
            book_category: this.state.book_category,
            book_author: this.state.book_author,
            book_isbn: this.state.book_isbn,
            book_edition: this.state.book_edition,
            book_year: this.state.book_year
        };
        axios.post('/books/updatebooks/'+this.props.id, obj)
            .then(res=>{
                alert(res.data);
                this.state = {
                    book_id : '',
                    book_title : '',
                    book_category : '',
                    book_author : '',
                    book_isbn: '',
                    book_edition: '',
                    book_year: ''
                };
            });

    }

    render() {
        return(
            <div className="model-content login-form">
                <form onSubmit={this.onSubmit}>
                    <button onClick={this.props.ch} type="button" className="close " data-dismiss="modal"><img height={"20px"} width={"30px"} src={Close}/></button>
                    <br/><h2 className="text-center text-light"> Update Books </h2> <br/>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Book ID" required="required"
                               value={this.state.book_id} onChange={this.onChangeBookId}/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Book ISBN" required="required"
                               value={this.state.book_isbn} onChange={this.onChangeBookIsbn}/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Book Title" required="required"
                               value={this.state.book_title} onChange={this.onChangeBookTitle}/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Book Edition"
                               value={this.state.book_edition} onChange={this.onChangeBookEdition}/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Category"
                               value={this.state.book_category} onChange={this.onChangeBookCategory}/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Author"
                               value={this.state.book_author} onChange={this.onChangeBookAuthor}/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Published Year"
                               value={this.state.book_year} onChange={this.onChangeBookYear}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Update Book</button>
                    </div>
                </form>
            </div>
        )
    }
}

