import { useState } from "react";

/* === SKILL MAP DATEN ===================================== */

const SKILL_TREES = [
  // ... HIER deinen kompletten SKILL_TREES‑Block von oben einfügen ...
];

const statusConfig = {
  solid:   { label: "Solide",     dot: "#34C759" },
  wip:     { label: "In Arbeit",  dot: "#EF9F27" },
  open:    { label: "Noch offen", dot: null },
  unknown: { label: "Unklar",     dot: null }
};

/* === TRAININGS‑DATEN (PHASES) ============================ */

const PHASES = [
  // ... HIER dein kompletter PHASES‑Block (die neue Version) einfügen ...
];

const DAYS = ["Mo","Di","Mi","Do","Fr","Sa","So"];

/* === APP KOMPONENTE ====================================== */

export default function App() {
  const [activeTab, setActiveTab] = useState("training");   // NEU
  const [phase, setPhase] = useState(0);
  const [day, setDay] = useState(() => {
    const d = new Date().getDay();
    return d === 0 ? 6 : d - 1;
  });
  const [checked, setChecked] = useState({});
  const [openEx, setOpenEx] = useState(null);

  const cur = PHASES[phase].days[day];
  const accent = PHASES[phase].accent;
  const accentLight = PHASES[phase].light;
  const done = cur.exercises.filter((_, i) => checked[`${phase}-${day}-${i}`]).length;
  const total = cur.exercises.length;
  const pct = total > 0 ? (done / total) * 100 : 0;
  const ck = (k) => setChecked(p => ({ ...p, [k]: !p[k] }));

  return (
    <div
      style={{
        fontFamily: "-apple-system,'SF Pro Display',BlinkMacSystemFont,sans-serif",
        background: "#F2F2F7",
        minHeight: "100vh",
        maxWidth: "430px",
        margin: "0 auto",
        paddingBottom: "100px"
      }}
    >
      {/* HEADER + Phase + Wochentage */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #E5E5EA",
          position: "sticky",
          top: 0,
          zIndex: 100
        }}
      >
        <div
          style={{
            padding: "16px 20px 10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start"
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: accent,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: "4px"
              }}
            >
              Phase {PHASES[phase].num} · {PHASES[phase].weeks}
            </div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#1C1C1E",
                lineHeight: 1.2
              }}
            >
              {cur.session}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#8E8E93",
                marginTop: "2px"
              }}
            >
              {cur.focus}
            </div>
          </div>

          <div
            style={{
              textAlign: "center",
              background: accentLight,
              borderRadius: "14px",
              padding: "8px 14px",
              marginLeft: "12px"
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: accent,
                lineHeight: 1
              }}
            >
              {done}
            </div>
            <div
              style={{
                fontSize: "10px",
                color: accent,
                fontWeight: 600,
                marginTop: "1px"
              }}
            >
              / {total}
            </div>
          </div>
        </div>

        <div
          style={{
            height: "2px",
            background: "#E5E5EA",
            margin: "0 20px 10px"
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              background: accent,
              transition: "width 0.4s ease"
            }}
          />
        </div>

        <div style={{ display: "flex", padding: "0 16px 10px", gap: "8px" }}>
          {PHASES.map((p, i) => (
            <button
              key={i}
              onClick={() => {
                setPhase(i);
                setOpenEx(null);
              }}
              style={{
                padding: "5px 14px",
                borderRadius: "20px",
                border: "none",
                background: phase === i ? p.accent : "#F2F2F7",
                color: phase === i ? "#fff" : "#8E8E93",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.2s"
              }}
            >
              Phase {p.num}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", borderTop: "1px solid #F2F2F7" }}>
          {DAYS.map((tag, i) => {
            const d = PHASES[phase].days[i];
            const allDone =
              d.exercises.length > 0 &&
              d.exercises.every((_, j) => checked[`${phase}-${i}-${j}`]);
            const isToday = i === day;
            return (
              <button
                key={tag}
                onClick={() => {
                  setDay(i);
                  setOpenEx(null);
                }}
                style={{
                  flex: 1,
                  padding: "8px 4px 10px",
                  background: "transparent",
                  border: "none",
                  borderBottom: isToday
                    ? `2px solid ${accent}`
                    : "2px solid transparent",
                  color: isToday ? accent : allDone ? "#34C759" : "#8E8E93",
                  fontSize: "13px",
                  fontWeight: isToday ? 700 : 500,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "3px"
                }}
              >
                {tag}
                {allDone && (
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "#34C759",
                      display: "block"
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* App Tabs: Training / Skill Map */}
        <div
          style={{
            display: "flex",
            padding: "8px 16px 10px",
            gap: "8px",
            background: "#fff",
            borderTop: "1px solid #F2F2F7"
          }}
        >
          <button
            onClick={() => setActiveTab("training")}
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: "10px",
              border: "none",
              background: activeTab === "training" ? accent : "#F2F2F7",
              color: activeTab === "training" ? "#fff" : "#8E8E93",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit"
            }}
          >
            Training
          </button>
          <button
            onClick={() => setActiveTab("skillmap")}
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: "10px",
              border: "none",
              background: activeTab === "skillmap" ? accent : "#F2F2F7",
              color: activeTab === "skillmap" ? "#fff" : "#8E8E93",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit"
            }}
          >
            Skill Map
          </button>
        </div>
      </div>

      {/* TAB 1: TRAINING ==================================== */}
      {activeTab === "training" && (
        <>
          {cur.note && (
            <div
              style={{
                margin: "12px 16px 4px",
                padding: "11px 14px",
                background: "#fff",
                borderRadius: "14px",
                display: "flex",
                gap: "10px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
              }}
            >
              <span style={{ fontSize: "16px", flexShrink: 0 }}>💡</span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#3A3A3C",
                  lineHeight: 1.5
                }}
              >
                {cur.note}
              </span>
            </div>
          )}

          <div style={{ padding: "8px 16px 0" }}>
            {cur.exercises.map((ex, i) => {
              const k = `${phase}-${day}-${i}`;
              const isCk = !!checked[k];
              const isOpen = openEx === k;
              return (
                <div
                  key={i}
                  style={{
                    marginBottom: "8px",
                    background: "#fff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    opacity: isCk ? 0.65 : 1,
                    transition: "all 0.2s"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "13px 14px",
                      gap: "11px",
                      cursor: "pointer"
                    }}
                    onClick={() => setOpenEx(isOpen ? null : k)}
                  >
                    <div
                      onClick={e => {
                        e.stopPropagation();
                        ck(k);
                      }}
                      style={{
                        width: "26px",
                        height: "26px",
                        borderRadius: "50%",
                        border: isCk ? "none" : `2px solid ${accent}44`,
                        background: isCk ? accent : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      {isCk && (
                        <svg width="12" height="9" viewBox="0 0 12 9">
                          <path
                            d="M1 4.5L4.5 8L11 1"
                            stroke="#fff"
                            strokeWidth="2.2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span style={{ fontSize: "20px", flexShrink: 0 }}>
                      {ex.emoji}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          marginBottom: "2px"
                        }}
                      >
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: isCk ? "#8E8E93" : "#1C1C1E",
                            textDecoration: isCk ? "line-through" : "none"
                          }}
                        >
                          {ex.name}
                        </span>
                        {ex.priority && (
                          <span
                            style={{
                              fontSize: "9px",
                              fontWeight: 700,
                              color: "#FF3B30",
                              background: "#FFF0EE",
                              padding: "2px 6px",
                              borderRadius: "5px"
                            }}
                          >
                            KEY
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#8E8E93"
                        }}
                      >
                        {ex.short}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: "5px",
                        flexShrink: 0
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: accent,
                          background: accentLight,
                          padding: "3px 8px",
                          borderRadius: "7px",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {ex.sets}
                      </span>
                      <span
                        style={{
                          fontSize: "9px",
                          color: "#C7C7CC",
                          transform: isOpen ? "rotate(180deg)" : "none",
                          transition: "transform 0.2s"
                        }}
                      >
                        ▼
                      </span>
                    </div>
                  </div>
                  {isOpen && (
                    <div
                      style={{
                        borderTop: "1px solid #F2F2F7",
                        padding: "14px 16px"
                      }}
                    >
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#3A3A3C",
                          lineHeight: 1.65,
                          margin: "0 0 14px"
                        }}
                      >
                        {ex.desc}
                      </p>
                      <div style={{ marginBottom: "14px" }}>
                        <div
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            color: "#8E8E93",
                            textTransform: "uppercase",
                            letterSpacing: "0.8px",
                            marginBottom: "10px"
                          }}
                        >
                          Schritt für Schritt
                        </div>
                        {ex.steps.map((s, si) => (
                          <div
                            key={si}
                            style={{
                              display: "flex",
                              gap: "10px",
                              marginBottom: "7px",
                              alignItems: "flex-start"
                            }}
                          >
                            <span
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                background: accentLight,
                                color: accent,
                                fontSize: "11px",
                                fontWeight: 700,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                marginTop: "1px"
                              }}
                            >
                              {si + 1}
                            </span>
                            <span
                              style={{
                                fontSize: "13px",
                                color: "#1C1C1E",
                                lineHeight: 1.5,
                                paddingTop: "2px"
                              }}
                            >
                              {s}
                            </span>
                          </div>
                        ))}
                      </div>
                      <a
                        href={
                          "https://www.youtube.com/results?search_query=" +
                          encodeURIComponent(ex.watchQuery)
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "11px 14px",
                          background: "#FFF5F5",
                          borderRadius: "12px",
                          textDecoration: "none"
                        }}
                      >
                        <svg width="22" height="15" viewBox="0 0 22 15" fill="none">
                          <rect width="22" height="15" rx="3.5" fill="#FF0000" />
                          <path
                            d="M9 5L15 7.5L9 10V5Z"
                            fill="white"
                          />
                        </svg>
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#FF3B30"
                          }}
                        >
                          Auf YouTube ansehen
                        </span>
                        <span
                          style={{
                            fontSize: "13px",
                            color: "#FF9999",
                            marginLeft: "auto"
                          }}
                        >
                          →
                        </span>
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: "430px",
              background: "rgba(242,242,247,0.96)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid #E5E5EA",
              padding: "12px 16px 28px"
            }}
          >
            <button
              onClick={() => {
                const keys = cur.exercises.map((_, i) => `${phase}-${day}-${i}`);
                const allDone = keys.every(k => checked[k]);
                setChecked(prev => {
                  const n = { ...prev };
                  if (allDone) {
                    keys.forEach(k => delete n[k]);
                  } else {
                    keys.forEach(k => {
                      n[k] = true;
                    });
                  }
                  return n;
                });
              }}
              style={{
                width: "100%",
                padding: "14px",
                background: pct === 100 ? "#34C759" : accent,
                border: "none",
                borderRadius: "14px",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background 0.3s"
              }}
            >
              {pct === 100
                ? "✓  Training abgeschlossen!"
                : "Alle " + total + " Übungen markieren"}
            </button>
          </div>
        </>
      )}

      {/* TAB 2: SKILL MAP =================================== */}
      {activeTab === "skillmap" && (
        <div style={{ padding: "12px 16px 120px" }}>
          {SKILL_TREES.map(tree => (
            <div
              key={tree.id}
              style={{
                marginBottom: "12px",
                background: "#fff",
                borderRadius: "16px",
                padding: "14px 16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                borderLeft: `4px solid ${tree.color}`
              }}
            >
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1C1C1E",
                  marginBottom: "4px"
                }}
              >
                {tree.name}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#8E8E93",
                  marginBottom: "10px"
                }}
              >
                {tree.desc}
              </div>

              {tree.poses.map(pose => (
                <details
                  key={pose.name}
                  style={{
                    marginBottom: "8px",
                    padding: "10px 10px 8px",
                    borderRadius: "12px",
                    background: tree.light
                  }}
                >
                  <summary
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer"
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>{pose.emoji}</span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 600
                      }}
                    >
                      {pose.name}
                    </span>
                    {pose.priority && (
                      <span
                        style={{
                          fontSize: "9px",
                          fontWeight: 700,
                          color: "#FF3B30",
                          background: "#FFF0EE",
                          padding: "2px 6px",
                          borderRadius: "5px"
                        }}
                      >
                        KEY
                      </span>
                    )}
                    {pose.status && (
                      <span
                        style={{
                          marginLeft: "auto",
                          fontSize: "11px",
                          color: "#8E8E93",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px"
                        }}
                      >
                        {statusConfig[pose.status].dot && (
                          <span
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: statusConfig[pose.status].dot
                            }}
                          />
                        )}
                        {statusConfig[pose.status].label}
                      </span>
                    )}
                  </summary>

                  <div
                    style={{
                      marginTop: "8px",
                      fontSize: "13px",
                      color: "#3A3A3C"
                    }}
                  >
                    <p style={{ marginBottom: "6px" }}>{pose.why}</p>
                    <p style={{ marginBottom: "6px" }}>
                      <span style={{ fontWeight: 600 }}>Was diese Pose trainiert:</span>{" "}
                      {pose.why}
                    </p>
                    <p style={{ marginBottom: "6px" }}>
                      <span style={{ fontWeight: 600 }}>Was noch fehlt:</span>{" "}
                      {pose.missing}
                    </p>
                    <p style={{ marginBottom: "8px" }}>
                      <span style={{ fontWeight: 600 }}>Verbundene Skills:</span>{" "}
                      {pose.connects.join(", ")}
                    </p>

                    {pose.videos.map(v => (
                      <a
                        key={v.label}
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                          v.q
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "block",
                          fontSize: "12px",
                          color: tree.color,
                          textDecoration: "none",
                          marginBottom: "4px"
                        }}
                      >
                        ▶ {v.label}
                      </a>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
