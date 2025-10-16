const kategoriList = [
    {
        id: 1,
        name: "Makanan Pembuka",
        image: "./assets/recipe/gudeg-jogja.png"
    },
    {
        id: 2,
        name: "Makanan utama",
        image: "./assets/recipe/gudeg-jogja.png"
    },
    {
        id: 3,
        name: "Makanan penutup",
        image: "./assets/recipe/gudeg-jogja.png"
    },
    {
        id: 4,
        name: "Makanan pendamping",
        image: "./assets/recipe/gudeg-jogja.png"
    },
    {
        id: 5,
        name: "Cemilan",
        image: "./assets/recipe/gudeg-jogja.png"
    },
    {
        id: 6,
        name: "Minuman",
        image: "./assets/recipe/gudeg-jogja.png"
    },
]
const resepList = [
    {
        id: 1,
        name: "Gudeg Jogja",
        categoryId: [2],
        description: "Resep dan cara membuat Gulai Cecek Kacang Panjang Kol sederhana ala rumahan. Lezat dan mudah!",
        image: "./assets/recipe/gudeg-jogja.png",
        ingredient: ["1 kg nangka muda", "500 ml santan", "Gula merah", "Daun salam", "Lengkuas"],
        instructions: ["Rebus nangka hingga empuk.", "Tumis bumbu.", "Masukkan santan dan bahan lainnya.", "Masak hingga matang."]
    },
    {
        id: 2,
        name: "Rawon Surabaya",
        categoryId: [2],
        description: "Resep dan cara membuat Gulai Cecek Kacang Panjang Kol sederhana ala rumahan. Lezat dan mudah!",
        image: "./assets/recipe/gudeg-jogja.png",
        ingredient: ["500 gr daging sapi", "Kluwek", "Bawang merah", "Bawang putih", "Lengkuas"],
        instructions: ["Haluskan bumbu.", "Rebus daging dan bumbu.", "Masak sampai kuah menghitam."]
    },
    {
        id: 3,
        name: "Soto Kudus",
        categoryId: [2, 4],
        description: "Resep dan cara membuat Gulai Cecek Kacang Panjang Kol sederhana ala rumahan. Lezat dan mudah!",
        image: "./assets/recipe/gudeg-jogja.png",
        ingredient: ["Ayam kampung", "Bawang putih", "Jahe", "Serai", "Daun jeruk"],
        instructions: ["Rebus ayam hingga empuk.", "Tumis bumbu dan masukkan ke kuah.", "Sajikan dengan tauge."]
    },
    {
        id: 4,
        name: "Rendang Padang",
        categoryId: [2, 4],
        description: "Resep dan cara membuat Gulai Cecek Kacang Panjang Kol sederhana ala rumahan. Lezat dan mudah!",
        image: "./assets/recipe/gudeg-jogja.png",
        ingredient: ["1 kg daging sapi", "Santan", "Cabe merah", "Lengkuas", "Serai"],
        instructions: ["Haluskan bumbu.", "Tumis hingga harum.", "Masak bersama daging hingga mengering."]
    },
    {
        id: 5,
        name: "Mie Aceh",
        categoryId: [1, 2, 4],
        description: "Resep dan cara membuat Gulai Cecek Kacang Panjang Kol sederhana ala rumahan. Lezat dan mudah!",
        image: "./assets/recipe/gudeg-jogja.png",
        ingredient: ["Mie kuning", "Daging/sapi/udang", "Cabe merah", "Bawang putih", "Tomat"],
        instructions: ["Tumis bumbu.", "Masukkan daging.", "Masukkan mie dan aduk hingga matang."]
    },
    {
        id: 6,
        name: "Ikan Bakar Lampung",
        categoryId: [2],
        description: "Resep dan cara membuat Gulai Cecek Kacang Panjang Kol sederhana ala rumahan. Lezat dan mudah!",
        image: "./assets/recipe/gudeg-jogja.png",
        ingredient: ["Ikan nila", "Kecap manis", "Bawang putih", "Ketumbar", "Jeruk nipis"],
        instructions: ["Lumuri ikan dengan bumbu.", "Diamkan 30 menit.", "Bakar hingga matang."]
    },
    {
        id: 7,
        name: "Soto Banjar",
        categoryId: [2, 4],
        description: "Resep dan cara membuat Gulai Cecek Kacang Panjang Kol sederhana ala rumahan. Lezat dan mudah!",
        image: "./assets/recipe/gudeg-jogja.png",
        ingredient: ["Ayam kampung", "Bawang putih", "Kapulaga", "Kayu manis", "Kentang"],
        instructions: ["Rebus ayam dengan bumbu.", "Goreng kentang dan masukkan.", "Sajikan dengan ketupat."]
    },
    {
        id: 8,
        name: "Ikan Patin Bumbu Kuning",
        categoryId: [2],
        description: "Resep dan cara membuat Gulai Cecek Kacang Panjang Kol sederhana ala rumahan. Lezat dan mudah!",
        image: "./assets/recipe/gudeg-jogja.png",
        ingredient: ["Ikan patin", "Kunyit", "Cabe rawit", "Serai", "Daun kemangi"],
        instructions: ["Haluskan bumbu.", "Rebus dengan air dan ikan.", "Masak hingga bumbu meresap."]
    },
    {
        id: 9,
        name: "Coto Makassar",
        categoryId: [2, 4],
        description: "Resep dan cara membuat Gulai Cecek Kacang Panjang Kol sederhana ala rumahan. Lezat dan mudah!",
        image: "./assets/recipe/gudeg-jogja.png",
        ingredient: ["500 gr daging sapi", "Kacang tanah", "Bawang merah", "Lengkuas", "Serai"],
        instructions: ["Rebus daging hingga empuk.", "Tumis bumbu kacang.", "Campurkan dan sajikan."]
    },
    {
        id: 10,
        name: "Kapurung",
        categoryId: [4],
        description: "Resep dan cara membuat Gulai Cecek Kacang Panjang Kol sederhana ala rumahan. Lezat dan mudah!",
        image: "./assets/recipe/gudeg-jogja.png",
        ingredient: ["Sagu", "Ikan tongkol", "Bayam", "Jagung manis", "Bumbu kuning"],
        instructions: ["Masak ikan dan bumbu kuning.", "Rebus sayur.", "Tuang sagu dan aduk hingga mengental."]
    },
    {
        id: 11,
        name: "Ayam Betutu",
        categoryId: [2],
        description: "Resep dan cara membuat Gulai Cecek Kacang Panjang Kol sederhana ala rumahan. Lezat dan mudah!",
        image: "./assets/recipe/gudeg-jogja.png",
        ingredient: ["Ayam utuh", "Bumbu base genep", "Daun singkong", "Jeruk limau"],
        instructions: ["Lumuri ayam dengan bumbu.", "Isi daun singkong dalam ayam.", "Kukus dan bakar sampai matang."]
    },
    {
        id: 12,
        name: "Sate Lilit",
        categoryId: [2, 4, 5],
        description: "Resep dan cara membuat Gulai Cecek Kacang Panjang Kol sederhana ala rumahan. Lezat dan mudah!",
        image: "./assets/recipe/gudeg-jogja.png",
        ingredient: ["Daging ikan tenggiri", "Kelapa parut", "Bumbu bali", "Serai untuk tusuk"],
        instructions: ["Campur semua bahan.", "Bulatkan dan lilitkan di serai.", "Panggang sampai kecoklatan."]
    },
];