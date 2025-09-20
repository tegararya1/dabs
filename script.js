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

// === CONTAINERS (DRUM) ===
async function fetchDrums() {
  return await apiGet("/api/containers");
}
async function addDrum(nama) {
  return await apiPost("/api/containers", { name: nama });
}
async function deleteDrum(id) {
  return await apiDelete(`/api/containers/${id}`);
}

// === SENSOR DATA ===
async function fetchSensorData() {
  return await apiGet("/api/sensor-data");
}
async function addSensorData(data) {
  return await apiPost("/api/sensor-data", data);
}
async function deleteSensorData(id) {
  return await apiDelete(`/api/sensor-data/${id}`);
}

// === RENDER & LOGIC ===
// contoh load drum ke UI
async function renderDrums() {
  const drums = await fetchDrums();
  const list = document.getElementById("drumList");
  list.innerHTML = drums.map(d => `
    <div class="p-4 border rounded-lg flex justify-between items-center">
      <span>${d.name}</span>
      <button onclick="deleteDrum('${d.id}')" class="bg-red-500 text-white px-2 py-1 rounded">Hapus</button>
    </div>
  `).join("");
}
