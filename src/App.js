import React, { Component } from 'react'
import {
  Router,
  Route
} from 'react-router-dom'

import PageMain from './PageMain'
import PageEdit from './PageEdit'

import { domain } from './consts'
import history from './history'

import './App.css'
import s from './PageMain.css'

class App extends Component {
  state = {
    users: []
  }

  updateUsersList = (updatedUser) => {
    this.setState({
      users: this.state.users.map((user) => {
        if (user.id === +updatedUser[0].id) {
          return {
            id: +updatedUser[0].id,
            name: updatedUser[0].name,
            phone: updatedUser[0].phone,
            email: updatedUser[0].email
          }
        }

        return user
      })
    })
  }

  getContactById = (id) => {
    fetch(domain + `/users/${id}`)
      .then((res) => res.json())
      .then((user) => {
        this.setState({
          users: [ ...this.state.users, user[0] ]
        })
      })
  }

  handleDeleteContact = (e) => {
    const deleteId = e.currentTarget.dataset.id

    if (e.target.classList.contains(s.closeBtn)) {
      this.deleteContactById(deleteId)

      this.setState({
        users: this.state.users.filter((user) => user.id !== +deleteId)
      })
    }
  }

  deleteContactById = (id) => {
    fetch(domain + `/users/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
      })
  }

  componentDidMount() {
    fetch(domain + '/users')
      .then((res) => res.json())
      .then((users) => {
        this.setState({
          users
        })
      })
  }

  render() {
    const { users } = this.state

    return (
      <Router history={history}>
        <div>
          <Route exact path="/" render={() => <PageMain
                                                users={users}
                                                getContactById={this.getContactById}
                                                handleDeleteContact={this.handleDeleteContact}
                                              />} />
        <Route path="/edit/:id" render={({ match: { params: {id} } }) => <PageEdit
                                                                          users={users}
                                                                          id={id}
                                                                          updateUsersList={this.updateUsersList}
                                                                         /> }
        />
        </div>
      </Router>
    )
  }
}

export default App
