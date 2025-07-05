import { Project, allProjects } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import { notFound } from 'next/navigation'
import { components } from '@/components/MDXComponents'

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
                    className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
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
            <MDXLayoutRenderer code={project.body.code} components={components} />
          </div>
        </div>
      </div>
    </article>
  )
}
