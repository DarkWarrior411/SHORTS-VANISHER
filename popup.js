const toggleBtn = document.getElementById("toggle-btn")
const sessionCountEl = document.getElementById("session-count-el")
const totalCountEl = document.getElementById("total-count-el")

chrome.storage.local.get(["isActive", "sessionCount", "totalCount"], (data) => {
    toggleBtn.checked = data.isActive !== false
    sessionCountEl.innerText = data.sessionCount || 0
    totalCountEl.innerText = data.totalCount || 0
})

toggleBtn.addEventListener("change", (e) => {
    const isActive = e.target.checked
    if (!isActive) {
        chrome.storage.local.set({ isActive: false, sessionCount: 0 })
        sessionCountEl.innerText = 0
    } else {
        chrome.storage.local.set({ isActive: true })
    }
})

chrome.storage.onChanged.addListener((changes) => {
    if (changes.sessionCount) {
        sessionCountEl.innerText = changes.sessionCount.newValue
    }
    if (changes.totalCount) {
        totalCountEl.innerText = changes.totalCount.newValue
    }
})