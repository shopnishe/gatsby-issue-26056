import React from "react"
import { graphql, Link } from "gatsby"

import { NodeList } from "../components/node-list"

export default function Neighbourhood({ data: { sanityNeighbourhood } }) {
  return (
    <div>
      <h1>Neighbourhood template</h1>
      <p>Both pages of this site should list the same store IDs.</p>
      <h2>
        <code>sanityNeighbourhood.stores</code>
      </h2>
      <NodeList nodes={sanityNeighbourhood.stores} />
      <p>
        <Link to="/">Index page</Link>
      </p>
    </div>
  )
}

export const query = graphql`
  query NeighbourhoodTemplate($slug: String!) {
    sanityNeighbourhood(slug: { current: { eq: $slug } }) {
      stores {
        id
      }
    }
  }
`
