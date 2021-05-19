import React, {useState} from "react"
import {Link} from "react-router-dom"

const EpisodeList = (props) => {
////////////////////////
// Constants
////////////////////////
const [editMode, setEditMode] = useState(false)

const emptyVideo = {
    title: "",
    url: "",
    episodeType: "",
    episodeDate: ""
  }
const [addFormData, setAddFormData] = useState(emptyVideo)
const [editFormData, setEditFormData] = useState(emptyVideo)

////////////////////////
// Functions
////////////////////////
const handleAdd = () => {
    setEditMode(true)
}

const handleSubmit = (video) => {
    fetch(props.url + "/videos/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(video)
    })
    .then(() => props.getEpisodes())
}

const handleUpdate = (video) => {
    fetch(props.url + "/videos/" + props.selectedEpisode._id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(video)
    })
    .then(() => props.getEpisodes())
}

const handleCreate = (event) => {
    event.preventDefault()
    handleSubmit(addFormData)
    setEditMode(false)
    setAddFormData(emptyVideo)
}

const handleEdit = (event) => {
    event.preventDefault()
    handleUpdate(editFormData)
    setEditFormData(emptyVideo)
}

const handleDelete = (id) => {
    fetch(props.url + "/videos/" + id, {
        method: "delete"
    })
    .then(() => {
        props.getEpisodes()
    })
}


const handleChange = (event) => {
    setAddFormData({...addFormData, [event.target.name]: event.target.value})
}

const handleEditChange = (event) => {
    setEditFormData({...editFormData, [event.target.name]: event.target.value})
}

////////////////////////
// Render
////////////////////////
const loaded = () => {

    const episodeTitles = props.episodes.data.map((item, index) => {
        return (
            <div 
                style={{border: "1px solid black", width: "500px"}}
                key={index}
            >
                <Link
                    to="/episode"
                    onClick={() => props.selectEpisode(item._id)}
                >
                    <p>{item.title}</p>
                </Link>
                <button
                    onClick={() => props.selectEpisode(item._id)}
                >Update</button>
                <button
                    onClick={() => handleDelete(item._id)}
                >Delete</button>
                <form 
                    style={{marginBottom: "20px"}}
                    onSubmit={handleEdit}
                    className={item._id === props.selectedEpisode._id ? "" : "hidden"}
                >
                    <input
                        placeholder="Title"
                        name="title"
                        onChange={handleEditChange}
                    />
                    <input
                        placeholder="Episode Type"
                        name="episodeType"
                        onChange={handleEditChange}
                    />
                    <input
                        placeholder="URL"
                        name="url"
                        onChange={handleEditChange}
                    />
                    <input
                        placeholder="Date Aired"
                        name="episodeDate"
                        onChange={handleEditChange}
                    />
                    <input
                        type="submit"
                        value="Submit"
                    />
                    <button>Cancel</button>
                </form>
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
            <button 
                style={{marginBottom: "20px"}}
                onClick={() => handleAdd()}
            >Add New Episode</button>
            <form 
                style={{marginBottom: "20px"}}
                className={editMode ? "" : "hidden"}
                onSubmit={handleCreate}
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
            {props.episodes.data.length > 0 ? loaded() : loading()}
        </>
    )
}

export default EpisodeList