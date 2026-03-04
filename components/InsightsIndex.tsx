// Campbell Cashflow – InsightsIndex (self-contained Framer component)
// Framer: Assets > Code > New File > paste > Save > drag onto canvas
// Fetches content/index.json and renders the Insights listing page.
//
// In Framer's property panel set the url to:
//   https://raw.githubusercontent.com/Peter8531/campbellcashflow-cms/main/content/index.json

import { useState, useEffect } from "react"
import { addPropertyControls, ControlType } from "framer"

/* ── Types ─────────────────────────────────────────────── */

type ArticleEntry = {
  slug: string
  topic: string
  dateLabel: string
  readTime: string
  titleMain: string
  titleEmphasis?: string
  summary: string
}

type ArticleIndex = {
  articles: ArticleEntry[]
}

/* ── Tokens ────────────────────────────────────────────── */

const c = {
  navy: "#0f1f3d",
  gold: "#c9a84c",
  cream: "#f7f4ef",
  white: "#fdfcfa",
  mid: "#4a5568",
  light: "#8a96a8",
}
const serif = "'Cormorant Garamond', Georgia, serif"
const sans = "'DM Sans', system-ui, sans-serif"
const box: React.CSSProperties = { width: "100%", boxSizing: "border-box" }

/* ── Hooks ─────────────────────────────────────────────── */

function useFonts() {
  useEffect(() => {
    const id = "cc-fonts"
    if (document.getElementById(id)) return
    const link = document.createElement("link")
    link.id = id
    link.rel = "stylesheet"
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap"
    document.head.appendChild(link)
  }, [])
}

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  )
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])
  return width
}

/* ── Shared chrome ─────────────────────────────────────── */

function Logo({ size, arcColor }: { size: number; arcColor: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", flexShrink: 0 }}
    >
      <circle cx="80" cy="80" r="72" fill="none" stroke="#c9a84c" strokeWidth="2" />
      <path
        d="M 80 14 A 66 66 0 1 0 80 146"
        fill="none"
        stroke={arcColor}
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M 34 82 Q 52 66 80 72 Q 108 78 126 62"
        fill="none"
        stroke="#c9a84c"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M 120 56 L 126 62 L 132 58"
        fill="none"
        stroke="#c9a84c"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Nav({ m }: { m: boolean }) {
  const [open, setOpen] = useState(false)
  const links: [string, string][] = [
    ["About", "/#about"],
    ["The Process", "/process"],
    ["Services", "/#services"],
    ["Insights", "/insights"],
  ]
  return (
    <div
      style={{
        ...box,
        background: "rgba(253,252,250,0.96)",
        borderBottom: "1px solid rgba(201,168,76,0.15)",
      }}
    >
      <div
        style={{
          ...box,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: m ? "16px 24px" : "18px 56px",
        }}
      >
        <a href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Logo size={44} arcColor={c.navy} />
            <span style={{ fontFamily: serif, fontWeight: 500, color: c.navy }}>
              Campbell <span style={{ color: c.gold }}>Cashflow</span>
            </span>
          </span>
        </a>
        {m ? (
          <button
            onClick={() => setOpen((o) => !o)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              padding: 4,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                display: "block",
                width: 24,
                height: 2,
                background: c.navy,
                transition: "transform 0.2s",
                transform: open ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: 24,
                height: 2,
                background: c.navy,
                transition: "opacity 0.2s",
                opacity: open ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: 24,
                height: 2,
                background: c.navy,
                transition: "transform 0.2s",
                transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        ) : (
          <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {links.map(([l, h]) => (
              <a
                key={l}
                href={h}
                style={{
                  fontFamily: sans,
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: l === "Insights" ? c.navy : c.mid,
                  textDecoration: "none",
                  borderBottom:
                    l === "Insights" ? `1px solid ${c.gold}` : "none",
                  paddingBottom: l === "Insights" ? 2 : 0,
                }}
              >
                {l}
              </a>
            ))}
            <a
              href="https://calendly.com/peter-campbellcashflow/campbell-cashflow-discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: sans,
                fontSize: 13,
                fontWeight: 500,
                background: c.navy,
                color: c.cream,
                padding: "10px 22px",
                borderRadius: 2,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Book a Call
            </a>
          </div>
        )}
      </div>
      {m && open && (
        <div
          style={{
            ...box,
            borderTop: "1px solid rgba(201,168,76,0.12)",
            padding: "20px 24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {links.map(([l, h]) => (
            <a
              key={l}
              href={h}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: sans,
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: c.mid,
                textDecoration: "none",
              }}
            >
              {l}
            </a>
          ))}
          <a
            href="https://calendly.com/peter-campbellcashflow/campbell-cashflow-discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              fontFamily: sans,
              fontSize: 13,
              fontWeight: 500,
              background: c.navy,
              color: c.cream,
              padding: "13px",
              borderRadius: 2,
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Book a Call
          </a>
        </div>
      )}
    </div>
  )
}

