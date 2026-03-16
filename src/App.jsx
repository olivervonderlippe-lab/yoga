import { useState } from "react";

const PHASES = [
  {
    num: 1, title: "Foundation", weeks: "Woche 1-4",
    accent: "#1C3A5E", light: "#EEF3FA",
    days: [
      {
        tag: "Mo", session: "MCI Strength + Shoulder",
        focus: "Push Pattern - Schulter - Wrist Prep",
        note: "Wrist Prep IMMER vor Arm-Training.",
        exercises: [
          { name: "Wrist Circles", sets: "5 Min.", priority: false, emoji: "🤲", short: "Voller ROM, beide Richtungen", desc: "Kreise die Handgelenke 10x nach innen und außen. Dann Handflächen flach auf den Boden - Gewicht langsam nach vorne bis du ein Ziehen spuerst. 5 Sek. halten.", steps: ["Circles 10x innen, 10x außen", "Handflächen flach auf Boden", "Gewicht nach vorne, 5 Sek.", "Finger spreizen"], watchQuery: "wrist warmup yoga beginner" },
          { name: "Scapula Push-ups", sets: "3x10", priority: true, emoji: "💪", short: "Schulterblätter aktiv im Plank", desc: "Plank, Arme gestreckt. Schulterblätter zusammenziehen dann so weit wie möglich auseinanderschieben (Protraction). Arme bleiben die ganze Zeit gestreckt.", steps: ["Plank, Arme gestreckt", "Schulterblätter zusammenziehen", "Dann weit auseinanderschieben", "10 Wdh. langsam"], watchQuery: "scapula pushup tutorial" },
          { name: "Slow Chaturanga Neg.", sets: "3x5", priority: true, emoji: "⬇️", short: "4 Sek. langsam absenken", desc: "Hohe Plank. Ellbogen eng am Körper auf 4 Sek. absenken bis Oberarme parallel. Hüfte weder sinken noch hochziehen.", steps: ["Hohe Plank", "Ellbogen eng an Körper", "4 Sek. langsam absenken", "Oberarme parallel"], watchQuery: "chaturanga tutorial slow negative" },
          { name: "Plank Hold", sets: "3x45 Sek.", priority: false, emoji: "🏋️", short: "Schulter-Hufte-Fersen Linie", desc: "Handgelenke unter Schultern. Rippen schließen. Kein Hohlkreuz, kein Hochziehen.", steps: ["Hände schulterbreit", "Rippen schließen, Core aktiv", "Linie halten", "45 Sek. atmen"], watchQuery: "perfect plank form" },
          { name: "MCI Haupttraining", sets: "~40 Min.", priority: false, emoji: "💪", short: "Push Pattern nach Plan", desc: "Push-Tag: Brust, Schultern, Trizeps. Qualität vor Gewicht.", steps: ["Push Pattern nach Plan", "Qualität vor Gewicht"], watchQuery: "push day workout" },
          { name: "Shoulder Flexion Stretch", sets: "3x45 Sek.", priority: false, emoji: "🙆", short: "Hände auf Block, Brust sinkt passiv", desc: "Hände auf Block/Stuhl. Schritt zurück. Brust passiv Richtung Boden sinken lassen. Tiefes Dehngefühl in Schultern.", steps: ["Hände auf Block/Stuhl", "Schritt zurücktreten", "Brust passiv sinken", "45 Sek."], watchQuery: "shoulder flexion stretch block" }
        ]
      },
      {
        tag: "Di", session: "Yoga - Crow + Compression",
        focus: "Crow Approach - Core Compression",
        note: "KEY-Übungen nicht überspringen - das ist der Kern.",
        exercises: [
          { name: "Wrist Prep", sets: "5 Min.", priority: false, emoji: "🤲", short: "Circles, Extensions, Loading", desc: "Vollständiges Handgelenk-Warm-up: Circles, Handrücken auf Boden, Wrist Loading.", steps: ["Circles 10x innen + außen", "Handrücken auf Boden", "Loading: Gewicht nach vorne", "Finger strecken"], watchQuery: "wrist warmup arm balance yoga" },
          { name: "Hollow Body Hold", sets: "3x20 Sek.", priority: false, emoji: "🍌", short: "LWS flach, Beine 30 cm hoch", desc: "Rückenlage. LWS in den Boden drücken. Beine 30 cm heben. Arme über Kopf. LWS-Kontakt halten.", steps: ["Rückenlage, LWS in Boden", "Beine gestreckt 30 cm heben", "Arme über Kopf", "LWS-Kontakt halten"], watchQuery: "hollow body hold gymnastics" },
          { name: "Seated Compression Pulse", sets: "90 Sek.", priority: false, emoji: "🧘", short: "Knie zur Brust, 2 Sek. halten", desc: "Sitzen, Beine gestreckt. Knie aktiv zur Brust, 2 Sek. halten, loslassen. Rhythmisch, keine Arme.", steps: ["Sitzen, Beine gestreckt", "Knie aktiv zur Brust (keine Arme)", "2 Sek. halten", "90 Sek. rhythmisch"], watchQuery: "hip flexor compression drill" },
          { name: "Tuck Hold", sets: "5x5 Sek.", priority: true, emoji: "⭐", short: "Schultern drücken, Knie maximal hoch", desc: "Hände neben Hüften. Schultern nach unten drücken. Knie so hoch wie möglich - 5 Sek., kein Bodenkontakt. Direkteste Crow-Vorbereitung.", steps: ["Hände neben Hüften", "Schultern nach unten drücken", "Knie maximal hoch heben", "5 Sek. - kein Boden"], watchQuery: "tuck hold l-sit progression" },
          { name: "Crow Lean Drill", sets: "5x10 Sek.", priority: true, emoji: "🦅", short: "Schultern über Hände - Zehen am Boden", desc: "Tiefe Hocke. Knie außen an Oberarme. Gewicht nach vorne bis Schultern über Handgelenken. Zehen bleiben am Boden. Du übst den Schwerpunkt.", steps: ["Tiefe Hocke, Hände schulterbreit", "Knie außen an Oberarme", "Gewicht nach vorne", "10 Sek., Zehen am Boden"], watchQuery: "crow pose lean drill bakasana" },
          { name: "Crow Hop", sets: "5x3 Sek.", priority: true, emoji: "🐦", short: "Zehen heben sich - 1-2 Sek. halten", desc: "Aus Crow Lean: Gewicht weiter vor bis Zehen sich heben. 1-2 Sek. kontrolliert halten. Kein Sprung.", steps: ["Aus Crow Lean", "Gewicht weiter nach vorne", "Zehen heben sich", "1-2 Sek., kontrolliert landen"], watchQuery: "crow pose first time tutorial" },
          { name: "Passive Pigeon", sets: "2 Min./Seite", priority: false, emoji: "🕊️", short: "Stirn auf Matte, vollständig entspannen", desc: "Pigeon-Position. Oberkörper nach vorne, Stirn auf Matte. Kein Kämpfen.", steps: ["Pigeon-Position", "Oberkörper nach vorne", "Stirn auf Matte", "2 Min. entspannen"], watchQuery: "pigeon pose tutorial hips" }
        ]
      },
      {
        tag: "Mi", session: "Les Mills + Finisher",
        focus: "Kraft - L-Sit Finisher",
        note: "Finisher direkt nach Klasse - nicht auslassen.",
        exercises: [
          { name: "Les Mills / Barre", sets: "45-60 Min.", priority: false, emoji: "🎵", short: "Volle Intensität nach Kursplan", desc: "Reguläre Klasse nach Studio-Plan.", steps: ["Kursplan folgen", "Volle Intensität"], watchQuery: "les mills bodycombat" },
          { name: "Tuck Hold auf Blöcken", sets: "4x5 Sek.", priority: true, emoji: "📦", short: "Blöcke geben Höhe für echten Hold", desc: "Zwei Yoga-Blöcke. Schultern nach unten. Block gibt Höhe um Gesäß wirklich abheben zu können.", steps: ["Zwei Blöcke mittlere Höhe", "Hände auf Blöcke", "Schultern nach unten", "Gesäß abheben 5 Sek."], watchQuery: "tuck hold yoga blocks" },
          { name: "Hip Flexor Isolation", sets: "3x12 Sek./Seite", priority: false, emoji: "🦵", short: "Knie hoch, Hand dagegen - isometrisch", desc: "Auf einem Bein. Knie hoch. Hand gegen Knie drücken - isometrisch. 12 Sek.", steps: ["Auf einem Bein", "Knie maximal hoch", "Hand gegen Knie", "12 Sek. isometrisch"], watchQuery: "hip flexor isometric standing" }
        ]
      },
      {
        tag: "Do", session: "Mobility - Hufte",
        focus: "Hüftöffnung - Pigeon - Splits-Fundament",
        note: "Kein Schmerz - nur Dehngefühl. Rotation IMMER aus der Hüfte.",
        exercises: [
          { name: "90/90 Rotations", sets: "2 Min.", priority: false, emoji: "↩️", short: "Hüfte aktiv in beide Richtungen", desc: "90/90-Position. Oberkörper über Vorderbein, dann Hinterbein. Je 2-3 Sek.", steps: ["90/90-Position", "Über Vorderbein kippen", "Dann Hinterbein", "2-3 Sek. halten"], watchQuery: "90 90 hip stretch tutorial" },
          { name: "Low Lunge", sets: "90 Sek./Seite", priority: false, emoji: "🏹", short: "Hüfte nach vorne-unten drücken", desc: "Hinteres Knie am Boden. Hüfte aktiv nach vorne-unten. Rücken bleibt lang.", steps: ["Hinteres Knie am Boden", "Hüfte nach vorne-unten", "Rücken lang", "90 Sek."], watchQuery: "low lunge hip flexor yoga" },
          { name: "Elevated Pigeon", sets: "2 Min./Seite", priority: true, emoji: "🧱", short: "Block unter Gesäß - schützt das Knie", desc: "Pigeon mit Block unter dem Gesäß. Reduziert Knie-Stress erheblich. Oberkörper entspannt nach vorne.", steps: ["Pigeon-Position", "Block unter Gesäß", "Oberkörper nach vorne", "2 Min."], watchQuery: "pigeon pose block knee safe" },
          { name: "Adductor Rockbacks", sets: "2 Min.", priority: false, emoji: "🔀", short: "Frosch-Position, vor/zurück rocken", desc: "Knie weit auseinander. Nach hinten Richtung Fersen rocken und zurück.", steps: ["Knie weit auseinander", "Hände vor dir", "Nach hinten rocken", "Zurück - 2 Min."], watchQuery: "adductor frog rockback" },
          { name: "Half Splits", sets: "90 Sek./Seite", priority: false, emoji: "📐", short: "Fuß flexiert, Rücken gerade", desc: "Vorderes Bein strecken. Fuß flexiert. Rücken gerade.", steps: ["Vorderes Bein strecken", "Fuß flexieren", "Rücken gerade", "90 Sek."], watchQuery: "half splits yoga" },
          { name: "Double Pigeon", sets: "2 Min./Seite", priority: true, emoji: "🔗", short: "Schienbein über Schienbein - Lotus-Schlüssel", desc: "Schienbein auf Schienbein legen. Knie Richtung Boden. Direkter Weg zu Lotus und Flying Pigeon.", steps: ["Unteres Bein parallel", "Oberes Schienbein drauf", "Knie Richtung Boden", "2 Min."], watchQuery: "double pigeon fire log pose" }
        ]
      },
      {
        tag: "Fr", session: "MCI + Inversion Prep",
        focus: "Pull Pattern - Inversion Vorbereitung",
        note: "Inversion Prep nach MCI - Schultern warm.",
        exercises: [
          { name: "Wrist Prep", sets: "5 Min.", priority: false, emoji: "🤲", short: "Vollständig - Pflicht", desc: "Circles, Extensions, Loading vollständig.", steps: ["Circles", "Extensions", "Loading"], watchQuery: "wrist warmup" },
          { name: "MCI Haupttraining", sets: "~40 Min.", priority: false, emoji: "🏋️", short: "Pull Pattern nach Plan", desc: "Pull-Tag: Rücken, Bizeps, hintere Schulter.", steps: ["Pull Pattern", "Qualität vor Gewicht"], watchQuery: "pull day workout" },
          { name: "Dolphin Hold", sets: "3x30 Sek.", priority: true, emoji: "🐬", short: "Unterarme parallel, Schultern aktiv", desc: "Unterarme parallel schulterbreit. Hüfte hoch drücken. Schulterblätter zusammenziehen.", steps: ["Unterarme parallel", "Hüfte hoch drücken", "Schulterblätter zusammen", "30 Sek."], watchQuery: "dolphin pose headstand prep" },
          { name: "Dolphin Rocks", sets: "3x8", priority: false, emoji: "🌊", short: "Vor/zurück aus Dolphin", desc: "Aus Dolphin nach vorne schieben und zurück.", steps: ["Dolphin", "Nach vorne schieben", "Zurück", "8 Wdh."], watchQuery: "dolphin rocks forearm balance" },
          { name: "Forearm Plank", sets: "3x40 Sek.", priority: false, emoji: "📏", short: "Körperlinie auf Unterarmen", desc: "Unterarme. Körperlinie. Core aktiv.", steps: ["Unterarme", "Körperlinie", "Core aktiv", "40 Sek."], watchQuery: "forearm plank core" }
        ]
      },
      {
        tag: "Sa", session: "Yoga - Full Practice",
        focus: "Crow + Compression - Wochenintegration",
        note: "Samstag = Hauptsession der Woche.",
        exercises: [
          { name: "Vollständiges Warm-Up", sets: "10 Min.", priority: false, emoji: "🌅", short: "Wrist + Mobilisation + Core", desc: "3 Min. Wrist Prep + 2 Min. Cat-Cow + 2 Min. Shoulders + 3 Min. Core.", steps: ["3 Min. Wrist Prep", "2 Min. Cat-Cow", "2 Min. Shoulder Circles", "3 Min. Core"], watchQuery: "yoga warmup full" },
          { name: "Compression Routine", sets: "8 Min.", priority: true, emoji: "⭐", short: "Tuck 5x5 + Hollow + Pulses", desc: "Seated Pulses 90 Sek. -> Tuck Hold 5x5 -> Hollow Body 3x20. Wichtigste 8 Minuten der Woche.", steps: ["Seated Pulses 90 Sek.", "Tuck Hold 5x5 Sek.", "Hollow Body 3x20 Sek."], watchQuery: "core compression crow routine" },
          { name: "Crow Skill-Arbeit", sets: "15 Min.", priority: true, emoji: "🦅", short: "Lean -> Hop -> Hold-Versuche", desc: "5 Min. Lean -> 5 Min. Hops -> 5 Min. Holds. Je 60 Sek. Pause.", steps: ["5 Min. Lean Drill", "5 Min. Hops", "5 Min. Hold-Versuche", "60 Sek. Pause je"], watchQuery: "crow pose progression tutorial" },
          { name: "Hüftöffner-Serie", sets: "15 Min.", priority: false, emoji: "🕊️", short: "Lizard -> Pigeon -> Double Pigeon", desc: "Lizard 90 Sek. -> Elevated Pigeon 2 Min. -> Double Pigeon 2 Min.", steps: ["Lizard 90 Sek./Seite", "Elevated Pigeon 2 Min./Seite", "Double Pigeon 2 Min./Seite"], watchQuery: "hip opening yoga sequence" },
          { name: "Cool-Down", sets: "10 Min.", priority: false, emoji: "🌙", short: "Yin, Savasana", desc: "Yin + Savasana.", steps: ["Yin 7 Min.", "Savasana 3 Min."], watchQuery: "yoga cooldown yin" }
        ]
      },
      {
        tag: "So", session: "Active Recovery",
        focus: "Regeneration - Yin oder Pause",
        note: "Kein Druck. Yin wenn gut - sonst Pause.",
        exercises: [
          { name: "Yin Yoga oder Pause", sets: "30-45 Min.", priority: false, emoji: "😴", short: "Lange Haltungen oder vollständige Pause", desc: "Pigeon 4 Min./Seite, Butterfly 4 Min., Child's Pose, Savasana. Oder vollständige Pause.", steps: ["Pigeon 4 Min./Seite", "Butterfly 4 Min.", "Child's Pose", "Savasana"], watchQuery: "yin yoga full class" },
          { name: "Compression Check", sets: "2 Min.", priority: false, emoji: "📊", short: "Optional: 3x Tuck Hold 5 Sek.", desc: "Nur spüren, nicht trainieren.", steps: ["3x Tuck Hold 5 Sek."], watchQuery: "tuck hold" }
        ]
      }
    ]
  },
  {
    num: 2, title: "Skill Building", weeks: "Woche 5-8",
    accent: "#2D5A3D", light: "#EEF6F1",
    days: [
      {
        tag: "Mo", session: "MCI + Handstand",
        focus: "Push - Handstand Conditioning",
        note: "Handstand nach MCI - Schultern warm.",
        exercises: [
          { name: "Wrist Prep + Loading", sets: "8 Min.", priority: false, emoji: "🤲", short: "Vollständig + Loading Progression", desc: "Vollständig + Loading Progression 5x5 Sek.", steps: ["Circles, Extensions", "Loading 5x5 Sek."], watchQuery: "wrist loading handstand" },
          { name: "MCI Haupttraining", sets: "~40 Min.", priority: false, emoji: "🏋️", short: "Push Pattern", desc: "Push-Tag.", steps: ["Push Pattern"], watchQuery: "push workout" },
          { name: "Wall Handstand Hold", sets: "5x20 Sek.", priority: true, emoji: "🤸", short: "Bauch-zur-Wand, dann rückwärts", desc: "3x Bauch-zur-Wand. 2x Rückwärts. Schultern drücken, Rippen schließen.", steps: ["3x Bauch-zur-Wand", "2x Rückwärts zur Wand", "Schultern drücken", "Rippen schließen"], watchQuery: "wall handstand tutorial" },
          { name: "Shoulder Tap Handstand", sets: "3x5 Taps", priority: true, emoji: "👋", short: "Hand abheben - Gewicht verlagern", desc: "Wall Handstand. Hand 2 cm abheben, 2-3 Sek. Hüfte kippt nicht.", steps: ["Wall Handstand", "Hand 2 cm abheben", "2-3 Sek.", "Wechseln"], watchQuery: "handstand shoulder tap" }
        ]
      },
      {
        tag: "Di", session: "Yoga - Crow + L-Sit",
        focus: "Crow 10 Sek. - L-Sit Progression",
        note: "Crow-Ziel: 10 Sek. L-Sit ein Bein extended testen.",
        exercises: [
          { name: "Wrist Prep", sets: "5 Min.", priority: false, emoji: "🤲", short: "Vollständig", desc: "Circles, Extensions, Loading.", steps: ["Vollständig"], watchQuery: "wrist warmup" },
          { name: "Compression Routine", sets: "8 Min.", priority: true, emoji: "⭐", short: "Tuck 5x8 + One Leg Extended", desc: "Pulses + Tuck 5x8 Sek. + One Leg Extended 4x5 Sek.", steps: ["Pulses 90 Sek.", "Tuck 5x8 Sek.", "One Leg Extended 4x5"], watchQuery: "l-sit one leg extended" },
          { name: "Crow Hold", sets: "6x max.", priority: true, emoji: "🦅", short: "Ziel: 10 Sek.", desc: "Crow Hold. Ziel 10 Sek. 60 Sek. Pause.", steps: ["Crow einnehmen", "Max. Hold", "60 Sek. Pause"], watchQuery: "crow pose 10 seconds" },
          { name: "Crow to Chaturanga", sets: "3x3", priority: false, emoji: "⬇️", short: "3 Sek. kontrolliert", desc: "3 Sek. Absenkphase aus Crow.", steps: ["Crow", "3 Sek. absenken", "Chaturanga"], watchQuery: "crow chaturanga" },
          { name: "Passive Pigeon", sets: "2 Min./Seite", priority: false, emoji: "🕊️", short: "Entspannen", desc: "2 Min./Seite.", steps: ["Pigeon", "2 Min."], watchQuery: "pigeon pose" }
        ]
      },
      {
        tag: "Mi", session: "Les Mills + L-Sit",
        focus: "Kraft - L-Sit Steigerung",
        note: "Ein Bein extended wenn Tuck Hold 8 Sek. sitzt.",
        exercises: [
          { name: "Les Mills / Barre", sets: "45-60 Min.", priority: false, emoji: "🎵", short: "Volle Intensität", desc: "Reguläre Klasse.", steps: ["Kursplan"], watchQuery: "les mills" },
          { name: "One Leg Extended", sets: "4x5 Sek.", priority: true, emoji: "🦵", short: "Ein Bein strecken - L-Sit Vorstufe", desc: "Aus Tuck Hold: ein Bein strecken, anderes Knie hoch. Abwechseln.", steps: ["Tuck Hold", "Ein Bein strecken", "Anderes Knie hoch", "5 Sek., wechseln"], watchQuery: "one leg extended l-sit" },
          { name: "Crow Pulse", sets: "3x10", priority: false, emoji: "🔄", short: "Hüfte 2-3 cm heben/senken", desc: "Crow-Position. Hüfte rhythmisch. Zehen am Boden.", steps: ["Crow", "Zehen am Boden", "Hüfte 2-3 cm", "10 Wdh."], watchQuery: "crow pulse drill" }
        ]
      },
      {
        tag: "Do", session: "Mobility + Headstand",
        focus: "Hüfte vertiefen - Headstand einführen",
        note: "Headstand nur wenn Dolphin 45 Sek. stabil!",
        exercises: [
          { name: "90/90 Active Rotation", sets: "2x90 Sek.", priority: false, emoji: "↩️", short: "Aktiv in Außenrotation", desc: "Aktiv in Außenrotation hineinrotieren.", steps: ["90/90", "Aktiv drehen", "90 Sek."], watchQuery: "90 90 active hip rotation" },
          { name: "Double Pigeon", sets: "3 Min./Seite", priority: true, emoji: "🔗", short: "3 Min. tiefer als Phase 1", desc: "3 Min./Seite, tiefer.", steps: ["Schienbein über Schienbein", "3 Min."], watchQuery: "double pigeon deeper" },
          { name: "Dolphin Hold", sets: "3x45 Sek.", priority: false, emoji: "🐬", short: "45 Sek. - Headstand Basis", desc: "Dolphin 45 Sek. Wenn stabil: Headstand.", steps: ["Unterarme", "Hüfte hoch", "45 Sek."], watchQuery: "dolphin hold" },
          { name: "Headstand Approach", sets: "5x5 Sek.", priority: true, emoji: "🙃", short: "Kopf auf Matte, Knie zur Brust", desc: "Dolphin. Kopf auf Matte (Hände als Schale). Hüfte hoch. Knie zur Brust. Gewicht auf UNTERARMEN.", steps: ["Dolphin", "Kopf auf Matte", "Hüfte hoch", "Knie zur Brust 5 Sek."], watchQuery: "headstand tutorial beginners" }
        ]
      },
      {
        tag: "Fr", session: "MCI + Pincha Approach",
        focus: "Pull - Forearm Balance Prep",
        note: "Pincha erst wenn Dolphin + Headstand Approach stabil.",
        exercises: [
          { name: "Wrist Prep", sets: "5 Min.", priority: false, emoji: "🤲", short: "Vollständig", desc: "Vollständig.", steps: ["Vollständig"], watchQuery: "wrist prep" },
          { name: "MCI Haupttraining", sets: "~40 Min.", priority: false, emoji: "🏋️", short: "Pull Pattern", desc: "Pull-Tag.", steps: ["Pull Pattern"], watchQuery: "pull workout" },
          { name: "Forearm Balance Approach", sets: "4x10 Sek.", priority: true, emoji: "🤸", short: "Unterarme parallel, Hüfte hoch", desc: "Pincha Approach. Schulterblätter zusammenziehen. 10 Sek.", steps: ["Unterarme parallel", "Hüfte hoch", "Schulterblätter zusammen", "10 Sek."], watchQuery: "pincha mayurasana tutorial" },
          { name: "Forearm Plank", sets: "3x50 Sek.", priority: false, emoji: "📏", short: "50 Sek.", desc: "50 Sek.", steps: ["Unterarme", "50 Sek."], watchQuery: "forearm plank" }
        ]
      },
      {
        tag: "Sa", session: "Yoga - Full Practice P2",
        focus: "Crow 15 Sek. - Headstand - Side Crow",
        note: "Crow-Ziel: 15 Sek. Side Crow als neues Element.",
        exercises: [
          { name: "Compression Routine", sets: "8 Min.", priority: true, emoji: "⭐", short: "Phase 2 gesteigert", desc: "Tuck 5x8 + One Leg Extended + Hollow 3x25.", steps: ["Tuck 5x8", "One Leg Extended", "Hollow 3x25 Sek."], watchQuery: "compression yoga" },
          { name: "Crow Skill-Arbeit", sets: "15 Min.", priority: true, emoji: "🦅", short: "Ziel: 15 Sek.", desc: "Hold-Versuche -> 15 Sek.", steps: ["Hold-Versuche", "15 Sek. Ziel"], watchQuery: "crow 15 seconds" },
          { name: "Side Crow Approach", sets: "4x5 Sek.", priority: false, emoji: "🌀", short: "Beide Knie auf einen Arm", desc: "Beide Knie auf einen Arm, Rotation aus der Hüfte.", steps: ["Tiefe Hocke", "Beide Knie auf einen Arm", "Rotation aus Hüfte"], watchQuery: "side crow tutorial" },
          { name: "Headstand", sets: "4x10 Sek.", priority: false, emoji: "🙃", short: "Freistellend oder Wand", desc: "10 Sek., Gewicht auf Unterarmen.", steps: ["Headstand", "10 Sek."], watchQuery: "headstand hold" },
          { name: "Cool-Down", sets: "10 Min.", priority: false, emoji: "🌙", short: "Yin, Savasana", desc: "Yin + Savasana.", steps: ["Yin 7 Min.", "Savasana 3 Min."], watchQuery: "yoga cooldown" }
        ]
      },
      {
        tag: "So", session: "Active Recovery",
        focus: "Regeneration",
        note: "Komplett erholen.",
        exercises: [
          { name: "Yin oder Pause", sets: "30-45 Min.", priority: false, emoji: "😴", short: "Lange Haltungen oder Pause", desc: "Yin oder vollständige Pause.", steps: ["Yin oder Pause"], watchQuery: "yin yoga" }
        ]
      }
    ]
  },
  {
    num: 3, title: "Integration", weeks: "Woche 9-12",
    accent: "#5C3A1E", light: "#F6F0EA",
    days: [
      {
        tag: "Mo", session: "MCI + Handstand Daily",
        focus: "Push - Handstand täglich",
        note: "Handstand in Phase 3 täglich.",
        exercises: [
          { name: "Wrist Prep", sets: "8 Min.", priority: false, emoji: "🤲", short: "Intensiv + Loading", desc: "Vollständig + intensiveres Loading.", steps: ["Circles, Extensions", "Loading intensiv"], watchQuery: "wrist handstand prep" },
          { name: "MCI Haupttraining", sets: "~40 Min.", priority: false, emoji: "🏋️", short: "Push Pattern", desc: "Push-Tag.", steps: ["Push Pattern"], watchQuery: "push workout" },
          { name: "Wall Handstand Hold", sets: "5x25 Sek.", priority: true, emoji: "🤸", short: "Rückwärts - Körperform optimieren", desc: "Rückwärts zur Wand. Rippen schließen. 25 Sek.", steps: ["Rückwärts zur Wand", "Rippen schließen", "25 Sek."], watchQuery: "wall handstand back to wall" },
          { name: "Kick-Up Technik", sets: "10 Versuche", priority: true, emoji: "⬆️", short: "Kontrolliert - kein Schwung", desc: "Ein Bein führt, anderes folgt. Kein Schwung.", steps: ["Ein Bein führt", "Anderes folgt", "Kein Schwung"], watchQuery: "handstand kick up controlled" }
        ]
      },
      {
        tag: "Di", session: "Yoga - Crow + Firefly",
        focus: "Crow 20 Sek. - Firefly - L-Sit",
        note: "Firefly erst wenn Crow stabil + L-Sit 5 Sek.",
        exercises: [
          { name: "Compression Routine", sets: "8 Min.", priority: true, emoji: "⭐", short: "L-Sit Attempt + Hollow 30 Sek.", desc: "L-Sit Attempt 5x5 + Hollow 3x30.", steps: ["L-Sit Attempt 5x5", "Hollow 3x30 Sek."], watchQuery: "l-sit tutorial" },
          { name: "Crow Hold", sets: "5x max.", priority: true, emoji: "🦅", short: "Ziel: 20 Sek.", desc: "Ziel 20 Sek. 60 Sek. Pause.", steps: ["Crow", "20 Sek. Ziel", "60 Sek. Pause"], watchQuery: "crow 20 seconds" },
          { name: "Firefly Approach", sets: "4x8 Sek.", priority: true, emoji: "🔥", short: "Arme unter Beine - Gewicht auf Hände", desc: "Tiefe Vorwärtsbeuge. Arme unter Beine. Hände auf Boden. Gewicht nach vorne, Hüfte rückwärts.", steps: ["Tiefe Vorwärtsbeuge", "Arme unter Beine", "Hände auf Boden", "Gewicht nach vorne"], watchQuery: "firefly pose tittibhasana" },
          { name: "Passive Pigeon", sets: "2 Min./Seite", priority: false, emoji: "🕊️", short: "Entspannen", desc: "2 Min./Seite.", steps: ["Pigeon", "2 Min."], watchQuery: "pigeon pose" }
        ]
      },
      {
        tag: "Mi", session: "Les Mills + L-Sit",
        focus: "Kraft - L-Sit Hold",
        note: "Ziel: beidseitiger L-Sit Hold.",
        exercises: [
          { name: "Les Mills / Barre", sets: "45-60 Min.", priority: false, emoji: "🎵", short: "Volle Intensität", desc: "Reguläre Klasse.", steps: ["Kursplan"], watchQuery: "les mills" },
          { name: "L-Sit Attempt", sets: "5x max.", priority: true, emoji: "⭐", short: "Beide Beine parallel - jede Sek. zählt", desc: "Beide Beine parallel. Auch 1 Sek. zählt.", steps: ["Hände auf Blöcken", "Schultern drücken", "Beide Beine parallel", "Max. Hold"], watchQuery: "l-sit tutorial full" },
          { name: "Tuck Jump to Hold", sets: "4x6", priority: false, emoji: "🦘", short: "Aus Hocke: Knie zur Brust", desc: "Füße abheben. Knie zur Brust. 1 Sek.", steps: ["Tiefe Hocke", "Füße abheben", "Knie zur Brust", "1 Sek."], watchQuery: "tuck jump hip flexion" }
        ]
      },
      {
        tag: "Do", session: "Mobility - Splits + Flying Pigeon",
        focus: "Full Splits - Flying Pigeon Approach",
        note: "Flying Pigeon erst wenn Double Pigeon entspannt + Crow stabil.",
        exercises: [
          { name: "Double Pigeon", sets: "3 Min./Seite", priority: true, emoji: "🔗", short: "Block weglassen wenn möglich", desc: "3 Min./Seite, tiefer.", steps: ["Schienbein über Schienbein", "3 Min."], watchQuery: "double pigeon deep" },
          { name: "Full Splits Approach", sets: "3-5 Min.", priority: true, emoji: "🤸", short: "Blöcke unter Händen - täglich tiefer", desc: "Blöcke. Hüfte quadratisch. Täglich tiefer.", steps: ["Blöcke unter Händen", "Hüfte quadratisch", "Täglich tiefer"], watchQuery: "full splits progression" },
          { name: "Standing Figure-4 Lean", sets: "3x8 Sek.", priority: true, emoji: "4️⃣", short: "Gewicht nach vorne in Figure-4", desc: "Auf einem Bein. Knöchel auf Oberschenkel. Standbein beugen. Oberkörper nach vorne.", steps: ["Auf einem Bein", "Knöchel auf Oberschenkel", "Standbein beugen", "Oberkörper nach vorne 8 Sek."], watchQuery: "standing figure 4 flying pigeon" },
          { name: "Figure-4 auf Blöcken", sets: "4x8 Sek.", priority: false, emoji: "🧱", short: "Hände auf Blöcken - tiefer", desc: "Wie oben, Blöcke.", steps: ["Blöcke", "Figure-4 tiefer", "8 Sek."], watchQuery: "flying pigeon blocks" }
        ]
      },
      {
        tag: "Fr", session: "MCI + Pincha / Handstand",
        focus: "Pull - Forearm Balance 15 Sek.",
        note: "Pincha-Ziel: 15-20 Sek.",
        exercises: [
          { name: "Wrist Prep", sets: "5 Min.", priority: false, emoji: "🤲", short: "Vollständig", desc: "Vollständig.", steps: ["Vollständig"], watchQuery: "wrist prep" },
          { name: "MCI Haupttraining", sets: "~40 Min.", priority: false, emoji: "🏋️", short: "Pull Pattern", desc: "Pull-Tag.", steps: ["Pull Pattern"], watchQuery: "pull workout" },
          { name: "Forearm Balance Hold", sets: "4x15 Sek.", priority: true, emoji: "🤸", short: "Pincha 15 Sek. Ziel", desc: "Pincha gegen Wand. 15 Sek.", steps: ["Unterarme parallel", "Hüfte über Schultern", "15 Sek."], watchQuery: "pincha hold tutorial" },
          { name: "Kick-Up", sets: "8 Versuche", priority: false, emoji: "⬆️", short: "Kontrolliert", desc: "Kontrolliert.", steps: ["Ein Bein führt", "Kontrolliert"], watchQuery: "handstand kick up" }
        ]
      },
      {
        tag: "Sa", session: "Yoga - Full Integration",
        focus: "Flying Pigeon - Crow 20 Sek. - Wheel",
        note: "Showcase-Session: alle Skills zusammenbringen.",
        exercises: [
          { name: "Compression Routine", sets: "8 Min.", priority: true, emoji: "⭐", short: "L-Sit + Hollow 30 Sek.", desc: "L-Sit 5x max. + Hollow 3x30.", steps: ["L-Sit 5x max.", "Hollow 3x30 Sek."], watchQuery: "l-sit compression" },
          { name: "Crow + Firefly Approach", sets: "15 Min.", priority: true, emoji: "🦅", short: "Crow 20 Sek. -> Firefly", desc: "Crow 20 Sek. -> Firefly Approach.", steps: ["Crow 20 Sek.", "Firefly danach"], watchQuery: "crow firefly transition" },
          { name: "Flying Pigeon Approach", sets: "10 Min.", priority: true, emoji: "🕊️", short: "Figure-4 -> Blöcke -> Gewicht auf Hände", desc: "Standing Figure-4 -> Blöcke -> Gewicht auf Hände.", steps: ["Standing Figure-4 3x8", "Figure-4 Blöcke 4x8", "Gewicht auf Hände"], watchQuery: "flying pigeon tutorial" },
          { name: "Wheel Pose", sets: "3x5 Atemzüge", priority: false, emoji: "⭕", short: "Nur wenn Schulter-Test bestanden", desc: "Nur wenn OK. Sonst Bridge.", steps: ["Hände neben Kopf", "Arme strecken", "5 Atemzüge"], watchQuery: "wheel pose yoga" },
          { name: "Cool-Down", sets: "10 Min.", priority: false, emoji: "🌙", short: "Yin, Savasana", desc: "Yin + Savasana.", steps: ["Yin 7 Min.", "Savasana 3 Min."], watchQuery: "yoga cooldown" }
        ]
      },
      {
        tag: "So", session: "Active Recovery",
        focus: "Regeneration - Diagnose Woche 12",
        note: "Woche 12: Alle 5 Tests wiederholen.",
        exercises: [
          { name: "Yin Yoga oder Pause", sets: "30-45 Min.", priority: false, emoji: "😴", short: "Lange Haltungen", desc: "Yin oder vollständige Pause.", steps: ["Yin oder Pause"], watchQuery: "yin yoga" },
          { name: "Diagnosetest (Wo. 12)", sets: "20 Min.", priority: false, emoji: "📋", short: "Alle 5 Tests - ins Manual", desc: "Alle 5 Tests aus Manual Kap. 5.", steps: ["Hip Compression", "External Rotation", "Ankle Dorsiflexion", "Shoulder Flexion", "Hamstring SLR"], watchQuery: "yoga flexibility test" }
        ]
      }
    ]
  }
];

