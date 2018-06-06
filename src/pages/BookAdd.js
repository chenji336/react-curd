import React from 'react';
import BookEditor from '../components/BookEditor';

class BookAdd extends React.Component {

  render () {
    return (
        <BookEditor {...this.props} />
    );
  }
}

export default BookAdd;