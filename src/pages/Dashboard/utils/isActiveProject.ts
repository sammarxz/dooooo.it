import { type ProjectData } from '@/store/project'

export function isActiveProject(
  projects: ProjectData[],
  project: ProjectData,
  activeProjectIndex?: number
) {
  return projects.findIndex((p) => p.id === project.id) === activeProjectIndex
}
