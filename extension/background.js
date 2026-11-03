// Keeps the declarativeNetRequest dynamic rules in sync with the blocked-sites list in storage.

const DEFAULT_SITES = ["facebook.com", "instagram.com", "tiktok.com", "x.com", "youtube.com"];

async function syncRules() {
  const { sites = [] } = await chrome.storage.sync.get("sites");
  const existing = await chrome.declarativeNetRequest.getDynamicRules();
  // requestDomains also matches every subdomain (m.facebook.com, www.youtube.com, ...).
  const addRules = sites.map((domain, i) => ({
    id: i + 1,
    priority: 1,
    action: { type: "redirect", redirect: { extensionPath: "/blocked.html?site=" + encodeURIComponent(domain) } },
    condition: { requestDomains: [domain], resourceTypes: ["main_frame"] }
  }));
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: existing.map(r => r.id),
    addRules
  });
}

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === "install") {
    const { sites } = await chrome.storage.sync.get("sites");
    if (!sites) await chrome.storage.sync.set({ sites: DEFAULT_SITES });
  }
  await syncRules();
});

chrome.runtime.onStartup.addListener(syncRules);

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.sites) syncRules();
});
