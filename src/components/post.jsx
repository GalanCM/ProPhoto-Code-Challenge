import React from 'react';

import Title from './title.jsx'

import styles from '../styles/post.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      image_url: '',
      edit_title: false
    };

    this.delete = this.delete.bind(this);
  }

  componentWillMount() {
    this.update_featured_image();
  }

  render() {
    this.update_featured_image();
    return (
      <div>
        <div className={ styles.delete } onClick={ this.delete }><span className="dashicons dashicons-no-alt"></span></div>
        <Title title={ this.props.data.title.rendered } post_id={ this.props.data.id } update={ this.update.bind(this) } />
        <div className={ styles.content }>
          { this.state.image_url !== null &&
             <img src={ this.state.image_url } />
          }
          <div dangerouslySetInnerHTML={{ __html: this.props.data.content.rendered }} />
        </div>
      </div>
    );
  }

  update( data ) {
    this.props.update_posts( this.props.data.id, data );
  }

  delete(e) {
    if ( confirm("Are you sure you want to delete this post?") ) {
      var httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          this.props.delete( this.props.data.id );
        } else {
          // Not ready yet.
        }
      };
      httpRequest.open('DELETE', '../index.php/wp-json/wp/v2/posts/' + this.props.data.id );
      httpRequest.setRequestHeader( 'X-WP-Nonce', nonce );
      httpRequest.send();
    }
  }

  update_featured_image() {
    if ( this.props.data.featured_media !== 0 && this.state.image_url === '' ) {
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
}
