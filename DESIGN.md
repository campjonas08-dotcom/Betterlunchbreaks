---
name: Better Lunch Breaks
description: Auburn-inspired student dining planner
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

# Better Lunch Breaks design

Preserve the incumbent Auburn-inspired navy (#0c2340), orange (#e87722), warm orange ink, paper background and white work surfaces. Barlow regular/semibold fonts are served locally. This is an independent student project without official university affiliation.

## Layout

The centered desktop surface is 1140px wide with 28px side clearance. Hall estimates pair two primary statistics with a navy forecast panel. On phones, statistics remain paired and the forecast stacks below. The Dining Dollars area pairs a balance/purchase form with compact views for overview, purchase logging, activity and settings on a separate page. Shared header navigation marks the active Dining or Dining Dollars page. Purchase history is a flat list with amounts and removal actions. Date fields stack at narrow widths.

## Type and interaction

Use clear semibold headings, large tabular wait/balance values, short explanatory copy and 14–16px body text. Orange ink highlights the weekday budget allowance. White inputs have readable borders and a 48px minimum height. Buttons keep the existing navy treatment, 46–50px minimum height, rounded corners, and visible orange focus outlines. Reduced-motion preferences remove transitions. Budget and hall status text communicates errors and outcomes without relying on color.

## Product truth

The Edge shows curated sample dining periods and a lunch-rush column chart. A small sample-data note provides context. Open seating is a rounded range; there are no seat maps, reservations, table controls, QR dialogs or manual checkout. Forecasts show sample dining waits. Budget amounts are manually entered and stored in this browser; do not imply campus account integration. Keep the Village excluded and avoid prototype/demo/early-access interface labels.

## Full tracker and daily dining schedule

Dining now shows a fixed all-day schedule with lunch as the highest peak and smaller breakfast/dinner peaks. Meal-period summaries make the timing obvious. The chart scrolls internally on phones and each column selects a time.

The tracker uses the reference app's complete compact UI, navigation, sheets, insights and history rather than the earlier simplified forms. `tracker/auburn.css` maps its palette and typography into the existing navy/orange Barlow identity. A shared site header links back to dining, while the source app's Home, Log, Insights and Settings controls remain available at the bottom. Toasts sit above those controls. Daily budget and available earned funds remain distinct, with the original calculations preserved.


The dining headline metric, nearby-time panel and daily chart now show people inside. Rough open seating accompanies that count; estimated time to find a table sits below the statistics as small supporting text. Peak-period summaries use crowd counts rather than minutes.
