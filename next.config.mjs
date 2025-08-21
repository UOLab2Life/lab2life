import withMarkdoc from '@markdoc/next.js'
import withSearch from './src/markdoc/search.mjs'

const nextConfig = {
  experimental: { externalDir: true },
  pageExtensions: ['js', 'jsx', 'md', 'ts', 'tsx'],
}

export default withSearch(
  withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig),
)
