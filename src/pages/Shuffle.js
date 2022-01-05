import React, {useEffect, useState} from "react"
import Episode from "./Episode"
import useInterval from "react-useinterval"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ford from "../assets/1993-ford.png"

const Shuffle = (props) => {

//  Constants

    const [shows, setShows] = useState([])
    const [selectedShows, setSelectedShows] = useState([])
    const [watchTimer, setWatchTimer] = useState({
        timestamp: "",
        viewed: false
    })
    const [modal, setModal] = useState(false);
    const [filter, setFilter] = useState(false)

//  Functions

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
            if (selectedShows.length === 0) {
                availableEpisodes = props.episodes
            } else {
                availableEpisodes = props.episodes
                setModal(true)
            }
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
    

    const RefreshModal = (props) => {
        const {
          buttonLabel,
          className
        } = props;
      
        
      
        const toggle = () => setModal(!modal);
      
        return (
          <div>
            <Modal isOpen={modal} toggle={toggle} className={className}>
              <ModalHeader toggle={toggle}>Modal title</ModalHeader>
              <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        );
      }

    const handleNext = (episode = false) => {
        if (episode !== false) {
            console.log("Error is occuring here")
            props.handleFavorite("viewed", episode, "add")
        }
        props.setSelectedEpisode(selectEpisode(selectedShows).episode._id)
    }

    const handleCheck = (show) => {
        const newArray = selectedShows.slice(0)
        const index = newArray.indexOf(show)
        index >= 0 ? newArray.splice(index, 1) : newArray.push(show)
        setSelectedShows(newArray)
        const shuffleData = selectEpisode(newArray)
        props.setSelectedEpisode(shuffleData.episode._id)
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

    const showFilter = () => {
        if (filter) {
            setFilter(false)
        } else {
            setFilter(true)
        }
    }

// Render 
    
    useEffect(() => {
        if (props.episodes.length > 0) {
            const shuffleData = selectEpisode(shows)
            props.setSelectedEpisode(shuffleData.episode._id)
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
            <div id="shuffle-page">
                <img src = {ford} alt="Huell's classic Ford Explorer" />
                <div id="sub-option-cont">
                    <div 
                        className="sub-option"
                        onClick={() => showFilter()}
                    >
                        Filter
                    </div>
                    {(!props.favorites.includes(props.selectedEpisode) && props.user !== "") && <div 
                        className="sub-option"
                        onClick={() => props.handleFavorite("favorite", props.selectedEpisode, "add")}
                    >
                        Favorite
                    </div>}
                    {(props.favorites.includes(props.selectedEpisode) && props.user !== "") && <div 
                        className="sub-option"
                        onClick={() => props.handleFavorite("favorite", props.selectedEpisode, "delete")}
                    >
                        Unfavorite
                    </div>}
                    <div 
                        className="sub-option"
                        onClick={props.user === "" ? () => handleNext() : () => handleNext(props.selectedEpisode)}
                    >
                        Next
                    </div>
                </div>
                <div id="showFilter" className={filter ? "" : "hidden"}>
                    <div id="show-filter" >
                        <div className="button-cont">
                            <button
                                onClick={() => setSelectedShows([])}
                            >De-Select All</button>
                            <button
                                onClick={() => setSelectedShows(shows.slice(0))}
                            >Select All</button>
                        </div>
                        <form>
                            <ShowFender />
                        </form>
                    </div>
                </div>
                <Episode 
                    selectedEpisode={props.selectedEpisode}
                    episodes={props.episodes}
                />
                {modal && <RefreshModal />}
            </div>
        )
    }

    const loading = () => {
        return (
            <h2>Loading...</h2>
        )
    }

    return props.selectedEpisode === "" ? loading() : loaded()

}

export default Shuffle