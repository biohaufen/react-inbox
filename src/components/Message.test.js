/* eslint-disable no-undef */
import React from 'react'
import { shallow } from 'enzyme'
import Message from './Message'

const message = {
  id: 1,
  subject:
        "You can't input the protocol without calculating the mobile RSS protocol!",
  read: false,
  starred: true,
  labels: ['dev', 'personal']
}

describe('Test Message rendering', () => {
  it('should change className depending on read property', () => {
    const messageComponent = shallow(<Message key={message.id} id={message.id} subject={message.subject} selected={message.selected} read={message.read} starred={message.starred} labels={message.labels} />)

    expect(messageComponent.find('div.unread').length).toEqual(1)
    expect(messageComponent.find('div.read').length).toEqual(0)
  })
})

describe('Test Message star click', () => {
  it('should give its id to the called function', () => {
    const mockCallBack = jest.fn()

    const messageComponent = shallow(<Message key={message.id} id={message.id} subject={message.subject} selected={message.selected} read={message.read} starred={message.starred} labels={message.labels} toggleStarFlag={mockCallBack}/>)
    messageComponent.find('i').simulate('click')
    expect(mockCallBack.mock.calls[0][0]).toEqual(message.id)
  })
})

describe('Test selected flag click', () => {
  it('should give its id to the called function', () => {
    const mockCallBack = jest.fn()

    const messageComponent = shallow(<Message key={message.id} id={message.id} subject={message.subject} selected={message.selected} read={message.read} starred={message.starred} labels={message.labels} toggleSelectedFlag={mockCallBack}/>)
    messageComponent.find('input').simulate('change')
    expect(mockCallBack.mock.calls[0][0]).toEqual(message.id)
  })
})
