import React from "react"

const Episode = (props) => {
    return (
        <>
            <h2>{props.selectedEpisode.title}</h2>
            <h3>{props.selectedEpisode.episodeType}</h3>
            <video 
                src={props.selectedEpisode.url}
                controls
            />
        </>
    )
}

export default Episode