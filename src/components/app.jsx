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
            <Post data={ post } update_posts={ this.update_posts.bind(this) } delete={ this.remove_post.bind(this) } key={ i } />
          );
        } ) }
      </div>
    );
  }

  update_posts( id, data ) {
    var new_posts = this.state.posts;
    for ( let post_key in new_posts ) {
      if ( new_posts[ post_key ].id === id ) {
        for ( let field_key in data ) {
          new_posts[ post_key ][ field_key ] = data[ field_key ];
        }
        this.setState({ posts: new_posts });
      }
    }

    for ( let key in this.props.children ) {
      console.log(key)
    }
  }

  remove_post( id ) {
    var new_posts = this.state.posts;
    for ( let key in new_posts ) {
      if ( new_posts[ key ].id === id ) {
        new_posts.splice( key, 1 );
        this.setState({ posts: new_posts });
      }
    }
  }
}
