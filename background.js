console.log("✅ Domain Tab Grouper loaded");

function getDomainKey(parts, existingDomains) {
    // remove common noise
    const cleanParts = parts.filter(p => p !== "www");
    // if any part already exists as a domain key, reuse it
    for (const part of cleanParts) {
        if (existingDomains.has(part)) {
            return part;
        }
    }
    // otherwise fall back to first meaningful part
    return cleanParts[0];
}


chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "GROUP_BY_DOMAIN") {
        chrome.tabs.query({ currentWindow: true }, (tabs) => {

            const domainMap = {};
            const existingDomains = new Set();

            tabs.forEach(tab => {
                if (!tab.url || tab.url.startsWith("chrome://")) return;

                try {
                    const url = new URL(tab.url);
                    const hostname = url.hostname;
                    const parts = hostname.split(".");
                    // const domain = parts[0] === 'www' ? parts[1] : parts[0]
                    const domain = getDomainKey(parts, existingDomains);

                    if (!domainMap[domain]) {
                        domainMap[domain] = [];
                        existingDomains.add(domain);
                    }

                    domainMap[domain].push(tab.id);
                } catch (e) {
                    // ignore invalid URLs
                }
            });

            // Create groups per domain
            const activeTab = tabs.find(tab => tab.active);
            const activeTabId = activeTab?.id;
            Object.entries(domainMap).forEach(([domain, tabIds]) => {
                if (tabIds.length < 2) return;

                chrome.tabs.group({ tabIds }, (groupId) => {
                    chrome.tabGroups.update(groupId, {
                        title: domain,
                        collapsed: !tabIds.includes(activeTabId)
                    });
                });
            });
        });
    }

    // UNGROUP
    if (message.action === "UNGROUP_ALL") {
        chrome.tabs.query({ currentWindow: true }, (tabs) => {
            const groupedTabIds = tabs
                .filter(tab => tab.groupId !== chrome.tabGroups.TAB_GROUP_ID_NONE)
                .map(tab => tab.id);

            if (groupedTabIds.length === 0) return;

            chrome.tabs.ungroup(groupedTabIds);
        });
    }

});


















// Phase 1---------------------------------------------------------------------

// console.log("✅ Background service worker loaded");

// chrome.runtime.onMessage.addListener((message) => {
//     if (message.action === "GROUP_CHATGPT_TABS") {

//         chrome.tabs.query({ currentWindow: true }, (tabs) => {
//             const chatgptTabs = tabs
//                 .filter(tab => tab.url && tab.url.includes("chatgpt.com"))
//                 .map(tab => tab.id);

//             if (chatgptTabs.length < 2) return;

//             // ✅ CORRECT: group tabs using chrome.tabs.group
//             chrome.tabs.group({ tabIds: chatgptTabs }, (groupId) => {

//                 // ✅ CORRECT: update group using chrome.tabGroups
//                 chrome.tabGroups.update(groupId, {
//                     title: "ChatGPT",
//                     color: "green"
//                 });

//             });
//         });
//     }
// });
