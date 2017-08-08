import React from 'react';

import Post from './post.jsx'

import styles from '../styles/app.css'

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
        let posts = JSON.parse( httpRequest.responseText )
        this.setState({ posts: posts.slice(0,5) });
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
        { this.state.posts.map( (post, i) => {
          return (
            <Post data={ post }  key={ i } />
          );
        } ) }
      </div>
    );
  }
}
