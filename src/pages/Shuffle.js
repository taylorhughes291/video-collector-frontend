import React, {useEffect, useState, useRef} from "react"
import Episode from "./Episode"

const Shuffle = (props) => {

    const [shows, setShows] = useState([])
    const [selectedShows, setSelectedShows] = useState([])

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
        let availableShows = props.episodes.map((item, index) => {
            return (
                item.episodeType
            )
        })
        availableShows = [...new Set(availableShows)]
        return {
            episode: availableEpisodes[Math.floor(Math.random() * availableEpisodes.length)],
            shows: availableShows
        }
        
    }

    const handleCheck = (show) => {
        const newArray = selectedShows.slice(0)
        const index = newArray.indexOf(show)
        index >= 0 ? newArray.splice(index, 1) : newArray.push(show)
        setSelectedShows(newArray)
    }
    console.log("state: ", selectedShows);
    const ShowFender = () => {
        const showsRender = shows.map((item, index) => {
            return (
                <div key={index}>
                    <input 
                        type="checkbox" 
                        defaultChecked={selectedShows.includes(item) ? true : false }
                        value={item} 
                        id={item} 
                        onChange={() => handleCheck(item)} />
                    <label htmlFor={item}>{item}</label>
                </div>
            )
        })
        return showsRender
    }
    
    useEffect(() => {
        if (props.episodes.length > 1) {
            const shuffleData = selectEpisode()
            props.setSelectedEpisode(shuffleData.episode)
            setShows(shuffleData.shows)
        }
    }, [props.episodes, props.episodesViewed])

    useEffect(() => {
        const allShows = shows.slice(0)
        setSelectedShows(allShows)
    }, [shows])

    const loaded = () => {
        return (
            <>
                <h3>This is the Shuffle Page</h3>
                <div>
                    <h3>What shows do you want to watch?</h3>
                    <form>
                        <ShowFender />
                    </form>
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