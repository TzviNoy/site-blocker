// Shared helpers for the options page and popup.

// Turn whatever the user typed ("https://www.youtube.com/watch?v=..", "YouTube.com") into a bare domain.
function normalizeDomain(input) {
  let s = (input || "").trim().toLowerCase();
  if (!s) return "";
  if (!/^[a-z][a-z0-9+.-]*:\/\//.test(s)) s = "http://" + s;
  try {
    let host = new URL(s).hostname;
    if (host.startsWith("www.")) host = host.slice(4);
    return /^[a-z0-9.-]+\.[a-z0-9-]+$/.test(host) || host === "localhost" ? host : "";
  } catch (e) {
    return "";
  }
}

async function getSites() {
  const { sites } = await chrome.storage.sync.get({ sites: [] });
  return sites;
}

async function setSites(sites) {
  const unique = [...new Set(sites.filter(Boolean))].sort();
  await chrome.storage.sync.set({ sites: unique });
  return unique;
}
