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

        // 💡 guardamos el país actual
        currentCountry = countryData.name.common;

        resultDiv.innerHTML = `
            <h3>${countryData.name.common}</h3>
            <p>Capital: ${countryData.capital?.[0] || "N/A"}</p>
            <p>Población: ${countryData.population}</p>
            <img src="${countryData.flags.png}" width="120">

            <br><br>

            <button id="favBtn">
                Añadir a favoritos ❤️
            </button>
        `;

        // 💡 EVENT LISTENER (MEJOR QUE onclick)
        document.getElementById("favBtn").addEventListener("click", () => {
            addFavorite(currentCountry);
        });

    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "<p>Error de conexión</p>";
    }
}

async function addFavorite(country) {
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

window.searchCountry = searchCountry;
window.addFavorite = addFavorite;