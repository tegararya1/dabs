const API_BASE = "https://damayanti-api.vercel.app";

// === FETCH HELPERS ===
async function apiGet(url) {
  const res = await fetch(`${API_BASE}${url}`);
  return res.json();
}
async function apiPost(url, data) {
  const res = await fetch(`${API_BASE}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
async function apiDelete(url) {
  await fetch(`${API_BASE}${url}`, { method: "DELETE" });
}

// === SHEEPS (PROFIL KAMBING) ===
async function fetchSheeps() {
  return await apiGet("/api/sheeps");
}
async function addSheep(nama) {
  return await apiPost("/api/sheeps", { name: nama });
}
async function deleteSheep(id) {
  return await apiDelete(`/api/sheeps/${id}`);
}

// === SHEEP REPORTS (LAPORAN PANGAN) ===
async function fetchSheepReports() {
  return await apiGet("/api/sheep-reports");
}
async function addSheepReport(data) {
  return await apiPost("/api/sheep-reports", data);
}
async function deleteSheepReport(id) {
  return await apiDelete(`/api/sheep-reports/${id}`);
}

// === RENDER ===
async function renderSheeps() {
  const sheeps = await fetchSheeps();
  const list = document.getElementById("kambingList");
  list.innerHTML = sheeps.map(s => `
    <div class="p-4 border rounded-lg flex justify-between items-center">
      <span>${s.name}</span>
      <button onclick="deleteSheep('${s.id}')" class="bg-red-500 text-white px-2 py-1 rounded">Hapus</button>
    </div>
  `).join("");
}
