# MAUSAM (मौसम) 🌦️
> **"Weather that understands your day."**
> A modern, highly interactive, responsive mobile weather application with a personalized dynamic homepage that adapts to different user lifestyles and personas.

---

## 🌟 Project Overview

Traditional weather applications present the exact same static dashboard to every user. **Mausam** breaks this paradigm by combining real-time meteorological conditions, air quality, marine analytics, and agricultural metrics with an intelligent rule-based **Personalization Engine**. 

Depending on the user's selected personas, daily routine, and location, Mausam dynamically customizes and re-ranks the homepage widgets to surface what matters most.

---

## 👥 Supported User Personas

| Persona | Key Weather Intelligence Surfaced | Specialized Metrics |
|---|---|---|
| **❤️ Health & Wellness** | AQI, PM2.5, PM10, Pollen (tree/grass/weed), UV protection SPF | Health Score (0–100) |
| **🏃 Fitness & Outdoor** | Optimal running windows (e.g., 6–8 AM), Heat alerts, Wind speed, Rain chance | Workout Comfort Score (0–100) |
| **🏄 Beachgoer & Surfer** | Wave height, Wave direction, Water temp, Tide schedule (High/Low) | Beach Safety Rating (SAFE / CAUTION / AVOID) |
| **✈️ Traveler** | Multi-city forecasts, Severe travel advisories, Weather comparison | Smart Packing Recommendations |
| **👨‍👩‍👧 Family & Kids** | Morning school commute weather, Rain jacket/umbrella advice, Road visibility | Kids Outdoor Play Suitability |
| **🌱 Gardener & Farmer** | Soil moisture %, 24h rainfall forecasts, Frost alerts, Sunlight hours | Seasonal Crop Planting Guide |
| **🚗 Daily Commuter** | Road conditions (Dry/Wet/Slippery), Visibility in km, Rain intensity, Storm alerts | Commute Risk Score (LOW/MOD/HIGH) |
| **🎉 Event Planner** | Hourly event outlook, Temperature, Wind, Rain probability, Comfort index | Event Suitability Score & Plan B Contingency |

---

## 📱 Core Application Screens & Features

1. **Animated Splash Screen**: Brand emblem with animated sun, cloud, rain, and wind elements + tagline.
2. **Multi-Step Onboarding**:
   - Welcome & mission statement
   - Location setup (current GPS / manual search / multi-city)
   - Interactive 8-persona multi-selector
   - Unit selection (°C/°F, km/h vs mph) and notification briefing triggers
3. **Personalized Homepage**:
   - Dynamic weather-reactive background gradients (Sunny, Rainy, Cloudy, Night, Storm)
   - Context-aware greeting & location switcher
   - Main weather hero card with feels-like & highs/lows
   - **Mausam Insights** AI dynamic recommendations
   - Dynamic persona widget stack
   - Horizontally scrollable hourly timeline
   - Expandable 7-day extended outlook
4. **Dashboard Customizer ("Edit Mode")**:
   - Drag & reorder widgets up/down
   - Pin critical cards to the top
   - Hide/show sections
   - Add/remove lifestyle personas on the fly
   - One-click reset to recommended layout
5. **Deep Weather Metrics Modal**:
   - Interactive charts for 24h Temperature, Rainfall probability, Wind velocity, and Humidity
   - Deep metrics: Dew point, Pressure (hPa), Visibility (km), Solar UV radiation, Sunrise/Sunset
6. **Interactive Weather Map**:
   - 7 Map layers: *Rain Radar, Temperature Heatmap, Wind Streamlines, Cloud Density, AQI Smog, UV Radiation, Storm Tracking*
   - Interactive zoom in/out & location markers
7. **Saved Locations & Weather Comparison**:
   - Autocomplete search across Indian & global cities (Chennai, London, Dubai, New York, Bengaluru, Mumbai, etc.)
   - Side-by-side real-time multi-metric comparison matrix
8. **Alerts Center**:
   - Priority-tiered alert feeds (Severe 🔴, Heavy Rain 🟠, High UV 🟡, Poor AQI 🟣, Strong Winds 🔵, Fog ⚠️)
   - Category subscription controls & real-time notification simulation
9. **Mausam AI Assistant**:
   - Floating assistant drawer providing natural language weather answers ("Can I go running this evening?", "What should I pack for London?", "Is tomorrow good for an outdoor wedding?")
10. **Gamification & Settings**:
    - Weather check streak tracking (🔥 7-Day streak)
    - Unlocked engagement badges (*Sun Seeker, Rain Ready, Weather Athlete, Wave Explorer, Green Thumb*)
    - Light / Dark / System theme switching

---

## 🛠️ Technology Stack & Architecture

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion, Recharts
- **State Management**: React Context (`AppContext.tsx`) with localStorage persistence
- **Data & Mock Service Layer**: Structured TypeScript interfaces supporting real weather API integration (OpenWeather, AirVisual, StormGlass Marine, IMD Radar)
- **Design System**: Glassmorphism, smooth micro-animations, mobile-first responsive container.

---

## 🚀 Running the Application

### 1. Install Dependencies
```bash
# In the client folder
cd client
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🌐 GitHub Repository
To push to your remote repository:
```bash
git init
git add .
git commit -m "feat: complete Mausam personalized weather mobile application"
git branch -M main
git remote add origin https://github.com/rithikfernando07-web/mausam.git
git push -u origin main
```
