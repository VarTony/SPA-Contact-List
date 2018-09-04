import React, { Component } from 'react'

import EditContact from './EditContact'

class PageEdit extends Component {
  filterUser = () => this.props.users.filter((user) => user.id === +this.props.id)

  render() {
    return (
      <div className='cont'>
        <EditContact
          id={this.props.id}
          user={this.filterUser()}
          updateUsersList={this.props.updateUsersList}
        />
      </div>
    )
  }
}

export default PageEdit