function Footer({ m }: { m: boolean }) {
  return (
    <div
      style={{
        ...box,
        background: c.navy,
        borderTop: "1px solid rgba(201,168,76,0.2)",
        padding: m ? "36px 24px" : "40px 80px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <a href="/" style={{ textDecoration: "none" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Logo size={44} arcColor="#fdfcfa" />
          <span
            style={{ fontFamily: serif, fontWeight: 500, color: "#fdfcfa" }}
          >
            Campbell <span style={{ color: c.gold }}>Cashflow</span>
          </span>
        </span>
      </a>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {(
          [
            ["Privacy Policy", "/privacy"],
            ["Terms of Service", "/terms"],
            ["Refund Policy", "/refunds"],
          ] as [string, string][]
        ).map(([l, h]) => (
          <a
            key={l}
            href={h}
            style={{
              fontFamily: sans,
              fontSize: 12,
              color: "rgba(247,244,239,0.45)",
              textDecoration: "none",
            }}
          >
            {l}
          </a>
        ))}
      </div>
      <span
        style={{
          fontFamily: sans,
          fontSize: 12,
          color: "rgba(247,244,239,0.3)",
        }}
      >
        © {new Date().getFullYear()} Campbell Cashflow
      </span>
    </div>
  )
}

/* ── Article Card ──────────────────────────────────────── */

function ArticleCard({ article, m }: { article: ArticleEntry; m: boolean }) {
  return (
    <a
      href={`/insights/${article.slug}`}
      style={{
        ...box,
        textDecoration: "none",
        display: "block",
        background: c.white,
        borderLeft: `3px solid ${c.gold}`,
        padding: m ? "24px 20px" : "32px 36px",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = c.cream)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = c.white)
      }
    >
      {/* Meta row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: sans,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: c.gold,
          }}
        >
          {article.topic}
        </span>
        <span
          style={{
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "rgba(201,168,76,0.4)",
            display: "block",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: sans,
            fontSize: 10,
            color: c.light,
            letterSpacing: "0.08em",
          }}
        >
          {article.dateLabel}
        </span>
        <span
          style={{
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "rgba(201,168,76,0.4)",
            display: "block",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: sans,
            fontSize: 10,
            color: c.light,
            letterSpacing: "0.08em",
          }}
        >
          {article.readTime}
        </span>
      </div>

      {/* Title */}
      <h2
        style={{
          fontFamily: serif,
          fontSize: m ? 22 : 28,
          fontWeight: 300,
          color: c.navy,
          lineHeight: 1.2,
          marginBottom: 10,
        }}
      >
        {article.titleMain}
        {article.titleEmphasis && (
          <>
            {" "}
            <em style={{ color: c.gold }}>{article.titleEmphasis}</em>
          </>
        )}
      </h2>

      {/* Summary */}
      <p
        style={{
          fontFamily: sans,
          fontSize: m ? 13 : 15,
          fontWeight: 300,
          lineHeight: 1.7,
          color: c.mid,
          margin: 0,
          marginBottom: 14,
        }}
      >
        {article.summary}
      </p>

      {/* Read link */}
      <span
        style={{
          fontFamily: sans,
          fontSize: 12,
          fontWeight: 500,
          color: c.gold,
          letterSpacing: "0.08em",
        }}
      >
        Read article →
      </span>
    </a>
  )
}

/* ── InsightsIndex (default export) ────────────────────── */

export default function InsightsIndex({ url }: { url: string }) {
  useFonts()
  const width = useWindowWidth()
  const m = width <= 768

  const [index, setIndex] = useState<ArticleIndex | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!url) {
      setError("No url provided.")
      return
    }

    let cancelled = false
    setError(null)
    setIndex(null)

    fetch(url, { cache: "no-cache" })
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
        return res.json()
      })
      .then((data: ArticleIndex) => {
        if (!cancelled) setIndex(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })

    return () => {
      cancelled = true
    }
  }, [url])

  return (
    <div style={{ ...box, overflowX: "hidden", background: c.white }}>
      <Nav m={m} />

      {/* Header */}
      <div
        style={{
          ...box,
          background: c.cream,
          padding: m ? "36px 24px 32px" : "72px 80px 60px",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
        }}
      >
        <span
          style={{
            fontFamily: sans,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: c.gold,
            display: "block",
            marginBottom: 16,
          }}
        >
          Insights
        </span>
        <h1
          style={{
            fontFamily: serif,
            fontSize: m ? 30 : "clamp(34px,4vw,52px)",
            fontWeight: 300,
            color: c.navy,
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          Frameworks &{" "}
          <em style={{ color: c.gold }}>Thinking</em>
        </h1>
        <p
          style={{
            fontFamily: sans,
            fontSize: m ? 14 : 17,
            fontWeight: 300,
            lineHeight: 1.75,
            color: c.mid,
            margin: 0,
          }}
        >
          Structured perspectives on cashflow, retirement, and financial
          decision-making for high-income professionals.
        </p>
      </div>

      {/* Article list */}
      <div
        style={{
          ...box,
          padding: m ? "24px 24px 56px" : "48px 80px 80px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {error && (
          <div
            style={{
              padding: 40,
              fontFamily: sans,
              color: "#b91c1c",
              textAlign: "center",
            }}
          >
            Failed to load articles: {error}
          </div>
        )}

        {!error && !index && (
          <div
            style={{
              padding: 80,
              fontFamily: sans,
              color: c.light,
              textAlign: "center",
              letterSpacing: "0.1em",
              fontSize: 13,
            }}
          >
            Loading…
          </div>
        )}

        {index?.articles.map((article) => (
          <ArticleCard key={article.slug} article={article} m={m} />
        ))}
      </div>

      <Footer m={m} />
    </div>
  )
}

/* ── Framer property controls ──────────────────────────── */

addPropertyControls(InsightsIndex, {
  url: {
    type: ControlType.String,
    title: "Index JSON URL",
    defaultValue:
      "https://raw.githubusercontent.com/Peter8531/campbellcashflow-cms/main/content/index.json",
  },
})

export const framerSizes = {
  defaultWidth: "100%",
  defaultHeight: "auto",
  isFixedHeight: false,
}
