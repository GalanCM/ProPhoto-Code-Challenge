import React from 'react';

import Post from './post.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentWillMount() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        this.setState({ posts: JSON.parse( httpRequest.responseText ) });
      } else {
        // Not ready yet.
      }

    };
    httpRequest.open('GET', '../index.php/wp-json/wp/v2/posts');
    httpRequest.send();
  }

  render() {
    return (
      <div>
        { this.state.posts.slice(0,5).map( (post, i) => {
          return (
            <Post data={ post }  key={ i } />
          );
        } ) }
      </div>
    );
  }
}
