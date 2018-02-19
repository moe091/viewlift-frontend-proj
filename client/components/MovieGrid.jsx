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
          this.props.movies.map((movie, index) => {
            return <Movie 
                title={movie.title} 
                key={movie.id} 
                id={movie.id}
                index={index}
                image={this.getImage(movie)} 
                year={(movie.year == null) ? "" : movie.year} 
                duration={this.getDuration(movie)}
           		rating={movie.parentalRating}
                geoRestrictions={movie.geoRestrictions}
           		tags={this.getTags(movie)} //some tags aren't formatted properly when received from API - e.g. no spaces after commas, so this function will convert to an array to fix formatting and avoid type issues with empty tags
                relatedFilms={(movie.relatedFilms.relatedFilm) ? movie.relatedFilms.relatedFilm : []}
            />
          })
        }
      </div>
    )
  }
	
	
	 
	getImage(movie) { 
		if (movie.images.image.length > 0) {
			return movie.images.image[0];
		} else {
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
class Movie extends React.Component {
    
  render() {
    return (
      <div key={this.props.id} className="movie-item">
       <div className="image" onClick={this.createClickHandler(this.props.title)} >
       	<img src={this.props.image.src} />
       </div>
        <div className="title">
		    <div className="name pointer-cursor" onClick={this.createClickHandler(this.props.title)} >{this.props.title}</div>
        	<div className="year">{(this.props.year == null) ? "No Date" : this.props.year}</div>
        </div>
        <div className="spec">
        	Rated 
        	<span className="spec-data">{this.props.rating}</span>
        </div>
        <div></div>
        <div className="spec">
        	Duration 
        	<span className="spec-data">{this.props.duration}</span>
        </div>
        <div></div>
        <div className="spec">
            <span className="spec-data">{this.props.geoRestrictions}</span>
        </div>
        <div className="tags">
        	<span>Tags: </span>
        	{
						//fix formatting for all tags
						this.props.tags.map((tag) => {
							return tag + ", "
						})
					}
        </div>
        <div className="related-label">
          Related Films:
        </div>
        <div className="related-films">
          {
            this.props.relatedFilms.map((film) => {
              return <RelatedFilm key={this.props.id + "-" + film.id} images={film.images.image} title={film.title} clickHandler={this.createClickHandler(film.title)} /> 
            }) 
          }
        </div>
    
      </div>
    )
  }
  
  /**
  creates a function for each film to be used as the onClick callback for that film. 
  would usually navigate to that films page or something but this is just a single page demo and I don't have access to the full API.
  
  I would usually pass in the films id(or whatever value is used to retrieve the film from the backend) as a parameter here, so that the function could make an ajax call(either POST with the film id passed in the request body, or GET with the film as a url param) and then render the film component with the data returned from the ajax request.
  
  since it just navigates to a films page, it can be used when a relatedFilm or a regular film is clicked
  **/
  createClickHandler(title) {
    return (function() {
      alert("This link would usually navigate to a page for:\n\n'" + title + "'\n\nbut I don't have access to the whole API and this is only a demo");
    }).bind(this); //technically this doesn't need to be bound since it's just creating an alert, but if it had real functionality this would be necessary
  }
  
  
}

//small stateless functional component to display relatedFilms
const RelatedFilm = function(props) {
  return (
    <div className="related-film pointer-cursor" onClick={props.clickHandler}>
      <img src={props.images[0].src} />
      <div className="related-overlay">
        {props.title}
      </div>
    </div>
  )
}


export default MovieGrid;