const DAYS = ["Mo","Di","Mi","Do","Fr","Sa","So"];

export default function App() {
  const [phase, setPhase] = useState(0);
  const [day, setDay] = useState(() => { const d = new Date().getDay(); return d === 0 ? 6 : d - 1; });
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
    <div style={{ fontFamily: "-apple-system,'SF Pro Display',BlinkMacSystemFont,sans-serif", background: "#F2F2F7", minHeight: "100vh", maxWidth: "430px", margin: "0 auto", paddingBottom: "100px" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E5EA", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ padding: "16px 20px 10px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: accent, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "4px" }}>Phase {PHASES[phase].num} · {PHASES[phase].weeks}</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "#1C1C1E", lineHeight: 1.2 }}>{cur.session}</div>
            <div style={{ fontSize: "12px", color: "#8E8E93", marginTop: "2px" }}>{cur.focus}</div>
          </div>
          <div style={{ textAlign: "center", background: accentLight, borderRadius: "14px", padding: "8px 14px", marginLeft: "12px" }}>
            <div style={{ fontSize: "24px", fontWeight: 700, color: accent, lineHeight: 1 }}>{done}</div>
            <div style={{ fontSize: "10px", color: accent, fontWeight: 600, marginTop: "1px" }}>/ {total}</div>
          </div>
        </div>
        <div style={{ height: "2px", background: "#E5E5EA", margin: "0 20px 10px" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: accent, transition: "width 0.4s ease" }} />
        </div>
        <div style={{ display: "flex", padding: "0 16px 10px", gap: "8px" }}>
          {PHASES.map((p, i) => (
            <button key={i} onClick={() => { setPhase(i); setOpenEx(null); }} style={{ padding: "5px 14px", borderRadius: "20px", border: "none", background: phase === i ? p.accent : "#F2F2F7", color: phase === i ? "#fff" : "#8E8E93", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
              Phase {p.num}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", borderTop: "1px solid #F2F2F7" }}>
          {DAYS.map((tag, i) => {
            const d = PHASES[phase].days[i];
            const allDone = d.exercises.length > 0 && d.exercises.every((_, j) => checked[`${phase}-${i}-${j}`]);
            const isToday = i === day;
            return (
              <button key={tag} onClick={() => { setDay(i); setOpenEx(null); }} style={{ flex: 1, padding: "8px 4px 10px", background: "transparent", border: "none", borderBottom: isToday ? `2px solid ${accent}` : "2px solid transparent", color: isToday ? accent : allDone ? "#34C759" : "#8E8E93", fontSize: "13px", fontWeight: isToday ? 700 : 500, cursor: "pointer", fontFamily: "inherit", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                {tag}
                {allDone && <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#34C759", display: "block" }} />}
              </button>
            );
          })}
        </div>
      </div>

      {cur.note && (
        <div style={{ margin: "12px 16px 4px", padding: "11px 14px", background: "#fff", borderRadius: "14px", display: "flex", gap: "10px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <span style={{ fontSize: "16px", flexShrink: 0 }}>💡</span>
          <span style={{ fontSize: "13px", color: "#3A3A3C", lineHeight: 1.5 }}>{cur.note}</span>
        </div>
      )}

      <div style={{ padding: "8px 16px 0" }}>
        {cur.exercises.map((ex, i) => {
          const k = `${phase}-${day}-${i}`;
          const isCk = !!checked[k];
          const isOpen = openEx === k;
          return (
            <div key={i} style={{ marginBottom: "8px", background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", opacity: isCk ? 0.65 : 1, transition: "all 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", padding: "13px 14px", gap: "11px", cursor: "pointer" }} onClick={() => setOpenEx(isOpen ? null : k)}>
                <div onClick={e => { e.stopPropagation(); ck(k); }} style={{ width: "26px", height: "26px", borderRadius: "50%", border: isCk ? "none" : `2px solid ${accent}44`, background: isCk ? accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer", transition: "all 0.2s" }}>
                  {isCk && <svg width="12" height="9" viewBox="0 0 12 9"><path d="M1 4.5L4.5 8L11 1" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span style={{ fontSize: "20px", flexShrink: 0 }}>{ex.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: isCk ? "#8E8E93" : "#1C1C1E", textDecoration: isCk ? "line-through" : "none" }}>{ex.name}</span>
                    {ex.priority && <span style={{ fontSize: "9px", fontWeight: 700, color: "#FF3B30", background: "#FFF0EE", padding: "2px 6px", borderRadius: "5px" }}>KEY</span>}
                  </div>
                  <div style={{ fontSize: "12px", color: "#8E8E93" }}>{ex.short}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "5px", flexShrink: 0 }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: accent, background: accentLight, padding: "3px 8px", borderRadius: "7px", whiteSpace: "nowrap" }}>{ex.sets}</span>
                  <span style={{ fontSize: "9px", color: "#C7C7CC", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
                </div>
              </div>
              {isOpen && (
                <div style={{ borderTop: "1px solid #F2F2F7", padding: "14px 16px" }}>
                  <p style={{ fontSize: "14px", color: "#3A3A3C", lineHeight: 1.65, margin: "0 0 14px" }}>{ex.desc}</p>
                  <div style={{ marginBottom: "14px" }}>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: "#8E8E93", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "10px" }}>Schritt für Schritt</div>
                    {ex.steps.map((s, si) => (
                      <div key={si} style={{ display: "flex", gap: "10px", marginBottom: "7px", alignItems: "flex-start" }}>
                        <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: accentLight, color: accent, fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>{si + 1}</span>
                        <span style={{ fontSize: "13px", color: "#1C1C1E", lineHeight: 1.5, paddingTop: "2px" }}>{s}</span>
                      </div>
                    ))}
                  </div>
                  <a href={"https://www.youtube.com/results?search_query=" + encodeURIComponent(ex.watchQuery)} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px", background: "#FFF5F5", borderRadius: "12px", textDecoration: "none" }}>
                    <svg width="22" height="15" viewBox="0 0 22 15" fill="none"><rect width="22" height="15" rx="3.5" fill="#FF0000"/><path d="M9 5L15 7.5L9 10V5Z" fill="white"/></svg>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#FF3B30" }}>Auf YouTube ansehen</span>
                    <span style={{ fontSize: "13px", color: "#FF9999", marginLeft: "auto" }}>→</span>
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "430px", background: "rgba(242,242,247,0.96)", backdropFilter: "blur(20px)", borderTop: "1px solid #E5E5EA", padding: "12px 16px 28px" }}>
        <button onClick={() => {
          const keys = cur.exercises.map((_, i) => `${phase}-${day}-${i}`);
          const allDone = keys.every(k => checked[k]);
          setChecked(prev => { const n = { ...prev }; allDone ? keys.forEach(k => delete n[k]) : keys.forEach(k => { n[k] = true; }); return n; });
        }} style={{ width: "100%", padding: "14px", background: pct === 100 ? "#34C759" : accent, border: "none", borderRadius: "14px", color: "#fff", fontSize: "15px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "background 0.3s" }}>
          {pct === 100 ? "✓  Training abgeschlossen!" : "Alle " + total + " Übungen markieren"}
        </button>
      </div>
    </div>
  );
}
