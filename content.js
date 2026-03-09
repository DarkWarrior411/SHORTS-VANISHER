let isActive = true
let vanishCount = 0

chrome.storage.local.get(["isActive", "vanishCount"], (data) => {
    if (data.isActive !== undefined) isActive = data.isActive
    if (data.vanishCount !== undefined) vanishCount = data.vanishCount
    if (isActive) initObserver()
})

chrome.storage.onChanged.addListener((changes) => {
    if (changes.isActive) {
        isActive = changes.isActive.newValue
        if (isActive) initObserver()
        else showAll()
    }
})

function initObserver() {
    const observer = new MutationObserver(() => {
        if (isActive && window.location.pathname === "/") {
            hideShorts()
        }
    })
    observer.observe(document.body, { childList: true, subtree: true })
    if (window.location.pathname === "/") hideShorts()
}

function hideShorts() {
    const elements = document.querySelectorAll('ytd-rich-section-renderer:not(.vanished)')
    
    elements.forEach(el => {
        const isShorts = el.querySelector('ytd-rich-shelf-renderer[is-shorts]')
        
        if (isShorts) {
            el.style.display = 'none'
            el.classList.add('vanished')
            vanishCount++
            chrome.storage.local.set({ vanishCount })
        }
    })
}

function showAll() {
    const elements = document.querySelectorAll('.vanished')
    elements.forEach(el => {
        el.style.display = ''
        el.classList.remove('vanished')
    })
}