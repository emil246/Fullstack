import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Blog from './Blog'

describe('<Togglable />', () => {

  let component
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'Blog',
      author: 'blogger',
      url: 'test.ru',
      likes: 3,
      user: 'blogger'
    }

    const user = {
      name: 'blogger'
    }

    mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} user={user} handleLike={mockHandler} handleRemove={mockHandler} />
    )
  })

  test('title & author', () => {
    expect(component.container).toHaveTextContent(
      'Blog', 'blogger'
    )
  })
  test('url & likes in details', async () => {
    const button = component.getByText('Details')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(
      'test.ru'
    )
  })

  test('twice like', async () => {

    const button = component.getByText('Details')
    fireEvent.click(button)
    const button_like = component.getByText('like')
    fireEvent.click(button_like)
    fireEvent.click(button_like)

    expect(mockHandler).toHaveBeenCalledTimes(2)
  })
})