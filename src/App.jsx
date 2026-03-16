import { useState, useEffect } from "react";

// ─── localStorage Hook ────────────────────────────────────────────────────────
function useLocalStorage(key, init) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; }
    catch { return init; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }, [key, val]);
  return [val, setVal];
}

// ─── CENTRAL POSE REGISTER ───────────────────────────────────────────────────
const POSES = {
  plank:                { id:"plank",                name:"Plank Hold",               sanskrit:"",                               emoji:"🏋️", tree:"arm-balance",  defaultStatus:"solid"   },
  chaturanga:           { id:"chaturanga",            name:"Chaturanga",               sanskrit:"Chaturanga Dandasana",           emoji:"⬇️", tree:"arm-balance",  defaultStatus:"solid"   },
  crow:                 { id:"crow",                  name:"Crow (Bakasana)",           sanskrit:"Bakasana",                       emoji:"🦅", tree:"arm-balance",  defaultStatus:"wip",    priority:true },
  side_crow:            { id:"side_crow",             name:"Side Crow",                 sanskrit:"Parsva Bakasana",                emoji:"🌀", tree:"arm-balance",  defaultStatus:"open"    },
  firefly:              { id:"firefly",               name:"Firefly",                   sanskrit:"Tittibhasana",                   emoji:"🔥", tree:"arm-balance",  defaultStatus:"open"    },
  grasshopper:          { id:"grasshopper",           name:"Grasshopper",               sanskrit:"Parsva Bhuja Dandasana",         emoji:"🦗", tree:"arm-balance",  defaultStatus:"open"    },
  down_dog:             { id:"down_dog",              name:"Down Dog",                  sanskrit:"Adho Mukha Svanasana",           emoji:"🐕", tree:"inversion",    defaultStatus:"solid"   },
  dolphin:              { id:"dolphin",               name:"Dolphin",                   sanskrit:"Ardha Pincha Mayurasana",        emoji:"🐬", tree:"inversion",    defaultStatus:"solid"   },
  headstand:            { id:"headstand",             name:"Headstand",                 sanskrit:"Sirsasana",                      emoji:"🙃", tree:"inversion",    defaultStatus:"unknown" },
  pincha:               { id:"pincha",                name:"Forearm Balance (Pincha)",  sanskrit:"Pincha Mayurasana",              emoji:"🤸", tree:"inversion",    defaultStatus:"open"    },
  handstand:            { id:"handstand",             name:"Handstand",                 sanskrit:"Adho Mukha Vrksasana",           emoji:"⬆️", tree:"inversion",    defaultStatus:"open"    },
  low_lunge:            { id:"low_lunge",             name:"Low Lunge",                 sanskrit:"Anjaneyasana Prep",              emoji:"🏹", tree:"hip-opener",   defaultStatus:"solid"   },
  lizard:               { id:"lizard",                name:"Lizard Pose",               sanskrit:"Utthan Pristhasana",             emoji:"🦎", tree:"hip-opener",   defaultStatus:"solid"   },
  pigeon:               { id:"pigeon",                name:"Pigeon Pose",               sanskrit:"Eka Pada Rajakapotasana Prep",   emoji:"🕊️", tree:"hip-opener",   defaultStatus:"wip"     },
  double_pigeon:        { id:"double_pigeon",         name:"Double Pigeon",             sanskrit:"Agnistambhasana",                emoji:"🔗", tree:"hip-opener",   defaultStatus:"wip",    priority:true },
  half_lotus:           { id:"half_lotus",            name:"Half Lotus",                sanskrit:"Ardha Padmasana",                emoji:"🪷", tree:"hip-opener",   defaultStatus:"wip"     },
  lotus:                { id:"lotus",                 name:"Lotus Pose",                sanskrit:"Padmasana",                      emoji:"🌸", tree:"hip-opener",   defaultStatus:"open"    },
  forward_fold:         { id:"forward_fold",          name:"Forward Fold",              sanskrit:"Uttanasana",                     emoji:"🙇", tree:"hamstrings",   defaultStatus:"solid"   },
  half_splits:          { id:"half_splits",           name:"Half Splits",               sanskrit:"Ardha Hanumanasana",             emoji:"📐", tree:"hamstrings",   defaultStatus:"wip"     },
  hanumanasana:         { id:"hanumanasana",          name:"Hanumanasana",              sanskrit:"Hanumanasana",                   emoji:"🤸", tree:"hamstrings",   defaultStatus:"open"    },
  boat:                 { id:"boat",                  name:"Boat Pose",                 sanskrit:"Navasana",                       emoji:"⛵", tree:"compression",  defaultStatus:"solid"   },
  tuck_hold:            { id:"tuck_hold",             name:"Tuck Hold",                 sanskrit:"",                               emoji:"⭐", tree:"compression",  defaultStatus:"wip"     },
  l_sit:                { id:"l_sit",                 name:"L-Sit",                     sanskrit:"",                               emoji:"💺", tree:"compression",  defaultStatus:"open",   priority:true },
  tolasana:             { id:"tolasana",              name:"Tolasana",                  sanskrit:"Tolasana",                       emoji:"⚖️", tree:"compression",  defaultStatus:"open"    },
  press_hs_prep:        { id:"press_hs_prep",         name:"Press Handstand Prep",      sanskrit:"",                               emoji:"🆙", tree:"compression",  defaultStatus:"open"    },
  standing_figure4:     { id:"standing_figure4",      name:"Standing Figure-4 Lean",    sanskrit:"",                               emoji:"4️⃣", tree:"integration",  defaultStatus:"wip"     },
  flying_pigeon:        { id:"flying_pigeon",         name:"Flying Pigeon",             sanskrit:"Eka Pada Galavasana",            emoji:"🕊️", tree:"integration",  defaultStatus:"open"    },
};

