import React from 'react';

import styles from '../styles/title.css';

export default class Title extends React.Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      temp_title: ''
    };

    this.toggle_edit = this.toggle_edit.bind(this);
    this.edit_title = this.edit_title.bind(this);
    this.handle_key = this.handle_key.bind(this);
  }

  render() {
    if ( !this.state.edit ) {
      return (
        <h1 onClick={ this.toggle_edit }>{ this.props.title }
          <span className="dashicons dashicons-edit"></span>
        </h1>
      );
    }
    else {
      return <input value={ this.state.temp_title } onChange={ this.edit_title } placeholder="New Title" onKeyDown={ this.handle_key } autoFocus /> ;
    }
  }

  toggle_edit(e) {
    e.preventDefault();
    this.setState({ edit: !this.state.edit });
  }

  edit_title(e) {
    this.setState({ temp_title: e.target.value });
  }

  handle_key(e) {
    if ( e.key === 'Escape' ) {
      this.setState({ edit: false, temp_title: '' });
    }
    else if ( e.key === 'Enter' ) {
      e.target.disabled = true;

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let json = JSON.parse( xhr.responseText );
          this.props.update({ title: json.title });
          this.setState({ edit: false });
        } else {
          // Not ready yet.
        }
      };
      xhr.open('POST', '../index.php/wp-json/wp/v2/posts/' + this.props.post_id );
      xhr.setRequestHeader( 'X-WP-Nonce', nonce );
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
      xhr.send( 'title=' + encodeURIComponent( this.state.temp_title ) );
    }
  }
}
