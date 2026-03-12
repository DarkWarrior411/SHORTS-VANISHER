let isActive = true
let sessionCount = 0
let totalCount = 0

chrome.storage.local.get(["isActive", "sessionCount", "totalCount"], (data) => {
    if (data.isActive !== undefined) isActive = data.isActive
    if (data.sessionCount !== undefined) sessionCount = data.sessionCount
    if (data.totalCount !== undefined) totalCount = data.totalCount
    if (isActive) initObserver()
})

chrome.storage.onChanged.addListener((changes) => {
    if (changes.isActive) {
        isActive = changes.isActive.newValue
        if (isActive) {
            initObserver()
        } else {
            showAll()
        }
    }
    if (changes.sessionCount && changes.sessionCount.newValue === 0) {
        sessionCount = 0
    }
})

function initObserver() {
    const observer = new MutationObserver(() => {
        if (isActive) {
            if (window.location.pathname === "/") hideHomeShorts()
            hideSidebarShorts()
        }
    })
    observer.observe(document.body, { childList: true, subtree: true })
    
    if (window.location.pathname === "/") hideHomeShorts()
    hideSidebarShorts()
}

function hideHomeShorts() {
    const elements = document.querySelectorAll('ytd-rich-section-renderer:not(.vanished)')
    
    elements.forEach(el => {
        const isShorts = el.querySelector('ytd-rich-shelf-renderer[is-shorts]')
        if (isShorts) {
            el.style.display = 'none'
            el.classList.add('vanished')
            updateCounts()
        }
    })
}

function hideSidebarShorts() {
    const sidebarLinks = document.querySelectorAll('ytd-guide-entry-renderer a[title="Shorts"], ytd-mini-guide-entry-renderer a[title="Shorts"]')
    
    sidebarLinks.forEach(link => {
        const container = link.closest('ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer')
        if (container && !container.classList.contains('vanished')) {
            container.style.display = 'none'
            container.classList.add('vanished')
            updateCounts()
        }
    })
}

function updateCounts() {
    sessionCount++
    totalCount++
    chrome.storage.local.set({ sessionCount, totalCount })
}

function showAll() {
    const elements = document.querySelectorAll('.vanished')
    elements.forEach(el => {
        el.style.display = ''
        el.classList.remove('vanished')
    })
}