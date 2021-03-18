import './App.css'
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import ComposeForm from './components/ComposeForm'
import React, { Component } from 'react'

class App extends Component {
  state = {
    messages: [],
    bulkSelectState: 'some',
    totalUnreadMessageCount: 0,
    showComposeForm: false
  }

  async componentDidMount () {
    await this.fetchMessages().then(messages => this.setState({ messages: messages }))
    this.countUnreadMessages()
  }

  handleFetchError = (response) => {
    const errorMessage = `${response.status}: (${response.statusText})`
    throw (new Error(errorMessage))
  }

  fetchMessages = async () => {
    return fetch('http://localhost:8082/api/messages').then(response => {
      if (response.ok) {
        return response.json()
      } else {
        this.handleFetchError(response)
      }
    })
  }

  patchMessages = async (body) => {
    fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(async (response) => {
      if (response.ok) {
        const updatedList = await this.fetchMessages()
        this.setState({ messages: updatedList })
        this.countUnreadMessages()
      } else {
        this.handleFetchError(response)
      }
    })
  }

  countUnreadMessages = () => {
    this.setState({ totalUnreadMessageCount: this.state.messages.filter((message) => !message.read).length })
  }

  toggleStarFlag = (messageId) => {
    const body = {
      // its important to send over an array, since the api uses findAll, eventhough stars can only be applied once
      messageIds: [messageId],
      command: 'star'
    }
    this.patchMessages(body)
  }

  toggleSelectedFlag = (messageId) => {
    const itemIndex = this.state.messages.findIndex(
      (message) => message.id === messageId)
    const newList = [...this.state.messages]
    if (newList[itemIndex].checked === 'undefined') {
      newList[itemIndex] = {
        ...newList,
        selected: true
      }
    } else {
      newList[itemIndex].selected = !newList[itemIndex].selected
    }

    this.setState({
      messages: newList,
      bulkSelectState: this.checkBulkState()
    })
  }

  checkBulkState = () => {
    let hasSomeChecked
    if (this.state.messages.every((message) => message.selected)) {
      hasSomeChecked = 'all'
    } else if (this.state.messages.every((message) => !message.selected)) {
      hasSomeChecked = 'none'
    } else {
      hasSomeChecked = 'some'
    }
    return hasSomeChecked
  }

  bulkSelectMessage = (e) => {
    e.preventDefault()
    if (this.state.messages.every((message) => message.selected)) {
      const newList = [...this.state.messages]
      newList.map((message) => (message.selected = false))
      this.setState({ messages: newList, bulkSelectState: 'none' })
    } else {
      const newList = [...this.state.messages]
      newList.map((message) => (message.selected = true))
      this.setState({ messages: newList, bulkSelectState: 'all' })
    }
  }

  getSelectedMessages = () => {
    return this.state.messages.filter((message) => message.selected).map((item) => item.id)
  }

  changeReadStatus = (isRead) => {
    const messagesIdsToMark = this.getSelectedMessages()
    const body = {
      messageIds: messagesIdsToMark,
      command: 'read',
      read: isRead
    }
    this.patchMessages(body)
  }

  changeLabelOfMessages = (event, cmd) => {
    const messagesIdsAddLabel = this.getSelectedMessages()
    const body = {
      messageIds: messagesIdsAddLabel,
      command: cmd,
      label: event.target.value
    }
    this.patchMessages(body)
  }

  deleteSelectedMessages = () => {
    const messagesToDelete = this.getSelectedMessages()
    const body = {
      messageIds: messagesToDelete,
      command: 'delete'
    }
    this.patchMessages(body)
  }

  toggleComposeForm = () => {
    this.setState({ showComposeForm: !this.state.showComposeForm })
  }

  addMessage = (messageSubject, messageBody) => {
    const body = {
      subject: messageSubject,
      body: messageBody,
      read: false,
      starred: false,
      labels: []
    }
    fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(async (response) => {
      if (response.ok) {
        const updatedList = await this.fetchMessages()
        this.setState({ messages: updatedList })
        this.countUnreadMessages()
      } else {
        this.handleFetchError(response)
      }
    })
  }

  render () {
    return (
      <div className="App">
        <Toolbar
          bulkSelectState={this.state.bulkSelectState}
          totalUnreadMessageCount={this.state.totalUnreadMessageCount}
          bulkSelectMessage={this.bulkSelectMessage}
          deleteSelectedMessages={this.deleteSelectedMessages}
          changeReadStatus={this.changeReadStatus}
          changeLabelOfMessages={this.changeLabelOfMessages}
          toggleComposeForm={this.toggleComposeForm}
        />
        {this.state.showComposeForm ? <ComposeForm addMessage={this.addMessage}/> : ''}
        <MessageList
          messages={this.state.messages}
          toggleStarFlag={this.toggleStarFlag}
          toggleSelectedFlag={this.toggleSelectedFlag}
        />
      </div>
    )
  }
}

export default App
