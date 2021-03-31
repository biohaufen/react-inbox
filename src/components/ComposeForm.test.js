/* eslint-disable no-undef */
import React from 'react'
import ComposeForm from './ComposeForm'
import renderer from 'react-test-renderer'

test('renders the same way every time', () => {
  const tree = renderer.create(<ComposeForm />).toJSON()
  expect(tree).toMatchSnapshot()
})
