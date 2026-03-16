import { useState } from "react";

const SKILL_TREES = [
  {
    id: 1, name: "Arm Balance Tree", color: "#1C3A5E", light: "#EEF3FA",
    desc: "Foundation fuer alle Arm Balances. Jede Pose baut auf Schulterstabilitaet, Schwerpunktkontrolle und Compression auf.",
    poses: [
      { name: "Plank Hold", status: "solid", emoji: "🏋️", why: "Foundation fuer alle Arm Balances. Trainiert Schulterstabilitaet, Rumpfspannung und Handgelenk-Loading unter Koerpergewicht. Wer in Plank nicht die richtige Spannung haelt, wird sie in Crow erst recht nicht haben.", missing: "Solide. Naechster Schritt: Scapula Push-ups – Schulterblätter in Plank aktiv auseinanderschieben.", connects: ["Chaturanga", "Crow (Bakasana)", "Scapula Push-ups"], videos: [{ label: "Perfekte Plank Form", q: "perfect plank form tutorial" }, { label: "Scapula Push-ups", q: "scapula pushup tutorial arm balance" }] },
      { name: "Chaturanga", status: "solid", emoji: "⬇️", why: "Schulterstabilitaet unter Last. Chaturanga trainiert exakt die Muskulatur die in Crow den Koerper traegt. Slow Negatives (4 Sek.) als taeglicher Qualitaetscheck.", missing: "Solide. Slow Chaturanga Negatives 4 Sek. als Standard halten.", connects: ["Crow (Bakasana)", "Plank Hold"], videos: [{ label: "Chaturanga korrekt", q: "chaturanga tutorial alignment yoga" }, { label: "Slow Chaturanga Negatives", q: "slow chaturanga negative tutorial 4 seconds" }] },
      { name: "Crow (Bakasana)", status: "wip", emoji: "🦅", priority: true, why: "Erste echte Arm Balance. Das Problem ist fast nie Kraft – sondern Schwerpunkt (Schultern nicht weit genug ueber Haenden) und Compression (Hueftflexoren zu schwach). Solange die Schultern hinter den Haenden sind, kippen die Zehen nicht hoch.", missing: "1. Crow Lean Drill taeglich: Schultern aktiv ueber Handgelenke bringen. 2. Tuck Hold: Compression aufbauen. 3. Crow Hop: Gewicht weiter vor bis Zehen sich von selbst heben – nicht springen.", connects: ["Tuck Hold", "Side Crow", "Flying Pigeon"], videos: [{ label: "Crow Lean Drill", q: "crow pose lean drill tutorial bakasana" }, { label: "Crow Hop Tutorial", q: "crow pose hop first time tutorial" }, { label: "Crow 20 Sekunden halten", q: "crow pose hold 20 seconds tutorial" }, { label: "Crow – häufige Fehler", q: "crow pose mistakes common bakasana" }] },
      { name: "Side Crow", status: "open", emoji: "🌀", why: "Rotation und Balance. Beide Knie auf einen Arm, die Rotation kommt aus der Huefte – nicht aus dem Ruecken. Braucht stabilen Crow als Basis.", missing: "Crow 15 Sek. stabil. Dann: Single Arm Weight Shift in Plank als Vorbereitung.", connects: ["Crow (Bakasana)", "Grasshopper"], videos: [{ label: "Side Crow Tutorial", q: "side crow tutorial parsva bakasana" }, { label: "Side Crow fuer Einsteiger", q: "side crow beginner step by step" }] },
      { name: "Firefly", status: "open", emoji: "🔥", why: "Arme gehen unter die Beine, Koerper streckt sich parallel zum Boden. Braucht starke Compression UND Hamstring-Flexibilitaet – beides gleichzeitig.", missing: "L-Sit 5 Sek. + Crow stabil + Half Splits tief. Dann Firefly Approach: tiefe Vorwaertsbeuge, Arme unter Beine schieben.", connects: ["L-Sit", "Half Splits", "Crow (Bakasana)"], videos: [{ label: "Firefly Approach", q: "firefly pose approach tittibhasana tutorial" }, { label: "Firefly Progression", q: "tittibhasana beginner progression step by step" }] },
      { name: "Grasshopper", status: "open", emoji: "🦗", why: "Rotation, Compression und Balance kombiniert. Einer der fortgeschrittensten Arm Balances – langfristiges Ziel.", missing: "Side Crow stabil + Deep Hip Rotation + L-Sit. Kommt nach Flying Pigeon.", connects: ["Side Crow", "L-Sit", "Double Pigeon"], videos: [{ label: "Grasshopper Tutorial", q: "grasshopper pose parsva bhuja dandasana tutorial" }] }
    ]
  },
  {
    id: 2, name: "Inversion Tree", color: "#2D5A3D", light: "#EEF6F1",
    desc: "Von Down Dog zum Handstand. Jede Stufe baut Schulterkraft, Koerperbewusstsein und Balance im Raum auf.",
    poses: [
      { name: "Down Dog", status: "solid", emoji: "🐕", why: "Foundation fuer alle Inversionen. Trainiert Schulterflexion, aktive Scapula und Hamstring-Laenge. Die Schultern muessen aktiv druecken – nie passiv haengen.", missing: "Solide. Aktives Druecken der Schultern halten.", connects: ["Dolphin", "Handstand"], videos: [{ label: "Down Dog perfekte Ausrichtung", q: "downward dog perfect alignment tutorial" }] },
      { name: "Dolphin", status: "solid", emoji: "🐬", why: "Unterarmstuetze mit hoher Huefte. Direkter Vorlaeufer fuer Pincha und Headstand. 45 Sek. Hold = Bereitschaft fuer Headstand.", missing: "Solide. 45 Sek. Hold als Headstand-Freigabe.", connects: ["Headstand", "Forearm Balance (Pincha)"], videos: [{ label: "Dolphin Pose Hold", q: "dolphin pose headstand prep tutorial" }, { label: "Dolphin Rocks", q: "dolphin rocks forearm balance prep" }] },
      { name: "Headstand", status: "unknown", emoji: "🙃", why: "Erste echte Inversion. Gewicht liegt auf den UNTERARMEN, nicht auf dem Kopf. Baut Vertrauen und Raumgefuehl kopfueber auf.", missing: "Dolphin 45 Sek. stabil. Dann: Kopf auf Matte (Haende als Schale), Huefte hoch, Knie zur Brust. Gewicht immer auf Unterarmen.", connects: ["Dolphin", "Forearm Balance (Pincha)"], videos: [{ label: "Headstand Anfaenger", q: "headstand tutorial beginners sirsasana" }, { label: "Headstand Approach", q: "headstand approach knie zur brust" }] },
      { name: "Forearm Balance (Pincha)", status: "open", emoji: "🤸", why: "Unterarme am Boden, Koerper senkrecht. Braucht starke Schultern und gutes Koerperbewusstsein aus dem Headstand.", missing: "Headstand stabil. Dann Pincha gegen Wand – Schulterblätter aktiv zusammenziehen.", connects: ["Dolphin", "Headstand", "Handstand"], videos: [{ label: "Pincha Mayurasana Tutorial", q: "pincha mayurasana forearm balance tutorial" }, { label: "Pincha gegen Wand", q: "pincha mayurasana wall tutorial beginner" }] },
      { name: "Handstand", status: "open", emoji: "⬆️", why: "Koenigsdisziplin. Braucht alles: Schultern, Core, Balance, Handgelenke, Raumgefuehl. Wall Handstand → Shoulder Taps → Kick-Ups → Freestanding.", missing: "Wall Handstand Hold 20 Sek. → Shoulder Taps → Kick-Ups kontrolliert → Freestanding mit Spotter.", connects: ["Forearm Balance (Pincha)", "Press Handstand Prep"], videos: [{ label: "Wall Handstand", q: "wall handstand tutorial beginner chest to wall" }, { label: "Handstand Kick-Up", q: "handstand kick up controlled tutorial" }, { label: "Freestanding Handstand", q: "freestanding handstand tutorial first time" }] }
    ]
  },
  {
    id: 3, name: "Hip Opener Tree", color: "#8B2500", light: "#FAEEE8",
    desc: "Die Huefte ist dein groesstes Tor. Tiefe Hueftrotation oeffnet nicht nur Lotus – sie ist direkt mit Crow, Flying Pigeon und dem gesamten Compression-System verbunden.",
    poses: [
      { name: "Low Lunge", status: "solid", emoji: "🏹", why: "Hueftbeuger-Dehnung. Foundation fuer alle Hueftoeffner. Huefte nach vorne-unten – nicht oben.", missing: "Solide. Aktives Druecken der Huefte nach vorne halten.", connects: ["Lizard Pose", "Half Splits"], videos: [{ label: "Low Lunge korrekt", q: "low lunge hip flexor yoga tutorial alignment" }] },
      { name: "Lizard Pose", status: "solid", emoji: "🦎", why: "Tiefe Hueftoeffnung. Unterarme auf Matte, Huefte sinkt. Direkter Vorlaeufer fuer Pigeon.", missing: "Solide. Unterarme vollstaendig auf den Boden bringen.", connects: ["Pigeon Pose", "Low Lunge"], videos: [{ label: "Lizard Pose tief", q: "lizard pose deep hip yoga tutorial" }] },
      { name: "Pigeon Pose", status: "wip", emoji: "🕊️", why: "Tiefe Aussenrotation der Huefte. Bis 45 Grad sauber – dann Kniekompensation. Die Rotation muss aus der Huefte kommen, nie aus dem Knie. Passive Variante 2 Min./Seite.", missing: "Block unter Gesaess reduziert Knie-Stress erheblich. 2 Min./Seite passiv. Rotation kommt mit Wochen – nicht forcieren.", connects: ["Double Pigeon", "Flying Pigeon", "Lizard Pose"], videos: [{ label: "Pigeon mit Block", q: "pigeon pose block modification knee safe" }, { label: "Passive Pigeon 2 Minuten", q: "pigeon pose passive 2 minutes hip opener" }] },
      { name: "Double Pigeon", status: "wip", emoji: "🔗", priority: true, why: "Schienbein auf Schienbein. Tiefste Aussenrotation im Sitzen. Direkter Schluessel fuer Lotus UND Flying Pigeon. Das vordere Bein in Flying Pigeon liegt in exakt dieser Aussenrotation – wenn Double Pigeon entspannt ist, liegt das Bein von selbst.", missing: "3 Min./Seite, nicht forcieren. Block unter Gesaess wenn noetig. Knie Richtung Boden – kommt mit Wochen, nicht Tagen.", connects: ["Pigeon Pose", "Lotus Pose", "Flying Pigeon"], videos: [{ label: "Double Pigeon Tutorial", q: "double pigeon fire log pose tutorial" }, { label: "Double Pigeon tiefer werden", q: "double pigeon deeper progression tips" }] },
      { name: "Lotus Pose", status: "open", emoji: "🌸", why: "Volle Aussenrotation beider Hueften. Langfristiges Ziel. Braucht Double Pigeon entspannt.", missing: "Double Pigeon 3 Min. entspannt. Lotus Prep: Bein zur Brust aus Huefte rotieren – NIEMALS aus dem Knie drücken.", connects: ["Double Pigeon"], videos: [{ label: "Lotus Prep sicher", q: "lotus pose safe preparation tutorial hip rotation" }, { label: "Lotus fuer steife Huefte", q: "lotus pose tight hips safe progression" }] }
    ]
  },
  {
    id: 4, name: "Hamstring / Split Tree", color: "#6B3A8B", light: "#F4EEF8",
    desc: "Hamstring-Laenge oeffnet Firefly, erleichtert Pigeon und ist Voraussetzung fuer volle Splits.",
    poses: [
      { name: "Forward Fold", status: "solid", emoji: "🙇", why: "Foundation fuer alle Hamstring-Arbeit. Zeigt wo die Laenge fehlt – Ruecken gerade halten fuer echte Dehnung.", missing: "Solide. Auf geraden Ruecken achten.", connects: ["Half Splits", "Hanumanasana"], videos: [{ label: "Forward Fold korrekt", q: "standing forward fold yoga correct alignment" }] },
      { name: "Half Splits", status: "wip", emoji: "📐", why: "Direkter Vorlaeufer fuer volle Splits und Firefly. Vorderes Bein gestreckt, Fuss flexiert, Ruecken gerade.", missing: "90 Sek./Seite. Fuss flexieren. Ruecken gerade – kein Rundruecken.", connects: ["Forward Fold", "Hanumanasana", "Firefly"], videos: [{ label: "Half Splits Tutorial", q: "half splits yoga tutorial progression" }, { label: "Half Splits tiefer", q: "half splits deeper hamstring stretch progression" }] },
      { name: "Hanumanasana", status: "open", emoji: "🤸", why: "Volle Splits. Braucht Hamstring-Laenge und Hueftbeuger-Flexibilitaet. Bloecke unter Haenden, Huefte quadratisch.", missing: "Half Splits 2 Min./Seite. Dann taeglich Splits Approach mit Bloecken – ein kleines Stueck tiefer, nie forcieren.", connects: ["Half Splits", "Low Lunge"], videos: [{ label: "Splits Progression taeglich", q: "splits progression daily routine beginner" }, { label: "Splits fuer steife Menschen", q: "how to do splits inflexible people progression" }] }
    ]
  },
  {
    id: 5, name: "Compression Tree ★", color: "#1A1A2E", light: "#F0F0F8",
    desc: "Dein groesster Hebel. Compression ist die Faehigkeit Knie zur Brust zu halten waehrend die Arme das Koerpergewicht tragen. Wenn das kommt, oeffnen sich Crow-Stabilitaet, Firefly und Jump Backs gleichzeitig.",
    poses: [
      { name: "Boat Pose", status: "solid", emoji: "⛵", why: "Basis-Compression. Trainiert Hueftflexoren und Core zusammen. Navasana mit gestreckten Beinen als Steigerung.", missing: "Solide. Beine strecken als Steigerung.", connects: ["Tuck Hold", "L-Sit"], videos: [{ label: "Boat Pose korrekt", q: "boat pose navasana tutorial alignment" }] },
      { name: "Tuck Hold", status: "wip", emoji: "⭐", why: "Haende neben Huefte, Schultern nach unten, Knie maximal hoch. Direkteste Crow-Vorbereitung ueberhaupt. Wenn Tuck Hold 8 Sek. sitzt, hat Crow eine stabile Basis.", missing: "Taeglich: 5x5 Sek. mit Bloecken beginnen → 5x8 Sek. → One Leg Extended → L-Sit.", connects: ["Crow (Bakasana)", "L-Sit", "Boat Pose"], videos: [{ label: "Tuck Hold Tutorial", q: "tuck hold l-sit progression tutorial" }, { label: "Tuck Hold auf Bloecken", q: "tuck hold yoga blocks beginner" }] },
      { name: "L-Sit", status: "open", emoji: "💺", priority: true, why: "Beide Beine parallel zum Boden, Arme gestreckt. Wenn L-Sit kommt: Crow wird stabiler, Firefly wird moeglich, Jump Backs oeffnen sich. Groesster einzelner Hebel im gesamten System.", missing: "Tuck Hold 8 Sek. → One Leg Extended 5 Sek. → beide Beine extended. Auch 1 Sek. zaehlt – einfach anfangen.", connects: ["Tuck Hold", "Tolasana", "Firefly", "Crow (Bakasana)"], videos: [{ label: "L-Sit Tutorial komplett", q: "l-sit tutorial progression beginner complete" }, { label: "One Leg Extended", q: "one leg extended l-sit progression" }, { label: "L-Sit auf Bloecken", q: "l-sit yoga blocks tutorial" }] },
      { name: "Tolasana", status: "open", emoji: "⚖️", why: "L-Sit in Lotus oder Schneidersitz. Verbindet Compression mit Hueftoeffnung.", missing: "L-Sit 5 Sek. + Lotus oder tiefer Schneidersitz.", connects: ["L-Sit", "Lotus Pose"], videos: [{ label: "Tolasana Tutorial", q: "tolasana scale pose tutorial yoga" }] },
      { name: "Press Handstand Prep", status: "open", emoji: "🆙", why: "Aus dem Boden in den Handstand druecken ohne Schwung. Braucht maximale Compression. Langfristiges Ziel.", missing: "L-Sit sicher + Handstand stabil. Langfristiges Ziel.", connects: ["L-Sit", "Handstand"], videos: [{ label: "Press Handstand Prep", q: "press handstand preparation tutorial" }] }
    ]
  },
  {
    id: 6, name: "Integration", color: "#5C3A1E", light: "#F6F0EA",
    desc: "Flying Pigeon bringt alles zusammen: Crow-Kraft, Pigeon-Hueftrotation und Einbein-Balance.",
    poses: [
      { name: "Flying Pigeon", status: "open", emoji: "🕊️", why: "Eka Pada Galavasana. Das Bein liegt in Figure-4 auf den Oberarmen – wie Crow, aber ein Bein in tiefer Aussenrotation. Die Pose ist im Grunde ein Crow mit offener Huefte.", missing: "1. Crow 15 Sek. stabil. 2. Double Pigeon entspannt 3 Min. 3. Standing Figure-4 Lean: Gewicht vollstaendig auf Haende bringen. Wenn diese drei sitzen, ist Flying Pigeon zum Greifen nah.", connects: ["Crow (Bakasana)", "Double Pigeon", "Standing Figure-4 Lean"], videos: [{ label: "Flying Pigeon Tutorial", q: "flying pigeon eka pada galavasana tutorial" }, { label: "Standing Figure-4 Lean", q: "standing figure 4 lean flying pigeon prep" }, { label: "Flying Pigeon Schritt fuer Schritt", q: "flying pigeon approach step by step" }] }
    ]
  }
];

