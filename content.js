let isActive = true
let sessionCount = 0
let totalCount = 0

chrome.storage.local.get(["isActive", "sessionCount", "totalCount"], (data) => {
    if (data.isActive !== undefined) isActive = data.isActive
    if (data.sessionCount !== undefined) sessionCount = data.sessionCount
    if (data.totalCount !== undefined) totalCount = data.totalCount
    if (isActive) {
        initObserver()
        checkAndRedirect()
    }
})

chrome.storage.onChanged.addListener((changes) => {
    if (changes.isActive) {
        isActive = changes.isActive.newValue
        if (isActive) {
            initObserver()
            checkAndRedirect()
        } else {
            showAll()
        }
    }
    if (changes.sessionCount && changes.sessionCount.newValue === 0) {
        sessionCount = 0
    }
})

document.addEventListener('yt-navigate-finish', () => {
    if (isActive) checkAndRedirect()
})

function checkAndRedirect() {
    if (window.location.pathname.startsWith('/shorts/')) {
        const videoId = window.location.pathname.split('/shorts/')[1]
        window.location.replace(`https://www.youtube.com/watch?v=${videoId}`)
    }
}

function initObserver() {
    const observer = new MutationObserver(() => {
        if (isActive) {
            hideShelves()
            hideSidebarShorts()
            hideChannelTabs()
        }
    })
    observer.observe(document.body, { childList: true, subtree: true })
    
    hideShelves()
    hideSidebarShorts()
    hideChannelTabs()
}

function hideShelves() {
    const shelves = document.querySelectorAll('ytd-rich-section-renderer:not(.vanished), ytd-reel-shelf-renderer:not(.vanished)')
    
    shelves.forEach(el => {
        const isShortsShelf = el.tagName.toLowerCase() === 'ytd-reel-shelf-renderer' || el.querySelector('ytd-rich-shelf-renderer[is-shorts]')
        if (isShortsShelf) {
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

function hideChannelTabs() {
    const tabs = document.querySelectorAll('yt-tab-shape:not(.vanished)')
    
    tabs.forEach(tab => {
        if (tab.innerText.trim() === 'Shorts') {
            tab.style.display = 'none'
            tab.classList.add('vanished')
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