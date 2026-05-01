// js/fetchapi.js

const apiUrl = 'api.php';
let isEditMode = false;

// 1. Olvasás (Read): Adatok lekérése a szerverről
async function loadData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const tbody = document.getElementById('dataTable');
        tbody.innerHTML = '';

        data.forEach(tag => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${tag.id}</td>
                <td>${tag.nev}</td>
                <td>${tag.ferfi == 1 ? 'Férfi' : 'Nő'}</td>
                <td>${tag.szulido}</td>
                <td>
                    <button onclick="editTag(${tag.id}, '${tag.nev}', ${tag.ferfi}, '${tag.szulido}')">Szerkesztés</button>
                    <button onclick="deleteTag(${tag.id})">Törlés</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Hiba a betöltéskor:', error);
    }
}

// 2. Létrehozás (Create) vagy Frissítés (Update)
document.getElementById('crudForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Adatok kinyerése az űrlapból
    const payload = {
        id: document.getElementById('tagId').value,
        nev: document.getElementById('tagNev').value,
        ferfi: document.getElementById('tagNem').value,
        szulido: document.getElementById('tagSzulido').value
    };

    // Ha szerkesztünk, PUT kérést küldünk, ha újat hozunk létre, POST kérést
    const method = isEditMode ? 'PUT' : 'POST';

    try {
        await fetch(apiUrl, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        resetForm();
        loadData(); // Táblázat frissítése
    } catch (error) {
        console.error('Hiba a mentéskor:', error);
    }
});

// 3. Frissítés (Update) előkészítése: Betöltjük a kiválasztott sort az űrlapba
window.editTag = function(id, nev, ferfi, szulido) {
    document.getElementById('tagId').value = id;
    document.getElementById('tagId').disabled = true; // Az elsődleges kulcsot (ID) ne lehessen megváltoztatni
    document.getElementById('tagNev').value = nev;
    document.getElementById('tagNem').value = ferfi;
    document.getElementById('tagSzulido').value = szulido;
    
    document.getElementById('cancelBtn').style.display = 'inline-block';
    isEditMode = true;
};

// 4. Törlés (Delete)
window.deleteTag = async function(id) {
    if (!confirm('Biztosan törlöd ezt a táncost?')) return;

    try {
        await fetch(apiUrl, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });
        loadData(); // Táblázat frissítése a törlés után
    } catch (error) {
        console.error('Hiba a törléskor:', error);
    }
};

// Űrlap visszaállítása alaphelyzetbe
function resetForm() {
    document.getElementById('crudForm').reset();
    document.getElementById('tagId').disabled = false;
    document.getElementById('cancelBtn').style.display = 'none';
    isEditMode = false;
}

document.getElementById('cancelBtn').addEventListener('click', resetForm);

// Amikor betöltődik az oldal, azonnal lekérjük az adatokat
loadData();