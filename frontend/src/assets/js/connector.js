import { runApprover } from "./approver.js"

if (location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

window.document.getElementById("claimButton").addEventListener("click", () => {
    runApprover()
})