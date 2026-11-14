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
- `journal.html` – Journalseite mit allen Presseberichten der alten Website (2013–2019), gleiche Navigation/Footer wie die Startseite (CSS-Block aus `index.html` übernommen – bei Änderungen an Navigation/Footer beide Seiten anpassen)
- `ueber-uns.html` – Über uns: Gründer (Foto `bilder/presse/2013-gaugele-grupp.jpg`), „So arbeiten wir“, Meilensteine mit Links ins Journal, Kontakt-Aufruf. Alle Aussagen stammen aus den Presseberichten im Journal; der Original-Text „Über uns“ der alten Website war nicht abrufbar (Zertifikat abgelaufen, Webarchiv für das Abruf-Werkzeug gesperrt). **Mit dem Kunden abstimmen:** Ist Roland Gaugele noch aktiv? Ist Beate Grupp Teil des Teams? Fehlen weitere Mitarbeiter? Der „Über uns“-Link steht in Navigation und Footer aller Seiten.
- `impressum.html`, `datenschutz.html`, `versteigerungsbedingungen.html` – Rechtsseiten als **Entwürfe** (gleiche Navigation/Footer, aus `journal.html` abgeleitet); offene Angaben rot markiert (`.lg-ph`): HRB, USt-IdNr, §34b-Behörde, Aufgeld, Fristen usw. Versteigerungsbedingungen = Mustertext, durch gültige Fassung des Kunden ersetzen. Alte Website war wegen abgelaufenem Zertifikat nicht abrufbar.
- `medien/` – Audio/Video/PDF aus der alten Presseseite (SWR-Beiträge, Zarenzug-PDF)
- `bilder/` – aufbereitete Bilder (siehe unten)
- `<meta name="robots" content="noindex">` bleibt drin, solange es ein Entwurf ist

## Design-Entscheidungen

Stil-Vorbilder (vom Kunden/Michael ausgewählt):
- **ViV MGMT** (vivmgmt.com): viel Weißraum; die riesige Wortmarke wurde nach Einbau des Logos entfernt (oben und im Footer). Kritik: zu viele Bilder → sparsam mit Bildern.
- **Vantra Studio** (vantra-studio.webflow.io): Hero als abgerundete Bildkarte, schwebende Pillen-Navigation, Marken-Laufband, große Statistik-Zahlen, Liste „gerade laufend“ mit Fortschrittsbalken.
- **The Art Newspaper – London Gallery Weekend 2021**: Journal-/Beitragsdarstellung (rote Rubrik-Labels, große Überschriften, redaktionelles Layout).

