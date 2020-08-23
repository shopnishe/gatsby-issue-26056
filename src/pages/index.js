import React from "react"
import { graphql, Link } from "gatsby"

import { NodeList } from "../components/node-list"

export default function Home({ data: { allSanityStore } }) {
  return (
    <div>
      <h1>Index page</h1>
      <p>Both pages of this site should list the same store IDs.</p>
      <h2>
        <code>allSanityStore.nodes</code>
      </h2>
      <NodeList nodes={allSanityStore.nodes} />
      <p>
        <a href="/___graphql?query=%7B%0A%20%20allSanityStore(filter%3A%20%7Bneighbourhoods%3A%20%7BelemMatch%3A%20%7Bslug%3A%20%7Bcurrent%3A%20%7Beq%3A%20%22harbourfront%22%7D%7D%7D%7D%7D)%20%7B%0A%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A">
          Same query using GraphiQL
        </a>
      </p>
      <p>
        <Link to="harbourfront">Neighbourhood template</Link>
      </p>
    </div>
  )
}

export const query = graphql`
  query IndexPage {
    allSanityStore(
      filter: {
        neighbourhoods: {
          elemMatch: { slug: { current: { eq: "harbourfront" } } }
        }
      }
    ) {
      nodes {
        id
        title
      }
    }
  }
`
