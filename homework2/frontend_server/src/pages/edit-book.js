import React, {useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import './style.css';

const Edit = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [title, titleChange] = useState("");
    const [author, authorChange] = useState("");
    const [year, yearChange] = useState("");
    const [description, descriptionChange] = useState("");
    const [genre, genreChange] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        let book = {
            "title": title,
            "author": author,
            "publicationYear": year,
            "shortDescription": description,
            "genre": genre,
        }

        await fetch(`http://localhost:7000/books/update/${id}`, {
            method: "PUT",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(book)
        }).then((response) => {
            if (response.status === 200) {
                alert('Updated successfully.')
                navigate("/library");
            } else {
                alert('Error');
            }
        }).catch((err) => {
                console.log(err.message);
            }
        )
    }

    return (
        <div className="container">
            <div className="card text-center justify-content-center align-items-center">
                <div className="card-title">
                    <h2>Edit book</h2>
                </div>
                <div className="card-body">
                    <form className="book-form" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" name="title" className="form-control" placeholder="Book Title"
                                   value={title} onChange={e => titleChange(e.target.value)}/>
                            <label>Book Title</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input name="author" type="text" className="form-control" placeholder="Book Author"
                                   value={author} onChange={e => authorChange(e.target.value)}/>
                            <label>Book Author</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input name="year" type="number" className="form-control"
                                   placeholder="Publication Year" value={year}
                                   onChange={e => yearChange(e.target.value)}/>
                            <label>Publication Year</label>
                        </div>
                        <div className="form-floating mb-3">
                                    <textarea name="description" className="form-control"
                                              placeholder="Short Description" value={description}
                                              onChange={e => descriptionChange(e.target.value)}/>
                            <label>Short Description</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input name="genre" type="text" className="form-control" placeholder="Genre"
                                   value={genre} onChange={e => genreChange(e.target.value)}/>
                            <label>Genre</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to="/library" className="btn btn-danger">Back</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Edit;