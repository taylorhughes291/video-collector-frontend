import React from "react"
import {withRouter} from "react-router-dom"

const Episode = (props) => {

    const selectedEpisode = props.match.path === "/shuffle" ? props.selectedEpisode : props.match.params.id
    const episodeData = props.episodes.find((item, index) => {
        return (
          item._id === selectedEpisode
        )
      })


    const loaded = () => {
        return (
            <>
                <h2>{episodeData.title}</h2>
                <h3>{episodeData.episodeType}</h3>
                <h3>{episodeData.episodeDate}</h3>
                <video 
                    src={episodeData.url}
                    controls
                />
            </>
        )
    }

    const loading = () => {
        return (
            <h2>Loading...</h2>
        )
    }

    return props.episodes.length > 0 ? loaded() : loading()
}

export default withRouter(Episode)