const dotenv = require("dotenv")
dotenv.config()

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        token: process.env.SANITY_AUTH_TOKEN,
        overlayDrafts:
          process.env.NODE_ENV === "development" &&
          process.env.SANITY_AUTH_TOKEN &&
          true,
        watchMode:
          process.env.NODE_ENV === "development" &&
          process.env.SANITY_AUTH_TOKEN &&
          true,
      },
    },
  ],
}
