import React from 'react';
import './style.css';

class Create extends React.Component {
    message = '';

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            author: '',
            year: '',
            description: '',
            genre: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event) {
        let book = {
            "title": this.state.name,
            "author": this.state.author,
            "publicationYear": this.state.year,
            "shortDescription": this.state.description,
            "genre": this.state.genre,
        }

        let res = await fetch("http://localhost:7000/books/add", {
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(book),
        });

        if (res.status === 201) {
            alert("Success");
        } else {
            alert("Error");
        }

        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <div className="card text-center justify-content-center align-items-center">
                    <div className="card-title">
                        <h2>Add a new book</h2>
                    </div>
                    <div className="card-body">
                        <form className="book-form" onSubmit={this.handleSubmit}>
                            <div className="form-floating mb-3">
                                <input type="text" name="name" className="form-control" placeholder="Book Title"
                                       value={this.state.name} onChange={this.handleChange}/>
                                <label>Book Title</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input name="author" type="text" className="form-control" placeholder="Book Author"
                                       value={this.state.author} onChange={this.handleChange}/>
                                <label>Book Author</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input name="year" type="number" className="form-control"
                                       placeholder="Publication Year" value={this.state.year}
                                       onChange={this.handleChange}/>
                                <label>Publication Year</label>
                            </div>
                            <div className="form-floating mb-3">
                                    <textarea name="description" className="form-control"
                                              placeholder="Short Description" value={this.state.description}
                                              onChange={this.handleChange}/>
                                <label>Short Description</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input name="genre" type="text" className="form-control" placeholder="Genre"
                                       value={this.state.genre} onChange={this.handleChange}/>
                                <label>Genre</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>

        );
    }

}
export default Create;
