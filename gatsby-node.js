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
        resolve: async ({ id }, args, { nodeModel }) =>
          await nodeModel.runQuery({
            type: "SanityStore",
            query: {
              filter: { neighbourhoods: { elemMatch: { id: { eq: id } } } },
            },
          }),
      },
    },
  })
}

// This API call triggers the bug when its page queries call the custom resolver
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const { data, errors } = await graphql(`
    query CreatePages {
      neighbourhoods: allSanityNeighbourhood {
        nodes {
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

  data.neighbourhoods.nodes.forEach(({ slug: { current: slug } }) => {
    createPage({
      path: slug,
      component: require.resolve(`./src/templates/neighbourhood.js`),
      context: { slug },
    })
  })
}
