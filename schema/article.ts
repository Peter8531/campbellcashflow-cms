export type Step = {
  n: string
  title: string
  body: string
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
  steps: Step[]
  closingQuote: string
  closingAttribution: string
  closingParagraphs: string[]
}
