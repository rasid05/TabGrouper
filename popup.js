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













// document.addEventListener("DOMContentLoaded", () => {
//     const btn = document.getElementById("groupTabs");

//     btn.addEventListener("click", () => {
//         chrome.runtime.sendMessage({ action: "GROUP_CHATGPT_TABS" });
//     });
// });
