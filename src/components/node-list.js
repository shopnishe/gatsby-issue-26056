import React from "react"

export function NodeList({ nodes }) {
  if (!nodes || !nodes.length) {
    return <p>No nodes</p>
  }

  return (
    <ul>
      {nodes.map(({ id }) => (
        <li key={id}>{id}</li>
      ))}
    </ul>
  )
}
