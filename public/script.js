let currentCountry = null;

const API_URL = "https://repositori2.onrender.com";

const FAVORITES_URL = `${API_URL}/api/favorites`;
const HISTORY_URL = `${API_URL}/api/history`;
const WISHLIST_URL = `${API_URL}/api/wishlist`;

async function searchCountry() {
    const country = document.getElementById("countryInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (!country) {
        resultDiv.innerHTML = "<p>⚠️ Escribe un país</p>";
        return;
    }

    resultDiv.innerHTML = "<p>⏳ Buscando...</p>";

    try {
        const response = await fetch(
            `https://restcountries.com/v3.1/name/${country}?fullText=false`
        );

        const data = await response.json();

        console.log("API RESPONSE:", data);

        // 🔥 FIX CRÍTICO
        if (!Array.isArray(data) || data.length === 0) {
            resultDiv.innerHTML = "<p>❌ País no encontrado</p>";
            return;
        }

        const countryData = data[0];

        if (!countryData) {
            resultDiv.innerHTML = "<p>❌ Datos inválidos</p>";
            return;
        }

        // 🔥 MOSTRAR SIEMPRE ALGO
        resultDiv.innerHTML = `
            <h3>${countryData.name?.common || "Sin nombre"}</h3>
            <p>Capital: ${countryData.capital?.[0] || "N/A"}</p>
            <p>Población: ${countryData.population || "N/A"}</p>
            <img src="${countryData.flags?.png || ""}" width="120">

            <br><br>

            <button onclick="addFavorite('${countryData.name?.common || ""}')">
                Afegir a favorits
            </button>
        `;

    } catch (error) {
        console.error("ERROR FETCH:", error);
        resultDiv.innerHTML = "<p>❌ Error de conexión con la API</p>";
    }
}