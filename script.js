const client = supabase.createClient(
    'https://vwrylbzywdzxiajnyuuf.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3cnlsYnp5d2R6eGlham55dXVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NzE0ODcsImV4cCI6MjA2OTM0NzQ4N30.7RVFoNX9ZVl1XES4fE4EelM2niKVrPDs1fhwJOkkoxM'
);

let currentCategories = [];
let currentRecipes = [];

// Fungsi get Resep
async function getRecipeList() {
    const { data, error } = await client.from("recipe").select("*");

    if (error) {
        console.error("Gagal ambil kategori:", error);
        return [];
    }
    return data;
}

// Start Cek halaman
document.addEventListener("DOMContentLoaded", async () => {

    const currentPage = window.location.pathname.split("/").pop();

    // Index / Halaman Utama
    if (currentPage === "index.html") {
        tampilkanResepHome();
        tampilkanKategoriHome();
    }

    // Semua Resep
    if (currentPage === "all-resep.html") {
        isiDropdownKategori();

        const params = new URLSearchParams(window.location.search);
        const kategoriParam = params.get("kategori");

        if (kategoriParam) {
            document.getElementById("kategori").value = kategoriParam;
        }

        tampilkanSemuaResep();
        document.getElementById("kategori").addEventListener("change", function () {
            const kategori = this.value;
            const newUrl = kategori === "semua"
                ? "all-resep.html"
                : `all-resep.html?kategori=${kategori}`;
            window.history.replaceState(null, "", newUrl);
            tampilkanSemuaResep();
        });
        const debouncedSearch = debounce(tampilkanSemuaResep, 300);
        document.getElementById("searchInput").addEventListener("input", debouncedSearch);
    }

    // Detail Resep
    if (currentPage === "detail-resep.html") {
        // Ambil id dari URL
        const params = new URLSearchParams(window.location.search);
        const id = parseInt(params.get("id"));

        // Cari resep berdasarkan id
        const resepSaatIni = resepList.find(r => r.id === id);

        // Tampilkan detail
        tampilkanDetailResep(resepSaatIni);

        // Tampilkan rekomendasi berdasarkan kategori
        tampilkanRekomendasiResep(resepSaatIni);
    }


    // Dashboard Admin
    if (currentPage === "admin.html") {
        // Setup logout button
        const logoutBtn = document.getElementById("logoutBtn");

        if (logoutBtn) {
            logoutBtn.addEventListener("click", logoutUser);
        }
    }

    // Create New Resep
    if (currentPage === "createRecipe.html") {
        await isiCheckboxKategori();

        // Setup logout button
        const logoutBtn = document.getElementById("logoutBtn");

        if (logoutBtn) {
            logoutBtn.addEventListener("click", logoutUser);
        }
    }


    // Set up Login
    if (currentPage === "login.html") {
        const loginForm = document.getElementById("loginForm");
        if (loginForm) {
            loginForm.addEventListener("submit", async (e) => {
                e.preventDefault();

                const email = e.target.email.value;
                const password = e.target.password.value;

                // Disable button selama proses login
                const submitBtn = e.target.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = "Memproses...";

                const result = await loginUser(email, password);

                if (result.success) {
                    alert("Login berhasil!");
                    window.location.href = "admin.html";
                } else {
                    alert("Login gagal: " + result.error);
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            });
        }
    }

    // Fungsi menampilkan list kategori pada halaman utama
    async function tampilkanKategoriHome() {
        const container = document.getElementById("kategoriList");

        container.innerHTML = ""; // reset isi

        kategoriList.forEach((kategori) => {
            const card = document.createElement("a");
            card.className = "kategori-card";
            card.href = `all-resep.html?kategori=${kategori.id}`;
            card.innerHTML = `
            <img src="${kategori.image}" alt="${kategori.name}" />
            <h4>${kategori.name}</h4>
        `;
            container.appendChild(card);
        });
    }

    // Fungsi menampilkan list resep pada halaman utama
    async function tampilkanResepHome() {
        const container = document.getElementById("resepList");

        container.innerHTML = ""; // reset isi

        resepList.slice(0, 4).forEach((resep) => {

            const kategoriNamaList = resep.categoryId.map((catId) => {
                const kategori = kategoriList.find((k) => k.id === catId);
                return kategori ? kategori.name : "";
            });

            const kategoriHTML = kategoriNamaList.join(", ");

            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
            <a href="detail-resep.html?id=${resep.id}">
                <img src="${resep.image}" alt="${resep.name}" class="cardImg"/>
                <span class="cardContent">
                    <span>${resep.name}</span>
                    <span>${kategoriHTML}</span>
                </span>
            </a>
        `;
            container.appendChild(card);
        });
    }

    // Memberi waktu pada saat search
    function debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Fungsi menampilkan list resep pada halaman semua resep dan filter search
    async function tampilkanSemuaResep() {
        const container = document.getElementById("resepList");
        const kategoriFilter = document.getElementById("kategori").value;
        const keyword = document.getElementById("searchInput").value.toLowerCase();

        container.innerHTML = "";

        const hasilFilter = resepList.filter((resep) => {
            const cocokNama = resep.name.toLowerCase().includes(keyword);
            if (keyword) {
                return cocokNama;
            } else {
                const cocokKategori = kategoriFilter === "semua" || resep.categoryId.includes(parseInt(kategoriFilter));
                return cocokKategori;
            }
        });


        if (hasilFilter.length === 0) {
            container.innerHTML = "<p>Tidak ada resep ditemukan.</p>";
            return;
        }

        hasilFilter.forEach((resep) => {
            const kategoriNamaList = resep.categoryId.map((catId) => {
                const kategori = kategoriList.find((k) => k.id === catId);
                return kategori ? kategori.name : "";
            });

            const kategoriHTML = kategoriNamaList.join(", ");

            const card = document.createElement("div");
            card.className = "resepAllContainer";
            card.innerHTML = `
                <div class="imgContainer"><img src="${resep.image}" alt="${resep.name}" /></div>
                <div class="textContentCardAllResep">
                    <h2 class="cardAllResepHeading">${resep.name}</h2>
                    <p class="cardAllResepKategori">${kategoriHTML}</p>
                    <p class="cardAllResepDescription">${resep.description}</p>
                    <a class="btn btn-edit" href="detail-resep.html?id=${resep.id}">Lihat Detail</a>
                </div>     
            `;
            container.appendChild(card);
        });
    }

    // Fungsi untuk menampilkan list kategori untuk filter pada halaman Semua Resep
    async function isiDropdownKategori() {
        const select = document.getElementById("kategori");

        // Opsi default: Semua
        const semuaOption = document.createElement("option");
        semuaOption.value = "semua";
        semuaOption.textContent = "Semua";
        select.appendChild(semuaOption);

        // Tambahkan opsi dari kategoriList
        kategoriList.forEach((kategori) => {
            const option = document.createElement("option");
            option.value = kategori.id;
            option.textContent = kategori.name;
            select.appendChild(option);
        });
    }


    // Fungsi menampilkan detail resep
    async function tampilkanDetailResep() {
        const container = document.getElementById("detailResep");
        const urlParams = new URLSearchParams(window.location.search);
        const id = parseInt(urlParams.get("id"));

        const resep = resepList.find((item) => item.id === id);


        const nameResep = document.getElementById("nameResep");

        nameResep.innerText = `/ ${resep.name}`;

        if (!resep) {
            container.innerHTML = "<p>Resep tidak ditemukan.</p>";
            return;
        }

        const kategoriNamaList = resep.categoryId.map((catId) => {
            const kategori = kategoriList.find((k) => k.id === catId);
            return kategori ? kategori.name : "";
        });

        const kategoriHTML = kategoriNamaList.join(", ");

        container.innerHTML = `
        <div class="imageDetail">
        <img src="${resep.image}" alt="${resep.name}"/>
        </div>
        <div class="contentDetail">
        <h2>${resep.name}</h2>
        <p><strong>Kategori:</strong> ${kategoriHTML}</p>
        <p><strong>Description:</strong> ${resep.description}</p>
    
        <h3>Bahan-bahan</h3>
        <ul>
          ${resep.ingredient.map((item) => `<li>${item}</li>`).join("")}
        </ul>
    
        <h3>Langkah-langkah</h3>
        <ol>
          ${resep.instructions.map((step) => `<li>${step}</li>`).join("")}
        </ol>
        </div>
      `;
    }

    // Fungsi menampilkan rekomendasi resep berdasarkan kategori resep yang sedang dibuka detailnya
    async function tampilkanRekomendasiResep(resepSaatIni) {
        const container = document.getElementById("rekomendasiList");
        container.innerHTML = "";

        const kategoriResepIni = resepSaatIni.categoryId;

        // Filter resep lain yang punya setidaknya satu kategori yang sama
        const rekomendasi = resepList.filter((resep) => {
            if (resep.id === resepSaatIni.id) return false; // Hindari menampilkan diri sendiri
            return resep.categoryId.some((id) => kategoriResepIni.includes(id));
        }).slice(0, 4); // Ambil maksimal 4 rekomendasi

        if (rekomendasi.length === 0) {
            container.innerHTML = "<p>Tidak ada rekomendasi resep serupa.</p>";
            return;
        }

        rekomendasi.forEach((resep) => {
            const kategoriNamaList = resep.categoryId.map((catId) => {
                const kategori = kategoriList.find((k) => k.id === catId);
                return kategori ? kategori.name : "";
            });

            const kategoriHTML = kategoriNamaList.join(", ");

            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <a href="detail-resep.html?id=${resep.id}">
                    <img src="${resep.image}" alt="${resep.name}" class="cardImg"/>
                    <span class="cardContent">
                        <span>${resep.name}</span>
                        <span>${kategoriHTML}</span>
                    </span>
                </a>
            `;
            container.appendChild(card);
        });
    }
});
// End Cek halaman