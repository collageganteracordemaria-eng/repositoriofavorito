let currentCountry = null;

const API_URL = "https://repositori2.onrender.com";
const FAVORITES_URL = `${API_URL}/api/favorites`;

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

/* ===================== EVENT DELEGATION (FIX REAL) ===================== */

document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "favBtn") {
        console.log("CLICK EN FAVORITO DETECTADO");

        if (!currentCountry) {
            alert("No hay país seleccionado");
            return;
        }

        addFavorite(currentCountry);
    }
});

/* ===================== FETCH FAVORITOS ===================== */

async function addFavorite(country) {
    console.log("ENVIANDO FAVORITO:", country);

    try {
        const response = await fetch(`${API_URL}/api/favorites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: country })
        });

        const data = await response.json();

        console.log("⭐ Favorito añadido:", data);
        alert(`Añadido a favoritos: ${country}`);

    } catch (error) {
        console.error("Error addFavorite:", error);
        alert("Error conectando con el servidor");
    }
}

/* ===================== EXPORT ===================== */

window.searchCountry = searchCountry;
window.addFavorite = addFavorite;