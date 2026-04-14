let currentCountry = null;

const API_URL = "https://repositori2.onrender.com";

/* ===================== BUSCAR PAÍS ===================== */

async function searchCountry() {
    const country = document.getElementById("countryInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (!country) {
        resultDiv.innerHTML = "<p>Escribe un país</p>";
        return;
    }

    try {
        const response = await fetch(
            `https://restcountries.com/v3.1/name/${country}?fullText=false`
        );

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            resultDiv.innerHTML = "<p>País no encontrado</p>";
            return;
        }

        const countryData = data[0];
        currentCountry = countryData.name.common;

        resultDiv.innerHTML = `
            <h3>${countryData.name.common}</h3>
            <p>Capital: ${countryData.capital?.[0] || "N/A"}</p>
            <p>Población: ${countryData.population}</p>
            <img src="${countryData.flags.png}" width="120">

            <br><br>

            <button id="favBtn">Añadir a favoritos ❤️</button>
        `;

    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "<p>Error de conexión</p>";
    }
}

/* ===================== CLICK BOTÓN ===================== */

document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "favBtn") {
        if (!currentCountry) return alert("No hay país");

        addFavorite(currentCountry);
    }
});

/* ===================== ADD FAVORITE ===================== */

async function addFavorite(country) {
    try {
        await fetch(`${API_URL}/api/favorites`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: country })
        });

        alert("Añadido a favoritos: " + country);

        loadFavorites();

    } catch (err) {
        console.error(err);
        alert("Error servidor");
    }
}

/* ===================== LOAD FAVORITES ===================== */

async function loadFavorites() {
    try {
        const res = await fetch(`${API_URL}/api/favorites`);
        const data = await res.json();

        const list = document.getElementById("favorites");

        list.innerHTML = data.length
            ? data.map(f => `<li>❤️ ${f.name}</li>`).join("")
            : "<li>No hay favoritos</li>";

    } catch (err) {
        console.error(err);
    }
}

/* ===================== INIT ===================== */

document.addEventListener("DOMContentLoaded", () => {
    loadFavorites();
});

/* ===================== EXPORT ===================== */

window.searchCountry = searchCountry;