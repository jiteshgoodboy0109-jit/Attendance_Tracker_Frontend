# 📅 Attendify — Attendance Tracker Frontend

> A modern, ATR-themed attendance management system built with React + Vite + Tailwind CSS.

---

## 🚀 Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI Framework |
| Vite 8 | Build Tool & Dev Server |
| Tailwind CSS v4 | Styling |
| react-icons | Icon Library |

---



## 🎨 Design System — ATR Dark & Light Theme

This project uses a **dual-theme color system** inspired by ATR's design language.
Every component in this project should reference these palettes for consistency.

---

### 🌑 DARK THEME (ATR Dark)

#### Background Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `page` | `#0D1117` | Full page background |
| `card` | `#161B22` | Cards, panels, modals |
| `elevated` | `#21262D` | Inputs, buttons, raised surfaces |
| `overlay` | `#30363D` | Hover states, borders |
| `muted` | `#484F58` | Placeholder backgrounds |

#### Text Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `text-primary` | `#F0F6FC` | Headings, main content |
| `text-secondary` | `#C9D1D9` | Labels, body text |
| `text-muted` | `#8B949E` | Subtitles, hints |
| `text-disabled` | `#6E7681` | Disabled states |
| `text-placeholder` | `#484F58` | Input placeholders |

#### Brand / Action Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `green` | `#238636` | Primary CTA button |
| `green-hover` | `#2EA043` | Button hover |
| `green-light` | `#3FB950` | Success icons/text |
| `blue` | `#1F6FEB` | Focus rings, links |
| `blue-hover` | `#388BFD` | Link hover |
| `blue-light` | `#58A6FF` | Secondary links |
| `purple` | `#8957E5` | Tags, badges |
| `purple-light` | `#A371F7` | Highlights |

#### Border Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `border-default` | `#30363D` | Cards, inputs |
| `border-muted` | `#21262D` | Subtle dividers |
| `border-strong` | `#484F58` | Focus, hover borders |

#### Status Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `error` | `#F85149` | Error messages |
| `warning` | `#D29922` | Warnings |
| `success` | `#3FB950` | Success states |

---

### ☀️ LIGHT THEME — Full ATR Light Palette

#### 🌤️ 1. Background Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Main Background | `#FFFFFF` | Full website background |
| Secondary Background | `#F6F8FA` | Sections, layouts |
| Tertiary Background | `#F3F4F6` | Cards, containers |
| Elevated Background | `#EBEDF0` | Dropdowns, popups |
| Overlay Background | `#DFE2E5` | Modal overlays |

#### 📝 2. Text Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Primary Text | `#24292F` | Main headings |
| Secondary Text | `#57606A` | Paragraphs |
| Muted Text | `#6E7781` | Small text |
| Disabled Text | `#8C959F` | Disabled buttons |
| Placeholder Text | `#A0A7AE` | Input placeholders |

#### 🟩 3. Primary Brand Colors (Green)
| Token | Hex | Usage |
|-------|-----|-------|
| ATR Green | `#2DA44E` | Main buttons |
| Hover Green | `#2C974B` | Button hover |
| Light Green | `#3FBF5F` | Success state |
| Pale Green | `#E6F4EA` | Success background |

#### 🔵 4. Blue Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#0969DA` | Links |
| Hover Blue | `#218BFF` | Hover links |
| Light Blue | `#54AEFF` | Highlights |
| Pale Blue | `#DBEAFE` | Selected background |

#### 🟣 5. Purple Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Purple | `#8250DF` | Premium UI |
| Hover Purple | `#A475F9` | Hover state |
| Light Purple | `#DBB4FE` | Soft cards |
| Pale Purple | `#FAF5FF` | Background tint |

#### 🟥 6. Danger / Error Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Error Red | `#CF222E` | Error text |
| Hover Red | `#A40E26` | Hover danger |
| Light Red | `#FFDCE0` | Error background |
| Pale Red | `#FEF2F2` | Alert box |

#### 🟨 7. Warning Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Yellow | `#D4A72C` | Warnings |
| Light Yellow | `#F0C849` | Highlight |
| Orange | `#FB8500` | Alerts |
| Pale Orange | `#FFF8E5` | Notification background |

#### 🟧 8. Border Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Default Border | `#D0D7DE` | Inputs / cards |
| Muted Border | `#E1E4E8` | Soft dividers |
| Strong Border | `#B0B8C1` | Active borders |
| Divider | `#EAEDEF` | Section lines |

#### 📥 9. Input Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Input Background | `#FFFFFF` | Input box |
| Input Border | `#D0D7DE` | Normal border |
| Focus Border | `#0969DA` | Active input |
| Input Text | `#24292F` | Typed text |
| Placeholder Text | `#A0A7AE` | Placeholder |

#### 🚦 10. Status Colors
| Status | Hex | Usage |
|--------|-----|-------|
| Success | `#2DA44E` | Success messages |
| Info | `#0969DA` | Information |
| Warning | `#D4A72C` | Warning |
| Error | `#CF222E` | Failed state |
| Neutral | `#6E7781` | Neutral badges |

#### ✨ 11. Shadow Colors
| Shadow Type | CSS Value |
|-------------|-----------|
| Soft Shadow | `rgba(27,31,36,0.04)` |
| Medium Shadow | `rgba(27,31,36,0.08)` |
| Strong Shadow | `rgba(27,31,36,0.12)` |

#### 🌈 12. Gradient Examples
| Gradient | Colors |
|----------|--------|
| Green | `#2DA44E → #3FBF5F` |
| Blue | `#0969DA → #54AEFF` |
| Purple | `#8250DF → #A475F9` |
| Red | `#CF222E → #FF6B6B` |
| Orange | `#FB8500 → #FEC84B` |

#### 🧩 13. Quick UI Reference
| UI Element | Color |
|------------|-------|
| Body Background | `#FFFFFF` |
| Card Background | `#F6F8FA` |
| Modal Background | `#EBEDF0` |
| Primary Button | `#2DA44E` |
| Button Hover | `#2C974B` |
| Link Color | `#0969DA` |
| Main Text | `#24292F` |
| Secondary Text | `#57606A` |
| Error Message | `#CF222E` |
| Border Color | `#D0D7DE` |


---

## 🖥️ Getting Started

```bash
# Navigate to the project
cd Attendance_Tracker_Frontend/vite-project

# Install dependencies
npm install

# Start dev server
npm run dev
```

App runs at → **http://localhost:5173/**

---

## ✅ Pages

| Page | Status | Theme Support |
|------|--------|--------------|
| Login | ✅ Done | Dark + Light |
| Register | 🔜 Coming | — |
| Dashboard | 🔜 Coming | — |
| Profile | 🔜 Coming | — |

---

## 📌 Developer Notes

- All components use **only Tailwind CSS utility classes** — no separate `.css` files
- Theme colors are defined as constants at the top of each component (`DARK` / `LIGHT` objects)
- To switch a component's colors, update the `DARK` or `LIGHT` object — never hardcode colors inline
- Icons come from `react-icons` — use `hi` for UI icons, `fa6` for brand logos, `fc` for colored brand icons
