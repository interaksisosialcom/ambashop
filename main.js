// Tampilkan produk
if (document.getElementById("produk-list")) {
  const container = document.getElementById("produk-list");
  produk.forEach(p => {
    container.innerHTML += `
      <div class="produk-card">
        <img src="${p.gambar}" alt="${p.nama}" />
        <h3>${p.nama}</h3>
        <p>Rp ${p.harga.toLocaleString()}</p>
        <button onclick="lihatProduk(${p.id})">Lihat</button>
        <button onclick="tambahKeranjang(${p.id})">Beli</button>
      </div>`;
  });
}

function lihatProduk(id) {
  localStorage.setItem('produkId', id);
  window.location.href = 'produk.html';
}

function tambahKeranjang(id) {
  const cart = JSON.parse(localStorage.getItem('keranjang')) || [];
  cart.push(produk.find(p => p.id === id));
  localStorage.setItem('keranjang', JSON.stringify(cart));
  alert("Produk ditambahkan ke keranjang!");
}

// Detail produk
if (document.getElementById("produk-detail")) {
  const id = parseInt(localStorage.getItem('produkId'));
  const p = produk.find(p => p.id === id);
  document.getElementById("produk-detail").innerHTML = `
    <img src="${p.gambar}" alt="${p.nama}" />
    <h2>${p.nama}</h2>
    <p>Rp ${p.harga.toLocaleString()}</p>
    <button onclick="tambahKeranjang(${p.id})">Beli</button>`;
}

// Keranjang
if (document.getElementById("keranjang")) {
  const cart = JSON.parse(localStorage.getItem('keranjang')) || [];
  let total = 0;
  document.getElementById("keranjang").innerHTML = cart.map(p => {
    total += p.harga;
    return `<div>${p.nama} - Rp ${p.harga.toLocaleString()}</div>`;
  }).join('') + `<hr><strong>Total: Rp ${total.toLocaleString()}</strong>`;
}