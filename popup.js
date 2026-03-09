const toggleBtn = document.getElementById("toggle-btn")
const countEl = document.getElementById("count-el")

chrome.storage.local.get(["isActive", "vanishCount"], (data) => {
    toggleBtn.checked = data.isActive !== false
    countEl.innerText = data.vanishCount || 0
})

toggleBtn.addEventListener("change", (e) => {
    chrome.storage.local.set({ isActive: e.target.checked })
})

chrome.storage.onChanged.addListener((changes) => {
    if (changes.vanishCount) {
        countEl.innerText = changes.vanishCount.newValue
    }
})