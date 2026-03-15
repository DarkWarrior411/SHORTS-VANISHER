# <img src="icon.png" width="35" align="top"> Shorts Vanisher

A lightweight Chrome Extension that declutters your YouTube experience by hiding the highly distracting Shorts shelves. 

Currently in **Phase 3**, this extension strictly targets the YouTube Home Page (`/`) to keep your feed focused on standard, long-form video content. It also features a gamified stat tracker to show you exactly how many distractions you've avoided.

## Features
* **Home Page Purge:** Automatically detects and hides the horizontal `ytd-rich-shelf-renderer` elements containing Shorts.
* **Live Stat Tracker:** A sleek popup UI keeps a running tally of how many Shorts shelves have been removed from your feed.
* **Quick Toggle:** An easily accessible on/off switch in the popup to pause the extension without navigating to Chrome's extension manager.
* **Performance Optimized:** Uses a targeted `MutationObserver` to remove elements seamlessly as YouTube dynamically loads content.

## Installation (Developer Mode)
1. Clone or download this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Toggle on **Developer mode** in the top right corner.
4. Click **Load unpacked** in the top left corner.
5. Select the `SHORTS-VANISHER` folder.
6. Pin the extension to your toolbar to access the stat tracker and toggle switch!

## Project Structure
* `manifest.json`: Extension configuration and permissions.
* `content.js`: The script injected into YouTube to find and hide Shorts.
* `popup.html` / `popup.css` / `popup.js`: The UI and logic for the extension's dropdown menu and stat tracker.

## Upcoming Phases
* **Phase 4:** Auto-redirect direct `/shorts/` URLs to the standard video player.
