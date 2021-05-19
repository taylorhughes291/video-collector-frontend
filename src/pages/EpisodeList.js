import React, {useState} from "react"
import {Link} from "react-router-dom"

const EpisodeList = (props) => {
////////////////////////
// Constants
////////////////////////
const [editMode, setEditMode] = useState(false)

const emptyVideo = {
    _id: "",
    title: "",
    url: "",
    episodeType: "",
    episodeDate: ""
  }
const [addFormData, setAddFormData] = useState(emptyVideo)

////////////////////////
// Functions
////////////////////////
const handleAdd = () => {
    setEditMode(true)
}

const handleCreate = (newVideo) => {
    fetch(props.url + "/videos/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newVideo)
    })
    .then(() => props.getVideos())
    .then(() => setEditMode(false))
    .then(() => setAddFormData(emptyVideo))
}

const handleChange = (event) => {
    setAddFormData({...addFormData, [event.target.name]: event.target.value})
}

////////////////////////
// Render
////////////////////////
const loaded = () => {
    const episodeTitles = props.episodes.data.map((item, index) => {
        return (
            <div 
                style={{border: "1px solid black", width: "fit-content"}}
                key={index}
            >
                <Link
                    to="/episode"
                    onClick={() => props.selectEpisode(item._id)}
                >
                    <p>{item.title}</p>
                </Link>
                <Link
                    
                >
                    <button>Update</button>
                </Link>
                <button>Delete</button>
            </div>
        )
    })
    return (
        <>
            <h2>Episode List</h2>
            <button 
                style={{marginBottom: "20px"}}
                onClick={() => handleAdd()}
            >Add New Episode</button>
            <form 
                style={{marginBottom: "20px"}}
                className={editMode ? "" : "hidden"}
                onSubmit={() => handleCreate(addFormData)}
            >
                <input
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                />
                <input
                    placeholder="Episode Type"
                    name="episodeType"
                    onChange={handleChange}
                />
                <input
                    placeholder="URL"
                    name="url"
                    onChange={handleChange}
                />
                <input
                    placeholder="Date Aired"
                    name="episodeDate"
                    onChange={handleChange}
                />
                <input
                    type="submit"
                    value="Submit"
                />
                <button>Cancel</button>
            </form>
            <div style={{display: "flex", justifyContent: "center"}}>
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
        {props.episodes.data.length > 0 ? loaded() : loading()}
        </>
    )
}

export default EpisodeList