// ─── POSE DETAILS ────────────────────────────────────────────────────────────
const POSE_DETAILS = {
  plank:            { why:"Foundation für alle Arm Balances. Trainiert Schulterstabilität, Rumpfspannung und Handgelenk-Loading.", nextStep:"Solide. Scapula Push-ups als Steigerung.", connects:["chaturanga","crow"], videos:[{label:"Perfekte Plank Form",q:"perfect plank form tutorial"},{label:"Scapula Push-ups",q:"scapula pushup tutorial arm balance"}] },
  chaturanga:       { why:"Schulterstabilität unter Last. Trainiert die Drucklinie für Crow und alle Arm Balances.", nextStep:"Slow Negatives 4 Sek. als Standard halten.", connects:["plank","crow"], videos:[{label:"Chaturanga korrekt",q:"chaturanga tutorial alignment yoga"},{label:"Slow Chaturanga Negatives",q:"slow chaturanga negative tutorial"}] },
  crow:             { why:"Erste echte Arm Balance. Problem ist fast nie Kraft – sondern Schwerpunkt (Schultern nicht über Händen) und Compression (Hüftflexoren schwach).", nextStep:"Crow Lean Drill täglich: Schultern über Handgelenke. Tuck Hold: Compression aufbauen. Crow Hop: Gewicht weiter vor bis Zehen sich heben.", connects:["tuck_hold","side_crow","flying_pigeon"], videos:[{label:"Crow Lean Drill",q:"crow pose lean drill tutorial bakasana"},{label:"Crow Hop Tutorial",q:"crow pose hop first time tutorial"},{label:"Crow 20 Sek. halten",q:"crow pose hold 20 seconds tutorial"},{label:"Crow Fehler",q:"crow pose mistakes common bakasana"}] },
  side_crow:        { why:"Rotation und Balance. Beide Knie auf einen Arm, Rotation aus der Hüfte. Braucht stabilen Crow.", nextStep:"Crow 15 Sek. stabil, dann Single Arm Weight Shift üben.", connects:["crow","grasshopper"], videos:[{label:"Side Crow Tutorial",q:"side crow tutorial parsva bakasana"}] },
  firefly:          { why:"Arme unter Beine, Körper parallel zum Boden. Braucht Compression UND Hamstring-Länge gleichzeitig.", nextStep:"L-Sit 5 Sek. + Crow stabil + Half Splits tief + Forward Fold entspannt.", connects:["crow","l_sit","half_splits","forward_fold"], videos:[{label:"Firefly Approach",q:"firefly pose approach tittibhasana tutorial"},{label:"Firefly Progression",q:"tittibhasana beginner progression"}] },
  grasshopper:      { why:"Rotation, Compression und Balance kombiniert. Langfristiges Ziel.", nextStep:"Side Crow stabil + Deep Hip Rotation + L-Sit.", connects:["side_crow","l_sit","double_pigeon"], videos:[{label:"Grasshopper Tutorial",q:"grasshopper pose parsva bhuja dandasana"}] },
  down_dog:         { why:"Foundation für Inversionen. Trainiert Schulterflexion, aktive Scapula und Hamstring-Länge.", nextStep:"Solide. Aktives Drücken der Schultern halten.", connects:["dolphin","headstand","pincha"], videos:[{label:"Down Dog perfekt",q:"downward dog perfect alignment tutorial"}] },
  dolphin:          { why:"Unterarmstütze mit hoher Hüfte. Direkter Vorläufer für Headstand und Pincha. 45 Sek. = Headstand-Freigabe.", nextStep:"45 Sek. Hold als Freigabe für Headstand.", connects:["headstand","pincha"], videos:[{label:"Dolphin Hold",q:"dolphin pose headstand prep tutorial"},{label:"Dolphin Rocks",q:"dolphin rocks forearm balance"}] },
  headstand:        { why:"Erste echte Inversion. Gewicht liegt auf UNTERARMEN, nicht auf dem Kopf.", nextStep:"Dolphin 45 Sek. stabil. Dann: Kopf auf Matte, Hüfte hoch, Knie zur Brust.", connects:["dolphin","pincha"], videos:[{label:"Headstand Anfänger",q:"headstand tutorial beginners sirsasana"},{label:"Headstand Approach",q:"headstand approach step by step"}] },
  pincha:           { why:"Unterarme am Boden, Körper senkrecht. Braucht starke Schultern aus dem Headstand.", nextStep:"Headstand stabil. Dann Pincha gegen Wand – Schulterblätter zusammenziehen.", connects:["dolphin","headstand","handstand"], videos:[{label:"Pincha Tutorial",q:"pincha mayurasana forearm balance tutorial"},{label:"Pincha gegen Wand",q:"pincha mayurasana wall tutorial"}] },
  handstand:        { why:"Königsdisziplin. Braucht Schultern, Core, Balance, Handgelenke, Raumgefühl.", nextStep:"Wall Handstand 20 Sek. → Shoulder Taps → Kick-Ups → Freestanding.", connects:["pincha","press_hs_prep"], videos:[{label:"Wall Handstand",q:"wall handstand tutorial beginner"},{label:"Handstand Kick-Up",q:"handstand kick up controlled tutorial"},{label:"Freestanding Handstand",q:"freestanding handstand tutorial"}] },
  low_lunge:        { why:"Hüftbeuger-Dehnung. Foundation für alle Hüftöffner.", nextStep:"Solide. Aktives Drücken der Hüfte nach vorne.", connects:["lizard","half_splits"], videos:[{label:"Low Lunge korrekt",q:"low lunge hip flexor yoga tutorial"}] },
  lizard:           { why:"Tiefe Hüftöffnung. Unterarme auf Matte, Hüfte sinkt.", nextStep:"Solide. Unterarme vollständig auf den Boden.", connects:["pigeon","low_lunge"], videos:[{label:"Lizard Pose tief",q:"lizard pose deep hip yoga tutorial"}] },
  pigeon:           { why:"Tiefe Außenrotation der Hüfte. Bis 45° sauber – dann Kniekompensation. Rotation NIE aus dem Knie.", nextStep:"Block unter Gesäß. 2 Min./Seite passiv. Rotation kommt mit Wochen.", connects:["double_pigeon","standing_figure4","lizard"], videos:[{label:"Pigeon mit Block",q:"pigeon pose block modification knee safe"},{label:"Passive Pigeon 2 Min.",q:"pigeon pose passive 2 minutes hip opener"}] },
  double_pigeon:    { why:"Tiefste Außenrotation im Sitzen. Schlüssel für Lotus UND Flying Pigeon. Das Bein in Flying Pigeon liegt in exakt dieser Rotation.", nextStep:"3 Min./Seite, nicht forcieren. Block unter Gesäß wenn nötig. Knie Richtung Boden kommt mit Wochen.", connects:["pigeon","half_lotus","flying_pigeon"], videos:[{label:"Double Pigeon Tutorial",q:"double pigeon fire log pose tutorial"},{label:"Double Pigeon tiefer",q:"double pigeon deeper progression"}] },
  half_lotus:       { why:"Zwischenstufe zwischen Double Pigeon und Lotus. Prüft ob Rotation wirklich aus der Hüfte kommt.", nextStep:"Double Pigeon entspannt 3 Min. + Figure-4 ohne Knieschmerz. Fuß dorsalflektiert, nur aus Hüfte rotieren.", connects:["double_pigeon","lotus","tolasana"], videos:[{label:"Half Lotus sicher",q:"half lotus safe progression yoga"}] },
  lotus:            { why:"Volle Außenrotation beider Hüften. Langfristiges Ziel.", nextStep:"Half Lotus entspannt. Lotus Prep: aus Hüfte rotieren – NIE aus Knie drücken.", connects:["half_lotus"], videos:[{label:"Lotus Prep sicher",q:"lotus pose safe preparation tutorial"}] },
  forward_fold:     { why:"Foundation für Hamstring-Arbeit. Rücken gerade halten für echte Dehnung.", nextStep:"Solide.", connects:["half_splits","hanumanasana","firefly"], videos:[{label:"Forward Fold korrekt",q:"standing forward fold yoga correct alignment"}] },
  half_splits:      { why:"Direkter Vorläufer für Splits und Firefly. Vorderes Bein gestreckt, Fuß flexiert, Rücken gerade.", nextStep:"90 Sek./Seite. Fuß flexieren. Rücken gerade.", connects:["forward_fold","hanumanasana","firefly"], videos:[{label:"Half Splits Tutorial",q:"half splits yoga tutorial progression"}] },
  hanumanasana:     { why:"Volle Splits. Braucht Hamstring-Länge und Hüftbeuger-Flexibilität.", nextStep:"Half Splits 2 Min./Seite. Dann täglich Splits Approach mit Blöcken.", connects:["half_splits","low_lunge"], videos:[{label:"Splits Progression",q:"splits progression daily routine beginner"}] },
  boat:             { why:"Basis-Compression. Trainiert Hüftflexoren und Core zusammen.", nextStep:"Solide. Beine strecken als Steigerung.", connects:["tuck_hold","l_sit"], videos:[{label:"Boat Pose korrekt",q:"boat pose navasana tutorial alignment"}] },
  tuck_hold:        { why:"Hände neben Hüfte, Schultern nach unten, Knie maximal hoch. Direkteste Crow-Vorbereitung. Tuck Hold 8 Sek. = Crow hat stabile Basis.", nextStep:"Täglich: 5×5 Sek. mit Blöcken → 5×8 Sek. → One Leg Extended → L-Sit.", connects:["crow","l_sit","boat"], videos:[{label:"Tuck Hold Tutorial",q:"tuck hold l-sit progression tutorial"},{label:"Tuck Hold auf Blöcken",q:"tuck hold yoga blocks beginner"}] },
  l_sit:            { why:"Beide Beine parallel zum Boden, Arme gestreckt. Größter einzelner Hebel im System. Wenn L-Sit kommt: Crow stabiler, Firefly möglich, Jump Backs öffnen sich.", nextStep:"Tuck Hold 8 Sek. → One Leg Extended → beide Beine extended. Auch 1 Sek. zählt.", connects:["tuck_hold","tolasana","firefly","crow"], videos:[{label:"L-Sit Tutorial komplett",q:"l-sit tutorial progression beginner complete"},{label:"One Leg Extended",q:"one leg extended l-sit progression"},{label:"L-Sit auf Blöcken",q:"l-sit yoga blocks tutorial"}] },
  tolasana:         { why:"L-Sit in Lotus oder Schneidersitz. Verbindet Compression mit Hüftöffnung.", nextStep:"L-Sit 5 Sek. + Half Lotus oder tiefer Schneidersitz.", connects:["l_sit","half_lotus"], videos:[{label:"Tolasana Tutorial",q:"tolasana scale pose tutorial yoga"}] },
  press_hs_prep:    { why:"Aus dem Boden in den Handstand drücken ohne Schwung. Braucht maximale Compression.", nextStep:"L-Sit sicher + Handstand stabil. Langfristiges Ziel.", connects:["l_sit","handstand"], videos:[{label:"Press Handstand Prep",q:"press handstand preparation tutorial"}] },
  standing_figure4: { why:"Brücke zwischen Hip Opening und Flying Pigeon. Trainiert Hüftaußenrotation unter Last und Schwerpunktverlagerung nach vorne.", nextStep:"Figure-4 im Stand stabil halten, dann Hände auf Blöcke/Boden bringen und Gewicht kontrolliert nach vorne verlagern.", connects:["pigeon","double_pigeon","flying_pigeon"], videos:[{label:"Standing Figure-4 Lean",q:"standing figure 4 lean flying pigeon prep"},{label:"Figure-4 auf Blöcken",q:"figure 4 yoga blocks flying pigeon"}] },
  flying_pigeon:    { why:"Eka Pada Galavasana. Das Bein liegt in Figure-4 auf den Oberarmen – wie Crow, aber mit offener Hüfte. Integration aus Crow, Hip Rotation und Balance.", nextStep:"1. Crow 15 Sek. stabil. 2. Double Pigeon entspannt 3 Min. 3. Standing Figure-4 Lean kontrolliert.", connects:["crow","double_pigeon","standing_figure4"], videos:[{label:"Flying Pigeon Tutorial",q:"flying pigeon eka pada galavasana tutorial"},{label:"Standing Figure-4 Lean",q:"standing figure 4 lean flying pigeon prep"},{label:"Flying Pigeon Schritt für Schritt",q:"flying pigeon approach step by step"}] },
};

// ─── SKILL TREES ──────────────────────────────────────────────────────────────
const SKILL_TREES = [
  { id:"arm-balance",  name:"Arm Balance Tree",       color:"#1C3A5E", light:"#EEF3FA", desc:"Foundation für alle Arm Balances. Jede Pose baut auf Schulterstabilität, Schwerpunktkontrolle und Compression auf.", poseIds:["plank","chaturanga","crow","side_crow","firefly","grasshopper"] },
  { id:"inversion",    name:"Inversion Tree",          color:"#2D5A3D", light:"#EEF6F1", desc:"Von Down Dog zum Handstand. Jede Stufe baut Schulterkraft, Körperbewusstsein und Balance im Raum auf.",           poseIds:["down_dog","dolphin","headstand","pincha","handstand"] },
  { id:"hip-opener",   name:"Hip Opener Tree",         color:"#8B2500", light:"#FAEEE8", desc:"Tiefe Hüftrotation verbindet sich direkt mit Crow, Flying Pigeon und dem gesamten Compression-System.",           poseIds:["low_lunge","lizard","pigeon","double_pigeon","half_lotus","lotus"] },
  { id:"hamstrings",   name:"Hamstring / Split Tree",  color:"#6B3A8B", light:"#F4EEF8", desc:"Hamstring-Länge öffnet Firefly und ist Voraussetzung für Splits.",                                                  poseIds:["forward_fold","half_splits","hanumanasana"] },
  { id:"compression",  name:"Compression Tree ★",      color:"#1A1A2E", light:"#F0F0F8", desc:"Dein größter Hebel. Wenn Compression kommt: Crow stabiler, Firefly möglich, Jump Backs öffnen sich.",              poseIds:["boat","tuck_hold","l_sit","tolasana","press_hs_prep"] },
  { id:"integration",  name:"Integration",             color:"#5C3A1E", light:"#F6F0EA", desc:"Flying Pigeon bringt Crow, Hüftrotation und Balance zusammen.",                                                     poseIds:["standing_figure4","flying_pigeon"] },
];

// ─── MASTER POSES ─────────────────────────────────────────────────────────────
const MASTER_POSE_IDS = ["down_dog","dolphin","chaturanga","crow","l_sit","pigeon","half_lotus","flying_pigeon"];
const MASTER_DETAILS = {
  down_dog:      { focus:"Schulteröffnung, lange Wirbelsäule, aktive Rückseite",       biggestLimit:"Keine große Baustelle – Foundation ist solide",                readiness:["90 Sek. ohne Schulterermüdung","Schultern aktiv, nicht passiv","Fersen Richtung Boden"],                               bestDrills:["Shoulder Flexion Stretch","Scapula Push-ups","Dolphin Hold"], targetHold:90, unit:"sek", notes:"Foundation für den Inversion Tree." },
  dolphin:       { focus:"Schulterkraft, Core, Inversion Prep",                         biggestLimit:"45 Sek. Hold als Headstand-Freigabe",                          readiness:["45–60 Sek. stabil","Unterarme parallel","Druck im Core, nicht im Nacken"],                                         bestDrills:["Dolphin Hold","Dolphin Rocks","Forearm Plank"],               targetHold:60, unit:"sek", notes:"Direkte Vorbereitung für Headstand und Pincha." },
  chaturanga:    { focus:"Schulterstabilität, exzentrische Kontrolle, Drucklinie",      biggestLimit:"Keine große Baustelle – Slow Negatives als Qualitätscheck",     readiness:["5 Slow Negatives à 4 Sek.","Ellbogen eng am Körper","Schultern nicht unter Ellbogenlinie"],                         bestDrills:["Slow Chaturanga Negatives","Plank Hold","Scapula Push-ups"],  targetHold:5,  unit:"wdh", notes:"Qualitätscheck für alle Arm Balances." },
  crow:          { focus:"Schwerpunktkontrolle, Compression, erste echte Arm Balance",  biggestLimit:"Schwerpunkt + Compression – nicht Kraft",                       readiness:["Tuck Hold 8 Sek.","Chaturanga 5× sauber","Schultern aktiv über Hände bringen"],                                   bestDrills:["Crow Lean Drill","Crow Hop","Tuck Hold"],                     targetHold:20, unit:"sek", notes:"Hauptbaustelle. Problem ist fast nie Kraft." },
  l_sit:         { focus:"Compression, tiefe Hüftbeuger, untere Bauchlinie",            biggestLimit:"Größter Hebel im gesamten System",                              readiness:["Tuck Hold 8–10 Sek.","Hollow Body Hold 20–30 Sek.","Seated Pulses kontrolliert"],                                  bestDrills:["Tuck Hold","Seated Compression Pulses","One Leg Extended"],  targetHold:10, unit:"sek", notes:"Wenn L-Sit kommt, öffnen sich viele Dinge gleichzeitig." },
  pigeon:        { focus:"Hüftaußenrotation, Gesäßmobilität, kniesichere Öffnung",      biggestLimit:"Ab ca. 45° beginnt Kniekompensation",                           readiness:["Low Lunge tief","Lizard solide","2 Min. ohne Knieschmerz"],                                                      bestDrills:["90/90 Rotations","Elevated Pigeon","Passive Pigeon"],         targetHold:2,  unit:"min", notes:"Rotation immer aus der Hüfte, nie aus dem Knie." },
  half_lotus:    { focus:"Tiefe Hüftaußenrotation, Lotus-Zwischenstufe",                biggestLimit:"Knie bleibt hoch – Außenrotation reicht noch nicht",            readiness:["Double Pigeon 2–3 Min. entspannt","Figure-4 ohne Knieschmerz","Fuß dorsalflektiert halten"],                       bestDrills:["Double Pigeon","Figure-4 Stretch","90/90 Active Rotation"],   targetHold:60, unit:"sek", notes:"Wichtige Zwischenstufe vor vollem Lotus." },
  flying_pigeon: { focus:"Crow + Hip Rotation + Schwerpunkt auf die Hände",             biggestLimit:"Gewicht kommt noch nicht voll auf die Hände",                   readiness:["Crow 10–15 Sek. stabil","Double Pigeon 3 Min. entspannt","Standing Figure-4 Lean kontrolliert"],               bestDrills:["Standing Figure-4 Lean","Figure-4 auf Blöcken","Crow Lean Drill"], targetHold:5, unit:"sek", notes:"Langfristiges Integrationsziel." },
};

