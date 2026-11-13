# Projekt: Homepage Auktionshaus Hohenstaufen

Neue Homepage für das **Auktionshaus Hohenstaufen GmbH**, Göppingen – Spezialist für Märklin, historisches Blechspielzeug, alte Eisenbahnen und Dampfmaschinen (ca. 80 % Märklin).
Betreut von Michael Eckert. Ziel aktuell: erste Version mit dem Kunden abstimmen.

- Live (GitHub Pages): https://moe8212.github.io/Auktionshaus/
- Repo: https://github.com/MOE8212/Auktionshaus (Branch `main`, Pages aus `/` root)
- Lokaler Ordner: `C:\Users\moeck\OneDrive\Dokumente\Websites\AuktionshausHohenstaufen`
  - `Pictues/` = Rohmaterial (Ergebnis-Anzeigen des Kunden, hochaufgelöst) – **nicht** ins Repo
- Alte Website des Kunden: http://auktion-hohenstaufen.de (Produktfotos `media/images/img_XXXX-large.jpg`, 900×600, ohne Preisschilder)

## Aufbau

- `index.html` – Startseite, eine Datei, reines HTML mit Inline-Styles, keine Build-Tools
- `bilder/` – aufbereitete Bilder (siehe unten)
- `<meta name="robots" content="noindex">` bleibt drin, solange es ein Entwurf ist

## Design-Entscheidungen

Stil-Vorbilder (vom Kunden/Michael ausgewählt):
- **ViV MGMT** (vivmgmt.com): riesige Wortmarke über volle Breite, viel Weißraum. Kritik: zu viele Bilder → sparsam mit Bildern.
- **Vantra Studio** (vantra-studio.webflow.io): Hero als abgerundete Bildkarte, schwebende Pillen-Navigation, Marken-Laufband, große Statistik-Zahlen, Liste „gerade laufend“ mit Fortschrittsbalken.
- **The Art Newspaper – London Gallery Weekend 2021**: Journal-/Beitragsdarstellung (rote Rubrik-Labels, große Überschriften, redaktionelles Layout).

Festgelegt:
- **Nur eine Schrift:** Inter Tight (Google Fonts), Gewichte 400–800. Keine zweite Schrift (Michael wollte ausdrücklich eine einheitliche Schrift).
- Farben: Off-White `#F4F2EE` (Grund), Schwarz `#121212`, Akzentrot `#B3261E` (nah am Rot der Kunden-Anzeigen), Grautöne `#5E5A52` / `#8A867D`.
- Radius: Karten 24 px, Bilder 12–20 px, Buttons Pille (999 px). Touch-Ziele ≥ 44 px.
- Logo: Staufer-Löwe des Kunden (aus den Anzeigen freigestellt) als `bilder/loewe.png`, weiß in der Navigation.
- Bilder: farbig, „glossy“ – Objekt freigestellt auf farbigem Studio-Verlauf mit Lichtkegel, Spiegelboden und Schatten.

Seitenreihenfolge: Navigation → Wortmarke → Hero-Bildkarte (nächste Auktion) → Statement + Marken-Laufband → Statistik → „Bereits versteigert“ (Bild-Laufband, läuft links→rechts, Hover vergrößert, pausiert) → „Jetzt im Auktionssaal“ → Kaufen/Verkaufen-Kacheln → Journal (Hauptbeitrag Bild links/Text rechts + 3 Karten) → Footer.

## Inhalte: echt vs. erfunden

Echt (Quellen: Kunden-Anzeigen in `Pictues/`, alte Website, Presse):
- Adresse Rosenplatz 11, 73033 Göppingen · Tel. +49 7161 8083940 · Fax +49 7161 21654 · info@auktion-hohenstaufen.de
- Geschäftsführer Hans Georg Grupp
- Ergebnisse 17.01.2026 (Preise inkl. Aufgeld): Musik-Karussell Märklin 1131 (1903, einziges bekanntes Exemplar) 150.000 €; Straßenbahn Spur 0 48.000 €; Taxi 5213 (1904) 35.000 €; „Rheingold“-Raddampfer 5065 28.000 €
- Weltrekord: Märklin „Brunsvik“ 5130/11D (1907) 406.000 € (Ergebnisse Feb 2019)
- ca. 1.040 Lose pro Auktion; ca. 80 % Märklin; Einlieferungen von Märklin-Ware bis ca. 1955 erwünscht
- Wärterhaus-Bild aus „Resultate Winterauktion 2018“

