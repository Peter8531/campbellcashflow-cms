// Campbell Cashflow – RemoteArticle
// Framer: Assets > Code > New File > paste > Save > drag onto canvas
// Fetches article JSON from a url prop and renders ArticleLayout.
//
// In Framer's property panel set the url to e.g.:
//   https://raw.githubusercontent.com/Peter8531/campbellcashflow-cms/main/content/articles/retirement-clarity.json

import { useState, useEffect } from "react"
import ArticleLayout, { type ArticleProps } from "./ArticleLayout"

interface Props {
  url: string
}

export default function RemoteArticle({ url }: Props) {
  const [article, setArticle] = useState<ArticleProps | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!url) {
      setError("No url provided.")
      return
    }

    let cancelled = false
    setError(null)
    setArticle(null)

    fetch(url, { cache: "no-cache" })
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
        return res.json()
      })
      .then((data: ArticleProps) => {
        if (!cancelled) setArticle(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })

    return () => {
      cancelled = true
    }
  }, [url])

  if (error) {
    return (
      <div
        style={{
          padding: 40,
          fontFamily: "'DM Sans', system-ui, sans-serif",
          color: "#b91c1c",
          textAlign: "center",
        }}
      >
        Failed to load article: {error}
      </div>
    )
  }

  if (!article) {
    return (
      <div
        style={{
          padding: 80,
          fontFamily: "'DM Sans', system-ui, sans-serif",
          color: "#8a96a8",
          textAlign: "center",
          letterSpacing: "0.1em",
          fontSize: 13,
        }}
      >
        Loading…
      </div>
    )
  }

  return <ArticleLayout {...article} />
}

/* ── Framer property controls ──────────────────────────── */

import { addPropertyControls, ControlType } from "framer"

addPropertyControls(RemoteArticle, {
  url: {
    type: ControlType.String,
    title: "Article JSON URL",
    defaultValue:
      "https://raw.githubusercontent.com/Peter8531/campbellcashflow-cms/main/content/articles/retirement-clarity.json",
  },
})

export const framerSizes = {
  defaultWidth: "100%",
  defaultHeight: "auto",
  isFixedHeight: false,
}
