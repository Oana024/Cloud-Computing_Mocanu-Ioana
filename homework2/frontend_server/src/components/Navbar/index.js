import React from "react";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/library">Library</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/create">Create</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/dictionary">Dictionary</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;