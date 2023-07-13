import { type FormEvent, useState } from 'react'

import { useAppContext } from '@/hooks'
import { type ProjectData, addProject, setActiveProject } from '@/store/project'
import { addSection } from '@/store/section'

function isActiveProject(
  projects: ProjectData[],
  project: ProjectData,
  activeProjectIndex: number
) {
  return projects.findIndex((p) => p.id === project.id) === activeProjectIndex
}

export function Home() {
  const { state, dispatch } = useAppContext()
  const [projectName, setProjectName] = useState('')

  function handleAddProject(e: FormEvent) {
    e.preventDefault()

    dispatch(
      addProject({
        title: projectName
      })
    )

    setProjectName('')
  }

  function handleSetActiveProject(project: ProjectData) {
    dispatch(setActiveProject(project))
  }

  function handleAddSection() {
    dispatch(addSection())
  }

  return (
    <div>
      <form onSubmit={handleAddProject}>
        <input
          type="text"
          value={projectName}
          onChange={(e) => {
            setProjectName(e.target.value)
          }}
          placeholder="nome do projeto"
        />
      </form>

      <h2>Projetos:</h2>

      <ul>
        {state.projects.map((project) => (
          <li key={project.id}>
            {isActiveProject(
              state.projects,
              project,
              state.activeProjectIndex
            ) ? (
              <strong>{project.title}</strong>
            ) : (
              <button
                onClick={() => {
                  handleSetActiveProject(project)
                }}
              >
                {project.title}
              </button>
            )}
          </li>
        ))}
      </ul>

      <h2>Seções do projeto</h2>
      <button onClick={handleAddSection}>Add Section</button>
      <ul>
        {state.projects[state.activeProjectIndex].sections.map((section) => (
          <li key={section.id}>{section.title}</li>
        ))}
      </ul>
    </div>
  )
}
