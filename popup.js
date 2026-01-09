document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("groupByDomain")
        .addEventListener("click", () => {
            chrome.runtime.sendMessage({ action: "GROUP_BY_DOMAIN" });
        });

    document.getElementById("ungroupTabs").addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "UNGROUP_ALL" });
    });
});
