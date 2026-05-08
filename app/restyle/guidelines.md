BRAND DOCUMENT
Watch
List.

Design language, visual identity, and component
standards for the Watchlist application.

01 BRAND ESSENCE

The idea
behind the app. behind the app. behind the app.

Watchlist is a personal cinema — a curated, deliberate record of
everything you've watched, are watching, and intend to watch.
!e design reflects this: considered, atmospheric, built for
someone who takes their viewing seriously.

Curatorial
Your list is intentional. The UI
doesn't clutter — it frames.

Cinematic
Dark, atmospheric, with golden
accents — the warmth of a
darkened room.

Personal
Built around one person's taste,
not algorithmic noise.

Efficient
Every interaction is purposeful.
No dark patterns, no friction.

02 COLOUR PALETTE

Colour
System. System. System.

Rooted in near-black with amber-gold as the signature accent. Secondary
colours carry semantic meaning: teal for completion, red for removal.

CORE PALETTE

BLACK
#0D0C0B
Page background

SURFACE
#1C1916
Cards, panels

SURFACE 2
#252119
Elevated cards

BORDER
#2E2920
Dividers, outlines

GOLD
#E8A830
Primary accent

GOLD DIM
#A07320
Secondary accent

GOLD PALE
#F5D07A

CREAM
#EDE8DF

MUTED
#7A7060

Italic highlights Body text Secondary text

SEMANTIC COLOURS

TEAL
#2A7A6A
Watched / complete

RED
#C23B2A
Dropped / danger

03 TYPOGRAPHY

Type
System. System. System.

BEBAS NEUE — DISPLAY / HEADINGS / UI LABELS
Now Watching
Add to Queue · 2024 · Drama

USE FOR
Page titles · Section headers · Buttons · Badges · Nav labels · Stat callouts

AVOID
Body copy · Error messages · Long-form text

PLAYFAIR DISPLAY — SUBHEADINGS / QUOTES / TAGLINES
A film worth remembering deserves a list worth
keeping. Your watchlist, your story.

USE FOR: Taglines · Empty state copy · Review excerpts · Onboarding text · Italic
emphasis within UI prose

DM SANS LIGHT (300) — BODY / UI COPY
Track the films and TV shows you're watching, have watched, or
want to watch. Powered by TMDB. Your data, your list — no
algorithms, no noise.

USE FOR: Descriptions · Tooltips · Form labels · Help text · Notification body

DM MONO — META / CODE / LABELS
TMDB_ID: 550 · ADDED: 2024-11-03 · STATUS: WATCHING ·
EPISODES: 12/24

USE FOR: IDs · Timestamps · Code · Section numbers · Data labels · Tag text

TYPE SCALE

TOKEN SIZE / WEIGHT PREVIEW

display-2xl Bebas · 6rem Watchlist

display-xl Bebas · 4rem Now Watching

display-lg Bebas · 2.5rem Add to Queue

heading-md Playfair · 1.3rem ·

Regular Your personal cinema

body-md DM Sans · 1rem · 300 Track your viewing

history

label-sm DM Mono · 0.65rem · 400 STATUS: WATCHING

04 LOGO & IDENTITY

Logo
Variants. Variants. Variants.

The wordmark uses Bebas Neue with a two-tone split: WATCH in white, LIST
in gold. The icon uses a stylised film-frame / eye motif.

LOGO RULES

ICON ONLY — FAVICON / APP ICON
WATCHLIST

WATCHLIST

WATCHLIST

Always maintain the WATCH/LIST two-tone split in the wordmark

Minimum logo width: 120px on screen, 30mm in print

Never stretch, rotate, or apply drop shadows to the logo

Never place the logo on low-contrast backgrounds without a clear container

Never recolour the gold accent to any non-brand colour

05 UI COMPONENTS

Component Component Component
Library. Library. Library.

BUTTONS

Add to
List

View
Details

STATUS BADGES

WATCHING WATCHED DROPPED
QUEUE
Badges use DM Mono, uppercase, with semantic
background tints. Never use solid fills.

Cancel

Remove

MEDIA CARD

The Shawshank Redemption
1994 · DRAMA · FRANK DARABONT
WATCHED

Severance
2022 · SCI-FI DRAMA · SEASON 2 IN PROGRESS
WATCHING

FORM INPUTS
SEARCH
Search for a film or series...
STATUS
Watching

ICONOGRAPHY
Use Lucide React (already in stack). Stroke width
1.5, colour from the token system. Never fill icons.

add check search

trash star

06 SPACING & LAYOUT

Space & Space & Space &
Grid.

Based on a 4px base unit. All spacing values are multiples of 4. Content max-
width 1200px, with a 960px readable content column.

xs
4px

sm
8px

md
12px

lg
16px

xl
24px

2xl
32px

3xl
48px

4xl
64px

5xl
96px

BORDER RADIUS TOKENS

none / 0px
Cards, inputs

sm / 2px
Badges, tags

full / 50%
Avatars only

Sharp corners are preferred throughout. The aesthetic is editorial, not soft or bubbly.
Avoid border-radius values above 2px except for avatar/pill edge cases.

07 MOTION

Motion
Principles. Principles. Principles.

Motion is purposeful and cinematic — never decorative. Transitions should feel
like a frame cut, not a dissolve.

Ease Out
cubic-bezier(0.22,
1, 0.36, 1)
Page transitions ·
Modals · Drawers

Fade Up
ease-in-out ·
translateY(8px→0)
List item entry ·
Card loads

Spring
cubic-bezier(0.34,
1.56, 0.64, 1)
Button press ·
Badge appear

DURATION TOKENS
instant · 100ms · Hover states fast · 200ms · Toggles, badges

normal · 300ms · Cards, modals slow · 500ms · Page transitions

08 TONE OF VOICE

Voice & Voice & Voice &
Writing. Writing. Writing.

Watchlist speaks like a knowledgeable friend — direct, unpatronising, occasionally
dry. It never upsells, never guilt-trips, and trusts the user to know what they want.

✓ DO
"Added to your queue."

✗ DON'T
"Great choice! We've added this to your watchlist for you!"

✓ DO
"Nothing in your queue yet. Add something worth watching."

✗ DON'T
"Your watchlist looks a little empty! Start adding some amazing shows
and movies!"

✓ DO
"Removed."

✗ DON'T
"Are you sure you want to remove this? This action cannot be undone!"

WRITING PRINCIPLES
Sentence case throughout. All-caps is reserved for Bebas Neue display
elements and code labels only.

Favour brevity. If a UI string can lose a word without losing meaning, cut it.

Use present tense in status copy. "Watching" not "Currently being watched".

No exclamation marks in UI copy. Ever.

No emoji in the application interface (documentation and marketing are
separate).

WatchList.

Brand Guidelines v1.0
Bark IT Solutions Ltd
April 2026