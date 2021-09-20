import React from "react"
import {withRouter, Link} from "react-router-dom"

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
                    <div
                        className={props.location.pathname === "/episodelist" ? "nav-item-cont selected" : "nav-item-cont"}
                    >
                        <Link
                            to="/episodelist"
                        >
                            <li>Episodes</li>
                        </Link>
                    </div>
                    {props.user === "" && 
                    <>
                        <div
                            className={props.location.pathname === "/login" ? "nav-item-cont selected" : "nav-item-cont"}
                        >
                        <Link
                            to="/login"
                        >
                            <li>Login</li>
                        </Link>
                        </div>
                        <div
                            className={props.location.pathname === "/create" ? "nav-item-cont selected" : "nav-item-cont"}
                        >
                        <Link
                            to="/create"
                        >
                            <li>Create Account</li>
                        </Link>
                        </div>
                    </>
                    }
                    {props.user !== "" &&
                    <>
                        <div
                            className={"nav-item-cont"}
                        >
                        <Link
                            to="/login"
                            onClick={props.handleLogout}
                        >
                            <li>Logout</li>
                        </Link>
                        </div>
                        <div
                            className={props.location.pathname === "/favorites" ? "nav-item-cont selected" : "nav-item-cont"}
                        >
                        <Link
                            to="/favorites"
                        >
                            <li>Favorites</li>
                        </Link>
                        </div>
                    </>
                    }
                    <div
                        className={props.location.pathname === "/shuffle" ? "nav-item-cont selected" : "nav-item-cont"}
                    >
                    <Link
                        to="/shuffle"
                    >
                        <li>Episode Shuffle</li>
                    </Link>
                    </div>
                </ul>
            </nav>
        </>
    )
}

export default withRouter(Nav)