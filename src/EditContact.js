import React, { Component } from 'react'

import history from './history'
import { domain } from './consts'

import s from './EditContact.css'

class EditContact extends Component {
  constructor(props) {
    super(props)
    this.name = React.createRef()
    this.phone = React.createRef()
    this.email = React.createRef()
  }

  handleSave = () => {
    fetch(domain + `/users/${this.props.id}`, {
      method: 'POST',
      body: JSON.stringify({
        name: this.name.current.value,
        phone: this.phone.current.value,
        email: this.email.current.value
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        this.props.updateUsersList(updatedUser)
      })
  }

  handleEditCancel = () => {
    history.push('/')
  }

  render() {
    const { user } = this.props

    if (!user.length) return null

    const { name, phone, email } = user[0]

    return (
      <div className={s.wrapper}>
        <div>
          <label>
            Имя:
            <input name='name' ref={this.name} defaultValue={name} />
          </label>

          <label>
            Телефон:
            <input name='phone' ref={this.phone} defaultValue={phone} />
          </label>

          <label>
            Email:
            <input name='email' ref={this.email} defaultValue={email} />
          </label>
        </div>

        <button onClick={this.handleSave}>
          Сохранить
        </button>

        <button onClick={this.handleEditCancel}>
          Отменить
        </button>
      </div>
    )
  }
}

export default EditContact
