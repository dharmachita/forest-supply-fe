import React from 'react'

export default function DynamicPage({ params }) {
  return (
    <div>My Post: {params.id}</div>
  )
}
