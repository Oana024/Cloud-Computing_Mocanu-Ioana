import React, {useState} from 'react';
import './index.css'
const Home = () => {
    const [fact, setFact] = useState();
    const [number, setNumber] = useState();
    const generateFact = async () => {
        let nr = Math.floor(Math.random() * 1000) + 1;

        let result = await fetch(`http://localhost:7000/number-fact/${nr}`);

        if (result.status === 200) {
            const data = await result.json();
            setFact(data.text);
            setNumber(data.number);
            console.log(data);
        } else {
            alert("Bad request");
        }
    }

    return (
        <div className="container-fluid">
            <button id="button" className="btn btn-dark" onClick={generateFact}>Click me</button><br></br>
            <h1 className="nr">{number}</h1><br></br>
            <h2>{fact}</h2><br></br>
        </div>
    );
};

export default Home;