**Erfunden / Beispielwerte – vor Livegang mit Kunden klären:**
- „Seit 2013“, „25+ Auktionen“, „9.500 Besucher pro Jahr“
- Nächste Auktion „Sa, 23. Januar 2027“, Vorbesichtigung ab 18. Januar, Vorgebote bis 22. Januar
- „Dampfmaschinen & Zubehör – Online-Nachverkauf, 186 Lose, endet in 4 Tagen“
- Öffnungszeiten „Mo–Fr 10–17 Uhr“
- Datum/Autor der Journal-Beiträge, Newsletter-Formular (ohne Funktion)
- Hinweis „Teils Beispielwerte – vor Livegang prüfen“ über der Statistik bleibt, bis alles geklärt ist.

## Bilder: Herkunft und Aufbereitung

Alle Bilder in `bilder/` sind **Montagen/Platzhalter**, kein echtes Studio-Shooting:
- Objekte aus den Ergebnis-Anzeigen ausgeschnitten, Preisschilder per Inpainting (OpenCV) entfernt
- Freistellung mit `rembg` (Modell `isnet-general-use`) bzw. Flood-Fill auf weißem Hintergrund
- Farbe +25 %, Kontrast leicht erhöht, Hochskalierung 1,5–2× (Lanczos + Unschärfemaske) – **keine** KI-Hochskalierung
- Hintergründe per Code generiert (Verlauf + Spot + Spiegelboden)

- `bilder/versteigert/los_XXXX.jpg`: echte Produktfotos der alten Website (`img_XXXX-large.jpg`, 1620×1080 bzw. 900×600), nur zugeschnitten (3:2, 840×560), Weißpunkt angehoben, leicht geschärft – keine KI. Bildunterschriften sind allgemeine Beschreibungen (Hersteller/Zuschlag unbekannt).
- `bilder/marken/`: Märklin-Logo (Wikimedia „Logo Märklin.svg“) und Bing-Werke-Zeichen 1924 (Wikimedia), schwarz `#121212` eingefärbt.

Regeln:
- Das Objekt selbst nie per KI verändern (Bieter müssen das echte Objekt sehen) – nur Hintergrund.
- Objekte mit NS-Symbolen (z. B. Junkers-Flugzeuge, Zeppelin in den Anzeigen) nicht verwenden.
- Final: echte Freisteller-Fotos vom Kunden/Studio, Hintergrund z. B. mit Adobe Firefly „Hintergrund generieren“.

## Offene Punkte

- [ ] Kunden-Feedback zur ersten Version einholen
- [ ] Beispielwerte (siehe oben) durch echte Zahlen/Termine ersetzen
- [ ] Bessere Bilder: Einzelfotos von der alten Website oder Studio-Fotos; Karussell 8846, Straßenbahn, Lok noch ungenutzt (Preisschilder liegen auf dem Objekt)
- [ ] Marken-Laufband: Märklin und Bing als Logo (schwarz); Carette, Lehmann, Plank, Schoenner, Doll, Bub, Distler, Krauss noch als schwarzer Text – für diese gibt es keine frei verfügbaren Logodateien. Logos vom Kunden besorgen (Nutzung mit Markeninhabern klären, v. a. Märklin), dann als SVG in `bilder/marken/`, schwarz.
- [ ] „Bereits versteigert“: mit Kunden klären, ob die Objekte der alten Website versteigert wurden; echte Bezeichnungen (Hersteller, Katalognr.) und ggf. Zuschläge eintragen
- [ ] Unterseiten: Auktionen/Katalog, Einliefern, Ergebnisse, Journal, Kontakt, Impressum, Datenschutz, Versteigerungsbedingungen
- [ ] Online-Bieten: Anbindung prüfen (Kunde nutzt bereits lot-tissimo / the-saleroom)
- [ ] Newsletter-Formular anbinden oder entfernen
- [ ] Vor Livegang: `noindex` entfernen, Impressum/Datenschutz, eigene Domain

## Arbeitsweise

- Michael arbeitet knapp und lösungsorientiert, iteriert schnell anhand von Screenshots.
- Antworten auf Deutsch, strukturiert, ohne Füllstoff.
- Commits auf `main`; GitHub Pages aktualisiert sich automatisch.
