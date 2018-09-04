import React, { Component } from 'react'

import s from './AddContact.css'

class AddContact extends Component {
  constructor(props) {
    super(props)
    this.name = React.createRef()
    this.phone = React.createRef()
    this.email = React.createRef()
  }

  handleAddContact = () => {
    const name = this.name.current.value
    const phone = this.phone.current.value
    const email = this.email.current.value

    this.props.addContact(name, phone, email)
  }

  render() {
    const { isAdding, toggleAddForm } = this.props

    return (
      <div className={s.wrapper}>
        {isAdding
          ? (
            <div>
              <label>
                Имя:
                <input name='name' ref={this.name} />
              </label>

              <label>
                Телефон:
                <input name='phone' ref={this.phone} />
              </label>

              <label>
                Email:
                <input name='email' ref={this.email} />
              </label>
            </div>
          ) : null
        }

        <div>
          <button onClick={toggleAddForm}>
            {isAdding
              ? 'Отменить'
              : 'Добавить новый контакт'
            }
          </button>

          {isAdding
            ? <button onClick={this.handleAddContact}>Сохранить</button>
            : null
          }
        </div>
      </div>
    )
  }
}

export default AddContact
