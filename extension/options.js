const listEl = document.getElementById("list");
const emptyEl = document.getElementById("empty");
const errorEl = document.getElementById("error");
const input = document.getElementById("new-site");
const bulkText = document.getElementById("bulk-text");
const bulkStatus = document.getElementById("bulk-status");

function render(sites) {
  listEl.replaceChildren(...sites.map(site => {
    const li = document.createElement("li");
    const name = document.createElement("span");
    name.textContent = site;
    const remove = document.createElement("button");
    remove.textContent = "הסר";
    remove.addEventListener("click", async () => {
      render(await setSites((await getSites()).filter(s => s !== site)));
    });
    li.append(name, remove);
    return li;
  }));
  emptyEl.hidden = sites.length > 0;
  bulkText.value = sites.join("\n");
}

document.getElementById("add-form").addEventListener("submit", async e => {
  e.preventDefault();
  const domain = normalizeDomain(input.value);
  errorEl.hidden = !!domain;
  if (!domain) return;
  render(await setSites([...(await getSites()), domain]));
  input.value = "";
});

document.getElementById("bulk-save").addEventListener("click", async () => {
  const lines = bulkText.value.split(/[\s,]+/).filter(Boolean);
  const domains = lines.map(normalizeDomain);
  const bad = lines.filter((_, i) => !domains[i]);
  render(await setSites(domains));
  bulkStatus.textContent = bad.length ? "נשמר. דילגתי על: " + bad.join(", ") : "נשמר.";
});

getSites().then(render);
