// ==UserScript==
// @name         Konsep Dasar URL Extractor
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Contoh cara mengekstrak link tujuan dari elemen HTML
// @match        *://*.contoh-situs-shortlink.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ---------------------------------------------------------
    // LOKASI PENYESUAIAN KODE (Variabel yang bisa diubah)
    // ---------------------------------------------------------
    // Ganti 'id-tombol-tujuan' dengan ID atau Class HTML yang 
    // sebenarnya membungkus link tujuan pada situs web target.
    const selectorTombol = '#id-tombol-tujuan'; // Contoh: '.btn-download', '#get-link', dll.

    // ---------------------------------------------------------
    // FUNGSI UTAMA
    // ---------------------------------------------------------
    function ekstrakDanRedirect() {
        console.log("[System] Mencari link tujuan...");

        // 1. Mencari elemen HTML yang sesuai dengan selector
        const elemenLink = document.querySelector(selectorTombol);

        // 2. Mengecek apakah elemen ditemukan di halaman
        if (elemenLink) {
            // 3. Mengambil atribut 'href' yang berisi URL tujuan
            const urlTujuan = elemenLink.getAttribute('href');

            // 4. Memastikan URL valid
            if (urlTujuan && urlTujuan.startsWith('http')) {
                console.log("[System] Link tujuan ditemukan: " + urlTujuan);
                
                // 5. Eksekusi: Langsung pindah ke link tujuan tanpa menunggu
                window.location.href = urlTujuan; 
            } else {
                console.log("[System] Atribut href tidak valid atau kosong.");
            }
        } else {
            console.log("[System] Elemen target belum muncul di halaman.");
        }
    }

    // ---------------------------------------------------------
    // EKSEKUSI SKRIP
    // ---------------------------------------------------------
    // Karena beberapa situs menggunakan delay (timer), kita bisa 
    // menjalankan fungsi menggunakan interval secara berulang 
    // sampai tombolnya muncul.
    
    const intervalPencarian = setInterval(() => {
        // Coba cari elemen setiap 1 detik
        if (document.querySelector(selectorTombol)) {
            ekstrakDanRedirect();
            clearInterval(intervalPencarian); // Hentikan pencarian jika sudah ketemu
        }
    }, 1000); // 1000 ms = 1 detik

})();
