// js/javascript.js

// Adatok tárolása egy memóriabeli tömbben
let tagokArray = [
    { id: 1, nev: "Skvar Tamás", ferfi: 1, szulido: "1983-07-11" },
    { id: 3, nev: "Siket Karen", ferfi: 0, szulido: "1984-05-01" }
];

let jsEditMode = false;

// Táblázat kirajzolása (Read)
function renderTable() {
    const tbody = document.getElementById('jsDataTable');
    tbody.innerHTML = '';

    tagokArray.forEach(tag => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${tag.id}</td>
            <td>${tag.nev}</td>
            <td>${tag.ferfi == 1 ? 'Férfi' : 'Nő'}</td>
            <td>${tag.szulido}</td>
            <td>
                <button onclick="editJsTag(${tag.id})">Szerkesztés</button>
                <button onclick="deleteJsTag(${tag.id})">Törlés</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Létrehozás és Frissítés (Create & Update)
document.getElementById('jsCrudForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const idVal = parseInt(document.getElementById('jsId').value);
    const nevVal = document.getElementById('jsNev').value;
    const ferfiVal = parseInt(document.getElementById('jsNem').value);
    const szulidoVal = document.getElementById('jsSzulido').value;

    if (jsEditMode) {
        // Frissítés megkeresése és cseréje
        const index = tagokArray.findIndex(t => t.id === idVal);
        if (index !== -1) {
            tagokArray[index] = { id: idVal, nev: nevVal, ferfi: ferfiVal, szulido: szulidoVal };
        }
    } else {
        // Ellenőrzés, hogy létezik-e már az ID
        if (tagokArray.some(t => t.id === idVal)) {
            alert('Ez az ID már létezik!');
            return;
        }
        // Új elem hozzáadása
        tagokArray.push({ id: idVal, nev: nevVal, ferfi: ferfiVal, szulido: szulidoVal });
    }

    resetJsForm();
    renderTable();
});

// Szerkesztés előkészítése (Update felület)
window.editJsTag = function(id) {
    const tag = tagokArray.find(t => t.id === id);
    if (!tag) return;

    document.getElementById('jsId').value = tag.id;
    document.getElementById('jsId').disabled = true; 
    document.getElementById('jsNev').value = tag.nev;
    document.getElementById('jsNem').value = tag.ferfi;
    document.getElementById('jsSzulido').value = tag.szulido;

    document.getElementById('jsCancelBtn').style.display = 'inline-block';
    jsEditMode = true;
};

// Törlés (Delete)
window.deleteJsTag = function(id) {
    if (!confirm('Biztosan törlöd?')) return;
    
    // Kiszűrjük azt az elemet, amelyiknek az ID-ját törölni akarjuk
    tagokArray = tagokArray.filter(t => t.id !== id);
    renderTable();
};

// Űrlap törlése
function resetJsForm() {
    document.getElementById('jsCrudForm').reset();
    document.getElementById('jsId').disabled = false;
    document.getElementById('jsCancelBtn').style.display = 'none';
    jsEditMode = false;
}

document.getElementById('jsCancelBtn').addEventListener('click', resetJsForm);

// Kezdeti kirajzolás
renderTable();