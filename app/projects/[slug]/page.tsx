import { Project, allProjects } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import { notFound } from 'next/navigation'

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = allProjects.find((p) => p.slug === slug)
  if (!project) {
    return {}
  }

  const { title, summary, image, date } = project
  const ogImage = image || '/static/images/twitter-card.png'

  return genPageMetadata({
    title,
    description: summary,
    image: ogImage,
    date: new Date(date).toISOString(),
  })
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = allProjects.find((p) => p.slug === slug) as Project

  if (!project) {
    notFound()
  }

  const mainContent = coreContent(project)

  return (
    <article className="mx-auto max-w-3xl py-8">
      <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
        <div className="prose prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-200 prose-strong:text-gray-900 dark:prose-strong:text-white prose-li:text-gray-700 dark:prose-li:text-gray-200 max-w-none pt-10 pb-8 text-gray-900 dark:text-gray-100">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <div className="mb-6">
                <span className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
                  {project.status}
                </span>
                {project.featured && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-white">
                {project.title}
              </h1>
              <p className="text-lg leading-7 text-gray-700 dark:text-gray-200">
                {project.summary}
              </p>
              <div className="flex justify-center space-x-4 pt-4">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-600 hover:bg-primary-700 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-white"
                  >
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md border border-gray-800 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 dark:border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                  >
                    GitHub
                  </a>
                )}
              </div>
              <div className="flex justify-center space-x-2 pt-6">
                {project.stack?.map((tech, index) => {
                  const colors = [
                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
                    'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
                    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
                  ]
                  return (
                    <span
                      key={tech}
                      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${colors[index % colors.length]}`}
                    >
                      {tech}
                    </span>
                  )
                })}
              </div>
            </div>
          </header>
          <div className="pt-6 pb-8" style={{ gridTemplateRows: 'auto 1fr' }}>
            <MDXLayoutRenderer code={project.body.code} />
          </div>
        </div>
      </div>
    </article>
  )
}
