import React, { Component } from 'react'

import { domain } from './consts'
import history from './history'

import AddContact from './AddContact'

import s from './PageMain.css'

class PageMain extends Component {
  state = {
    isAdding: false,
  }

  toggleAddForm = () => {
    this.setState(({ isAdding }) => ({
      isAdding: !isAdding
    }))
  }

  handleEditContact = (e) => {
    history.push('/edit/' + e.currentTarget.dataset.id)
  }

  addContact = (name, phone, email) => {
    fetch(domain + '/users/add', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ name, phone, email })
    })
      .then((res) => res.json())
      .then((res) => {
        this.props.getContactById(res.insertId)
      })
  }

  render() {
    const { users } = this.props
    const { isAdding } = this.state

    if (!users.length) {
      return 'No users found'
    }

    return (
      <div className='cont'>
        <AddContact
          isAdding={isAdding}
          toggleAddForm={this.toggleAddForm}
          addContact={this.addContact}
        />

        <ul>
          {users.map(({ id, name, phone, email }) => (
            <li
              key={id}
              data-id={id}
              className={s.contact}
              onClick={this.props.handleDeleteContact}
            >
              <div className={s.closeBtn}>X</div>

              <div
                data-id={id}
                className={s.editBtn}
                onClick={this.handleEditContact}
              >✎</div>

              <h3>{name}</h3>
              <p>{phone}</p>
              <p>{email}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default PageMain
