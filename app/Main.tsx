import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Card from '@/components/Card'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 3

export default function Home({ posts, featuredProjects }) {
  return (
    <>
      {/* Hero Section */}
      <div className="space-y-6 pt-6 pb-8 md:space-y-8">
        <div className="flex flex-col space-y-6">
          <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-gray-100">
            <span className="block">Digital Health Innovation</span>
            <span className="text-primary-600 dark:text-primary-400 block">& Expertise</span>
          </h1>
          <p className="max-w-2xl text-xl leading-8 text-gray-600 dark:text-gray-300">
            Welcome to CliniPrompt - here I showcase some of the latest projects and ideas I am
            working on. Please feel free to get in touch to learn more about ways we can enhance the
            future of health technology.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/projects"
              className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              View Projects
            </Link>
            <Link
              href="/about"
              className="focus:ring-primary-500 inline-flex items-center justify-center rounded-md border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      {featuredProjects && featuredProjects.length > 0 && (
        <div className="py-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              Featured Projects
            </h2>
            <Link
              href="/projects"
              className="text-primary-600 hover:text-primary-500 dark:text-primary-400 text-base font-medium"
            >
              View all projects &rarr;
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <Card
                key={project.title}
                title={project.title}
                description={project.summary}
                imgSrc={project.image}
                href={`/projects/${project.slug}`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
            Latest Posts
          </h2>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Insights and updates from the world of health technology
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base leading-6 font-medium">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
