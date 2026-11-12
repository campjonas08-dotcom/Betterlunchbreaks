# Better Lunch Breaks

## Purpose

Give Auburn students a simple dining-day overview and a complete daily Dining Dollars tracker.

## Dining

Use fixed, made-up people-inside counts and rough open seating as the primary metrics. Lunch from 11:30 AM through 1 PM must be the busiest period, with smaller peaks at 9–10 AM and 5–6 PM. Show time selection, nearby people-inside counts and an all-day occupancy chart. Keep estimated time to find a table as a smaller supporting detail; finding a table is the core task. Keep a small sample-data note without live-connection wording or editable scan inputs. The Edge is the supported hall; The Village, table selection and QR/manual check-ins remain removed.

## Tracker

Use the full main code from `campjonas08-dotcom/Dining-dollar-tracker` rather than the simplified replacement. Host it at `dollars.html` with Auburn-themed styles and common navigation. Preserve original daily accrual, rollover, earned/available funds, multiple funds, purchases/editing/history, insights, term management and backups. Preserve prior balances/history by migration. See `tracker/PORTING.md`.

## Platform and quality

Static GitHub Pages app with project-relative assets. Use the existing isolated checkout; no worktree needed. Preserve Auburn navy/orange, local Barlow fonts, mobile usability, keyboard focus, readable states and reduced-motion behavior. Do not imply official university affiliation. Validate meaningful app flows at desktop, phone and narrow widths before pushing to main and checking Pages deployment.