const statusConfig = {
  solid:   { label: "Solide",     dot: "#34C759" },
  wip:     { label: "In Arbeit",  dot: "#EF9F27" },
  open:    { label: "Noch offen", dot: null },
  unknown: { label: "Unklar",     dot: null }
};

const PHASES = [
  {
    num: 1, title: "Foundation", weeks: "Woche 1-4", accent: "#1C3A5E", light: "#EEF3FA",
    days: [
      { tag: "Mo", session: "MCI Strength + Shoulder", focus: "Push - Schulter - Wrist Prep", note: "Wrist Prep IMMER vor Arm-Training.", exercises: [
        { name: "Wrist Circles", sets: "5 Min.", priority: false, emoji: "🤲", short: "Voller ROM, beide Richtungen", desc: "Kreise 10x innen/außen. Handflächen flach, Gewicht nach vorne, 5 Sek.", steps: ["Circles 10x innen, 10x außen", "Handflächen flach auf Boden", "Gewicht nach vorne 5 Sek.", "Finger spreizen"], watchQuery: "wrist warmup yoga beginner" },
        { name: "Scapula Push-ups", sets: "3x10", priority: true, emoji: "💪", short: "Schulterblätter aktiv im Plank", desc: "Plank, Arme gestreckt. Schulterblätter zusammenziehen dann weit auseinanderschieben.", steps: ["Plank, Arme gestreckt", "Schulterblätter zusammenziehen", "Dann weit auseinanderschieben", "10 Wdh. langsam"], watchQuery: "scapula pushup tutorial" },
        { name: "Slow Chaturanga Neg.", sets: "3x5", priority: true, emoji: "⬇️", short: "4 Sek. langsam absenken", desc: "Hohe Plank. Ellbogen eng am Körper auf 4 Sek. absenken bis Oberarme parallel.", steps: ["Hohe Plank", "Ellbogen eng an Körper", "4 Sek. langsam absenken", "Oberarme parallel"], watchQuery: "chaturanga tutorial slow negative" },
        { name: "Plank Hold", sets: "3x45 Sek.", priority: false, emoji: "🏋️", short: "Schulter-Hüfte-Fersen Linie", desc: "Handgelenke unter Schultern. Rippen schließen. Kein Hohlkreuz.", steps: ["Hände schulterbreit", "Rippen schließen", "Linie halten", "45 Sek."], watchQuery: "perfect plank form" },
        { name: "MCI Haupttraining", sets: "~40 Min.", priority: false, emoji: "💪", short: "Push Pattern nach Plan", desc: "Push-Tag: Brust, Schultern, Trizeps.", steps: ["Push Pattern", "Qualität vor Gewicht"], watchQuery: "push day workout" },
        { name: "Shoulder Flexion Stretch", sets: "3x45 Sek.", priority: false, emoji: "🙆", short: "Hände auf Block, Brust sinkt", desc: "Hände auf Block. Schritt zurück. Brust passiv sinken lassen.", steps: ["Hände auf Block", "Schritt zurück", "Brust sinken lassen", "45 Sek."], watchQuery: "shoulder flexion stretch block" }
      ]},
      { tag: "Di", session: "Yoga - Crow + Compression", focus: "Crow Approach - Core Compression", note: "KEY-Übungen nicht überspringen.", exercises: [
        { name: "Wrist Prep", sets: "5 Min.", priority: false, emoji: "🤲", short: "Circles, Extensions, Loading", desc: "Vollständiges Handgelenk-Warm-up.", steps: ["Circles 10x innen + außen", "Handrücken auf Boden", "Loading: Gewicht nach vorne", "Finger strecken"], watchQuery: "wrist warmup arm balance yoga" },
        { name: "Hollow Body Hold", sets: "3x20 Sek.", priority: false, emoji: "🍌", short: "LWS flach, Beine 30 cm hoch", desc: "LWS in Boden drücken. Beine 30 cm heben. Arme über Kopf.", steps: ["Rückenlage, LWS in Boden", "Beine gestreckt 30 cm", "Arme über Kopf", "LWS-Kontakt halten"], watchQuery: "hollow body hold gymnastics" },
        { name: "Seated Compression Pulse", sets: "90 Sek.", priority: false, emoji: "🧘", short: "Knie zur Brust, 2 Sek. halten", desc: "Sitzen, Beine gestreckt. Knie aktiv zur Brust, 2 Sek., loslassen. Rhythmisch.", steps: ["Sitzen, Beine gestreckt", "Knie aktiv zur Brust", "2 Sek. halten", "90 Sek. rhythmisch"], watchQuery: "hip flexor compression drill" },
        { name: "Tuck Hold", sets: "5x5 Sek.", priority: true, emoji: "⭐", short: "Schultern drücken, Knie maximal hoch", desc: "Hände neben Hüften. Schultern nach unten. Knie so hoch wie möglich, 5 Sek.", steps: ["Hände neben Hüften", "Schultern nach unten", "Knie maximal hoch", "5 Sek. kein Boden"], watchQuery: "tuck hold l-sit progression" },
        { name: "Crow Lean Drill", sets: "5x10 Sek.", priority: true, emoji: "🦅", short: "Schultern über Hände - Zehen am Boden", desc: "Tiefe Hocke. Knie außen an Oberarme. Schultern über Handgelenke. Zehen am Boden.", steps: ["Tiefe Hocke", "Knie außen an Oberarme", "Schultern über Hände", "10 Sek., Zehen am Boden"], watchQuery: "crow pose lean drill bakasana" },
        { name: "Crow Hop", sets: "5x3 Sek.", priority: true, emoji: "🐦", short: "Zehen heben sich - 1-2 Sek.", desc: "Aus Crow Lean: Gewicht weiter bis Zehen sich heben. Nicht springen.", steps: ["Aus Crow Lean", "Gewicht weiter vorne", "Zehen heben sich", "1-2 Sek., landen"], watchQuery: "crow pose first time tutorial" },
        { name: "Passive Pigeon", sets: "2 Min./Seite", priority: false, emoji: "🕊️", short: "Stirn auf Matte, entspannen", desc: "Pigeon, Stirn auf Matte. Kein Kämpfen.", steps: ["Pigeon-Position", "Oberkörper nach vorne", "Stirn auf Matte", "2 Min. entspannen"], watchQuery: "pigeon pose tutorial hips" }
      ]},
      { tag: "Mi", session: "Les Mills + Finisher", focus: "Kraft - L-Sit Finisher", note: "Finisher direkt nach Klasse.", exercises: [
        { name: "Les Mills / Barre", sets: "45-60 Min.", priority: false, emoji: "🎵", short: "Volle Intensität", desc: "Reguläre Klasse.", steps: ["Kursplan folgen"], watchQuery: "les mills bodycombat" },
        { name: "Tuck Hold auf Blöcken", sets: "4x5 Sek.", priority: true, emoji: "📦", short: "Blöcke geben Höhe", desc: "Zwei Blöcke. Schultern nach unten. Gesäß abheben.", steps: ["Blöcke mittlere Höhe", "Hände auf Blöcke", "Schultern nach unten", "Gesäß abheben 5 Sek."], watchQuery: "tuck hold yoga blocks" },
        { name: "Hip Flexor Isolation", sets: "3x12 Sek./Seite", priority: false, emoji: "🦵", short: "Knie hoch, Hand dagegen", desc: "Auf einem Bein. Knie hoch. Hand gegen Knie isometrisch.", steps: ["Auf einem Bein", "Knie maximal hoch", "Hand gegen Knie", "12 Sek."], watchQuery: "hip flexor isometric standing" }
      ]},
      { tag: "Do", session: "Mobility - Hüfte", focus: "Hüftöffnung - Pigeon - Splits", note: "Rotation IMMER aus der Hüfte, nie aus dem Knie.", exercises: [
        { name: "90/90 Rotations", sets: "2 Min.", priority: false, emoji: "↩️", short: "Hüfte aktiv rotieren", desc: "90/90. Oberkörper über Vorderbein, dann Hinterbein.", steps: ["90/90-Position", "Über Vorderbein", "Dann Hinterbein", "2-3 Sek."], watchQuery: "90 90 hip stretch tutorial" },
        { name: "Low Lunge", sets: "90 Sek./Seite", priority: false, emoji: "🏹", short: "Hüfte nach vorne-unten", desc: "Hinteres Knie am Boden. Hüfte nach vorne-unten.", steps: ["Hinteres Knie am Boden", "Hüfte nach vorne-unten", "Rücken lang", "90 Sek."], watchQuery: "low lunge hip flexor yoga" },
        { name: "Elevated Pigeon", sets: "2 Min./Seite", priority: true, emoji: "🧱", short: "Block unter Gesäß", desc: "Block unter Gesäß reduziert Knie-Stress. Oberkörper nach vorne.", steps: ["Pigeon-Position", "Block unter Gesäß", "Oberkörper nach vorne", "2 Min."], watchQuery: "pigeon pose block knee safe" },
        { name: "Adductor Rockbacks", sets: "2 Min.", priority: false, emoji: "🔀", short: "Frosch, vor/zurück", desc: "Knie weit auseinander. Nach hinten rocken und zurück.", steps: ["Knie weit auseinander", "Hände vor dir", "Nach hinten rocken", "2 Min."], watchQuery: "adductor frog rockback" },
        { name: "Half Splits", sets: "90 Sek./Seite", priority: false, emoji: "📐", short: "Fuß flexiert, Rücken gerade", desc: "Vorderes Bein strecken. Fuß flexiert.", steps: ["Vorderes Bein strecken", "Fuß flexieren", "Rücken gerade", "90 Sek."], watchQuery: "half splits yoga" },
        { name: "Double Pigeon", sets: "2 Min./Seite", priority: true, emoji: "🔗", short: "Schienbein über Schienbein", desc: "Schienbein auf Schienbein. Knie Richtung Boden.", steps: ["Unteres Bein parallel", "Oberes Schienbein drauf", "Knie Richtung Boden", "2 Min."], watchQuery: "double pigeon fire log pose" }
      ]},
      { tag: "Fr", session: "MCI + Inversion Prep", focus: "Pull - Inversion Vorbereitung", note: "Inversion Prep nach MCI.", exercises: [
        { name: "Wrist Prep", sets: "5 Min.", priority: false, emoji: "🤲", short: "Vollständig", desc: "Circles, Extensions, Loading.", steps: ["Circles", "Extensions", "Loading"], watchQuery: "wrist warmup" },
        { name: "MCI Haupttraining", sets: "~40 Min.", priority: false, emoji: "🏋️", short: "Pull Pattern", desc: "Pull-Tag.", steps: ["Pull Pattern"], watchQuery: "pull day workout" },
        { name: "Dolphin Hold", sets: "3x30 Sek.", priority: true, emoji: "🐬", short: "Unterarme parallel, Schultern aktiv", desc: "Unterarme parallel. Hüfte hoch. Schulterblätter zusammen.", steps: ["Unterarme parallel", "Hüfte hoch", "Schulterblätter zusammen", "30 Sek."], watchQuery: "dolphin pose headstand prep" },
        { name: "Dolphin Rocks", sets: "3x8", priority: false, emoji: "🌊", short: "Vor/zurück aus Dolphin", desc: "Aus Dolphin vor und zurück schieben.", steps: ["Dolphin", "Nach vorne", "Zurück", "8 Wdh."], watchQuery: "dolphin rocks forearm balance" },
        { name: "Forearm Plank", sets: "3x40 Sek.", priority: false, emoji: "📏", short: "Körperlinie auf Unterarmen", desc: "Unterarme. Körperlinie. Core aktiv.", steps: ["Unterarme", "Körperlinie", "Core aktiv", "40 Sek."], watchQuery: "forearm plank core" }
      ]},
      { tag: "Sa", session: "Yoga - Full Practice", focus: "Crow + Compression", note: "Samstag = Hauptsession.", exercises: [
        { name: "Vollständiges Warm-Up", sets: "10 Min.", priority: false, emoji: "🌅", short: "Wrist + Mobilisation + Core", desc: "3 Min. Wrist + 2 Min. Cat-Cow + 2 Min. Shoulders + 3 Min. Core.", steps: ["3 Min. Wrist", "2 Min. Cat-Cow", "2 Min. Shoulders", "3 Min. Core"], watchQuery: "yoga warmup full" },
        { name: "Compression Routine", sets: "8 Min.", priority: true, emoji: "⭐", short: "Tuck 5x5 + Hollow + Pulses", desc: "Pulses 90 Sek. → Tuck 5x5 → Hollow 3x20.", steps: ["Pulses 90 Sek.", "Tuck 5x5 Sek.", "Hollow 3x20 Sek."], watchQuery: "core compression crow routine" },
        { name: "Crow Skill-Arbeit", sets: "15 Min.", priority: true, emoji: "🦅", short: "Lean → Hop → Holds", desc: "5 Min. Lean → 5 Min. Hops → 5 Min. Holds. 60 Sek. Pause.", steps: ["5 Min. Lean", "5 Min. Hops", "5 Min. Holds", "60 Sek. Pause"], watchQuery: "crow pose progression tutorial" },
        { name: "Hüftöffner-Serie", sets: "15 Min.", priority: false, emoji: "🕊️", short: "Lizard → Pigeon → Double Pigeon", desc: "Lizard 90 Sek. → Pigeon 2 Min. → Double Pigeon 2 Min.", steps: ["Lizard 90 Sek./Seite", "Pigeon 2 Min./Seite", "Double Pigeon 2 Min./Seite"], watchQuery: "hip opening yoga sequence" },
        { name: "Cool-Down", sets: "10 Min.", priority: false, emoji: "🌙", short: "Yin, Savasana", desc: "Yin + Savasana.", steps: ["Yin 7 Min.", "Savasana 3 Min."], watchQuery: "yoga cooldown yin" }
      ]},
      { tag: "So", session: "Active Recovery", focus: "Regeneration", note: "Kein Druck. Yin oder Pause.", exercises: [
        { name: "Yin Yoga oder Pause", sets: "30-45 Min.", priority: false, emoji: "😴", short: "Lange Haltungen oder Pause", desc: "Pigeon 4 Min./Seite, Butterfly, Child's Pose, Savasana.", steps: ["Pigeon 4 Min./Seite", "Butterfly 4 Min.", "Child's Pose", "Savasana"], watchQuery: "yin yoga full class" },
        { name: "Compression Check", sets: "2 Min.", priority: false, emoji: "📊", short: "Optional: 3x Tuck Hold 5 Sek.", desc: "Nur spüren.", steps: ["3x Tuck Hold 5 Sek."], watchQuery: "tuck hold" }
      ]}
    ]
  },
  {
    num: 2, title: "Skill Building", weeks: "Woche 5-8", accent: "#2D5A3D", light: "#EEF6F1",
    days: [
      { tag: "Mo", session: "MCI + Handstand", focus: "Push - Handstand Conditioning", note: "Handstand nach MCI.", exercises: [
        { name: "Wrist Prep + Loading", sets: "8 Min.", priority: false, emoji: "🤲", short: "Vollständig + Loading", desc: "Loading 5x5 Sek.", steps: ["Circles, Extensions", "Loading 5x5"], watchQuery: "wrist loading handstand" },
        { name: "MCI Haupttraining", sets: "~40 Min.", priority: false, emoji: "🏋️", short: "Push Pattern", desc: "Push-Tag.", steps: ["Push Pattern"], watchQuery: "push workout" },
        { name: "Wall Handstand Hold", sets: "5x20 Sek.", priority: true, emoji: "🤸", short: "Bauch-zur-Wand, dann rückwärts", desc: "3x Bauch-zur-Wand. 2x Rückwärts.", steps: ["3x Bauch-zur-Wand", "2x Rückwärts", "Schultern drücken", "20 Sek."], watchQuery: "wall handstand tutorial" },
        { name: "Shoulder Tap Handstand", sets: "3x5 Taps", priority: true, emoji: "👋", short: "Hand abheben", desc: "Wall Handstand. Hand 2 cm abheben, 2-3 Sek.", steps: ["Wall Handstand", "Hand 2 cm heben", "2-3 Sek.", "Wechseln"], watchQuery: "handstand shoulder tap" }
      ]},
      { tag: "Di", session: "Yoga - Crow + L-Sit", focus: "Crow 10 Sek. - L-Sit Progression", note: "Crow-Ziel: 10 Sek.", exercises: [
        { name: "Wrist Prep", sets: "5 Min.", priority: false, emoji: "🤲", short: "Vollständig", desc: "Circles, Extensions, Loading.", steps: ["Vollständig"], watchQuery: "wrist warmup" },
        { name: "Compression Routine", sets: "8 Min.", priority: true, emoji: "⭐", short: "Tuck 5x8 + One Leg Extended", desc: "Pulses + Tuck 5x8 + One Leg Extended 4x5.", steps: ["Pulses 90 Sek.", "Tuck 5x8 Sek.", "One Leg Extended"], watchQuery: "l-sit one leg extended" },
        { name: "Crow Hold", sets: "6x max.", priority: true, emoji: "🦅", short: "Ziel: 10 Sek.", desc: "Crow Hold. Ziel 10 Sek. 60 Sek. Pause.", steps: ["Crow", "Max. Hold", "60 Sek. Pause"], watchQuery: "crow pose 10 seconds" },
        { name: "Passive Pigeon", sets: "2 Min./Seite", priority: false, emoji: "🕊️", short: "Entspannen", desc: "2 Min./Seite.", steps: ["Pigeon", "2 Min."], watchQuery: "pigeon pose" }
      ]},
      { tag: "Mi", session: "Les Mills + L-Sit", focus: "Kraft - L-Sit Steigerung", note: "Ein Bein extended wenn Tuck 8 Sek. sitzt.", exercises: [
        { name: "Les Mills / Barre", sets: "45-60 Min.", priority: false, emoji: "🎵", short: "Volle Intensität", desc: "Reguläre Klasse.", steps: ["Kursplan"], watchQuery: "les mills" },
        { name: "One Leg Extended", sets: "4x5 Sek.", priority: true, emoji: "🦵", short: "Ein Bein strecken", desc: "Aus Tuck: ein Bein strecken, anderes Knie hoch.", steps: ["Tuck Hold", "Ein Bein strecken", "Anderes Knie hoch", "5 Sek."], watchQuery: "one leg extended l-sit" },
        { name: "Crow Pulse", sets: "3x10", priority: false, emoji: "🔄", short: "Hüfte 2-3 cm heben/senken", desc: "Crow. Hüfte rhythmisch. Zehen am Boden.", steps: ["Crow", "Zehen am Boden", "Hüfte 2-3 cm", "10 Wdh."], watchQuery: "crow pulse drill" }
      ]},
      { tag: "Do", session: "Mobility + Headstand", focus: "Hüfte tiefer - Headstand einführen", note: "Headstand nur wenn Dolphin 45 Sek. stabil!", exercises: [
        { name: "Double Pigeon", sets: "3 Min./Seite", priority: true, emoji: "🔗", short: "3 Min. tiefer", desc: "3 Min./Seite.", steps: ["Schienbein über Schienbein", "3 Min."], watchQuery: "double pigeon deeper" },
        { name: "Dolphin Hold", sets: "3x45 Sek.", priority: false, emoji: "🐬", short: "45 Sek. - Headstand Basis", desc: "45 Sek.", steps: ["Unterarme", "Hüfte hoch", "45 Sek."], watchQuery: "dolphin hold" },
        { name: "Headstand Approach", sets: "5x5 Sek.", priority: true, emoji: "🙃", short: "Kopf auf Matte, Knie zur Brust", desc: "Dolphin → Kopf auf Matte → Knie zur Brust. Gewicht auf UNTERARMEN.", steps: ["Dolphin", "Kopf auf Matte", "Hüfte hoch", "Knie zur Brust 5 Sek."], watchQuery: "headstand tutorial beginners" }
      ]},
      { tag: "Fr", session: "MCI + Pincha Approach", focus: "Pull - Forearm Balance", note: "Pincha erst wenn Headstand stabil.", exercises: [
        { name: "Wrist Prep", sets: "5 Min.", priority: false, emoji: "🤲", short: "Vollständig", desc: "Vollständig.", steps: ["Vollständig"], watchQuery: "wrist prep" },
        { name: "MCI Haupttraining", sets: "~40 Min.", priority: false, emoji: "🏋️", short: "Pull Pattern", desc: "Pull-Tag.", steps: ["Pull Pattern"], watchQuery: "pull workout" },
        { name: "Forearm Balance Approach", sets: "4x10 Sek.", priority: true, emoji: "🤸", short: "Unterarme parallel, Hüfte hoch", desc: "Pincha Approach. 10 Sek.", steps: ["Unterarme parallel", "Hüfte hoch", "Schulterblätter zusammen", "10 Sek."], watchQuery: "pincha mayurasana tutorial" },
        { name: "Forearm Plank", sets: "3x50 Sek.", priority: false, emoji: "📏", short: "50 Sek.", desc: "50 Sek.", steps: ["Unterarme", "50 Sek."], watchQuery: "forearm plank" }
      ]},
      { tag: "Sa", session: "Yoga - Full Practice P2", focus: "Crow 15 Sek. - Headstand - Side Crow", note: "Crow-Ziel: 15 Sek. Side Crow neu.", exercises: [
        { name: "Compression Routine", sets: "8 Min.", priority: true, emoji: "⭐", short: "Phase 2", desc: "Tuck 5x8 + One Leg Extended + Hollow 3x25.", steps: ["Tuck 5x8", "One Leg Extended", "Hollow 3x25"], watchQuery: "compression yoga" },
        { name: "Crow Skill-Arbeit", sets: "15 Min.", priority: true, emoji: "🦅", short: "Ziel: 15 Sek.", desc: "15 Sek. Ziel.", steps: ["Hold-Versuche", "15 Sek. Ziel"], watchQuery: "crow 15 seconds" },
        { name: "Side Crow Approach", sets: "4x5 Sek.", priority: false, emoji: "🌀", short: "Beide Knie auf einen Arm", desc: "Rotation aus der Hüfte.", steps: ["Tiefe Hocke", "Beide Knie auf einen Arm", "Rotation aus Hüfte"], watchQuery: "side crow tutorial" },
        { name: "Headstand", sets: "4x10 Sek.", priority: false, emoji: "🙃", short: "Freistellend oder Wand", desc: "10 Sek.", steps: ["Headstand", "10 Sek."], watchQuery: "headstand hold" },
        { name: "Cool-Down", sets: "10 Min.", priority: false, emoji: "🌙", short: "Yin, Savasana", desc: "Yin + Savasana.", steps: ["Yin 7 Min.", "Savasana 3 Min."], watchQuery: "yoga cooldown" }
      ]},
      { tag: "So", session: "Active Recovery", focus: "Regeneration", note: "Komplett erholen.", exercises: [
        { name: "Yin oder Pause", sets: "30-45 Min.", priority: false, emoji: "😴", short: "Yin oder Pause", desc: "Yin oder Pause.", steps: ["Yin oder Pause"], watchQuery: "yin yoga" }
      ]}
    ]
  },
  {
    num: 3, title: "Integration", weeks: "Woche 9-12", accent: "#5C3A1E", light: "#F6F0EA",
    days: [
      { tag: "Mo", session: "MCI + Handstand Daily", focus: "Push - Handstand täglich", note: "Handstand täglich in Phase 3.", exercises: [
        { name: "Wrist Prep", sets: "8 Min.", priority: false, emoji: "🤲", short: "Intensiv + Loading", desc: "Intensiveres Loading.", steps: ["Circles, Extensions", "Loading intensiv"], watchQuery: "wrist handstand prep" },
        { name: "MCI Haupttraining", sets: "~40 Min.", priority: false, emoji: "🏋️", short: "Push Pattern", desc: "Push-Tag.", steps: ["Push Pattern"], watchQuery: "push workout" },
        { name: "Wall Handstand Hold", sets: "5x25 Sek.", priority: true, emoji: "🤸", short: "Rückwärts - 25 Sek.", desc: "Rückwärts. Rippen schließen.", steps: ["Rückwärts zur Wand", "Rippen schließen", "25 Sek."], watchQuery: "wall handstand back to wall" },
        { name: "Kick-Up Technik", sets: "10 Versuche", priority: true, emoji: "⬆️", short: "Kontrolliert - kein Schwung", desc: "Ein Bein führt, kein Schwung.", steps: ["Ein Bein führt", "Anderes folgt", "Kein Schwung"], watchQuery: "handstand kick up controlled" }
      ]},
      { tag: "Di", session: "Yoga - Crow + Firefly", focus: "Crow 20 Sek. - Firefly - L-Sit", note: "Firefly erst wenn Crow stabil + L-Sit 5 Sek.", exercises: [
        { name: "Compression Routine", sets: "8 Min.", priority: true, emoji: "⭐", short: "L-Sit + Hollow 30 Sek.", desc: "L-Sit Attempt 5x5 + Hollow 3x30.", steps: ["L-Sit 5x5", "Hollow 3x30"], watchQuery: "l-sit tutorial" },
        { name: "Crow Hold", sets: "5x max.", priority: true, emoji: "🦅", short: "Ziel: 20 Sek.", desc: "20 Sek. Ziel. 60 Sek. Pause.", steps: ["Crow", "20 Sek. Ziel", "60 Sek. Pause"], watchQuery: "crow 20 seconds" },
        { name: "Firefly Approach", sets: "4x8 Sek.", priority: true, emoji: "🔥", short: "Arme unter Beine", desc: "Vorwärtsbeuge. Arme unter Beine. Gewicht nach vorne.", steps: ["Tiefe Vorwärtsbeuge", "Arme unter Beine", "Hände auf Boden", "Gewicht nach vorne"], watchQuery: "firefly pose tittibhasana" },
        { name: "Passive Pigeon", sets: "2 Min./Seite", priority: false, emoji: "🕊️", short: "Entspannen", desc: "2 Min./Seite.", steps: ["Pigeon", "2 Min."], watchQuery: "pigeon pose" }
      ]},
      { tag: "Mi", session: "Les Mills + L-Sit", focus: "Kraft - L-Sit Hold", note: "Ziel: beidseitiger L-Sit Hold.", exercises: [
        { name: "Les Mills / Barre", sets: "45-60 Min.", priority: false, emoji: "🎵", short: "Volle Intensität", desc: "Reguläre Klasse.", steps: ["Kursplan"], watchQuery: "les mills" },
        { name: "L-Sit Attempt", sets: "5x max.", priority: true, emoji: "⭐", short: "Beide Beine parallel", desc: "Beide Beine parallel. Auch 1 Sek. zählt.", steps: ["Hände auf Blöcken", "Schultern drücken", "Beide Beine parallel", "Max. Hold"], watchQuery: "l-sit tutorial full" },
        { name: "Tuck Jump to Hold", sets: "4x6", priority: false, emoji: "🦘", short: "Knie zur Brust aus Hocke", desc: "Füße abheben. Knie zur Brust. 1 Sek.", steps: ["Tiefe Hocke", "Füße abheben", "Knie zur Brust", "1 Sek."], watchQuery: "tuck jump hip flexion" }
      ]},
      { tag: "Do", session: "Mobility - Splits + Flying Pigeon", focus: "Full Splits - Flying Pigeon", note: "Flying Pigeon erst wenn Double Pigeon entspannt + Crow stabil.", exercises: [
        { name: "Double Pigeon", sets: "3 Min./Seite", priority: true, emoji: "🔗", short: "Tiefer, Block weglassen", desc: "3 Min./Seite.", steps: ["Schienbein über Schienbein", "3 Min."], watchQuery: "double pigeon deep" },
        { name: "Full Splits Approach", sets: "3-5 Min.", priority: true, emoji: "🤸", short: "Blöcke, täglich tiefer", desc: "Blöcke. Hüfte quadratisch. Täglich tiefer.", steps: ["Blöcke unter Händen", "Hüfte quadratisch", "Täglich tiefer"], watchQuery: "full splits progression" },
        { name: "Standing Figure-4 Lean", sets: "3x8 Sek.", priority: true, emoji: "4️⃣", short: "Gewicht nach vorne", desc: "Auf einem Bein. Knöchel auf Oberschenkel. Oberkörper nach vorne.", steps: ["Auf einem Bein", "Knöchel auf Oberschenkel", "Standbein beugen", "Oberkörper nach vorne"], watchQuery: "standing figure 4 flying pigeon" },
        { name: "Figure-4 auf Blöcken", sets: "4x8 Sek.", priority: false, emoji: "🧱", short: "Hände auf Blöcken", desc: "Wie oben, mit Blöcken.", steps: ["Blöcke", "Figure-4 tiefer", "8 Sek."], watchQuery: "flying pigeon blocks" }
      ]},
      { tag: "Fr", session: "MCI + Pincha / Handstand", focus: "Pull - Forearm Balance 15 Sek.", note: "Pincha-Ziel: 15-20 Sek.", exercises: [
        { name: "Wrist Prep", sets: "5 Min.", priority: false, emoji: "🤲", short: "Vollständig", desc: "Vollständig.", steps: ["Vollständig"], watchQuery: "wrist prep" },
        { name: "MCI Haupttraining", sets: "~40 Min.", priority: false, emoji: "🏋️", short: "Pull Pattern", desc: "Pull-Tag.", steps: ["Pull Pattern"], watchQuery: "pull workout" },
        { name: "Forearm Balance Hold", sets: "4x15 Sek.", priority: true, emoji: "🤸", short: "Pincha 15 Sek.", desc: "Pincha gegen Wand. 15 Sek.", steps: ["Unterarme parallel", "Hüfte über Schultern", "15 Sek."], watchQuery: "pincha hold tutorial" },
        { name: "Kick-Up", sets: "8 Versuche", priority: false, emoji: "⬆️", short: "Kontrolliert", desc: "Kontrolliert.", steps: ["Ein Bein führt", "Kontrolliert"], watchQuery: "handstand kick up" }
      ]},
      { tag: "Sa", session: "Yoga - Full Integration", focus: "Flying Pigeon - Crow 20 Sek.", note: "Alle Skills zusammenbringen.", exercises: [
        { name: "Compression Routine", sets: "8 Min.", priority: true, emoji: "⭐", short: "L-Sit + Hollow 30 Sek.", desc: "L-Sit 5x max. + Hollow 3x30.", steps: ["L-Sit 5x max.", "Hollow 3x30"], watchQuery: "l-sit compression" },
        { name: "Crow + Firefly", sets: "15 Min.", priority: true, emoji: "🦅", short: "Crow 20 Sek. → Firefly", desc: "Crow 20 Sek. → Firefly.", steps: ["Crow 20 Sek.", "Firefly danach"], watchQuery: "crow firefly transition" },
        { name: "Flying Pigeon Approach", sets: "10 Min.", priority: true, emoji: "🕊️", short: "Figure-4 → Blöcke → Gewicht auf Hände", desc: "Standing Figure-4 → Blöcke → Gewicht auf Hände.", steps: ["Standing Figure-4 3x8", "Figure-4 Blöcke 4x8", "Gewicht auf Hände"], watchQuery: "flying pigeon tutorial" },
        { name: "Wheel Pose", sets: "3x5 Atemzüge", priority: false, emoji: "⭕", short: "Nur wenn Schulter-Test OK", desc: "Nur wenn OK. Sonst Bridge.", steps: ["Hände neben Kopf", "Arme strecken", "5 Atemzüge"], watchQuery: "wheel pose yoga" },
        { name: "Cool-Down", sets: "10 Min.", priority: false, emoji: "🌙", short: "Yin, Savasana", desc: "Yin + Savasana.", steps: ["Yin 7 Min.", "Savasana 3 Min."], watchQuery: "yoga cooldown" }
      ]},
      { tag: "So", session: "Active Recovery", focus: "Regeneration - Diagnose Wo. 12", note: "Woche 12: Alle 5 Tests.", exercises: [
        { name: "Yin Yoga oder Pause", sets: "30-45 Min.", priority: false, emoji: "😴", short: "Yin oder Pause", desc: "Yin oder Pause.", steps: ["Yin oder Pause"], watchQuery: "yin yoga" },
        { name: "Diagnosetest (Wo. 12)", sets: "20 Min.", priority: false, emoji: "📋", short: "Alle 5 Tests", desc: "Alle 5 Tests.", steps: ["Hip Compression", "External Rotation", "Ankle Dorsiflexion", "Shoulder Flexion", "Hamstring SLR"], watchQuery: "yoga flexibility test" }
      ]}
    ]
  }
];

