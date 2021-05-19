import './App.css';
import Nav from "./components/Nav"
import {Switch, Route} from "react-router-dom"
import {useState, useEffect} from "react"
import EpisodeList from "./pages/EpisodeList"
import Episode from "./pages/Episode"

function App() {
  /////////////////////////////
  // Constants
  /////////////////////////////
  const [episodes, setEpisodes] = useState({
    status: 0,
    data: []
  })
  const [selectedEpisode, setSelectedEpisode] = useState({
    _id: "",
    title: "",
    url: "",
    episodeType: "",
    episodeDate: ""
  })
  const url = "http://localhost:4500"


  /////////////////////////////
  // Functions
  /////////////////////////////
  const getEpisodes = () => {
    fetch(url + "/videos/")
    .then((response) => response.json())
    .then((data) => {
      setEpisodes(data)
    })
  }

  const selectEpisode = (id) => {
    const episodeData = episodes.data.find((item, index) => {
      return (
        item._id === id
      )
    })
    setSelectedEpisode(episodeData)
  }
  

  /////////////////////////////
  // Render
  /////////////////////////////

  useEffect(() => {
    getEpisodes()
  }, [])

  const loaded = () => {
    const homepageVideo = (
      <>
        <h2>{episodes.data[0].title}</h2>
        <h3>{episodes.data[0].episodeType}</h3>
        <p>{episodes.data[0].url}</p>
      </>
    )
    return (
      homepageVideo
    )
  }

  const loading = () => {
    return (
      <h2>There are no videos saved.</h2>
    )
  }

  return (
    <div className="App">
      <h1>Welcome to HuellVision</h1>
      <Nav />
      <Switch>
        <Route 
          exact path="/"
        >
          {episodes.data.length > 0 ? loaded() : loading()}
        </Route>
        <Route
          path="/episodelist"
        >
          <EpisodeList 
            episodes={episodes}
            selectEpisode={selectEpisode}
            setSelectedEpisode={setSelectedEpisode}
            url={url}
            getEpisodes={getEpisodes}
          />
        </Route>
        <Route
          path="/episode"
        >
          <Episode 
            selectedEpisode={selectedEpisode}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
