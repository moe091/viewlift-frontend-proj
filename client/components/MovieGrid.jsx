import React from 'react';

/**
component that renders a css grid containing all of the movie objects. Each individual movie is rendered inside a <Movie> component which displays the movies details inside a nested css grid

props:
	movies: [], an array of objects, with each object containing data about a single movie
	displayType: a string that will equal either "movie-rows" or "movie-cells", displayType will be used as class name for the html element returned by this components render method.
		"movie-list" will render each movie in its own row, creating a vertical list of movie elements
		"movie table" will render each movie in a cell, with multiple cells on each row and multiple rows, creating a table of movie objects
**/
class MovieGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  //creates a grid and renders each movie as a <Movie> component inside of the grid
  render() {
		console.log("MovieGrid movies:", this.props.movies);
    return (
      <div className={this.props.displayType}>
        {
          this.props.movies.map((movie) => {
            return <Movie 
							title={movie.title} 
							key={movie.id} 
							image={this.getImage(movie)} 
							year={(movie.year == null) ? "" : movie.year} 
							duration={this.getDuration(movie)}
           		rating={movie.parentalRating}
           		tags={this.getTags(movie)} //some tags aren't formatted properly when received from API - e.g. no spaces after commas, so this function will convert to an array to fix formatting and avoid type issues with empty tags
            />
          })
        }
      </div>
    )
  }
	
	
	
	getImage(movie) {
		if (movie.images.image.length > 0) {
			console.log("img: ", movie.images.image[0]);
			return movie.images.image[0];
		} else {
			console.log("no images: ", movie.images.image);
			//TODO: create a general 'no image' image and return that when movie doesn't have any images
			return "";
		}
	}
  
	getDuration(movie) {
		let hours = Math.round(movie.durationMinutes / 60);
		if (hours == 0) 
			hours = "";
		else
			hours = hours + "h ";
		
		let minutes = (movie.durationMinutes % 60) + "m ";
		let seconds = movie.durationSeconds + "s";
		console.log("time: ", (hours + minutes + seconds));
		return hours + minutes + seconds;
	}
	
	//convert tags to an array of strings, if tags is null return an empty array so no typechecking is needed later when using the tag property
	getTags(movie) {
		if (movie.tags != null) {
			
			let tags = movie.tags.split(",");
			
			if (tags[tags.length - 1] == "") {
				tags.splice(-1, 1);
			}
			
			return tags;
			
		} else {
			return ["none"];
		}
		
	}
	
	
}



/**
Stateless functional component for movies
each instance renders a grid element to display a single movie
  
props: title:String, author:String, runtime:Number, tags:[String],
**/
const Movie = function(props) {
    return (
      <div className="movie-item">
       <div className="image">
       	<img src={props.image.src} />
       </div>
        <div className="title">
					<div className="name">{props.title}</div>
        	<div className="year">{(props.year == null) ? "No Date" : props.year}</div>
        </div>
        <div className="spec">
        	Rated 
        	<span className="spec-data">{props.rating}</span>
        </div>
        <div className="spec">
        	Duration 
        	<span className="spec-data">{props.duration}</span>
        </div>
        <div className="tags">
        	<span>Tags: </span>
        	{
						//fix formatting for all tags
						props.tags.map((tag) => {
							return tag + ", "
						})
					}
        </div>
      </div>
    )
}


export default MovieGrid;