const DAYS = ["Mo","Di","Mi","Do","Fr","Sa","So"];

function SkillMap() {
  const [openPose, setOpenPose] = useState(null);
  const [openTree, setOpenTree] = useState(null);
  return (
    <div style={{padding:"12px 16px",paddingBottom:"30px"}}>
      {SKILL_TREES.map(tree => (
        <div key={tree.id} style={{marginBottom:"12px"}}>
          <button onClick={()=>setOpenTree(openTree===tree.id?null:tree.id)} style={{width:"100%",background:tree.light,border:`1.5px solid ${tree.color}33`,borderRadius:"14px",padding:"12px 16px",textAlign:"left",cursor:"pointer",fontFamily:"inherit",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontSize:"13px",fontWeight:700,color:tree.color}}>{tree.id} · {tree.name}</div>
              <div style={{fontSize:"11px",color:tree.color+"88",marginTop:"2px"}}>{tree.poses.length} Posen</div>
            </div>
            <span style={{fontSize:"11px",color:tree.color+"77",transform:openTree===tree.id?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▼</span>
          </button>
          {openTree===tree.id && (
            <div style={{padding:"10px 14px",background:"#fff",borderRadius:"12px",margin:"6px 0",fontSize:"13px",color:"#3A3A3C",lineHeight:1.55,boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}}>{tree.desc}</div>
          )}
          {tree.poses.map(pose => {
            const sc = statusConfig[pose.status];
            const key = `${tree.id}-${pose.name}`;
            const isOpen = openPose===key;
            return (
              <div key={pose.name} style={{marginTop:"6px",background:"#fff",borderRadius:"14px",overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",border:pose.priority?`1.5px solid ${tree.color}55`:"1px solid #E5E5EA"}}>
                <button onClick={()=>setOpenPose(isOpen?null:key)} style={{width:"100%",padding:"12px 14px",background:"transparent",border:"none",textAlign:"left",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:"10px"}}>
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
                    <div style={{marginBottom:"14px"}}>
                      <div style={{fontSize:"10px",fontWeight:700,color:"#8E8E93",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"6px"}}>Warum diese Pose</div>
                      <p style={{fontSize:"13px",color:"#3A3A3C",lineHeight:1.6,margin:0}}>{pose.why}</p>
                    </div>
                    <div style={{marginBottom:"14px",padding:"10px 12px",background:"#FFF9F0",borderRadius:"10px",borderLeft:`3px solid ${tree.color}`}}>
                      <div style={{fontSize:"10px",fontWeight:700,color:tree.color,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"6px"}}>Nächster Schritt</div>
                      <p style={{fontSize:"13px",color:"#3A3A3C",lineHeight:1.6,margin:0}}>{pose.missing}</p>
                    </div>
                    {pose.connects && pose.connects.length > 0 && (
                      <div style={{marginBottom:"14px"}}>
                        <div style={{fontSize:"10px",fontWeight:700,color:"#8E8E93",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"8px"}}>Verbunden mit</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
                          {pose.connects.map(c=>(
                            <span key={c} style={{fontSize:"12px",background:tree.light,color:tree.color,padding:"4px 10px",borderRadius:"20px",fontWeight:500}}>{c}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {pose.videos && pose.videos.length > 0 && (
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
      ))}
    </div>
  );
}

function Training() {
  const [phase,setPhase] = useState(0);
  const [day,setDay] = useState(()=>{const d=new Date().getDay();return d===0?6:d-1;});
  const [checked,setChecked] = useState({});
  const [openEx,setOpenEx] = useState(null);
  const cur = PHASES[phase].days[day];
  const accent = PHASES[phase].accent;
  const al = PHASES[phase].light;
  const done = cur.exercises.filter((_,i)=>checked[`${phase}-${day}-${i}`]).length;
  const total = cur.exercises.length;
  const pct = total>0?(done/total)*100:0;
  const ck = k => setChecked(p=>({...p,[k]:!p[k]}));
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
                {tag}
                {allDone&&<span style={{width:"4px",height:"4px",borderRadius:"50%",background:"#34C759",display:"block"}}/>}
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
                <div onClick={e=>{e.stopPropagation();ck(k);}} style={{width:"26px",height:"26px",borderRadius:"50%",border:isCk?"none":`2px solid ${accent}44`,background:isCk?accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer",transition:"all 0.2s"}}>
                  {isCk&&<svg width="12" height="9" viewBox="0 0 12 9"><path d="M1 4.5L4.5 8L11 1" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span style={{fontSize:"19px",flexShrink:0}}>{ex.emoji}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:"5px",marginBottom:"1px"}}>
                    <span style={{fontSize:"14px",fontWeight:600,color:isCk?"#8E8E93":"#1C1C1E",textDecoration:isCk?"line-through":"none"}}>{ex.name}</span>
                    {ex.priority&&<span style={{fontSize:"9px",fontWeight:700,color:"#FF3B30",background:"#FFF0EE",padding:"2px 5px",borderRadius:"5px"}}>KEY</span>}
                  </div>
                  <div style={{fontSize:"11px",color:"#8E8E93"}}>{ex.short}</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px",flexShrink:0}}>
                  <span style={{fontSize:"11px",fontWeight:700,color:accent,background:al,padding:"3px 8px",borderRadius:"7px",whiteSpace:"nowrap"}}>{ex.sets}</span>
                  <span style={{fontSize:"9px",color:"#CCC",transform:isOp?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▼</span>
                </div>
              </div>
              {isOp&&(
                <div style={{borderTop:"1px solid #F2F2F7",padding:"14px 16px"}}>
                  <p style={{fontSize:"14px",color:"#3A3A3C",lineHeight:1.65,margin:"0 0 12px"}}>{ex.desc}</p>
                  <div style={{marginBottom:"12px"}}>
                    <div style={{fontSize:"10px",fontWeight:700,color:"#8E8E93",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"8px"}}>Schritt für Schritt</div>
                    {ex.steps.map((s,si)=>(
                      <div key={si} style={{display:"flex",gap:"9px",marginBottom:"6px",alignItems:"flex-start"}}>
                        <span style={{width:"20px",height:"20px",borderRadius:"50%",background:al,color:accent,fontSize:"11px",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{si+1}</span>
                        <span style={{fontSize:"13px",color:"#1C1C1E",lineHeight:1.5,paddingTop:"2px"}}>{s}</span>
                      </div>
                    ))}
                  </div>
                  <a href={"https://www.youtube.com/results?search_query="+encodeURIComponent(ex.watchQuery)} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 14px",background:"#FFF5F5",borderRadius:"12px",textDecoration:"none"}}>
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
          setChecked(prev=>{const n={...prev};all?keys.forEach(k=>delete n[k]):keys.forEach(k=>{n[k]=true;});return n;});
        }} style={{width:"100%",padding:"14px",background:pct===100?"#34C759":accent,border:"none",borderRadius:"14px",color:"#fff",fontSize:"15px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",transition:"background 0.3s"}}>
          {pct===100?"✓ Training abgeschlossen!":"Alle "+total+" Übungen markieren"}
        </button>
      </div>
    </>
  );
}

export default function App() {
  const [tab,setTab] = useState("training");
  return (
    <div style={{fontFamily:"-apple-system,'SF Pro Display',BlinkMacSystemFont,sans-serif",background:"#F2F2F7",minHeight:"100vh",maxWidth:"430px",margin:"0 auto"}}>
      <div style={{background:"#fff",borderBottom:"1px solid #E5E5EA",display:"flex",position:"sticky",top:0,zIndex:200}}>
        <button onClick={()=>setTab("training")} style={{flex:1,padding:"14px",background:"transparent",border:"none",borderBottom:tab==="training"?"2px solid #1C3A5E":"2px solid transparent",color:tab==="training"?"#1C3A5E":"#8E8E93",fontSize:"13px",fontWeight:tab==="training"?700:500,cursor:"pointer",fontFamily:"inherit"}}>
          🗓 Training
        </button>
        <button onClick={()=>setTab("skillmap")} style={{flex:1,padding:"14px",background:"transparent",border:"none",borderBottom:tab==="skillmap"?"2px solid #1C3A5E":"2px solid transparent",color:tab==="skillmap"?"#1C3A5E":"#8E8E93",fontSize:"13px",fontWeight:tab==="skillmap"?700:500,cursor:"pointer",fontFamily:"inherit"}}>
          🗺 Skill Map
        </button>
      </div>
      {tab==="training" ? <Training/> : <SkillMap/>}
    </div>
  );
}
