import React from "react"
import {Link} from "react-router-dom"

const Nav = () => {
    /////////////////////////////
    // Constants
    /////////////////////////////



    /////////////////////////////
    // Functions
    /////////////////////////////

    

    /////////////////////////////
    // Render
    /////////////////////////////
    return (
        <>
            <nav>
                <ul>
                    <Link
                        to="/"
                    >
                        <li>Homepage</li>
                    </Link>
                    <Link
                        to="/episodelist"
                    >
                        <li>See Episode List</li>
                    </Link>
                    <li>Add a New Episode</li>
                </ul>
            </nav>
        </>
    )
}

export default Nav