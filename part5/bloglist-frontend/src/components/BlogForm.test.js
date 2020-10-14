import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm />', () => {
  const addBlog = jest.fn()

  const component = render(<BlogForm addBlog={addBlog} />)

  const Title = component.getAllByRole('textbox')[0]
  const Author = component.getAllByRole('textbox')[1]
  const Url = component.getAllByRole('textbox')[3]
  const form = component.container.querySelector('form')

  fireEvent.change(Title, {
    target: { value: 'Blog' },
  })
  fireEvent.change(Author, {
    target: { value: 'blogger' },
  })
  fireEvent.change(Url, {
    target: { value: 'test.ru' },
  })
  fireEvent.submit(form)
  console.log(addBlog.mock.calls)
  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('Blog')
  expect(addBlog.mock.calls[0][0].author).toBe('blogger')
  expect(addBlog.mock.calls[0][0].url).toBe('test.ru')
})