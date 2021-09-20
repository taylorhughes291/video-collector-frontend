import React from "react"
import {Link} from "react-router-dom"

const Nav = (props) => {
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
                        to="/episodelist"
                    >
                        <li>Episodes</li>
                    </Link>
                    {props.user === "" && 
                    <>
                        <Link
                            to="/login"
                        >
                            <li>Login</li>
                        </Link>
                        <Link
                            to="/create"
                        >
                            <li>Create Account</li>
                        </Link>
                    </>
                    }
                    {props.user !== "" &&
                    <>
                        <Link
                            to="/login"
                            onClick={props.handleLogout}
                        >
                            <li>Logout</li>
                        </Link>
                        <Link
                            to="/favorites"
                        >
                            <li>Favorites</li>
                        </Link>
                    </>
                    }
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