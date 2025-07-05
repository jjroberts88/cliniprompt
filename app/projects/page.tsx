import { allProjects } from 'contentlayer/generated'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  const sortedProjects = allProjects.sort((a, b) => {
    // Sort by featured first, then by date
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Innovative health technology solutions designed to improve patient care and healthcare
            delivery
          </p>
        </div>
        <div className="container py-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedProjects.map((project) => (
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
      </div>
    </>
  )
}
