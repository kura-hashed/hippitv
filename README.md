# HippiTV 🌸
### Healthy, Low-Stimulation English Learning Video Streaming Platform for Babies & Toddlers

**HippiTV** is a Netflix / Apple TV style video streaming platform designed for parents raising young children learning English. It features **500+ verified, embeddable, low-stimulation, developmentally-sound videos** with age-specific filters (0-1 yr, 2 years, 3 years, 4 years, 5+ years), real human educators with American accents, and interactive speech development prompts.

---

## ✨ Key Features

1. **Age-Based Content Filtering**:
   - 🍼 **0 - 1 Year (Infant)**: Sound recognition, parentese babbling, acoustic lullabies, high-contrast visual books.
   - 🧸 **2 Years Baby (Toddler)**: Gentle, non-scary, slow-paced human speech (Ms. Rachel, Sarah & Duck, Puffin Rock, Maisy, Super Simple Songs), board books.
   - 🎨 **3 Years Baby (Preschool)**: 2-3 word sentences, emotional regulation (Daniel Tiger, Bluey), interactive pretend play.
   - 🧩 **4 Years (Pre-K)**: Phonics blending (Alphablocks), number sense (Numberblocks), rhyming books.
   - 🚀 **5+ Years (Early Primary)**: Graded readers, science exploration (Octonauts), sight words & storytelling.

2. **👩‍🏫 Real People & American Accent Filter**:
   - Speech-language therapists emphasize facial framing for speech development. Direct filter for real educators with clear American articulation (Ms. Rachel, Caitie's Classroom, Tab Time, Bri Reads, Miss Monica, Mister Rogers).

3. **🌿 Low-Stimulation Standards**:
   - Calm transitions, acoustic melodies, gentle pacing, and zero rapid scene cuts to prevent toddler overstimulation.

4. **🔐 Google Sign-In & YouTube-Style Watch History**:
   - Direct 1-click **Google OAuth 2.0** login flow via Google Identity Services (GIS).
   - Real-time watch progress tracking with YouTube-style red progress bars on thumbnails.
   - Exact timestamp resume playback (`&start={seconds}`) and a dedicated Watch History drawer.

5. **📱 Mobile-First Responsive Design**:
   - Thumb-friendly bottom navigation bar (**Home**, **2 Years**, **Real 🇺🇸**, **History**, **My List**).
   - Horizontal snap-scroll carousels and edge-to-edge fullscreen mobile video player.

6. **Parent Prompts & Target Vocabulary**:
   - Every video includes actionable interaction tips and key vocabulary lists for parents to mimic and reinforce.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ or v20+)
- npm

### Development
```bash
# Install dependencies
npm install

# Start local dev server (available on local & LAN network)
npm run dev -- --host
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🛠️ Technology Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Authentication**: Google Identity Services (OAuth 2.0)
- **Icons**: Lucide React
- **Typography**: Google Fonts (Quicksand & Nunito)
