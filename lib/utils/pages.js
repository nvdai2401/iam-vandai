const path = require('path')
const glob = require('glob')
const fs = require('fs')
const matter = require('gray-matter')
// const metadata = require('../metadata.json')

const CWD = process.cwd()

const getURLParam = (pagePath) => {
  // TODO: update here
  let input = pagePath
  if (input.startsWith(CWD)) input = input.substr(CWD.length + 1)
  if (input.startsWith('data/blog/')) input = input.substr(6)
  if (input.endsWith('.mdx')) input = input.substr(0, input.length - 4)

  const subpage = path.dirname(input)
  const slug = path.basename(input)
  return { subpage, slug }
}

const getCanonicalURL = (subpage, slug) =>
  `https://iamvandai.com/${subpage}/${slug}`

const isPage = (pagePath) => {
  const { subpage, slug } = getURLParam(pagePath)
  return (
    subpage.length > 0 && subpage.indexOf(path.sep) === -1 && slug.length > 0
  )
}

const all = () =>
  glob.sync(`data/blog/**/*.mdx`).map((name) => path.join(CWD, name))

const read = (subpage, slug) => {
  const { data: frontmatter, content } = matter(
    fs.readFileSync(path.join(CWD, 'data/blog', subpage, `${slug}.mdx`))
  )
  const canonicalURL = getCanonicalURL(subpage, slug)
  return {
    frontmatter: { ...frontmatter, subpage, slug, canonicalURL },
    content,
  }
}

const stringify = ({ frontmatter, content }) =>
  matter.stringify(content, frontmatter)

const pageUtils = {
  getURLParam,
  getCanonicalURL,
  isPage,
  all,
  read,
  stringify,
}

module.exports = pageUtils
