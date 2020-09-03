exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type SanityNeighbourhood implements Node @infer {
      stores: [SanityStore]
    }
  `)
}

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    SanityNeighbourhood: {
      stores: {
        resolve: ({ id }, args, { nodeModel }) =>
          nodeModel.runQuery({
            type: "SanityStore",
            query: {
              // Comment out this line to stop the bug (but lose filtering)
              filter: { neighbourhoods: { elemMatch: { id: { eq: id } } } },
            },
          }),
      },
    },
  })
}

// Comment out this line to stop the bug (but lose templated pages)
exports.createPages = createPages

async function createPages({ graphql, actions }) {
  const { createPage } = actions

  const { data, errors } = await graphql(`
    query CreatePages {
      neighbourhoods: allSanityNeighbourhood {
        nodes {
          id
          slug {
            current
          }
        }
      }
    }
  `)

  if (errors) {
    throw errors
  }

  data.neighbourhoods.nodes.forEach(({ id, slug: { current } }) => {
    createPage({
      path: current,
      component: require.resolve(`./src/templates/neighbourhood.js`),
      context: { id },
    })
  })
}
