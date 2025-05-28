let codeReader;
let started = false;

function startCamera() {
    if (started) return;
    started = true;

    codeReader = new ZXing.BrowserBarcodeReader();
    const barcodeInput = document.getElementById('barcode');
    const namaInput = document.getElementById('nama');
    const supplierInput = document.getElementById('supplier');
    const hargaInput = document.getElementById('harga');
    const waktuInput = document.getElementById('waktu');

    const barangMap = {
        "S4993": {
            nama: "Support Shockbeker Depan Splash",
            supplier: "P0110",
            harga: "C OXY"
        },
        "T1438": {
            nama: "Trotor Body Grand Avanza",
            supplier: "P0134",
            harga: "XCXXU"
        },
        "B4319": {
            nama: "B/M Assy Splash 2014",
            supplier: "P0009",
            harga: "XCXGN"
        }
    };

    codeReader.decodeFromVideoDevice(null, 'video', (result, err) => {
        if (result) {
            const kode = result.text;
            barcodeInput.value = kode;
            if (barangMap[kode]) {
                namaInput.value = barangMap[kode].nama;
                supplierInput.value = barangMap[kode].supplier;
                hargaInput.value = barangMap[kode].harga;
            } else {
                namaInput.value = "Tidak dikenal";
                supplierInput.value = "-";
                hargaInput.value = "-";
            }
            const now = new Date();
            waktuInput.value = now.toLocaleString("id-ID");
        }
    });
}

function submitData() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyERk6N_nGaIzoCGefptt1oq8aMoZIv0mYdujTh-NmdIQ4sBC7gRhvRJZHGddPSaFh5/exec';
    const formData = new FormData();
    formData.append("User", document.getElementById("user").value);
    formData.append("Nama Barang", document.getElementById("nama").value);
    formData.append("Kode Barcode", document.getElementById("barcode").value);
    formData.append("Kode Supplier", document.getElementById("supplier").value);
    formData.append("Kode Harga", document.getElementById("harga").value);
    formData.append("Waktu", document.getElementById("waktu").value);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            document.getElementById("notif").innerHTML = "<p><strong>✅ Data berhasil dikirim!</strong></p>";
        })
        .catch(error => {
            document.getElementById("notif").innerHTML = "<p><strong>❌ Gagal menyimpan data.</strong></p>";
        });
}
