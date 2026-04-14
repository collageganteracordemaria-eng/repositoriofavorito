let currentCountry = null;

const API_URL = "https://repositori2.onrender.com";

const FAVORITES_URL = `${API_URL}/api/favorites`;
const HISTORY_URL = `${API_URL}/api/history`;
const WISHLIST_URL = `${API_URL}/api/wishlist`;

async function searchCountry() {
    const input = document.getElementById("countryInput").value;

    if (!input) {
        alert("Escribe un país");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/countries/${input}`);
        const data = await res.json();

        currentCountry = data;

        document.getElementById("result").innerHTML =
            `<p>Resultado: ${JSON.stringify(data)}</p>`;

    } catch (error) {
        console.error("Error buscando país:", error);
    }
}