// ─── DIAGNOSTIC TESTS ─────────────────────────────────────────────────────────
const DIAGNOSTIC_TESTS = [
  { id:"hip_compression",       name:"Hip Compression",          short:"Knie aktiv zur Brust",             unit:"cm",      emoji:"🦵",
    description:"Sitz auf dem Boden, Beine gestreckt. Ziehe beide Knie so hoch wie möglich aktiv zur Brust – ohne Arme. Miss die Distanz zwischen Knie und Brust.",
    benchmarks:{excellent:"0–5 cm",good:"5–15 cm",medium:"15–25 cm",foundation:">25 cm"},
    interpretation:{excellent:"Crow und Firefly grundsätzlich bereit.",good:"Crow machbar, Firefly in Arbeit.",medium:"Compression-Training nötig.",foundation:"Hip Flexor Aktivierung priorisieren."} },
  { id:"hip_external_rotation",  name:"Hip External Rotation",    short:"Knie auf Hüfthöhe nach außen",    unit:"Grad",    emoji:"↩️",
    description:"Stehe auf einem Bein. Hebe das andere Knie auf Hüfthöhe und öffne es aktiv nach außen. Miss den Winkel der Außenrotation.",
    benchmarks:{excellent:">80°",good:"45–80°",medium:"20–45°",foundation:"<20°"},
    interpretation:{excellent:"Pigeon und Lotus-Progression möglich.",good:"Hüftarbeit zeigt Wirkung.",medium:"External Rotation Strengthening nötig.",foundation:"Piriformis und Glute Med aktivieren."} },
  { id:"ankle_dorsiflexion",     name:"Ankle Dorsiflexion",        short:"Knie zur Wand ohne Ferse heben",  unit:"cm Rest", emoji:"🦶",
    description:"Fuß 12 cm vor der Wand. Knie zur Wand bringen ohne Ferse abzuheben. Miss die verbleibende Distanz.",
    benchmarks:{excellent:"0 cm",good:"<2 cm",medium:"2–5 cm",foundation:">5 cm"},
    interpretation:{excellent:"Tiefe Bodenposen uneingeschränkt.",good:"Kleines Defizit, nicht limitierend.",medium:"Ankle Mobility Training beginnen.",foundation:"Beeinflusst alle bodentiefen Posen."} },
  { id:"shoulder_flexion",       name:"Shoulder Flexion",          short:"Arme an Wand ohne Hohlkreuz",     unit:"cm",      emoji:"🙆",
    description:"Rücken an der Wand. Arme gestreckt nach oben – Wand berühren ohne Hohlkreuz. Miss den Abstand der Hände zur Wand.",
    benchmarks:{excellent:"0 cm",good:"5–10 cm",medium:"10–20 cm",foundation:">20 cm"},
    interpretation:{excellent:"Handstand-Progression möglich.",good:"Schulter-Mobility-Work zahlt sich aus.",medium:"Latissimus und Trizeps mobilisieren.",foundation:"Shoulder Mobility als Priorität."} },
  { id:"hamstring_slr",          name:"Hamstring Length (SLR)",    short:"Gestrecktes Bein heben",          unit:"Grad",    emoji:"📐",
    description:"Rückenlage. Gestrecktes Bein ohne Schwung nach oben heben. Miss den Winkel zwischen Bein und Boden.",
    benchmarks:{excellent:"≥90°",good:"70–90°",medium:"50–70°",foundation:"<50°"},
    interpretation:{excellent:"Splits und Firefly grundsätzlich möglich.",good:"Forward Folds gut, Splits in Arbeit.",medium:"Hamstring-Arbeit als Daily Routine.",foundation:"Mehrmals täglich kurze Einheiten."} },
];

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────────
function getPose(id)      { return POSES[id] || null; }
function getDetail(id)    { return POSE_DETAILS[id] || {}; }
function getFullPose(id)  { const p = getPose(id); if (!p) return null; return { ...p, ...getDetail(id) }; }
function getPoseStatus(id, progress) { return progress?.poseStatus?.[id] || POSES[id]?.defaultStatus || "open"; }
function getTreePoses(tree) { return (tree.poseIds || []).map(getFullPose).filter(Boolean); }
function findTreeForPose(poseId) { return SKILL_TREES.find(t => t.poseIds?.includes(poseId)) || null; }

// ─── STATUS CONFIG ─────────────────────────────────────────────────────────────
const STATUS = {
  solid:   { label:"Solide",     dot:"#34C759", bg:"#EAF3DE", border:"#3B6D11" },
  wip:     { label:"In Arbeit",  dot:"#EF9F27", bg:"#FAEEDA", border:"#BA7517" },
  open:    { label:"Noch offen", dot:null,       bg:"#F2F2F7", border:"#C7C7CC" },
  unknown: { label:"Unklar",     dot:null,       bg:"#F2F2F7", border:"#C7C7CC" },
};

// ─── DEFAULT PROGRESS ──────────────────────────────────────────────────────────
const DEFAULT_PROGRESS = {
  checked: {},
  poseStatus: { down_dog:"solid", dolphin:"solid", chaturanga:"solid", crow:"wip", l_sit:"open", pigeon:"wip", half_lotus:"wip", flying_pigeon:"open" },
  poseProgress: {
    crow:          { bestHold:"", notes:"", pain:false },
    l_sit:         { bestHold:"", notes:"", pain:false },
    dolphin:       { bestHold:"", notes:"", pain:false },
    half_lotus:    { bestHold:"", notes:"", pain:false },
    flying_pigeon: { bestHold:"", notes:"", pain:false },
  },
  diagnostics: {
    hip_compression:      { start:"", week6:"", week12:"" },
    hip_external_rotation:{ start:"", week6:"", week12:"" },
    ankle_dorsiflexion:   { start:"", week6:"", week12:"" },
    shoulder_flexion:     { start:"", week6:"", week12:"" },
    hamstring_slr:        { start:"", week6:"", week12:"" },
  },
};

// ─── BENCHMARK LOGIC ──────────────────────────────────────────────────────────
const BM_COLORS = { excellent:{bg:"#EAF3DE",color:"#27500A",label:"Exzellent"}, good:{bg:"#EEF3FA",color:"#0C447C",label:"Gut"}, medium:{bg:"#FAEEDA",color:"#633806",label:"Mittel"}, foundation:{bg:"#FCEBEB",color:"#791F1F",label:"Foundation"} };
function getBenchmark(testId, value) {
  const v = parseFloat(value); if (isNaN(v)) return null;
  if (testId==="hip_compression")       { if(v<=5)return"excellent"; if(v<=15)return"good"; if(v<=25)return"medium"; return"foundation"; }
  if (testId==="hip_external_rotation") { if(v>=80)return"excellent"; if(v>=45)return"good"; if(v>=20)return"medium"; return"foundation"; }
  if (testId==="ankle_dorsiflexion")    { if(v===0)return"excellent"; if(v<=2)return"good"; if(v<=5)return"medium"; return"foundation"; }
  if (testId==="shoulder_flexion")      { if(v===0)return"excellent"; if(v<=10)return"good"; if(v<=20)return"medium"; return"foundation"; }
  if (testId==="hamstring_slr")         { if(v>=90)return"excellent"; if(v>=70)return"good"; if(v>=50)return"medium"; return"foundation"; }
  return null;
}

