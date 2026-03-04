// Campbell Cashflow – ArticleLayout
// Framer: Assets > Code > New File > paste > Save
// Pure presentational component – receives ArticleProps, renders the full article page.

import { useEffect, useState } from "react"

/* ── Types ─────────────────────────────────────────────── */

export type Step = { n: string; title: string; body: string }

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

function Disclaimer() {
  return (
    <div
      style={{
        ...box,
        background: "rgba(201,168,76,0.07)",
        borderLeft: `3px solid ${c.gold}`,
        padding: "14px 20px",
        marginBottom: 8,
      }}
    >
      <p
        style={{
          fontFamily: sans,
          fontSize: 12,
          color: c.mid,
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        <strong style={{ color: c.navy, fontWeight: 500 }}>
          General information only.
        </strong>{" "}
        The content on this page is educational and does not constitute personal
        financial advice. Campbell Cashflow is a cashflow coaching service.
        Before acting on any information here, please consult a qualified
        financial adviser. For personal financial advice tailored to your
        circumstances, contact Peter directly to discuss your options.
      </p>
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

function StepBlock({
  step,
  i,
  m,
}: {
  step: Step
  i: number
  m: boolean
}) {
  return (
    <div
      style={{
        ...box,
        display: "flex",
        gap: m ? 14 : 28,
        alignItems: "flex-start",
        padding: m ? "20px 24px" : "28px 32px",
        background: i % 2 === 0 ? c.white : c.cream,
        borderLeft: `3px solid ${c.gold}`,
        marginBottom: 4,
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 32,
          height: 32,
          border: `1px solid ${c.gold}`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <span
          style={{
            fontFamily: sans,
            fontSize: 10,
            fontWeight: 500,
            color: c.gold,
          }}
        >
          {step.n}
        </span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3
          style={{
            fontFamily: serif,
            fontSize: m ? 18 : 22,
            fontWeight: 500,
            color: c.navy,
            lineHeight: 1.2,
            marginBottom: 8,
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            fontFamily: sans,
            fontSize: m ? 13 : 15,
            fontWeight: 300,
            lineHeight: 1.8,
            color: c.mid,
            margin: 0,
          }}
        >
          {step.body}
        </p>
      </div>
    </div>
  )
}

/* ── ArticleLayout ─────────────────────────────────────── */

export default function ArticleLayout(props: ArticleProps) {
  useFonts()
  const width = useWindowWidth()
  const m = width <= 768

  const {
    topic,
    dateLabel,
    readTime,
    titleMain,
    titleEmphasis,
    summary,
    introParagraphs,
    introQuestions,
    steps,
    closingQuote,
    closingAttribution,
    closingParagraphs,
  } = props

  return (
    <div style={{ ...box, overflowX: "hidden", background: c.white }}>
      <Nav m={m} />

      {/* Breadcrumb */}
      <div
        style={{
          ...box,
          padding: m ? "12px 24px" : "16px 80px",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <span style={{ fontFamily: sans, fontSize: 12, color: c.light }}>
          <a
            href="/insights"
            style={{ color: c.light, textDecoration: "none" }}
          >
            Insights
          </a>
          {" / "}
          <span style={{ color: c.mid }}>
            {titleMain} {titleEmphasis ?? ""}
          </span>
        </span>
      </div>

      {/* Header */}
      <div
        style={{
          ...box,
          background: c.cream,
          padding: m ? "36px 24px 32px" : "72px 80px 60px",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
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
            {topic}
          </span>
          <Dot />
          <span
            style={{
              fontFamily: sans,
              fontSize: 10,
              color: c.light,
              letterSpacing: "0.08em",
            }}
          >
            {dateLabel}
          </span>
          <Dot />
          <span
            style={{
              fontFamily: sans,
              fontSize: 10,
              color: c.light,
              letterSpacing: "0.08em",
            }}
          >
            {readTime}
          </span>
        </div>
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
          {titleMain}
          {titleEmphasis && (
            <>
              <br />
              <em style={{ color: c.gold }}>{titleEmphasis}</em>
            </>
          )}
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
          {summary}
        </p>
      </div>

      {/* Disclaimer */}
      <div style={{ ...box, padding: m ? "16px 24px 0" : "24px 80px 0" }}>
        <Disclaimer />
      </div>

      {/* Intro */}
      <div style={{ ...box, padding: m ? "24px 24px 0" : "48px 80px 0" }}>
        {introParagraphs[0] && (
          <p
            style={{
              fontFamily: sans,
              fontSize: m ? 14 : 16,
              fontWeight: 300,
              lineHeight: 1.85,
              color: c.mid,
              marginBottom: 16,
            }}
          >
            {introParagraphs[0]}
          </p>
        )}

        {introQuestions.length > 0 && (
          <div
            style={{
              margin: "16px 0 24px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {introQuestions.map((q, i) => (
              <p
                key={i}
                style={{
                  fontFamily: serif,
                  fontSize: m ? 16 : 19,
                  fontStyle: "italic",
                  color: c.navy,
                  lineHeight: 1.4,
                  margin: 0,
                  paddingLeft: 16,
                  borderLeft: "2px solid rgba(201,168,76,0.3)",
                }}
              >
                {q}
              </p>
            ))}
          </div>
        )}

        {introParagraphs.slice(1).map((p, i) => (
          <p
            key={i}
            style={{
              fontFamily: sans,
              fontSize: m ? 14 : 16,
              fontWeight: 300,
              lineHeight: 1.85,
              color: c.mid,
              marginBottom: i < introParagraphs.length - 2 ? 16 : 0,
            }}
          >
            {p}
          </p>
        ))}
      </div>

      {/* Steps label */}
      <div style={{ ...box, padding: m ? "24px 24px 14px" : "32px 80px 16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: sans,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: c.gold,
          }}
        >
          <span
            style={{
              width: 24,
              height: 1,
              background: c.gold,
              display: "block",
              flexShrink: 0,
            }}
          />
          {steps.length > 0 &&
            `The ${["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"][steps.length - 1] ?? steps.length} Steps`}
        </div>
      </div>

      {/* Steps */}
      <div style={{ ...box }}>
        {steps.map((s, i) => (
          <StepBlock key={s.n} step={s} i={i} m={m} />
        ))}
      </div>

      {/* Closing quote */}
      <div style={{ ...box, padding: m ? "28px 24px 0" : "52px 80px 0" }}>
        <div
          style={{
            ...box,
            background: c.navy,
            padding: m ? "28px 24px" : 44,
            position: "relative",
            marginBottom: m ? 28 : 48,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: c.gold,
            }}
          />
          <p
            style={{
              fontFamily: serif,
              fontSize: m ? 17 : 22,
              fontWeight: 300,
              fontStyle: "italic",
              color: c.cream,
              lineHeight: 1.6,
              marginBottom: 16,
            }}
          >
            "{closingQuote}"
          </p>
          <p
            style={{
              fontFamily: sans,
              fontSize: 11,
              color: c.gold,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            {closingAttribution}
          </p>
        </div>

        {closingParagraphs.map((p, i) => (
          <p
            key={i}
            style={{
              fontFamily: sans,
              fontSize: m ? 13 : 15,
              fontWeight: 300,
              lineHeight: 1.85,
              color: c.mid,
              marginBottom: i < closingParagraphs.length - 1 ? 12 : 0,
            }}
          >
            {p}
          </p>
        ))}
      </div>

      {/* CTA */}
      <div
        style={{
          ...box,
          padding: m ? "24px 24px 56px" : "36px 80px 80px",
        }}
      >
        <div
          style={{
            ...box,
            display: "flex",
            flexDirection: m ? "column" : "row",
            gap: m ? 20 : 40,
            alignItems: m ? "stretch" : "center",
            background: c.cream,
            borderLeft: `3px solid ${c.gold}`,
            padding: m ? "24px 20px" : "28px 36px",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontFamily: sans,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: c.gold,
                marginBottom: 8,
              }}
            >
              Want to discuss your situation?
            </p>
            <p
              style={{
                fontFamily: serif,
                fontSize: m ? 20 : 22,
                color: c.navy,
                lineHeight: 1.3,
                marginBottom: 6,
              }}
            >
              Peter Campbell
            </p>
            <p
              style={{
                fontFamily: sans,
                fontSize: 13,
                color: c.mid,
                fontWeight: 300,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Platinum Rated on AdviserRatings with a 4.94 star rating across 27
              reviews. Licensed financial advice available independently of
              Campbell Cashflow.
            </p>
          </div>
          <a
            href="mailto:peter@campbellcashflow.com"
            style={{
              fontFamily: sans,
              fontSize: 13,
              fontWeight: 500,
              background: c.navy,
              color: c.cream,
              padding: "14px 28px",
              borderRadius: 2,
              textDecoration: "none",
              display: "block",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            Get in touch →
          </a>
        </div>
      </div>

      {/* Back */}
      <div
        style={{
          ...box,
          padding: m ? "0 24px 40px" : "0 80px 48px",
          borderTop: "1px solid rgba(201,168,76,0.1)",
          paddingTop: 24,
        }}
      >
        <a
          href="/insights"
          style={{
            fontFamily: sans,
            fontSize: 13,
            color: c.mid,
            textDecoration: "none",
          }}
        >
          ← Back to Insights
        </a>
      </div>

      <Footer m={m} />
    </div>
  )
}

/* ── Tiny helpers ──────────────────────────────────────── */

function Dot() {
  return (
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
  )
}