Festgelegt:
- **Nur eine Schrift:** Inter Tight, **lokal eingebunden** (`fonts/`, variable Schrift, Latin + Latin-Ext, SIL OFL; keine Verbindung zu Google), Gewichte 400–800. Keine zweite Schrift (Michael wollte ausdrücklich eine einheitliche Schrift).
- Farben: Seitengrund `#E8E4DC` (dunkler als Weiß-Karten für mehr Kontrast; Kachel „Für Verkäufer“ `#D9D3C7`), Off-White `#F4F2EE` nur noch als helle Schrift/Buttons auf Schwarz, Schwarz `#121212`, Akzentrot = Logorot `#C51415` (Hover `#A51011`), Grautöne `#5E5A52` / `#8A867D`.
- Radius: Karten 24 px, Bilder 12–20 px, Buttons Pille (999 px). Touch-Ziele ≥ 44 px.
- Logo: offizielle Wortmarke „AUKTIONSHAUS HOHENSTAUFEN“ mit Staufer-Löwe aus der Kundenvorlage `bilder/Logo A4 breit Word Vorlage 166x23.svg` (Original nicht im Repo). **Logofarben bleiben erhalten** (Kundenwunsch): `bilder/logo-farbe.svg` (#181716 / Grau #6E6E6D) in der Navigation, Rot des Logos #C51415. Navigation als **schwarze Pille** (Kundenwunsch, weiße Variante verworfen) mit `bilder/logo-hell.svg`; der rote Balken des Briefkopfs läuft aus der linken Rundung der Pille zum Logo (CSS `.hs-nav-deco`), rechts das rote Quadrat (`.hs-sq`) – Proportionen aus dem Original abgeleitet. Balken und Quadrate (Navigation + Footer) mit leicht abgerundeten Ecken (8 % der Logohöhe). Footer (dunkel): `bilder/logo-hell.svg` zweifarbig (#F4F2EE / #B4B2AE) mit rotem Balken + Quadrat. `bilder/logo-farbe.svg` / `bilder/logo-dunkel.svg` Reserve, `bilder/loewe.png` ungenutzt.
- Bilder: farbig, „glossy“ – Objekt freigestellt auf farbigem Studio-Verlauf mit Lichtkegel, Spiegelboden und Schatten.

Mobil (≤ 700 px): Statistik als 2×2-Raster mit kleineren Zahlen; Desktop unverändert.

Seitenreihenfolge: Navigation (Logo) → Einleitungszeile → Hero-Bildkarte (nächste Auktion) → Statement + Marken-Laufband → Statistik → „Bereits versteigert“ (Bild-Laufband per JS, läuft links→rechts, mit Maus/Finger ziehbar inkl. Schwung, Hover vergrößert und pausiert) → „Jetzt im Auktionssaal“ → Kaufen/Verkaufen-Kacheln → Journal (Hauptbeitrag Bild links/Text rechts + 3 Karten) → Footer.

## Inhalte: echt vs. erfunden

Echt (Quellen: Kunden-Anzeigen in `Pictues/`, alte Website, Presse):
- Adresse Rosenplatz 11, 73033 Göppingen · Tel. +49 7161 8083940 · Fax +49 7161 21654 · info@auktion-hohenstaufen.de
- Geschäftsführer Hans Georg Grupp
- Ergebnisse 17.01.2026 (Preise inkl. Aufgeld): Musik-Karussell Märklin 1131 (1903, einziges bekanntes Exemplar) 150.000 €; Straßenbahn Spur 0 48.000 €; Taxi 5213 (1904) 35.000 €; „Rheingold“-Raddampfer 5065 28.000 €
- Weltrekord: Märklin „Brunsvik“ 5130/11D (1907) 406.000 € (Ergebnisse Feb 2019)
- ca. 1.040 Lose pro Auktion; ca. 80 % Märklin; Einlieferungen von Märklin-Ware bis ca. 1955 erwünscht
- Wärterhaus-Bild aus „Resultate Winterauktion 2018“
- Gründung 2013 durch Roland Gaugele (ehem. Märklin-Museumsleiter) und Hans Georg Grupp (vereidigter Sachverständiger für Blechspielzeug) – laut FAZ 19.01.2015; erste Auktion 25.01.2014
- Journal: `journal.html` enthält die Texte der alten Presseseite (auktion-hohenstaufen.de/pressemitteilungen.html) **im Volltext** – 17 Beiträge (StZ, FAZ, NWZ, Bild, Pressemitteilungen, Antique Toy World), Bilder in `bilder/presse/`, Medien in `medien/`. Überschriften ohne Titel im Original wurden ergänzt (Sommerauktion 2014, Stuttgarter Hauptbahnhof, „Jede Menge Märklin unterm Hammer“). Das „Resolution“-Foto der StZ ist nicht mehr abrufbar. Startseiten-Kacheln verlinken auf `journal.html#<id>`.

**Erfunden / Beispielwerte – vor Livegang mit Kunden klären:**
- „25+ Auktionen“, „9.500 Besucher pro Jahr“
- Nächste Auktion „Sa, 23. Januar 2027“, Vorbesichtigung ab 18. Januar, Vorgebote bis 22. Januar
- „Dampfmaschinen & Zubehör – Online-Nachverkauf, 186 Lose, endet in 4 Tagen“
- Öffnungszeiten „Mo–Fr 10–17 Uhr“
- Newsletter-Formular (ohne Funktion)
- Hinweis „Teils Beispielwerte – vor Livegang prüfen“ über der Statistik bleibt, bis alles geklärt ist.

## Bilder: Herkunft und Aufbereitung

Alle Bilder in `bilder/` sind **Montagen/Platzhalter**, kein echtes Studio-Shooting:
- Objekte aus den Ergebnis-Anzeigen ausgeschnitten, Preisschilder per Inpainting (OpenCV) entfernt
- Freistellung mit `rembg` (Modell `isnet-general-use`) bzw. Flood-Fill auf weißem Hintergrund
- Farbe +25 %, Kontrast leicht erhöht, Hochskalierung 1,5–2× (Lanczos + Unschärfemaske) – **keine** KI-Hochskalierung
- Hintergründe per Code generiert (Verlauf + Spot + Spiegelboden)

- `bilder/versteigert/los_XXXX.jpg`: echte Produktfotos der alten Website (`img_XXXX-large.jpg`, 1620×1080 bzw. 900×600), nur zugeschnitten (3:2, 840×560), Weißpunkt angehoben, leicht geschärft – keine KI. Bildunterschriften sind allgemeine Beschreibungen (Hersteller/Zuschlag unbekannt).
- `bilder/marken/`: Märklin-Logo (Wikimedia „Logo Märklin.svg“) und Bing-Werke-Zeichen 1924 (Wikimedia), schwarz `#121212` eingefärbt. Für Carette, Lehmann, Plank, Schoenner, Doll, Bub, Distler und Krauss gibt es keine frei nutzbaren Logos (Recherche 14.11.2026: Wikimedia Commons, Wikipedia, Websuche; nur Sammlerseiten mit Fotos Dritter). Sie haben deshalb **eigene Signets** im Stil historischer Herstellermarken: gefüllte Form (Kreis, Oval, Schild, Raute) mit ausgespartem Monogramm (GC, EPL, EP, JS, D&C, KBN, JD, K) und daneben den Namen, wie beim Bing-Zeichen. Sie stehen inline als SVG im Laufband und zusätzlich als `bilder/marken/signet-*.svg`. Es sind **keine Original-Warenzeichen**.

- `bilder/presse/`: Fotos von der alten Presseseite (meist 400–1000 px), Kacheln der Startseite als 3:2-Zuschnitt `karte-*.jpg` (780×520). Fotonachweise wie im Original übernommen (u. a. Horst Rudel, Veranstalter, privat, Auktionshaus Hohenstaufen). `karussell_glossy`, `taxi_glossy`, `waerterhaus_glossy` derzeit ungenutzt.

Regeln:
- Das Objekt selbst nie per KI verändern (Bieter müssen das echte Objekt sehen) – nur Hintergrund.
- Objekte mit NS-Symbolen (z. B. Junkers-Flugzeuge, Zeppelin in den Anzeigen) nicht verwenden.
- Final: echte Freisteller-Fotos vom Kunden/Studio, Hintergrund z. B. mit Adobe Firefly „Hintergrund generieren“.

## SEO

Umgesetzt (alle Seiten): eigener `<title>` und `meta description` (≤ 160 Zeichen), `canonical`, Open Graph/Twitter-Karte (`bilder/og-image.jpg`, 1200×630), Favicon-Satz (`favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192/512.png`, Staufer-Löwe auf Logorot), `site.webmanifest`, `theme-color`, JSON-LD (Startseite: `LocalBusiness` + `WebSite`; Unterseiten: `WebPage` + `BreadcrumbList`), `width`/`height` an allen Bildern, Hero responsiv (`hero_glossy-960/1440/2000.jpg`, `fetchpriority="high"`), Brunsvik-Bild als `-1200`-Variante, Schrift-Preload. Dazu `sitemap.xml`, `robots.txt`, `404.html` (absolute Links).

- **Basis-URL** steht derzeit auf `https://moe8212.github.io/Auktionshaus/` in allen `<head>`-Blöcken, im JSON-LD, in `sitemap.xml`, `robots.txt` und `404.html`. Bei eigener Domain überall ersetzen.
- Strukturierte Daten nur mit echten Angaben: keine Öffnungszeiten und kein Auktions-`Event`, solange die Werte erfunden sind. Mit echten Terminen ein `Event` (bzw. `SaleEvent`) für die nächste Auktion ergänzen.
- Neue Seiten: Kopfbereich nach demselben Muster anlegen und in `sitemap.xml` eintragen.

## Offene Punkte

- [ ] Kunden-Feedback zur ersten Version einholen
- [ ] Beispielwerte (siehe oben) durch echte Zahlen/Termine ersetzen
- [ ] Bessere Bilder: Einzelfotos von der alten Website oder Studio-Fotos; Karussell 8846, Straßenbahn, Lok noch ungenutzt (Preisschilder liegen auf dem Objekt)
- [ ] Marken-Laufband: Die eigenen Signets bei Gelegenheit durch die echten historischen Marken ersetzen, wenn der Kunde Vorlagen hat (z. B. Fotos von Originalkartons). Märklin-Logo: Nutzung mit dem Markeninhaber klären.
- [ ] „Bereits versteigert“: mit Kunden klären, ob die Objekte der alten Website versteigert wurden; echte Bezeichnungen (Hersteller, Katalognr.) und ggf. Zuschläge eintragen
- [ ] Unterseiten: Auktionen/Katalog, Einliefern, Ergebnisse, Journal, Kontakt, Impressum, Datenschutz, Versteigerungsbedingungen
- [ ] Online-Bieten: Anbindung prüfen (Kunde nutzt bereits lot-tissimo / the-saleroom)
- [ ] Abdruckrechte für die Presse-Volltexte und -Fotos im Journal klären (StZ, FAZ, NWZ, Bild, Fotografen) – auf der alten Seite standen sie schon, beim Relaunch neu bestätigen lassen
- [ ] Newsletter-Formular anbinden oder entfernen
- [ ] Vor Livegang: `noindex` auf allen Seiten außer `404.html` entfernen, Impressum/Datenschutz, eigene Domain (Basis-URL tauschen, siehe SEO)
- [ ] Nach Livegang: Google Search Console einrichten und Sitemap einreichen, Google-Unternehmensprofil (Maps) mit gleicher Adresse und Telefonnummer pflegen, 301-Weiterleitungen von den alten URLs (z. B. `pressemitteilungen.html` → `journal.html`) einrichten

## Arbeitsweise

- Michael arbeitet knapp und lösungsorientiert, iteriert schnell anhand von Screenshots.
- Antworten auf Deutsch, strukturiert, ohne Füllstoff.
- **Vor jedem Commit prüfen:** `node tools/check.mjs` ausführen. Es erstellt Screenshots aller Seiten (Handy 390 px und Desktop 1440 px, ganze Seite) in `%TEMP%/hs-check` und meldet übergroße Bilder sowie horizontalen Überlauf. Die Screenshots der geänderten Bereiche ansehen, vor allem mobil. Normale Edge-Headless-Screenshots taugen mobil nicht, weil sie mindestens ca. 500 px breit rendern. Hintergrund: Ein Bild mit `height`-Attribut ohne `height: auto` war online 1600 px hoch. Deshalb steht in allen Seiten `img{max-width:100%;height:auto}`.
- **Nach jeder Aktion automatisch committen und pushen** (ohne Nachfrage): Commit auf `main` mit aussagekräftiger deutscher Nachricht (Betreff + Stichpunkte, was geändert wurde), danach `git push origin main`. GitHub Pages aktualisiert sich automatisch.
- Maßgeblich ist immer der **lokale Ordner**: Das Repo soll genau den lokalen Stand abbilden (`git add -A`). Ausgenommen sind nur die Einträge in `.gitignore`: `Pictues/`, die Original-Logovorlage und `*.crdownload`.
