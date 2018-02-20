import React from 'react';

class MovieOptions extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="movie-options">
        <div className="limit-label">Movies Per Page: </div>
        <div className="limit-option">
          <input type="text" value={this.props.limit} onChange={this.props.limitChangeHandler} />
        </div>
        <div className="page-label">Page: </div>
        <div className="page-option">
          <div className="last-page page-btn" onClick={this.props.lastPageHandler} >
            <i class="fas fa-caret-left pointer-cursor"></i>
          </div>
          <input type="text" value={this.props.page} onChange={this.props.pageChangeHandler.bind(this)} />
          <div className="next-page page-btn" onClick={this.props.nextPageHandler} >
            <i class="fas fa-caret-right pointer-cursor"></i>
          </div>
        </div>
        
      </div>
    )
  }
  
}

export default MovieOptions;