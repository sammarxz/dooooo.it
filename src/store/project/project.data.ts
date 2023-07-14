import { type SectionData } from '../section'

export interface ProjectData {
  id: string
  title: string
  emoji: string
  sections: SectionData[]
}