// ─── TRAINING DATA ─────────────────────────────────────────────────────────────
const PHASES = [
  { num:1, title:"Foundation", weeks:"Woche 1-4", accent:"#1C3A5E", light:"#EEF3FA", days:[
    { tag:"Mo", session:"MCI Strength + Shoulder", focus:"Push - Schulter - Wrist Prep", note:"Wrist Prep IMMER vor Arm-Training.", exercises:[
      { name:"Wrist Circles", sets:"5 Min.", p:false, e:"🤲", s:"Voller ROM, beide Richtungen", d:"Kreise 10x innen/außen. Handflächen flach, Gewicht nach vorne, 5 Sek.", st:["Circles 10x innen, 10x außen","Handflächen flach auf Boden","Gewicht nach vorne 5 Sek.","Finger spreizen"], q:"wrist warmup yoga beginner" },
      { name:"Scapula Push-ups", sets:"3x10", p:true, e:"💪", s:"Schulterblätter aktiv im Plank", d:"Plank, Arme gestreckt. Schulterblätter zusammenziehen dann weit auseinanderschieben.", st:["Plank, Arme gestreckt","Schulterblätter zusammenziehen","Dann weit auseinanderschieben","10 Wdh."], q:"scapula pushup tutorial", relatedPoseIds:["plank","chaturanga"] },
      { name:"Slow Chaturanga Neg.", sets:"3x5", p:true, e:"⬇️", s:"4 Sek. langsam absenken", d:"Hohe Plank. Ellbogen eng, 4 Sek. absenken bis Oberarme parallel.", st:["Hohe Plank","Ellbogen eng an Körper","4 Sek. absenken","Oberarme parallel"], q:"chaturanga tutorial slow negative", relatedPoseIds:["chaturanga","crow"] },
      { name:"Plank Hold", sets:"3x45 Sek.", p:false, e:"🏋️", s:"Schulter-Hüfte-Fersen Linie", d:"Handgelenke unter Schultern. Rippen schließen. Kein Hohlkreuz.", st:["Hände schulterbreit","Rippen schließen","Linie halten","45 Sek."], q:"perfect plank form", relatedPoseIds:["plank"] },
      { name:"MCI Haupttraining", sets:"~40 Min.", p:false, e:"💪", s:"Push Pattern nach Plan", d:"Push-Tag: Brust, Schultern, Trizeps.", st:["Push Pattern","Qualität vor Gewicht"], q:"push day workout" },
      { name:"Shoulder Flexion Stretch", sets:"3x45 Sek.", p:false, e:"🙆", s:"Hände auf Block, Brust sinkt", d:"Hände auf Block. Schritt zurück. Brust passiv sinken.", st:["Hände auf Block","Schritt zurück","Brust sinken","45 Sek."], q:"shoulder flexion stretch block" },
    ]},
    { tag:"Di", session:"Yoga - Crow + Compression", focus:"Crow Approach - Core Compression", note:"KEY-Übungen nicht überspringen.", exercises:[
      { name:"Wrist Prep", sets:"5 Min.", p:false, e:"🤲", s:"Circles, Extensions, Loading", d:"Vollständiges Handgelenk-Warm-up.", st:["Circles 10x innen + außen","Handrücken auf Boden","Loading: Gewicht nach vorne","Finger strecken"], q:"wrist warmup arm balance yoga" },
      { name:"Hollow Body Hold", sets:"3x20 Sek.", p:false, e:"🍌", s:"LWS flach, Beine 30 cm hoch", d:"LWS in Boden drücken. Beine 30 cm heben. Arme über Kopf.", st:["Rückenlage, LWS in Boden","Beine gestreckt 30 cm","Arme über Kopf","LWS-Kontakt halten"], q:"hollow body hold gymnastics" },
      { name:"Seated Compression Pulse", sets:"90 Sek.", p:false, e:"🧘", s:"Knie zur Brust, 2 Sek.", d:"Sitzen, Beine gestreckt. Knie aktiv zur Brust, 2 Sek. Rhythmisch.", st:["Sitzen, Beine gestreckt","Knie aktiv zur Brust","2 Sek. halten","90 Sek. rhythmisch"], q:"hip flexor compression drill", relatedPoseIds:["tuck_hold","l_sit"] },
      { name:"Tuck Hold", sets:"5x5 Sek.", p:true, e:"⭐", s:"Schultern drücken, Knie maximal hoch", d:"Hände neben Hüften. Schultern nach unten. Knie maximal hoch, 5 Sek.", st:["Hände neben Hüften","Schultern nach unten","Knie maximal hoch","5 Sek. kein Boden"], q:"tuck hold l-sit progression", relatedPoseIds:["tuck_hold","crow","l_sit"] },
      { name:"Crow Lean Drill", sets:"5x10 Sek.", p:true, e:"🦅", s:"Schultern über Hände - Zehen am Boden", d:"Tiefe Hocke. Knie außen an Oberarme. Schultern über Handgelenke. Zehen am Boden.", st:["Tiefe Hocke","Knie außen an Oberarme","Schultern über Hände","10 Sek., Zehen am Boden"], q:"crow pose lean drill bakasana", relatedPoseIds:["crow","flying_pigeon"] },
      { name:"Crow Hop", sets:"5x3 Sek.", p:true, e:"🐦", s:"Zehen heben sich - 1-2 Sek.", d:"Aus Crow Lean: Gewicht weiter bis Zehen sich heben. Nicht springen.", st:["Aus Crow Lean","Gewicht weiter vorne","Zehen heben sich","1-2 Sek., landen"], q:"crow pose first time tutorial", relatedPoseIds:["crow"] },
      { name:"Passive Pigeon", sets:"2 Min./Seite", p:false, e:"🕊️", s:"Stirn auf Matte, entspannen", d:"Pigeon, Stirn auf Matte. Kein Kämpfen.", st:["Pigeon-Position","Oberkörper nach vorne","Stirn auf Matte","2 Min. entspannen"], q:"pigeon pose tutorial hips", relatedPoseIds:["pigeon","double_pigeon"] },
    ]},
    { tag:"Mi", session:"Les Mills + Finisher", focus:"Kraft - L-Sit Finisher", note:"Finisher direkt nach Klasse.", exercises:[
      { name:"Les Mills / Barre", sets:"45-60 Min.", p:false, e:"🎵", s:"Volle Intensität", d:"Reguläre Klasse.", st:["Kursplan folgen"], q:"les mills bodycombat" },
      { name:"Tuck Hold auf Blöcken", sets:"4x5 Sek.", p:true, e:"📦", s:"Blöcke geben Höhe", d:"Zwei Blöcke. Schultern nach unten. Gesäß abheben.", st:["Blöcke mittlere Höhe","Hände auf Blöcke","Schultern nach unten","Gesäß abheben 5 Sek."], q:"tuck hold yoga blocks", relatedPoseIds:["tuck_hold","l_sit"] },
      { name:"Hip Flexor Isolation", sets:"3x12 Sek./Seite", p:false, e:"🦵", s:"Knie hoch, Hand dagegen", d:"Auf einem Bein. Knie hoch. Hand gegen Knie isometrisch.", st:["Auf einem Bein","Knie maximal hoch","Hand gegen Knie","12 Sek."], q:"hip flexor isometric standing", relatedPoseIds:["tuck_hold","crow"] },
    ]},
    { tag:"Do", session:"Mobility - Hüfte", focus:"Hüftöffnung - Pigeon - Splits", note:"Rotation IMMER aus der Hüfte, nie aus dem Knie.", exercises:[
      { name:"90/90 Rotations", sets:"2 Min.", p:false, e:"↩️", s:"Hüfte aktiv rotieren", d:"90/90. Oberkörper über Vorderbein, dann Hinterbein.", st:["90/90-Position","Über Vorderbein","Dann Hinterbein","2-3 Sek."], q:"90 90 hip stretch tutorial", relatedPoseIds:["pigeon","double_pigeon"] },
      { name:"Low Lunge", sets:"90 Sek./Seite", p:false, e:"🏹", s:"Hüfte nach vorne-unten", d:"Hinteres Knie am Boden. Hüfte nach vorne-unten.", st:["Hinteres Knie am Boden","Hüfte nach vorne-unten","Rücken lang","90 Sek."], q:"low lunge hip flexor yoga", relatedPoseIds:["low_lunge","pigeon"] },
      { name:"Elevated Pigeon", sets:"2 Min./Seite", p:true, e:"🧱", s:"Block unter Gesäß", d:"Block unter Gesäß reduziert Knie-Stress.", st:["Pigeon-Position","Block unter Gesäß","Oberkörper nach vorne","2 Min."], q:"pigeon pose block knee safe", relatedPoseIds:["pigeon","double_pigeon"] },
      { name:"Adductor Rockbacks", sets:"2 Min.", p:false, e:"🔀", s:"Frosch, vor/zurück", d:"Knie weit auseinander. Nach hinten rocken und zurück.", st:["Knie weit auseinander","Hände vor dir","Nach hinten rocken","2 Min."], q:"adductor frog rockback" },
      { name:"Half Splits", sets:"90 Sek./Seite", p:false, e:"📐", s:"Fuß flexiert, Rücken gerade", d:"Vorderes Bein strecken. Fuß flexiert.", st:["Vorderes Bein strecken","Fuß flexieren","Rücken gerade","90 Sek."], q:"half splits yoga", relatedPoseIds:["half_splits","hanumanasana"] },
      { name:"Double Pigeon", sets:"2 Min./Seite", p:true, e:"🔗", s:"Schienbein über Schienbein", d:"Schienbein auf Schienbein. Knie Richtung Boden.", st:["Unteres Bein parallel","Oberes Schienbein drauf","Knie Richtung Boden","2 Min."], q:"double pigeon fire log pose", relatedPoseIds:["double_pigeon","half_lotus","flying_pigeon"] },
    ]},
    { tag:"Fr", session:"MCI + Inversion Prep", focus:"Pull - Inversion Vorbereitung", note:"Inversion Prep nach MCI.", exercises:[
      { name:"Wrist Prep", sets:"5 Min.", p:false, e:"🤲", s:"Vollständig", d:"Circles, Extensions, Loading.", st:["Circles","Extensions","Loading"], q:"wrist warmup" },
      { name:"MCI Haupttraining", sets:"~40 Min.", p:false, e:"🏋️", s:"Pull Pattern", d:"Pull-Tag.", st:["Pull Pattern"], q:"pull day workout" },
      { name:"Dolphin Hold", sets:"3x30 Sek.", p:true, e:"🐬", s:"Unterarme parallel, Schultern aktiv", d:"Unterarme parallel. Hüfte hoch. Schulterblätter zusammen.", st:["Unterarme parallel","Hüfte hoch","Schulterblätter zusammen","30 Sek."], q:"dolphin pose headstand prep", relatedPoseIds:["dolphin","headstand"] },
      { name:"Dolphin Rocks", sets:"3x8", p:false, e:"🌊", s:"Vor/zurück aus Dolphin", d:"Aus Dolphin vor und zurück.", st:["Dolphin","Nach vorne","Zurück","8 Wdh."], q:"dolphin rocks forearm balance", relatedPoseIds:["dolphin","pincha"] },
      { name:"Forearm Plank", sets:"3x40 Sek.", p:false, e:"📏", s:"Körperlinie auf Unterarmen", d:"Unterarme. Körperlinie. Core aktiv.", st:["Unterarme","Körperlinie","Core aktiv","40 Sek."], q:"forearm plank core" },
    ]},
    { tag:"Sa", session:"Yoga - Full Practice", focus:"Crow + Compression", note:"Samstag = Hauptsession.", exercises:[
      { name:"Vollständiges Warm-Up", sets:"10 Min.", p:false, e:"🌅", s:"Wrist + Mobilisation + Core", d:"3 Min. Wrist + 2 Min. Cat-Cow + 2 Min. Shoulders + 3 Min. Core.", st:["3 Min. Wrist","2 Min. Cat-Cow","2 Min. Shoulders","3 Min. Core"], q:"yoga warmup full" },
      { name:"Compression Routine", sets:"8 Min.", p:true, e:"⭐", s:"Tuck 5x5 + Hollow + Pulses", d:"Pulses 90 Sek. → Tuck 5x5 → Hollow 3x20.", st:["Pulses 90 Sek.","Tuck 5x5 Sek.","Hollow 3x20 Sek."], q:"core compression crow routine", relatedPoseIds:["tuck_hold","l_sit","crow"] },
      { name:"Crow Skill-Arbeit", sets:"15 Min.", p:true, e:"🦅", s:"Lean → Hop → Holds", d:"5 Min. Lean → 5 Min. Hops → 5 Min. Holds. 60 Sek. Pause.", st:["5 Min. Lean","5 Min. Hops","5 Min. Holds","60 Sek. Pause"], q:"crow pose progression tutorial", relatedPoseIds:["crow"] },
      { name:"Hüftöffner-Serie", sets:"15 Min.", p:false, e:"🕊️", s:"Lizard → Pigeon → Double Pigeon", d:"Lizard 90 Sek. → Pigeon 2 Min. → Double Pigeon 2 Min.", st:["Lizard 90 Sek./Seite","Pigeon 2 Min./Seite","Double Pigeon 2 Min./Seite"], q:"hip opening yoga sequence", relatedPoseIds:["pigeon","double_pigeon"] },
      { name:"Cool-Down", sets:"10 Min.", p:false, e:"🌙", s:"Yin, Savasana", d:"Yin + Savasana.", st:["Yin 7 Min.","Savasana 3 Min."], q:"yoga cooldown yin" },
    ]},
    { tag:"So", session:"Active Recovery", focus:"Regeneration", note:"Kein Druck. Yin oder Pause.", exercises:[
      { name:"Yin Yoga oder Pause", sets:"30-45 Min.", p:false, e:"😴", s:"Lange Haltungen oder Pause", d:"Pigeon 4 Min./Seite, Butterfly, Child's Pose, Savasana.", st:["Pigeon 4 Min./Seite","Butterfly 4 Min.","Child's Pose","Savasana"], q:"yin yoga full class" },
      { name:"Compression Check", sets:"2 Min.", p:false, e:"📊", s:"Optional: 3x Tuck Hold 5 Sek.", d:"Nur spüren.", st:["3x Tuck Hold 5 Sek."], q:"tuck hold" },
    ]},
  ]},
  { num:2, title:"Skill Building", weeks:"Woche 5-8", accent:"#2D5A3D", light:"#EEF6F1", days:[
    { tag:"Mo", session:"MCI + Handstand", focus:"Push - Handstand Conditioning", note:"Handstand nach MCI.", exercises:[
      { name:"Wrist Prep + Loading", sets:"8 Min.", p:false, e:"🤲", s:"Vollständig + Loading", d:"Loading 5x5 Sek.", st:["Circles, Extensions","Loading 5x5"], q:"wrist loading handstand" },
      { name:"MCI Haupttraining", sets:"~40 Min.", p:false, e:"🏋️", s:"Push Pattern", d:"Push-Tag.", st:["Push Pattern"], q:"push workout" },
      { name:"Wall Handstand Hold", sets:"5x20 Sek.", p:true, e:"🤸", s:"Bauch-zur-Wand, dann rückwärts", d:"3x Bauch-zur-Wand. 2x Rückwärts.", st:["3x Bauch-zur-Wand","2x Rückwärts","Schultern drücken","20 Sek."], q:"wall handstand tutorial", relatedPoseIds:["handstand"] },
      { name:"Shoulder Tap Handstand", sets:"3x5 Taps", p:true, e:"👋", s:"Hand abheben", d:"Wall Handstand. Hand 2 cm abheben, 2-3 Sek.", st:["Wall Handstand","Hand 2 cm heben","2-3 Sek.","Wechseln"], q:"handstand shoulder tap", relatedPoseIds:["handstand"] },
    ]},
    { tag:"Di", session:"Yoga - Crow + L-Sit", focus:"Crow 10 Sek. - L-Sit Progression", note:"Crow-Ziel: 10 Sek.", exercises:[
      { name:"Wrist Prep", sets:"5 Min.", p:false, e:"🤲", s:"Vollständig", d:"Circles, Extensions, Loading.", st:["Vollständig"], q:"wrist warmup" },
      { name:"Compression Routine", sets:"8 Min.", p:true, e:"⭐", s:"Tuck 5x8 + One Leg Extended", d:"Pulses + Tuck 5x8 + One Leg Extended 4x5.", st:["Pulses 90 Sek.","Tuck 5x8 Sek.","One Leg Extended"], q:"l-sit one leg extended", relatedPoseIds:["tuck_hold","l_sit"] },
      { name:"Crow Hold", sets:"6x max.", p:true, e:"🦅", s:"Ziel: 10 Sek.", d:"Crow Hold. Ziel 10 Sek. 60 Sek. Pause.", st:["Crow","Max. Hold","60 Sek. Pause"], q:"crow pose 10 seconds", relatedPoseIds:["crow"] },
      { name:"Passive Pigeon", sets:"2 Min./Seite", p:false, e:"🕊️", s:"Entspannen", d:"2 Min./Seite.", st:["Pigeon","2 Min."], q:"pigeon pose", relatedPoseIds:["pigeon"] },
    ]},
    { tag:"Mi", session:"Les Mills + L-Sit", focus:"Kraft - L-Sit Steigerung", note:"Ein Bein extended wenn Tuck 8 Sek. sitzt.", exercises:[
      { name:"Les Mills / Barre", sets:"45-60 Min.", p:false, e:"🎵", s:"Volle Intensität", d:"Reguläre Klasse.", st:["Kursplan"], q:"les mills" },
      { name:"One Leg Extended", sets:"4x5 Sek.", p:true, e:"🦵", s:"Ein Bein strecken", d:"Aus Tuck: ein Bein strecken, anderes Knie hoch.", st:["Tuck Hold","Ein Bein strecken","Anderes Knie hoch","5 Sek."], q:"one leg extended l-sit", relatedPoseIds:["l_sit"] },
      { name:"Crow Pulse", sets:"3x10", p:false, e:"🔄", s:"Hüfte 2-3 cm heben/senken", d:"Crow. Hüfte rhythmisch. Zehen am Boden.", st:["Crow","Zehen am Boden","Hüfte 2-3 cm","10 Wdh."], q:"crow pulse drill", relatedPoseIds:["crow"] },
    ]},
    { tag:"Do", session:"Mobility + Headstand", focus:"Hüfte tiefer - Headstand", note:"Headstand nur wenn Dolphin 45 Sek. stabil!", exercises:[
      { name:"Double Pigeon", sets:"3 Min./Seite", p:true, e:"🔗", s:"3 Min. tiefer", d:"3 Min./Seite.", st:["Schienbein über Schienbein","3 Min."], q:"double pigeon deeper", relatedPoseIds:["double_pigeon","half_lotus"] },
      { name:"Dolphin Hold", sets:"3x45 Sek.", p:false, e:"🐬", s:"45 Sek. - Headstand Basis", d:"45 Sek.", st:["Unterarme","Hüfte hoch","45 Sek."], q:"dolphin hold", relatedPoseIds:["dolphin","headstand"] },
      { name:"Headstand Approach", sets:"5x5 Sek.", p:true, e:"🙃", s:"Kopf auf Matte, Knie zur Brust", d:"Dolphin → Kopf auf Matte → Knie zur Brust. Gewicht auf UNTERARMEN.", st:["Dolphin","Kopf auf Matte","Hüfte hoch","Knie zur Brust 5 Sek."], q:"headstand tutorial beginners", relatedPoseIds:["headstand"] },
    ]},
    { tag:"Fr", session:"MCI + Pincha Approach", focus:"Pull - Forearm Balance", note:"Pincha erst wenn Headstand stabil.", exercises:[
      { name:"Wrist Prep", sets:"5 Min.", p:false, e:"🤲", s:"Vollständig", d:"Vollständig.", st:["Vollständig"], q:"wrist prep" },
      { name:"MCI Haupttraining", sets:"~40 Min.", p:false, e:"🏋️", s:"Pull Pattern", d:"Pull-Tag.", st:["Pull Pattern"], q:"pull workout" },
      { name:"Forearm Balance Approach", sets:"4x10 Sek.", p:true, e:"🤸", s:"Unterarme parallel, Hüfte hoch", d:"Pincha Approach. 10 Sek.", st:["Unterarme parallel","Hüfte hoch","Schulterblätter zusammen","10 Sek."], q:"pincha mayurasana tutorial", relatedPoseIds:["pincha"] },
      { name:"Forearm Plank", sets:"3x50 Sek.", p:false, e:"📏", s:"50 Sek.", d:"50 Sek.", st:["Unterarme","50 Sek."], q:"forearm plank" },
    ]},
    { tag:"Sa", session:"Yoga - Full Practice P2", focus:"Crow 15 Sek. - Headstand - Side Crow", note:"Crow-Ziel: 15 Sek.", exercises:[
      { name:"Compression Routine", sets:"8 Min.", p:true, e:"⭐", s:"Phase 2", d:"Tuck 5x8 + One Leg Extended + Hollow 3x25.", st:["Tuck 5x8","One Leg Extended","Hollow 3x25"], q:"compression yoga", relatedPoseIds:["tuck_hold","l_sit"] },
      { name:"Crow Skill-Arbeit", sets:"15 Min.", p:true, e:"🦅", s:"Ziel: 15 Sek.", d:"15 Sek. Ziel.", st:["Hold-Versuche","15 Sek. Ziel"], q:"crow 15 seconds", relatedPoseIds:["crow"] },
      { name:"Side Crow Approach", sets:"4x5 Sek.", p:false, e:"🌀", s:"Beide Knie auf einen Arm", d:"Rotation aus der Hüfte.", st:["Tiefe Hocke","Beide Knie auf einen Arm","Rotation aus Hüfte"], q:"side crow tutorial", relatedPoseIds:["side_crow"] },
      { name:"Headstand", sets:"4x10 Sek.", p:false, e:"🙃", s:"Freistellend oder Wand", d:"10 Sek.", st:["Headstand","10 Sek."], q:"headstand hold", relatedPoseIds:["headstand"] },
      { name:"Cool-Down", sets:"10 Min.", p:false, e:"🌙", s:"Yin, Savasana", d:"Yin + Savasana.", st:["Yin 7 Min.","Savasana 3 Min."], q:"yoga cooldown" },
    ]},
    { tag:"So", session:"Active Recovery", focus:"Regeneration", note:"Komplett erholen.", exercises:[
      { name:"Yin oder Pause", sets:"30-45 Min.", p:false, e:"😴", s:"Yin oder Pause", d:"Yin oder Pause.", st:["Yin oder Pause"], q:"yin yoga" },
    ]},
  ]},
  { num:3, title:"Integration", weeks:"Woche 9-12", accent:"#5C3A1E", light:"#F6F0EA", days:[
    { tag:"Mo", session:"MCI + Handstand Daily", focus:"Push - Handstand täglich", note:"Handstand täglich.", exercises:[
      { name:"Wrist Prep", sets:"8 Min.", p:false, e:"🤲", s:"Intensiv", d:"Intensiveres Loading.", st:["Circles, Extensions","Loading intensiv"], q:"wrist handstand prep" },
      { name:"MCI Haupttraining", sets:"~40 Min.", p:false, e:"🏋️", s:"Push Pattern", d:"Push-Tag.", st:["Push Pattern"], q:"push workout" },
      { name:"Wall Handstand Hold", sets:"5x25 Sek.", p:true, e:"🤸", s:"Rückwärts - 25 Sek.", d:"Rückwärts. Rippen schließen.", st:["Rückwärts zur Wand","Rippen schließen","25 Sek."], q:"wall handstand back to wall", relatedPoseIds:["handstand"] },
      { name:"Kick-Up Technik", sets:"10 Versuche", p:true, e:"⬆️", s:"Kontrolliert - kein Schwung", d:"Ein Bein führt, kein Schwung.", st:["Ein Bein führt","Anderes folgt","Kein Schwung"], q:"handstand kick up controlled", relatedPoseIds:["handstand"] },
    ]},
    { tag:"Di", session:"Yoga - Crow + Firefly", focus:"Crow 20 Sek. - Firefly - L-Sit", note:"Firefly erst wenn Crow stabil + L-Sit 5 Sek.", exercises:[
      { name:"Compression Routine", sets:"8 Min.", p:true, e:"⭐", s:"L-Sit + Hollow 30 Sek.", d:"L-Sit Attempt 5x5 + Hollow 3x30.", st:["L-Sit 5x5","Hollow 3x30"], q:"l-sit tutorial", relatedPoseIds:["l_sit","crow"] },
      { name:"Crow Hold", sets:"5x max.", p:true, e:"🦅", s:"Ziel: 20 Sek.", d:"20 Sek. Ziel. 60 Sek. Pause.", st:["Crow","20 Sek. Ziel","60 Sek. Pause"], q:"crow 20 seconds", relatedPoseIds:["crow"] },
      { name:"Firefly Approach", sets:"4x8 Sek.", p:true, e:"🔥", s:"Arme unter Beine", d:"Vorwärtsbeuge. Arme unter Beine. Gewicht nach vorne.", st:["Tiefe Vorwärtsbeuge","Arme unter Beine","Hände auf Boden","Gewicht nach vorne"], q:"firefly pose tittibhasana", relatedPoseIds:["firefly","l_sit"] },
      { name:"Passive Pigeon", sets:"2 Min./Seite", p:false, e:"🕊️", s:"Entspannen", d:"2 Min./Seite.", st:["Pigeon","2 Min."], q:"pigeon pose", relatedPoseIds:["pigeon"] },
    ]},
    { tag:"Mi", session:"Les Mills + L-Sit", focus:"Kraft - L-Sit Hold", note:"Ziel: beidseitiger L-Sit.", exercises:[
      { name:"Les Mills / Barre", sets:"45-60 Min.", p:false, e:"🎵", s:"Volle Intensität", d:"Reguläre Klasse.", st:["Kursplan"], q:"les mills" },
      { name:"L-Sit Attempt", sets:"5x max.", p:true, e:"⭐", s:"Beide Beine parallel", d:"Beide Beine parallel. Auch 1 Sek. zählt.", st:["Hände auf Blöcken","Schultern drücken","Beide Beine parallel","Max. Hold"], q:"l-sit tutorial full", relatedPoseIds:["l_sit"] },
      { name:"Tuck Jump to Hold", sets:"4x6", p:false, e:"🦘", s:"Knie zur Brust aus Hocke", d:"Füße abheben. Knie zur Brust. 1 Sek.", st:["Tiefe Hocke","Füße abheben","Knie zur Brust","1 Sek."], q:"tuck jump hip flexion", relatedPoseIds:["tuck_hold","l_sit"] },
    ]},
    { tag:"Do", session:"Mobility - Splits + Flying Pigeon", focus:"Full Splits - Flying Pigeon", note:"Flying Pigeon erst wenn Double Pigeon entspannt + Crow stabil.", exercises:[
      { name:"Double Pigeon", sets:"3 Min./Seite", p:true, e:"🔗", s:"Tiefer, Block weglassen", d:"3 Min./Seite.", st:["Schienbein über Schienbein","3 Min."], q:"double pigeon deep", relatedPoseIds:["double_pigeon","half_lotus"] },
      { name:"Full Splits Approach", sets:"3-5 Min.", p:true, e:"🤸", s:"Blöcke, täglich tiefer", d:"Blöcke. Hüfte quadratisch. Täglich tiefer.", st:["Blöcke unter Händen","Hüfte quadratisch","Täglich tiefer"], q:"full splits progression", relatedPoseIds:["hanumanasana"] },
      { name:"Standing Figure-4 Lean", sets:"3x8 Sek.", p:true, e:"4️⃣", s:"Gewicht nach vorne", d:"Auf einem Bein. Knöchel auf Oberschenkel. Oberkörper nach vorne.", st:["Auf einem Bein","Knöchel auf Oberschenkel","Standbein beugen","Oberkörper nach vorne"], q:"standing figure 4 flying pigeon", relatedPoseIds:["standing_figure4","flying_pigeon"] },
      { name:"Figure-4 auf Blöcken", sets:"4x8 Sek.", p:false, e:"🧱", s:"Hände auf Blöcken", d:"Wie oben, mit Blöcken.", st:["Blöcke","Figure-4 tiefer","8 Sek."], q:"flying pigeon blocks", relatedPoseIds:["standing_figure4","flying_pigeon"] },
    ]},
    { tag:"Fr", session:"MCI + Pincha / Handstand", focus:"Pull - Forearm Balance 15 Sek.", note:"Pincha-Ziel: 15-20 Sek.", exercises:[
      { name:"Wrist Prep", sets:"5 Min.", p:false, e:"🤲", s:"Vollständig", d:"Vollständig.", st:["Vollständig"], q:"wrist prep" },
      { name:"MCI Haupttraining", sets:"~40 Min.", p:false, e:"🏋️", s:"Pull Pattern", d:"Pull-Tag.", st:["Pull Pattern"], q:"pull workout" },
      { name:"Forearm Balance Hold", sets:"4x15 Sek.", p:true, e:"🤸", s:"Pincha 15 Sek.", d:"Pincha gegen Wand. 15 Sek.", st:["Unterarme parallel","Hüfte über Schultern","15 Sek."], q:"pincha hold tutorial", relatedPoseIds:["pincha"] },
      { name:"Kick-Up", sets:"8 Versuche", p:false, e:"⬆️", s:"Kontrolliert", d:"Kontrolliert.", st:["Ein Bein führt","Kontrolliert"], q:"handstand kick up", relatedPoseIds:["handstand"] },
    ]},
    { tag:"Sa", session:"Yoga - Full Integration", focus:"Flying Pigeon - Crow 20 Sek.", note:"Alle Skills zusammenbringen.", exercises:[
      { name:"Compression Routine", sets:"8 Min.", p:true, e:"⭐", s:"L-Sit + Hollow 30 Sek.", d:"L-Sit 5x max. + Hollow 3x30.", st:["L-Sit 5x max.","Hollow 3x30"], q:"l-sit compression", relatedPoseIds:["l_sit","crow"] },
      { name:"Crow + Firefly", sets:"15 Min.", p:true, e:"🦅", s:"Crow 20 Sek. → Firefly", d:"Crow 20 Sek. → Firefly.", st:["Crow 20 Sek.","Firefly danach"], q:"crow firefly transition", relatedPoseIds:["crow","firefly"] },
      { name:"Flying Pigeon Approach", sets:"10 Min.", p:true, e:"🕊️", s:"Figure-4 → Blöcke → Gewicht", d:"Standing Figure-4 → Blöcke → Gewicht auf Hände.", st:["Standing Figure-4 3x8","Figure-4 Blöcke 4x8","Gewicht auf Hände"], q:"flying pigeon tutorial", relatedPoseIds:["flying_pigeon","standing_figure4"] },
      { name:"Wheel Pose", sets:"3x5 Atemzüge", p:false, e:"⭕", s:"Nur wenn Schulter-Test OK", d:"Nur wenn OK. Sonst Bridge.", st:["Hände neben Kopf","Arme strecken","5 Atemzüge"], q:"wheel pose yoga" },
      { name:"Cool-Down", sets:"10 Min.", p:false, e:"🌙", s:"Yin, Savasana", d:"Yin + Savasana.", st:["Yin 7 Min.","Savasana 3 Min."], q:"yoga cooldown" },
    ]},
    { tag:"So", session:"Active Recovery", focus:"Regeneration - Wo. 12", note:"Woche 12: Alle 5 Tests.", exercises:[
      { name:"Yin Yoga oder Pause", sets:"30-45 Min.", p:false, e:"😴", s:"Yin oder Pause", d:"Yin oder Pause.", st:["Yin oder Pause"], q:"yin yoga" },
      { name:"Diagnosetest (Wo. 12)", sets:"20 Min.", p:false, e:"📋", s:"Alle 5 Tests", d:"Alle 5 Tests.", st:["Hip Compression","External Rotation","Ankle Dorsiflexion","Shoulder Flexion","Hamstring SLR"], q:"yoga flexibility test" },
    ]},
  ]},
];

