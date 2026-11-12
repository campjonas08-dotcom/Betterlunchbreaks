---
name: Better Lunch Breaks
description: Auburn-inspired student dining prototype
colors:
  navy: "#0c2340"
  orange: "#e87722"
  orange-ink: "#973e08"
  paper: "#f3f5f8"
  white: "#ffffff"
  text: "#122c49"
  muted: "#536478"
  line: "#d4dce5"
  soft-blue: "#e9eff6"
  soft-orange: "#fff0e3"
  green: "#286248"
  soft-green: "#edf5ef"
typography:
  display:
    fontFamily: "Barlow, Arial, sans-serif"
    fontSize: "clamp(26px, 3vw, 40px)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-.025em"
  headline:
    fontFamily: "Barlow, Arial, sans-serif"
    fontSize: "37px"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-.025em"
  metric:
    fontFamily: "Barlow, Arial, sans-serif"
    fontSize: "76px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-.035em"
  body:
    fontFamily: "Barlow, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Barlow, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  surface: "14px"
  button: "7px"
  field: "6px"
  hall: "8px"
  dialog: "16px"
spacing:
  compact: "8px"
  small: "12px"
  medium: "20px"
  large: "24px"
  column: "32px"
components:
  button-primary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "13px 20px"
    height: "50px"
  button-seating:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.navy}"
    rounded: "{rounded.button}"
    padding: "13px 20px"
    height: "50px"
  button-secondary:
    textColor: "{colors.navy}"
    rounded: "{rounded.button}"
    padding: "13px 20px"
    height: "50px"
  field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.text}"
    rounded: "{rounded.field}"
    padding: "11px"
  hall-selected:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.hall}"
    padding: "10px 18px"
  stats-card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.surface}"
  forecast-card:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.surface}"
    padding: "27px"
  seat-open:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.field}"
---

# Design System: Better Lunch Breaks

## Overview

**Creative North Star: "Auburn, between classes"**

Navy structure, warm orange emphasis, and white work areas frame a compact student dining utility. Locally served Barlow gives headings, metrics, and controls a consistent, approachable voice. This Auburn-inspired treatment belongs to an independent student prototype; it does not establish official university affiliation.

**Key Characteristics:**

- Navy anchors and warm orange emphasis.
- Large tabular metrics beside short explanations.
- Flat bordered surfaces and visible control states.

## Colors

### Primary

Navy anchors the header, forecast, selected hall, personal seat, and ordinary primary buttons. Orange marks the header edge, brand detail, selection highlight, and the prominent seating action. Orange ink provides readable warm text and focus outlines.

### Secondary

Green conveys open-hour, comfortable-crowd, recommendation, and checked-in feedback; soft green supports the personal check-in summary. It is a status color, not the brand foundation.

### Neutral

Paper is the page canvas; white is the work surface. Text and muted distinguish reading hierarchy; line separates groups. Soft blue supports hover states; soft orange identifies table headers. Token values above are extracted from the root CSS custom properties.

**The Status Rule.** Seat state remains readable through words and symbols alongside color.

## Typography

**Display and body font:** Barlow, falling back to Arial and sans-serif. Local regular and semibold font files supply the interface; the semibold face is declared for weights 600–800. Font synthesis is disabled.

The hierarchy combines compact semibold headings with large tabular seat and wait metrics. The display token describes the desktop responsive heading; at the mobile breakpoint it becomes (28px). The hall heading becomes (32px). Metrics step from (76px) to (66px) and then (61px). Supporting text ranges from (12px) to (17px); recommendation copy is limited to (65ch).

## Layout

The centered content and footer use a maximum width of (1140px), with desktop side clearance of (28px). The dining area pairs a flexible main column with a forecast column (300px), separated by (32px). Statistics use two columns in a (1.35:1) ratio. The six-table floor plan uses three columns; each table has two seat columns.

At (1000px), the forecast narrows to (260px), the gap becomes (23px), and the intro stacks. At (760px), content has (20px) side clearance, halls form a two-column picker, dining content stacks, the forecast times become three columns, and the floor plan becomes two columns. The main seating action fills its row. At (360px), header and statistics spacing tighten further.

## Elevation & Depth

Default surfaces are flat. Borders, white-on-paper contrast, and the navy forecast establish grouping. Only dialogs use a shadow (`0 20px 70px #06142640`) over a translucent backdrop (`#06142699`). Avoid adding card shadows that compete with the metrics.

## Shapes

Surfaces use the surface radius; buttons and table headers use the button radius; fields and seats use the field radius. Hall and profile controls use the hall radius. Dialogs use the larger dialog radius. The personal check-in summary is rounded (10px). Borders are generally (1px); the header carries an orange top rule (4px).

## Components

### Buttons

Ordinary primary buttons are navy with white text. The seating action uses orange with navy text; its hover is (`#f49349`), while navy buttons hover at (`#244769`). Secondary buttons are transparent with a (`#718298`) border and soft-blue hover. Primary and secondary controls have minimum height (50px); general buttons have minimum height (46px). Disabled controls use opacity (.55).

### Hall navigation and status

Hall controls show a title and supporting label. Selected halls are navy with white text and a pale-blue supporting label (`#c5d6e9`); unselected halls are white with a line border and soft-blue hover. Open-hour status is a small green dot paired with text, rather than a filled badge.

### Cards and forecast

Statistics use a white bordered container with an internal divider and padding (25px 28px). The forecast is a navy surface with padding (27px), pale supporting text, and a warm current-value accent (`#ffaf71`). The floor-plan container is white, bordered, and padded (22px 28px 12px).

### Seats and tables

Open seats are white with navy text and a (`#667b94`) border; taken seats use (`#dee4eb`) with (`#4c5c70`) text; the personal seat is navy with white text. Seats have minimum width (44px) and height (46px). Table headers use soft orange and orange ink, with a (`#efc6a6`) border. Hover lightens table headers and shifts open seats to soft blue.

### Inputs and dialogs

Fields are white with a (`#718298`) border, field radius, padding (11px), and minimum height (48px). Dialogs are white, scroll within (90dvh), and have maximum width (520px); padding falls from (35px) to (32px 23px) on mobile. Sticker printing isolates the generated sticker at (90mm).

### Focus and motion

Interactive elements use a visible orange-ink outline (3px), offset (4px); header focus uses (`#ffc68f`). Button color changes take (160ms ease-out); occupancy width changes take (220ms ease-out). Reduced-motion preference removes transitions and smooth scrolling.

## Do's and Don'ts

### Do:

- **Do** retain readable demo disclosures and the independent-project attribution.
- **Do** use words and symbols alongside seat colors.
- **Do** preserve visible focus, reduced-motion support, and touch-friendly controls.

### Don't:

- **Don't** introduce official university marks or imply campus endorsement.
- **Don't** replace compact task content with an oversized marketing hero.
- **Don't** use color as the sole distinction between open, taken, and personal seats.
