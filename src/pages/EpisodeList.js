import React from "react"
import {Link} from "react-router-dom"

const EpisodeList = (props) => {
////////////////////////
// Constants
////////////////////////


////////////////////////
// Functions
////////////////////////




////////////////////////
// Render
////////////////////////
const loaded = () => {

    const episodeTitles = props.episodes.map((item, index) => {
        const isFavorite = props.favorites.includes(item._id)
        const isViewed = props.episodesViewed.includes(item._id)
        return (
            <div 
                style={{border: "1px solid black", width: "500px"}}
                key={index}
            >
                <Link
                    to={"/episode/" + item._id}
                >
                    <p>{item.title}</p>
                </Link>
                {props.user !== "" && <div>
                    {isFavorite && <button
                        onClick={() => props.handleFavorite("favorite", item._id, "delete")}
                    >Un-Favorite</button>}
                    {!isFavorite && <button
                        onClick={() => props.handleFavorite("favorite", item._id, "add")}
                    >Favorite</button>}
                    {isViewed && <button
                        onClick={() => props.handleFavorite("viewed", item._id, "delete")}
                    >I Haven't Seen This Yet</button>}
                    {!isViewed && <button
                        onClick={() => props.handleFavorite("viewed", item._id, "add")}
                    >I've Already Seen This Episode</button>}
                </div>}
 
            </div>
        )
    })
    return (
        <>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                {episodeTitles}
            </div>
        </>
    )   
}

const loading = () => {
    return (
        <h1>There are no episodes to show.</h1>
    )
}

    return (
        <>
            <h2>Episode List</h2>
            
            {props.episodes.length > 0 ? loaded() : loading()}
        </>
    )
}

export default EpisodeList