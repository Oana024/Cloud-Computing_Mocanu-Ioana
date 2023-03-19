import React, {useState} from 'react';
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Library = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:7000/books')
            .then((response) => response.json())
            .then((data) => {
                //console.log(data);
                setBooks(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [])

    async function removeBook(id) {
        await fetch(`http://localhost:7000/books/remove/${id}`, {
            method: "DELETE",
        }).then((response) => {
            if (response.status === 200) {
                alert('Removed successfully.')
                window.location.reload();
            } else {
                alert('Error');
            }
        }).catch((err) => {
                console.log(err.message);
            }
        )
    }

    async function editBook(id) {
        await fetch(`http://localhost:7000/books/update/${id})`, {
            method: "PUT",
        }).then((response) => {
            if (response.status === 200) {
                alert('Updated successfully.')
                window.location.reload();
            } else {
                alert('Error');
            }
        }).catch((err) => {
                console.log(err.message);
            }
        )
    }

    function loadEdit(id){
        navigate("/edit/" + id);
    }

    return (
        <div className="container-xxl">
            <div className="card">
                <div className="card-title">
                    <h2>Book List</h2>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-hover table-striped">
                        <thead className="bg-dark text-white">
                        <tr>
                            <td>Title</td>
                            <td>Author</td>
                            <td>Pub Year</td>
                            <td>Description</td>
                            <td>Genre</td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            books.map((book) => {
                                return (
                                    <tr key={book._id}>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.publicationYear}</td>
                                        <td>{book.shortDescription}</td>
                                        <td>{book.genre}</td>
                                        <td>
                                            <a className="btn btn-warning" onClick={() => {loadEdit(book._id)}}>Edit</a>
                                            <a className="btn btn-danger"  onClick={() => removeBook(book._id)}>Remove</a>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default Library;