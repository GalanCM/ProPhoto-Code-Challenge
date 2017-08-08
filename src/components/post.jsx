import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>{ this.props.data.title.rendered }</h1>
        <div dangerouslySetInnerHTML={{ __html: this.props.data.content.rendered }} />
      </div>
    );
  }
}
