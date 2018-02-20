import React from 'react';
import MovieGrid from './MovieGrid.jsx';
import MovieOptions from './MovieOptions.jsx';

/**
component responsive for rendering the entire page. 

	grabs data from snagfilms api
	renders MovieGrid component to display movies
	renders options component that allows user to set options for how the movies should be displayed, and handles the updates
**/
class MoviePage extends React.Component {
	
  constructor(props) {
    super(props);
    this.state = {
      movies: {}, //object returned from API, movies.film is an array containing an object for each movie
      status: "loading", //loading | error | ready
      
      //url params for api: e.g. limit=10 & offset = 5 would return movies 5 through 15
      limit: 11,
      offset: 300,
      page: 1,
      loading: true,
      
      displayType: "movie-list" //movie-list | movie-table
    }
  }

	//displays the status if movie data is not ready, otherwise renders <MovieGrid> to display movie data
  render() {
    return (
      <div className="grid movie-page">
        <MovieOptions limit={this.state.limit} offset={this.state.offset} page={this.state.page} limitChangeHandler={this.limitChangeHandler.bind(this)} pageChangeHandler={this.pageChangeHandler.bind(this)} lastPageHandler={this.lastPageHandler.bind(this)} nextPageHandler={this.nextPageHandler.bind(this)} />
        {
          (this.state.loading) 
          ?
            <h1 className="loading-label">Loading...</h1>
          :
            <h1 className="loading-label">Page {this.state.page}</h1>
        }
        { //if component is ready(done fetching data) render movies, otherwise rende status
          (this.state.status == "ready") ?
            this.renderMovies()
          :
            this.renderStatus()
        }
      </div>
    )
  }

	//render the status while movie data is still being retrieved from API, or when an error occurs
  renderStatus() {
    if (this.state.status != "loading" && this.state.status != "ready") {
      return <h1>{this.state.status}</h1>
    } else {
      return null;
    }
  }
  
  //render a MovieGrid that displays the movie data retrieved from api
  renderMovies() {
    return <MovieGrid movies={this.state.movies.film} displayType={this.state.displayType} />
  }

  //callback for changing limit(how many movies are displayed). set as onChange handler for limit input directly
  limitChangeHandler(e) {
    this.setState({
      limit: e.target.value
    });
  }
  
  pageChangeHandler(e) {
    if (Number(e.target.value) != NaN && Number(e.target.value) != 0) {
      this.setPage(e.target.value);
    }
  }
  lastPageHandler(e) {
    if (this.state.page - 1 > 0) {
      this.setPage(this.state.page - 1);
    }
  }
  nextPageHandler(e) {
    this.setPage(this.state.page + 1);
  }
  
  setPage(page) {
   this.setState({
      page: Number(page),
      offset: Number(page) * this.state.limit,
      loading: true
    }, (p) => {this.loadMovies()}); //call ajax in setState callback(second param) - or use componentWillUpdate
  }
  
  //grab movie data from API when component mounts
  componentDidMount() {
    this.loadMovies();
  }
  
  /** 
  send a get request to the snagfilms api, plugging in limit/offset url params from state for pagination, then converts the response stream into JSON and updates state
  
  onError: set state.status to "error" so component can render an error message to user
  **/
  loadMovies() {
    fetch("http://www.snagfilms.com/apis/films.json?limit=" + this.state.limit + "&offset=" + this.state.offset)
    .then((response) => response.json())
    .then((movies) => {
      console.log(movies.films);
      this.setState({
        movies: movies.films,
        status: "ready",
        loading: false
      });
    }).catch((err) => {
      this.setState({
        status: "error"
      });
    });  
  }
}



export default MoviePage;