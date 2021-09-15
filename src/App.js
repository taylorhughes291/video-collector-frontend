import './App.css';
import Nav from "./components/Nav"
import {Switch, Route, withRouter} from "react-router-dom"
import {useState, useEffect} from "react"
import EpisodeList from "./pages/EpisodeList"
import Episode from "./pages/Episode"
import Login from "./pages/Login"

function App(props) {
  /////////////////////////////
  // Constants
  /////////////////////////////
  const [episodes, setEpisodes] = useState({
    status: 0,
    data: []
  })
  const [gState, setGState] = useState({
    token: ""
  })
  const [favorites, setFavorites] = useState([])
  const [episodesViewed, setEpisodesViewed] = useState([])
  const [selectedEpisode, setSelectedEpisode] = useState({
    _id: "",
    title: "",
    url: "",
    episodeType: "",
    episodeDate: ""
  })
  const [user, setUser] = useState("")
  const url = process.env.REACT_APP_BACKENDURL

  function getLogin(username, password) {
    fetch(url + '/users/login/' + username + '/' + password)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 200)
      {
        window.localStorage.setItem("token", JSON.stringify(data.accessToken))
        setUser(data.user)
        setGState({
          ...gState,
          token: data.accessToken
        })
        props.history.push('/home')
      } else if (data.status === 409) {
        alert('username does not exist')
        props.history.push('/create')
      } else if (data.status === 403) {
        alert('username or password is wrong')
      }
    })
  }

  const handleCreate = (newUser) => {
    fetch(url + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser)
    }).then((response) => response.json())
    .then((data) =>  {
      console.log(data.status)
      if(data.status === 200)
      {
      setUser(data.data._id)
      props.history.push('/episodelist')
    
      } else if (data.status === 403) {
        alert('username already exists')
        props.history.push('/login')
      }
    })
  };


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
  
  const getDbData = () => {
    const getUrl = url + "/users/" + user
    fetch(getUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${gState.token}`
      }
    })
    .then((response) => (response.json()))
    .then((data) => {
      setFavorites(data.data.favorites)
      setEpisodesViewed(data.data.episodesViewed)
    })
  }

  /////////////////////////////
  // Render
  /////////////////////////////

  useEffect(() => {
    getEpisodes()
  }, [])

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"))
    if (token) {
      setGState({
        ...gState,
        token
      })
    } else {
      props.history.push("/login")
    }
  }, [])

  useEffect(() => {
    if (gState.token !== "") {
      getDbData()
    }
  }, [gState])

  const loaded = () => {
    const homepageVideo = (
      <>
        <h2>{episodes.data[0].title}</h2>
        <h3>{episodes.data[0].episodeType}</h3>
        <video
          src={episodes.data[0].url}
          controls
        />
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
            selectedEpisode={selectedEpisode}
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
        <Route
          path="/login"
        >
          <Login 
            getLogin={getLogin}
          />
        </Route>
        <Route
          path="/shuffle"
        >
          <Episode 
            selectedEpisode={selectedEpisode}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
