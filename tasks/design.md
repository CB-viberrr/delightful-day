# Design & demo
**Goal:** make the whole app feel delightful and cohesive, and own the final demo.
**You own:** `public/style.css`, `public/assets/` (logo, images, favicon). **Don't touch:** `.js` files. Ask owners for markup changes ("please add class X"); you style what exists.
**Others' CSS:** teammates inject their own small styles inside their feature files. Don't fight it; ask them.

## Tasks (in order)
1. Run the site, log in, click every tab. Write down (in a note) 5 things that feel plain or off.
2. Improve the base look in `style.css`: typography, spacing, colors, buttons, cards, hover states. Keep the evening/sunset feel. (You can change the `:root` color variables at the top.)
3. Add a **logo** and favicon in `public/assets/` (SVG is best; ask Claude to draw one). The Integrator adds the link tags on request.
4. Design the login screen, empty states and loading states. Add subtle animations (fade-ins, hover lifts).
5. **QA pass** at 0:55: click every tab with a fresh account; list bugs by owner and tell them.
6. Write the **60-second demo script** with the Integrator (story: "Friday, 6pm, no plans"), rehearse it twice.

## Prompts you can paste
- "Improve style.css so cards have a soft glow on hover, headings feel bolder, and the whole app feels warmer. Keep the dark evening theme."
- "Create a simple SVG logo of a crescent moon with a small star, save it as public/assets/logo.svg."

## Done when
A stranger says "wow, that looks nice" in the first 5 seconds, and the demo runs smoothly twice in a row.
