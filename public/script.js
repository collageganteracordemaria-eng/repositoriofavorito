let currentCountry = null;

const API_URL = "https://repositori2.onrender.com";

const FAVORITES_URL = `${API_URL}/api/favorites`;
const HISTORY_URL = `${API_URL}/api/history`;
const WISHLIST_URL = `${API_URL}/api/wishlist`;

async function searchCountry() {
    const country = document.getElementById("countryInput").value;

    if (!country) {
        alert("Escribe un país");
        return;
    }

    try {
        const response = await fetch(
            `https://restcountries.com/v3.1/name/${country}`
        );

        if (!response.ok) {
            throw new Error("País no encontrado");
        }

        const data = await response.json();
        const countryData = data[0];

        document.getElementById("result").innerHTML = `
            <h3>${countryData.name.common}</h3>
            <p>Capital: ${countryData.capital}</p>
            <p>Población: ${countryData.population}</p>
            <img src="${countryData.flags.png}" width="100">
            <br><br>
            <button onclick="addFavorite('${countryData.name.common}')">
                Afegir a favorits
            </button>
        `;

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("result").innerHTML =
            "<p>País no encontrado</p>";
    }
}