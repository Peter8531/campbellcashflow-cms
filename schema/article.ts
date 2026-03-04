export type Step = {
  n: string
  title: string
  body: string
}

export type TableColumn = {
  key: string
  label: string
}

export type TableRow = Record<string, string>

export type Table = {
  title?: string
  subtitle?: string
  columns: TableColumn[]
  rows: TableRow[]
  footnote?: string
  afterStep: number // insert table after this step index (0-based)
}

export type ArticleProps = {
  slug: string
  topic: string
  dateLabel: string
  readTime: string
  titleMain: string
  titleEmphasis?: string
  summary: string
  introParagraphs: string[]
  introQuestions: string[]
  introClosingParagraphs?: string[]
  sectionLabel?: string // defaults to "The {N} Steps"
  steps: Step[]
  table?: Table
  closingQuote: string
  closingAttribution: string
  closingParagraphs: string[]
}

export type ArticleIndexEntry = {
  slug: string
  topic: string
  dateLabel: string
  readTime: string
  titleMain: string
  titleEmphasis?: string
  summary: string
}

export type ArticleIndex = {
  articles: ArticleIndexEntry[]
}
