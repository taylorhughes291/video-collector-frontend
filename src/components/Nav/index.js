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
                        <li>Episodes</li>
                    </Link>
                    <Link
                        to="/login"
                    >
                        <li>Login/Create Account</li>
                    </Link>
                    <Link
                        to="/shuffle"
                    >
                        <li>Episode Shuffle</li>
                    </Link>
                </ul>
            </nav>
        </>
    )
}

export default Nav