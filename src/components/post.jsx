import React from 'react';

import styles from '../styles/post.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      image_url: null
    };

  }
  componentWillMount() {
    if ( this.props.data.featured_media !== 0 ) {
      var httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          let json = JSON.parse( httpRequest.responseText );
          this.setState({ image_url: json.guid.rendered });
        } else {
          // Not ready yet.
        }
      };
      httpRequest.open('GET', '../index.php/wp-json/wp/v2/media/' + this.props.data.featured_media );
      httpRequest.send();
    }
  }
  render() {
    return (
      <div>
        <h1>{ this.props.data.title.rendered }</h1>
        <div className={ styles.content }>
          { this.state.image_url !== null &&
             <img src={ this.state.image_url } />
          }
          <div dangerouslySetInnerHTML={{ __html: this.props.data.content.rendered }} />
        </div>
      </div>
    );
  }
}
