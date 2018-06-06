import React from 'react';
import UserEditor from '../components/UserEditor';

class UserAdd extends React.Component {
  render () {
    return (
      <UserEditor {...this.props}/>
    );
  }
}

export default UserAdd;