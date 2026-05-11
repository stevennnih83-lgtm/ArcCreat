//
// =====================
// START APP
// =====================
function startApp() {
  const opening = document.getElementById("opening-screen");
  const main = document.getElementById("main-content");

  opening.style.opacity = "0";
  opening.style.transition = "0.5s";

  setTimeout(() => {
    opening.style.display = "none";
    main.classList.remove("hidden");
  }, 500);
}

//
// =====================
// TAB SWITCH
// =====================
function showTab(evt, tabName) {
  const contents = document.querySelectorAll(".tab-content");
  const tabs = document.querySelectorAll(".tab-btn");

  contents.forEach((c) => c.classList.remove("active"));
  tabs.forEach((t) => t.classList.remove("active"));

  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}

//
// =====================
// HITUNG HARGA
// =====================
function hitungHarga() {
  const jenis = document.getElementById("jenis").value;
  const level = document.getElementById("level").value;

  let harga = 0;

  if (jenis === "CV") {
    harga = level === "basic" ? 20000 : level === "pro" ? 40000 : 60000;
  } else if (jenis === "Presentation") {
    harga = level === "basic" ? 50000 : level === "pro" ? 100000 : 150000;
  } else {
    harga = level === "basic" ? 15000 : level === "pro" ? 30000 : 50000;
  }

  document.getElementById("harga").innerText =
    "Estimasi Harga: Rp " + harga.toLocaleString();

  return harga;
}

//
// =====================
// WHATSAPP ORDER
// =====================
function bayarWA() {
  const nama = document.getElementById("nama").value;
  const jenis = document.getElementById("jenis").value;
  const level = document.getElementById("level").value;
  const deskripsi = document.getElementById("deskripsi").value;
  const hargaText = document.getElementById("harga").innerText;

  if (!nama) {
    alert("Isi nama dulu!");
    return;
  }

  const nomorWA = "6288293160879";

  const pesan = `Halo kak 👋
Saya ingin melakukan pemesanan desain:

📌 Nama: ${nama}
📦 Layanan: ${jenis}
⭐ Level: ${level}
💰 ${hargaText}

📝 Detail request:
${deskripsi}

💳 Pembayaran via QRIS.`;

  const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
  window.open(url, "_blank");
}

//
// =====================
// DETAIL CLICK (CV / PRESENTATION)
// =====================
function showDetail(el) {
  const title = el.dataset.title;
  const info = el.dataset.info;

  const titleEl = document.getElementById("doc-title");
  const descEl = document.getElementById("doc-desc");
  const preview = document.getElementById("doc-preview");

  titleEl.innerText = title;
  descEl.innerText = info;

  if (title.toLowerCase().includes("cv")) {
    preview.innerHTML = `
      <div style="padding:10px;background:linear-gradient(45deg,#00d2ff,#9d50bb);color:white;border-radius:10px">
        <h4>Nama Kamu</h4>
        <p>UI/UX Designer</p>
        <hr>
        <p>Experience:</p>
        <ul>
          <li>Company A</li>
          <li>Company B</li>
        </ul>
      </div>
    `;
  } else {
    preview.innerHTML = `
      <div style="padding:15px;background:#1a1a2e;border-radius:10px">
        <h4>${title}</h4>
        <p>Slide 1: Title</p>
        <p>Slide 2: Content</p>
      </div>
    `;
  }
}

//
// =====================
// EVENT CLICK ITEMS
// =====================
document.querySelectorAll(".clickable, .chord-box").forEach((item) => {
  item.addEventListener("click", function () {
    showDetail(this);
  });
});

//
// =====================
// DOCUMENT VIEWER CLOSE
// =====================
function closeDoc() {
  document.getElementById("doc-viewer").classList.add("hidden");
}

//
// =====================
// INIT AUTO HARGA
// =====================
window.addEventListener("load", hitungHarga);

document.querySelectorAll("#jenis, #level").forEach((el) => {
  el.addEventListener("change", hitungHarga);
});

//
// =====================
// FADE ANIMATION
// =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

//
// =====================
// CURSOR GLOW (simple & ringan)
// =====================
document.addEventListener("mousemove", (e) => {
  const glow = document.createElement("div");

  glow.style.position = "fixed";
  glow.style.width = "6px";
  glow.style.height = "6px";
  glow.style.borderRadius = "50%";
  glow.style.background = "#00d2ff";
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
  glow.style.pointerEvents = "none";
  glow.style.opacity = "0.3";
  glow.style.filter = "blur(4px)";

  document.body.appendChild(glow);

  setTimeout(() => glow.remove(), 300);
});
