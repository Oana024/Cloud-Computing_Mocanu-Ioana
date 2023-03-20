import React, {useState} from 'react';

const Dictionary = () => {

    const [definitions, setDefinitions] = useState([]);
    const handleSubmit = async (event) => {
        event.preventDefault();

        const word = event.target.word.value;

        let result = await fetch('http://localhost:7000/define/' + word);

        if (result.status === 200) {
            const data = await result.json();
            setDefinitions(data);
        } else {
            alert("Bad request");
        }
    }

    return (
        <div className="container">
            <div className="card text-center justify-content-center align-items-center">
                <div className="card-header">
                    <form className="form-inline" onSubmit={handleSubmit}>
                        <div className="form-group mx-sm-3 mb-2">
                            <input type="text" name="word" className="form-control" placeholder="Enter word"/>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary mb-2">Define</button>
                        </div>
                    </form>
                </div>
                {
                    <div className="card-body">
                        <table className="table table-bordered table-hover table-striped">
                            <thead className="bg-dark text-white">
                            <tr>
                                <td>Definition</td>
                                <td>Part of speech</td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                definitions.map((book) => {
                                    return (
                                        <tr key={book.definition}>
                                            <td>{book.definition}</td>
                                            <td>{book.partOfSpeech}</td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    )
}

export default Dictionary;