import React, {useEffect, useState, useRef} from "react"
import Episode from "./Episode"
import useInterval from "react-useinterval"

const Shuffle = (props) => {

    const [shows, setShows] = useState([])
    const [selectedShows, setSelectedShows] = useState([])
    const [watchTimer, setWatchTimer] = useState({
        timestamp: "",
        viewed: false
    })

    const selectEpisode = (showsArray) => {
        let availableEpisodes = props.episodes.filter((item, index) => {
            return (
                showsArray.includes(item.episodeType)
            )
        })
        if (props.user !== "") {
            availableEpisodes = availableEpisodes.filter((item, index) => {
                return (
                    !props.episodesViewed.includes(item._id)
                )
            })
        }
        if (availableEpisodes.length < 1) {
            availableEpisodes = props.episodes
        }

        let availableShows = props.episodes.map((item, index) => {
            return (
                item.episodeType
            )
        })

        availableShows = [...new Set(availableShows)]
        const episode = availableEpisodes[Math.floor(Math.random() * availableEpisodes.length)]
        setWatchTimer({
            viewed: false,
            timestamp: Date.now()
        })
        return {
            episode: episode,
            shows: availableShows
        }
        
    }

    const handleCheck = (show) => {
        const newArray = selectedShows.slice(0)
        const index = newArray.indexOf(show)
        index >= 0 ? newArray.splice(index, 1) : newArray.push(show)
        setSelectedShows(newArray)
        const shuffleData = selectEpisode(newArray)
        props.setSelectedEpisode(shuffleData.episode)
    }
    
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
            const shuffleData = selectEpisode(shows)
            props.setSelectedEpisode(shuffleData.episode)
            setShows(shuffleData.shows)
        }
    }, [props.episodes])

    useEffect(() => {
        const allShows = shows.slice(0)
        setSelectedShows(allShows)
    }, [shows])

    useInterval(() => {
        if (props.user !== "") {
            const now = Date.now()
            if (!watchTimer.viewed && (now - watchTimer.timestamp) > 1000 * 60 * 3) {
                setWatchTimer({
                    ...watchTimer,
                    viewed: true
                })
                props.handleFavorite("viewed", props.selectedEpisode._id, "add")
            }
        }
    }, 1000*60)

    const loaded = () => {
        return (
            <>
                <h3>This is the Shuffle Page</h3>
                <div>
                    <h3>What shows do you want to watch?</h3>
                    <button
                        onClick={() => setSelectedShows([])}
                    >De-Select All</button>
                    <button
                        onClick={() => setSelectedShows(shows.slice(0))}
                    >Select All</button>
                    <form>
                        <ShowFender />
                    </form>
                </div>
                <Episode 
                    selectedEpisode={props.selectedEpisode}
                />
                <div>
                    <button>Next Episode</button>
                </div>
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