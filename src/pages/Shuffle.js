import React, {useEffect, useState, useRef} from "react"
import Episode from "./Episode"

const Shuffle = (props) => {

    const [shows, setShows] = useState([])

    const selectEpisode = () => {
        let availableEpisodes
        if (props.user !== "") {
            availableEpisodes = props.episodes.filter((item, index) => {
                return (
                    !props.episodesViewed.includes(item._id)
                )
            })
        } else {
            availableEpisodes = props.episodes
        }
        console.log(props.episodes, availableEpisodes);
        return availableEpisodes[Math.floor(Math.random() * availableEpisodes.length)]
        
    }

    
    useEffect(() => {
        if (props.episodes.length > 1) {
            props.setSelectedEpisode(selectEpisode())
            console.log(props.selectedEpisode);
        }
    }, [props.episodes, props.episodesViewed])

    const loaded = () => {
        return (
            <>
                <h3>This is the Shuffle Page</h3>
                <div>
                    <h3>What shows do you want to watch?</h3>
    
                </div>
                <Episode 
                    selectedEpisode={props.selectedEpisode}
                />
            </>
        )
    }

    const loading = () => {
        return (
            <h2>Loading...</h2>
        )
    }

    return props.selectedEpisode.title === "" ? loading() : loaded()

}

export default Shuffle