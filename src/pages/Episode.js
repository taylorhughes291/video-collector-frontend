import React from "react"

const Episode = (props) => {
    return (
        <>
            <h1>{props.selectedEpisode.title}</h1>
            <h2>{props.selectedEpisode.episodeType}</h2>
            <h3>{props.selectedEpisode.url}</h3>
        </>
    )
}

export default Episode