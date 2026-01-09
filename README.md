# 🗂️ Tab Domain Grouper (Chrome Extension)

A lightweight Chrome extension that automatically groups browser tabs by domain while keeping the active tab visible and the browser clean.

---

## ✨ Features

- 🔹 Groups tabs by domain (one click)
- 🔹 Handles subdomains intelligently (e.g. `youtube.com` + `studio.youtube.com`)
- 🔹 Correctly supports multi-level domains (e.g. `cutm.ac.in`, `google.co.in`)
- 🔹 Keeps tab groups **collapsed by default**
- 🔹 Never hides the currently active tab
- 🔹 Prevents useless single-tab groups
- 🔹 Allows ungrouping all tabs anytime
- 🔹 Works only on the current window (safe & predictable)

---

## 🎯 Why This Extension Exists

Managing many open tabs becomes messy and distracting.  
Chrome provides tab groups, but manual grouping is slow and repetitive.

**Tab Domain Grouper** automates this process with:
- Minimal logic
- Clear UX rules
- No over-engineering

---

## 🧠 Design Principles

- **User context first** – never hide the active tab
- **Minimal automation** – avoid “magic” grouping
- **Safe by default** – current window only
- **MVP-focused** – easy to extend later

---

## 🔧 How Grouping Works

### Domain Detection Logic

- URL hostname is split into parts
- Noise like `www` is ignored
- If any hostname part already exists as a group key, it is reused
- Otherwise, the first meaningful part becomes the group name

### Examples

| URL | Group Name |
|---|---|
| `youtube.com` | youtube |
| `studio.youtube.com` | youtube |
| `music.youtube.com` | youtube |
| `docs.google.com` | google |
| `cutm.ac.in` | cutm |

---

## 👁️ Active Tab Protection

The group containing the active tab is kept open.

```js
collapsed: !tabIds.includes(activeTabId)


