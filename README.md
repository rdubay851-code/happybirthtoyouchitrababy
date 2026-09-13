# Chitra — Birthday World

A phone/desktop friendly, static generative birthday website for **July 3, 2027**.

## What is inside
- Countdown gate
- 10 distinct rooms with generative canvas backgrounds
- Persistent visual modes: Dream / Ocean / Sunset / Noir
- Back button on every room
- Garden interaction
- Memory fragments
- Clickable constellation builder
- Typewriter letters
- Nonlinear timeline
- Web Audio mini music room
- Multi-lock puzzle room
- Birthday observatory
- Word-based Dream Lab
- Final birthday room
- Creator preview mode
- Local progress tracking

## Run locally
Just open `index.html`, or serve the folder:

```bash
python -m http.server 8080
```
Then open `http://localhost:8080`.

## Deploy
GitHub Pages / Netlify / Vercel can host this as a static site. No backend is required.

## Creator preview
The demo creator passcode is `chitra-creator-2027`. Change it in `js/app.js` before publishing.

**Important:** because this is a static client-side site, the creator passcode is not secure authentication. Do not put genuinely private information in the source. For real private content, add server-side authentication or a protected deployment.

## Change birthday
Edit `BDAY` in `js/app.js`.
