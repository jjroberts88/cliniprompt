import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allProjects } from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const featuredProjects = allProjects
    .filter((project) => project.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  return <Main posts={posts} featuredProjects={featuredProjects} />
}