const DAYS = ["Mo","Di","Mi","Do","Fr","Sa","So"];

// ─── TESTS COMPONENT ──────────────────────────────────────────────────────────
function Tests({ progress, setProgress }) {
  const diag = progress.diagnostics || {};
  const update = (id, field, value) => setProgress(prev => ({ ...prev, diagnostics: { ...prev.diagnostics, [id]: { ...(prev.diagnostics?.[id]||{}), [field]:value } } }));
  return (
    <div style={{padding:"12px 16px 100px"}}>
      <div style={{padding:"12px 14px",background:"#fff",borderRadius:"14px",marginBottom:"12px",fontSize:"13px",color:"#3A3A3C",lineHeight:1.55,boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}}>
        5 Tests – durchführen zu Beginn (Woche 1), Mitte (Woche 6) und Ende (Woche 12). Die Werte zeigen objektiv welche Skill Trees gerade blockieren.
      </div>
      {DIAGNOSTIC_TESTS.map(test => {
        const vals = diag[test.id] || { start:"", week6:"", week12:"" };
        const bm = getBenchmark(test.id, vals.start);
        const bmc = bm ? BM_COLORS[bm] : null;
        return (
          <div key={test.id} style={{background:"#fff",borderRadius:"16px",padding:"16px",marginBottom:"12px",boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}}>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px"}}>
              <span style={{fontSize:"20px"}}>{test.emoji}</span>
              <div>
                <div style={{fontSize:"15px",fontWeight:700,color:"#1C1C1E"}}>{test.name}</div>
                <div style={{fontSize:"12px",color:"#8E8E93"}}>{test.short} · {test.unit}</div>
              </div>
            </div>
            <p style={{fontSize:"13px",color:"#3A3A3C",lineHeight:1.55,margin:"0 0 12px"}}>{test.description}</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px",marginBottom:"12px"}}>
              {[["start","Woche 1"],["week6","Woche 6"],["week12","Woche 12"]].map(([f,l])=>(
                <div key={f}>
                  <div style={{fontSize:"10px",fontWeight:600,color:"#8E8E93",marginBottom:"4px",textAlign:"center"}}>{l}</div>
                  <input type="number" placeholder={test.unit} value={vals[f]||""} onChange={e=>update(test.id,f,e.target.value)} style={{width:"100%",boxSizing:"border-box",padding:"8px",borderRadius:"8px",border:"1px solid #E5E5EA",fontSize:"14px",textAlign:"center",fontFamily:"inherit",background:"#F9F9F9"}}/>
                </div>
              ))}
            </div>
            {bmc && (
              <div style={{padding:"10px 12px",background:bmc.bg,borderRadius:"10px",marginBottom:"10px"}}>
                <div style={{fontSize:"12px",fontWeight:700,color:bmc.color,marginBottom:"3px"}}>{bmc.label}</div>
                <div style={{fontSize:"12px",color:bmc.color}}>{test.interpretation[bm]}</div>
              </div>
            )}
            <div style={{borderTop:"1px solid #F2F2F7",paddingTop:"10px"}}>
              <div style={{fontSize:"10px",fontWeight:700,color:"#8E8E93",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"8px"}}>Benchmarks</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px"}}>
                {Object.entries(test.benchmarks).map(([k,v])=>(
                  <div key={k} style={{padding:"6px 10px",background:BM_COLORS[k].bg,borderRadius:"8px"}}>
                    <div style={{fontSize:"10px",fontWeight:700,color:BM_COLORS[k].color}}>{BM_COLORS[k].label}</div>
                    <div style={{fontSize:"12px",color:BM_COLORS[k].color}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── MASTER POSES COMPONENT ───────────────────────────────────────────────────
function MasterPosesTab({ progress, setProgress }) {
  const [open, setOpen] = useState(null);
  const poseStatus = progress.poseStatus || {};
  const poseProgress = progress.poseProgress || {};

  const updateStatus = (id, status) => setProgress(prev => ({ ...prev, poseStatus: { ...prev.poseStatus, [id]:status } }));
  const updateHold = (id, val) => setProgress(prev => ({ ...prev, poseProgress: { ...prev.poseProgress, [id]: { ...(prev.poseProgress?.[id]||{}), bestHold:val } } }));

  return (
    <div style={{padding:"12px 16px 100px"}}>
      <div style={{padding:"12px 14px",background:"#fff",borderRadius:"14px",marginBottom:"12px",fontSize:"13px",color:"#3A3A3C",lineHeight:1.55,boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}}>
        Deine 8 Master-Posen – die Hauptachse des Systems. Status editierbar, Bestleistung trackbar.
      </div>
      {MASTER_POSE_IDS.map(id => {
        const pose = getPose(id);
        const detail = MASTER_DETAILS[id] || {};
        if (!pose) return null;
        const st = poseStatus[id] || pose.defaultStatus;
        const sc = STATUS[st] || STATUS.open;
        const pp = poseProgress[id] || {};
        const isOpen = open === id;
        const pct = pp.bestHold && detail.targetHold ? Math.min(100, (parseFloat(pp.bestHold)/detail.targetHold)*100) : 0;
        return (
          <div key={id} style={{background:"#fff",borderRadius:"16px",overflow:"hidden",marginBottom:"10px",boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}}>
            <button onClick={()=>setOpen(isOpen?null:id)} style={{width:"100%",padding:"14px 16px",background:"transparent",border:"none",textAlign:"left",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:"12px"}}>
              <span style={{fontSize:"22px",flexShrink:0}}>{pose.emoji}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"3px"}}>
                  <span style={{fontSize:"15px",fontWeight:700,color:"#1C1C1E"}}>{pose.name}</span>
                </div>
                <div style={{fontSize:"11px",color:"#8E8E93",marginBottom:"4px"}}>{pose.sanskrit || pose.tree}</div>
                <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                  <span style={{display:"inline-block",width:"8px",height:"8px",borderRadius:"50%",background:sc.dot||"transparent",border:sc.dot?"none":"1.5px solid #999"}}/>
                  <span style={{fontSize:"11px",color:"#8E8E93"}}>{sc.label}</span>
                  {pp.bestHold && <span style={{fontSize:"11px",color:"#1C3A5E",marginLeft:"8px",fontWeight:600}}>{pp.bestHold} {detail.unit}</span>}
                </div>
              </div>
              <span style={{fontSize:"9px",color:"#C7C7CC",transform:isOpen?"rotate(180deg)":"none",transition:"transform 0.2s",flexShrink:0}}>▼</span>
            </button>
            {isOpen && (
              <div style={{borderTop:"1px solid #F2F2F7",padding:"14px 16px"}}>
                {detail.focus && <div style={{fontSize:"13px",color:"#3A3A3C",lineHeight:1.6,marginBottom:"10px"}}><strong>Fokus:</strong> {detail.focus}</div>}
                {detail.biggestLimit && (
                  <div style={{padding:"10px 12px",background:"#FFF9F0",borderRadius:"10px",borderLeft:"3px solid #BA7517",marginBottom:"14px"}}>
                    <div style={{fontSize:"10px",fontWeight:700,color:"#BA7517",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"4px"}}>Größter Engpass</div>
                    <div style={{fontSize:"13px",color:"#3A3A3C"}}>{detail.biggestLimit}</div>
                  </div>
                )}
                {detail.readiness && (
                  <div style={{marginBottom:"14px"}}>
                    <div style={{fontSize:"10px",fontWeight:700,color:"#8E8E93",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"8px"}}>Readiness Checks</div>
                    {detail.readiness.map((r,i)=>(
                      <div key={i} style={{display:"flex",gap:"8px",marginBottom:"6px",alignItems:"flex-start"}}>
                        <span style={{width:"18px",height:"18px",borderRadius:"50%",background:"#EEF3FA",color:"#1C3A5E",fontSize:"10px",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:"1px"}}>{i+1}</span>
                        <span style={{fontSize:"13px",color:"#1C1C1E",lineHeight:1.5}}>{r}</span>
                      </div>
                    ))}
                  </div>
                )}
                {detail.bestDrills && (
                  <div style={{marginBottom:"14px"}}>
                    <div style={{fontSize:"10px",fontWeight:700,color:"#8E8E93",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"8px"}}>Beste Übungen</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
                      {detail.bestDrills.map(d=><span key={d} style={{fontSize:"12px",background:"#EEF3FA",color:"#1C3A5E",padding:"4px 10px",borderRadius:"20px",fontWeight:500}}>{d}</span>)}
                    </div>
                  </div>
                )}
                {detail.targetHold && (
                  <div style={{marginBottom:"14px"}}>
                    <div style={{fontSize:"10px",fontWeight:700,color:"#8E8E93",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"8px"}}>Bestleistung tracken</div>
                    <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                      <input type="number" placeholder={`Aktuell (${detail.unit})`} value={pp.bestHold||""} onChange={e=>updateHold(id,e.target.value)} style={{flex:1,padding:"10px",borderRadius:"10px",border:"1px solid #E5E5EA",fontSize:"14px",fontFamily:"inherit",background:"#F9F9F9"}}/>
                      <span style={{fontSize:"12px",color:"#8E8E93",whiteSpace:"nowrap"}}>Ziel: {detail.targetHold} {detail.unit}</span>
                    </div>
                    {pct > 0 && (
                      <div style={{marginTop:"8px"}}>
                        <div style={{height:"6px",background:"#E5E5EA",borderRadius:"3px"}}>
                          <div style={{height:"100%",width:`${pct}%`,background:"#1C3A5E",borderRadius:"3px",transition:"width 0.4s"}}/>
                        </div>
                        <div style={{fontSize:"11px",color:"#8E8E93",marginTop:"4px",textAlign:"right"}}>{Math.round(pct)}% vom Ziel</div>
                      </div>
                    )}
                  </div>
                )}
                <div style={{marginBottom:"14px"}}>
                  <div style={{fontSize:"10px",fontWeight:700,color:"#8E8E93",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"8px"}}>Status</div>
                  <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                    {Object.entries(STATUS).map(([k,v])=>(
                      <button key={k} onClick={()=>updateStatus(id,k)} style={{padding:"6px 12px",borderRadius:"20px",border:`1px solid ${st===k?v.border:"#E5E5EA"}`,background:st===k?v.bg:"transparent",color:st===k?v.border:"#8E8E93",fontSize:"12px",fontWeight:st===k?700:400,cursor:"pointer",fontFamily:"inherit"}}>{v.label}</button>
                    ))}
                  </div>
                </div>
                {detail.notes && <div style={{fontSize:"12px",color:"#8E8E93",lineHeight:1.5,fontStyle:"italic"}}>{detail.notes}</div>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── SKILL MAP COMPONENT ──────────────────────────────────────────────────────
function SkillMap({ progress, setProgress, onJumpToPose }) {
  const [openPose, setOpenPose] = useState(null);
  const [openTree, setOpenTree] = useState(null);

  const jumpToPose = (poseId) => {
    const tree = findTreeForPose(poseId);
    if (!tree) return;
    setOpenTree(tree.id);
    setOpenPose(poseId);
    setTimeout(() => {
      const el = document.getElementById(`pose-${poseId}`);
      if (el) el.scrollIntoView({ behavior:"smooth", block:"start" });
    }, 80);
  };

  return (
    <div style={{padding:"12px 16px 100px"}}>
      {SKILL_TREES.map(tree => {
        const poses = getTreePoses(tree);
        const isTreeOpen = openTree === tree.id;
        return (
          <div key={tree.id} style={{marginBottom:"12px"}}>
            <button onClick={()=>setOpenTree(isTreeOpen?null:tree.id)} style={{width:"100%",background:tree.light,border:`1.5px solid ${tree.color}33`,borderRadius:"14px",padding:"12px 16px",textAlign:"left",cursor:"pointer",fontFamily:"inherit",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:"13px",fontWeight:700,color:tree.color}}>{tree.name}</div>
                <div style={{fontSize:"11px",color:tree.color+"88",marginTop:"2px"}}>{poses.length} Posen</div>
              </div>
              <span style={{fontSize:"11px",color:tree.color+"77",transform:isTreeOpen?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▼</span>
            </button>
            {isTreeOpen && <div style={{padding:"10px 14px",background:"#fff",borderRadius:"12px",margin:"6px 0",fontSize:"13px",color:"#3A3A3C",lineHeight:1.55,boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}}>{tree.desc}</div>}
            {poses.map(pose => {
              const st = getPoseStatus(pose.id, progress);
              const sc = STATUS[st] || STATUS.open;
              const isOpen = openPose === pose.id;
              return (
                <div key={pose.id} id={`pose-${pose.id}`} style={{marginTop:"6px",background:"#fff",borderRadius:"14px",overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",border:pose.priority?`1.5px solid ${tree.color}55`:"1px solid #E5E5EA"}}>
                  <button onClick={()=>setOpenPose(isOpen?null:pose.id)} style={{width:"100%",padding:"12px 14px",background:"transparent",border:"none",textAlign:"left",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:"10px"}}>
                    <span style={{fontSize:"18px",flexShrink:0}}>{pose.emoji}</span>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                        <span style={{fontSize:"14px",fontWeight:600,color:"#1C1C1E"}}>{pose.name}</span>
                        {pose.priority && <span style={{fontSize:"9px",fontWeight:700,color:"#FF3B30",background:"#FFF0EE",padding:"2px 6px",borderRadius:"5px"}}>PRIO</span>}
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:"6px",marginTop:"3px"}}>
                        <span style={{display:"inline-block",width:"8px",height:"8px",borderRadius:"50%",background:sc.dot||"transparent",border:sc.dot?"none":"1.5px solid #999",flexShrink:0}}/>
                        <span style={{fontSize:"11px",color:"#8E8E93"}}>{sc.label}</span>
                      </div>
                    </div>
                    <span style={{fontSize:"9px",color:"#C7C7CC",transform:isOpen?"rotate(180deg)":"none",transition:"transform 0.2s",flexShrink:0}}>▼</span>
                  </button>
                  {isOpen && (
                    <div style={{borderTop:"1px solid #F2F2F7",padding:"14px 16px"}}>
                      {pose.why && (
                        <div style={{marginBottom:"14px"}}>
                          <div style={{fontSize:"10px",fontWeight:700,color:"#8E8E93",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"6px"}}>Warum diese Pose</div>
                          <p style={{fontSize:"13px",color:"#3A3A3C",lineHeight:1.6,margin:0}}>{pose.why}</p>
                        </div>
                      )}
                      {pose.nextStep && (
                        <div style={{marginBottom:"14px",padding:"10px 12px",background:"#FFF9F0",borderRadius:"10px",borderLeft:`3px solid ${tree.color}`}}>
                          <div style={{fontSize:"10px",fontWeight:700,color:tree.color,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"6px"}}>Nächster Schritt</div>
                          <p style={{fontSize:"13px",color:"#3A3A3C",lineHeight:1.6,margin:0}}>{pose.nextStep}</p>
                        </div>
                      )}
                      {pose.connects?.length > 0 && (
                        <div style={{marginBottom:"14px"}}>
                          <div style={{fontSize:"10px",fontWeight:700,color:"#8E8E93",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"8px"}}>Verbunden mit</div>
                          <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
                            {pose.connects.map(connId => {
                              const cp = getPose(connId);
                              if (!cp) return null;
                              return (
                                <button key={connId} onClick={()=>jumpToPose(connId)} style={{fontSize:"12px",background:tree.light,color:tree.color,padding:"4px 10px",borderRadius:"20px",fontWeight:500,border:"none",cursor:"pointer",fontFamily:"inherit"}}>
                                  {cp.emoji} {cp.name}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {pose.videos?.length > 0 && (
                        <div>
                          <div style={{fontSize:"10px",fontWeight:700,color:"#8E8E93",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"8px"}}>Videos</div>
                          <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
                            {pose.videos.map(v=>(
                              <a key={v.label} href={"https://www.youtube.com/results?search_query="+encodeURIComponent(v.q)} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 12px",background:"#FFF5F5",borderRadius:"10px",textDecoration:"none"}}>
                                <svg width="20" height="14" viewBox="0 0 22 15" fill="none"><rect width="22" height="15" rx="3.5" fill="#FF0000"/><path d="M9 5L15 7.5L9 10V5Z" fill="white"/></svg>
                                <span style={{fontSize:"13px",fontWeight:600,color:"#FF3B30"}}>{v.label}</span>
                                <span style={{fontSize:"13px",color:"#FF9999",marginLeft:"auto"}}>→</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// ─── TRAINING COMPONENT ───────────────────────────────────────────────────────
function Training({ progress, setProgress }) {
  const [phase, setPhase] = useState(0);
  const [day, setDay] = useState(()=>{const d=new Date().getDay();return d===0?6:d-1;});
  const [openEx, setOpenEx] = useState(null);

  const checked = progress.checked || {};
  const setChecked = (updater) => setProgress(prev => ({ ...prev, checked: typeof updater === "function" ? updater(prev.checked||{}) : updater }));

  const cur = PHASES[phase].days[day];
  const accent = PHASES[phase].accent;
  const al = PHASES[phase].light;
  const done = cur.exercises.filter((_,i)=>checked[`${phase}-${day}-${i}`]).length;
  const total = cur.exercises.length;
  const pct = total > 0 ? (done/total)*100 : 0;
  const ck = k => setChecked(p => ({...p,[k]:!p[k]}));

  return (
    <>
      <div style={{background:"#fff",borderBottom:"1px solid #E5E5EA"}}>
        <div style={{padding:"16px 20px 10px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div style={{flex:1}}>
            <div style={{fontSize:"11px",fontWeight:700,color:accent,letterSpacing:"0.5px",textTransform:"uppercase",marginBottom:"4px"}}>Phase {PHASES[phase].num} · {PHASES[phase].weeks}</div>
            <div style={{fontSize:"19px",fontWeight:700,color:"#1C1C1E",lineHeight:1.2}}>{cur.session}</div>
            <div style={{fontSize:"12px",color:"#8E8E93",marginTop:"2px"}}>{cur.focus}</div>
          </div>
          <div style={{textAlign:"center",background:al,borderRadius:"14px",padding:"8px 14px",marginLeft:"12px"}}>
            <div style={{fontSize:"22px",fontWeight:700,color:accent,lineHeight:1}}>{done}</div>
            <div style={{fontSize:"10px",color:accent,fontWeight:600,marginTop:"1px"}}>/ {total}</div>
          </div>
        </div>
        <div style={{height:"2px",background:"#E5E5EA",margin:"0 20px 10px"}}>
          <div style={{height:"100%",width:`${pct}%`,background:accent,transition:"width 0.4s ease"}}/>
        </div>
        <div style={{display:"flex",padding:"0 16px 10px",gap:"8px"}}>
          {PHASES.map((p,i)=>(
            <button key={i} onClick={()=>{setPhase(i);setOpenEx(null);}} style={{padding:"5px 14px",borderRadius:"20px",border:"none",background:phase===i?p.accent:"#F2F2F7",color:phase===i?"#fff":"#8E8E93",fontSize:"12px",fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Phase {p.num}</button>
          ))}
        </div>
        <div style={{display:"flex",borderTop:"1px solid #F2F2F7"}}>
          {DAYS.map((tag,i)=>{
            const d=PHASES[phase].days[i];
            const allDone=d.exercises.length>0&&d.exercises.every((_,j)=>checked[`${phase}-${i}-${j}`]);
            const isT=i===day;
            return (
              <button key={tag} onClick={()=>{setDay(i);setOpenEx(null);}} style={{flex:1,padding:"8px 2px 10px",background:"transparent",border:"none",borderBottom:isT?`2px solid ${accent}`:"2px solid transparent",color:isT?accent:allDone?"#34C759":"#8E8E93",fontSize:"12px",fontWeight:isT?700:500,cursor:"pointer",fontFamily:"inherit",display:"flex",flexDirection:"column",alignItems:"center",gap:"2px"}}>
                {tag}{allDone&&<span style={{width:"4px",height:"4px",borderRadius:"50%",background:"#34C759",display:"block"}}/>}
              </button>
            );
          })}
        </div>
      </div>

      {cur.note && (
        <div style={{margin:"12px 16px 4px",padding:"10px 14px",background:"#fff",borderRadius:"14px",display:"flex",gap:"10px",boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
          <span style={{fontSize:"15px",flexShrink:0}}>💡</span>
          <span style={{fontSize:"13px",color:"#3A3A3C",lineHeight:1.5}}>{cur.note}</span>
        </div>
      )}

      <div style={{padding:"8px 16px 0"}}>
        {cur.exercises.map((ex,i)=>{
          const k=`${phase}-${day}-${i}`;
          const isCk=!!checked[k];
          const isOp=openEx===k;
          return (
            <div key={i} style={{marginBottom:"8px",background:"#fff",borderRadius:"16px",overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",opacity:isCk?0.6:1}}>
              <div style={{display:"flex",alignItems:"center",padding:"12px 14px",gap:"10px",cursor:"pointer"}} onClick={()=>setOpenEx(isOp?null:k)}>
                <div onClick={ev=>{ev.stopPropagation();ck(k);}} style={{width:"26px",height:"26px",borderRadius:"50%",border:isCk?"none":`2px solid ${accent}44`,background:isCk?accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer",transition:"all 0.2s"}}>
                  {isCk&&<svg width="12" height="9" viewBox="0 0 12 9"><path d="M1 4.5L4.5 8L11 1" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span style={{fontSize:"19px",flexShrink:0}}>{ex.e}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:"5px",marginBottom:"1px"}}>
                    <span style={{fontSize:"14px",fontWeight:600,color:isCk?"#8E8E93":"#1C1C1E",textDecoration:isCk?"line-through":"none"}}>{ex.name}</span>
                    {ex.p&&<span style={{fontSize:"9px",fontWeight:700,color:"#FF3B30",background:"#FFF0EE",padding:"2px 5px",borderRadius:"5px"}}>KEY</span>}
                  </div>
                  <div style={{fontSize:"11px",color:"#8E8E93"}}>{ex.s}</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px",flexShrink:0}}>
                  <span style={{fontSize:"11px",fontWeight:700,color:accent,background:al,padding:"3px 8px",borderRadius:"7px",whiteSpace:"nowrap"}}>{ex.sets}</span>
                  <span style={{fontSize:"9px",color:"#CCC",transform:isOp?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▼</span>
                </div>
              </div>
              {isOp&&(
                <div style={{borderTop:"1px solid #F2F2F7",padding:"14px 16px"}}>
                  <p style={{fontSize:"14px",color:"#3A3A3C",lineHeight:1.65,margin:"0 0 12px"}}>{ex.d}</p>
                  <div style={{marginBottom:"12px"}}>
                    <div style={{fontSize:"10px",fontWeight:700,color:"#8E8E93",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"8px"}}>Schritt für Schritt</div>
                    {ex.st.map((s,si)=>(
                      <div key={si} style={{display:"flex",gap:"9px",marginBottom:"6px",alignItems:"flex-start"}}>
                        <span style={{width:"20px",height:"20px",borderRadius:"50%",background:al,color:accent,fontSize:"11px",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{si+1}</span>
                        <span style={{fontSize:"13px",color:"#1C1C1E",lineHeight:1.5,paddingTop:"2px"}}>{s}</span>
                      </div>
                    ))}
                  </div>
                  <a href={"https://www.youtube.com/results?search_query="+encodeURIComponent(ex.q)} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 14px",background:"#FFF5F5",borderRadius:"12px",textDecoration:"none"}}>
                    <svg width="22" height="15" viewBox="0 0 22 15" fill="none"><rect width="22" height="15" rx="3.5" fill="#FF0000"/><path d="M9 5L15 7.5L9 10V5Z" fill="white"/></svg>
                    <span style={{fontSize:"13px",fontWeight:600,color:"#FF3B30"}}>Auf YouTube ansehen</span>
                    <span style={{fontSize:"13px",color:"#FF9999",marginLeft:"auto"}}>→</span>
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{height:"90px"}}/>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"430px",background:"rgba(242,242,247,0.96)",backdropFilter:"blur(20px)",borderTop:"1px solid #E5E5EA",padding:"12px 16px 28px"}}>
        <button onClick={()=>{
          const keys=cur.exercises.map((_,i)=>`${phase}-${day}-${i}`);
          const all=keys.every(k=>checked[k]);
          setChecked(p=>{const n={...p};all?keys.forEach(k=>delete n[k]):keys.forEach(k=>{n[k]=true;});return n;});
        }} style={{width:"100%",padding:"14px",background:pct===100?"#34C759":accent,border:"none",borderRadius:"14px",color:"#fff",fontSize:"15px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",transition:"background 0.3s"}}>
          {pct===100?"✓ Training abgeschlossen!":"Alle "+total+" Übungen markieren"}
        </button>
      </div>
    </>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("training");
  const [progress, setProgress] = useLocalStorage("yoga-v4-progress", DEFAULT_PROGRESS);

  const tabs = [
    { id:"training", label:"Training", icon:"🗓" },
    { id:"master",   label:"Posen",    icon:"⭐" },
    { id:"skillmap", label:"Skill Map",icon:"🗺" },
    { id:"tests",    label:"Tests",    icon:"🧪" },
  ];

  return (
    <div style={{fontFamily:"-apple-system,'SF Pro Display',BlinkMacSystemFont,sans-serif",background:"#F2F2F7",minHeight:"100vh",maxWidth:"430px",margin:"0 auto"}}>
      <div style={{background:"#fff",borderBottom:"1px solid #E5E5EA",display:"flex",position:"sticky",top:0,zIndex:200}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"10px 4px",background:"transparent",border:"none",borderBottom:tab===t.id?"2px solid #1C3A5E":"2px solid transparent",color:tab===t.id?"#1C3A5E":"#8E8E93",fontSize:"11px",fontWeight:tab===t.id?700:500,cursor:"pointer",fontFamily:"inherit",display:"flex",flexDirection:"column",alignItems:"center",gap:"2px"}}>
            <span style={{fontSize:"16px"}}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>
      {tab==="training" && <Training progress={progress} setProgress={setProgress}/>}
      {tab==="master"   && <MasterPosesTab progress={progress} setProgress={setProgress}/>}
      {tab==="skillmap" && <SkillMap progress={progress} setProgress={setProgress}/>}
      {tab==="tests"    && <Tests progress={progress} setProgress={setProgress}/>}
    </div>
  );
}
