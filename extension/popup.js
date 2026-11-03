const domainEl = document.getElementById("domain");
const toggle = document.getElementById("toggle");

document.getElementById("options").addEventListener("click", () => chrome.runtime.openOptionsPage());

(async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let domain = "";
  const url = tab && tab.url ? new URL(tab.url) : null;
  if (url && url.protocol.startsWith("http")) domain = normalizeDomain(url.hostname);
  // On the block page itself, offer to unblock the site it stands in for.
  else if (url && url.pathname === "/blocked.html") domain = url.searchParams.get("site") || "";
  if (!domain) {
    domainEl.textContent = "אין אתר בלשונית הזו";
    return;
  }
  domainEl.textContent = domain;
  const draw = sites => {
    const blocked = sites.includes(domain);
    toggle.hidden = false;
    toggle.textContent = blocked ? "בטל חסימה" : "חסום את האתר הזה";
    toggle.classList.toggle("unblock", blocked);
  };
  draw(await getSites());
  toggle.addEventListener("click", async () => {
    const sites = await getSites();
    const next = await setSites(sites.includes(domain) ? sites.filter(s => s !== domain) : [...sites, domain]);
    draw(next);
    if (next.includes(domain)) chrome.tabs.reload(tab.id);
    else if (!url.protocol.startsWith("http")) chrome.tabs.update(tab.id, { url: "https://" + domain });
  });
})();
