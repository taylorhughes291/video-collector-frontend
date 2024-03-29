import './App.sass';
import Nav from "./components/Nav"
import {Switch, Route, withRouter, Redirect} from "react-router-dom"
import {useState, useEffect} from "react"
import EpisodeList from "./pages/EpisodeList"
import Episode from "./pages/Episode"
import Login from "./pages/Login"
import Create from "./pages/Create"
import Shuffle from "./pages/Shuffle"

function App(props) {
  /////////////////////////////
  // Constants
  /////////////////////////////
  const [episodes, setEpisodes] = useState([])
  const [gState, setGState] = useState({
    token: ""
  })
  const [favorites, setFavorites] = useState([])
  const [episodesViewed, setEpisodesViewed] = useState([])
  const [selectedEpisode, setSelectedEpisode] = useState("")
  const [user, setUser] = useState("")
  const url = process.env.REACT_APP_BACKENDURL

  const favoriteEpisodes = episodes.filter((item, index) => {
    return (
      favorites.includes(item._id)
    )
  })

  function getLogin(username, password) {
    fetch(url + '/users/login/' + username + '/' + password)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 200)
      {
        console.log(data.accessToken);
        window.localStorage.setItem("token", JSON.stringify(data.accessToken))
        setUser(data.user)
        setGState({
          ...gState,
          token: data.accessToken
        })
        props.history.push('/shuffle')
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
      if(data.status === 200)
      {
        window.localStorage.setItem("token", JSON.stringify(data.accessToken))
        setUser(data.user)
        setGState({
          ...gState,
          token: data.accessToken
        })
        props.history.push('/episodelist')
    
      } else if (data.status === 403) {
        alert('username already exists')
        props.history.push('/login')
      }
    })
  };

  const handleLogout = () => {
    window.localStorage.clear()
    setFavorites([])
    setEpisodesViewed([])
    setUser("")
  }

  /////////////////////////////
  // Functions
  /////////////////////////////
  const getEpisodes = () => {
    fetch(url + "/videos/")
    .then((response) => response.json())
    .then((data) => {
      setEpisodes(data.data)
    })
  }
  
  const getDbData = () => {
    const getUrl = url + "/users"
    fetch(getUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${gState.token}`
      }
    })
    .then((response) => (response.json()))
    .then((data) => {
      if (data.status === 400) {
        setUser("")
        setGState("")
        window.localStorage.clear()
      } else {
        setUser(data.data._id)
        setFavorites(data.data.favorites)
        setEpisodesViewed(data.data.episodesViewed)
      }
    })
  }

  const handleFavorite = (favoriteOrViewed, episodeId, action) => {
    let favoriteUrl = url + "/users/" + favoriteOrViewed + "/" + user
    fetch(favoriteUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${gState.token}`
      },
      body: JSON.stringify({
        episode: episodeId,
        action: action
      })
    })
    .then((response) => (response.json()))
    .then((data) => {
      if (favoriteOrViewed === "favorite") {
        setFavorites(data.data.favorites)
      } else if (favoriteOrViewed === "viewed") {
        setEpisodesViewed(data.data.episodesViewed)
      }
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
      handleLogout()
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
        <h2>{episodes[0].title}</h2>
        <h3>{episodes[0].episodeType}</h3>
        <video
          src={episodes[0].url}
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
      <Nav 
        user={user}
        handleLogout={handleLogout}
      />
      <Switch>
        <Route 
          exact path="/"
          key="no-path"
        >
          <Redirect to="/shuffle" />
          {episodes.length > 0 ? loaded() : loading()}
        </Route>
        <Route
          path="/episodelist"
        >
          <EpisodeList 
            episodes={episodes}
            selectedEpisode={selectedEpisode}
            setSelectedEpisode={setSelectedEpisode}
            url={url}
            getEpisodes={getEpisodes}
            handleFavorite={handleFavorite}
            favorites={favorites}
            user={user}
            episodesViewed={episodesViewed}
          />
        </Route>
        <Route
          path="/episode/:id"
        >
          <Episode 
            selectedEpisode={selectedEpisode}
            episodes={episodes}
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
          path="/create"
        >
          <Create 
            handleCreate={handleCreate}
          />
        </Route>
        <Route
          path="/favorites"
        >
          <EpisodeList 
            episodes={favoriteEpisodes}
            selectedEpisode={selectedEpisode}
            setSelectedEpisode={setSelectedEpisode}
            url={url}
            getEpisodes={getEpisodes}
            handleFavorite={handleFavorite}
            favorites={favorites}
            user={user}
            episodesViewed={episodesViewed}
          />
        </Route>
        <Route
          path="/shuffle"
        >
          <Shuffle
            episodes={episodes}
            episodesViewed={episodesViewed}
            selectedEpisode={selectedEpisode}
            setSelectedEpisode={setSelectedEpisode}
            user={user}
            getEpisodes={getEpisodes}
            handleFavorite={handleFavorite}
            favorites={favorites}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
