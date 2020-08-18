// This API call creates the relationship from neighbourhoods to stores;
// switching to the `sourceNodes` API doesn't seem to change anything, the bug
// is still triggered
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  const { buildObjectType } = schema

  createTypes([
    buildObjectType({
      name: "SanityNeighbourhood",
      interfaces: ["Node"],
      fields: {
        stores: {
          type: "[SanityStore]",
          resolve: async ({ id }, args, { nodeModel }) =>
            await nodeModel.runQuery({
              query: {
                // Commenting out the below line fixes the index page query (but
                // also associates all stores to all neighbourhoods)
                filter: { neighbourhoods: { elemMatch: { id: { eq: id } } } },
              },
              type: "SanityStore",
              firstOnly: false,
            }),
        },
      },
    }),
  ])
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
