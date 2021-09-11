import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 text-sm font-medium lowercase text-pink-500 hover:text-pink-600 dark:text-pink-600 dark:hover:text-pink-500">
        #{text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
