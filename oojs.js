// js/oojs.js

// 1. Szülő osztály (class, constructor, metódus)
class Alakzat {
    constructor(x, y, szin) {
        this.x = x;
        this.y = y;
        this.szin = szin;
        this.elem = document.createElement('div');
    }

    // Alap metódus a pozíció és szín beállítására
    alapBeallitas() {
        this.elem.style.position = 'absolute';
        this.elem.style.left = this.x + 'px';
        this.elem.style.top = this.y + 'px';
        this.elem.style.backgroundColor = this.szin;
    }
}

// 2. Gyerek osztály 1: Téglalap (extends, super, metódus felülírás)
class Teglalap extends Alakzat {
    constructor(x, y, szin, szelesseg, magassag) {
        super(x, y, szin); // Szülő konstruktorának hívása
        this.szelesseg = szelesseg;
        this.magassag = magassag;
    }

    // Rajzolás metódus
    rajzol() {
        this.alapBeallitas();
        this.elem.style.width = this.szelesseg + 'px';
        this.elem.style.height = this.magassag + 'px';
        
        // Kötelező elem a feladatkiírásból
        document.body.appendChild(this.elem);
    }
}

// 3. Gyerek osztály 2: Kör (extends, super)
class Kor extends Alakzat {
    constructor(x, y, szin, sugar) {
        super(x, y, szin); // Szülő konstruktorának hívása
        this.sugar = sugar;
    }

    rajzol() {
        this.alapBeallitas();
        this.elem.style.width = (this.sugar * 2) + 'px';
        this.elem.style.height = (this.sugar * 2) + 'px';
        this.elem.style.borderRadius = '50%'; // Ettől lesz kör alakú
        
        // Kötelező elem a feladatkiírásból
        document.body.appendChild(this.elem);
    }
}

// Segédfüggvény random színek generálásához
function getRandomSzin() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

// Eseménykezelők a gombokhoz
document.getElementById('btnTeglalap').addEventListener('click', () => {
    // Random pozíció, hogy ne a menüre rajzoljon (Y > 300)
    const x = Math.floor(Math.random() * (window.innerWidth - 150));
    const y = Math.floor(Math.random() * (window.innerHeight - 350)) + 300; 
    
    const teglalap = new Teglalap(x, y, getRandomSzin(), 120, 80);
    teglalap.rajzol();
});

document.getElementById('btnKor').addEventListener('click', () => {
    const x = Math.floor(Math.random() * (window.innerWidth - 100));
    const y = Math.floor(Math.random() * (window.innerHeight - 350)) + 300;
    
    const kor = new Kor(x, y, getRandomSzin(), 50); // 50-es sugár
    kor.rajzol();
});