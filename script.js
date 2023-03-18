const komorki = document.querySelectorAll("td");
const wiadomosc = document.querySelector(".message");
let gracz = "X";
let koniecGry = flase;

cells.forEach(cell => {
  cell.addEventListener("click", ruch);
});

function ruch() {
  if (this.classList.contains("poleZajete") || koniecGry){
    return;
  }
  
  this.classList.add("poleZajete", gracz);
  this.textContent = gracz.toUpperCase();
  
  const wiersz = this.parentNode.rowIndex;
  const kolumna = this.cellIndex;
  
  if (sprawdzWygrana(wiersz, kolumna)) {
    koniecGry = true;
    wiadomosc.textContent = "Remis";
    return;
  }
  
  gracz = gracz === "x" ? "o" : "x";
  wiadomosc.textContent = "Kolej gracza ${gracz.toUpperCase()}";
  
  function sprawdzWygrana(kolumna, wiersz) {
    const wartoscWiersza = [];
    const wartoscKolumny = [];
    let wartoscDiagonali = [];
    let wartoscOdwroconejDiagonali = [];
  
  for (let i=0, i<3, i++) {
    wartoscWiersza.push(cells[wiersz*3+i]);
    wartoscKolumny.push(cells[kolumna+i*3]);
    wartoscDiagonali.push(cells[i*3+i;
    wartoscOdwroconejDiagonali.push(cells[i*3+2=i]);
  }
  
    if (sprawdzWartosc(wartoscWiersza) || sprawdzWartosc(wartoscKolumny) || sprawdzWartosc(wartoscDiagonali) || sprawdzWartosc(wartoscOdwroconejDiagonali)) {
      return true;
    }
    return false;
  }
  
  function sprawdzWartosc(wartosc) {
    const wygrana = values.every(cell => cell.classList.contains(gracz));
    if (wygrana) {
      values.forEach(cell => cell.classList.add("wygrana"));
    }
    return wygrana;
    
    function sprawdzRemis() {
      return Array.from(cells).every(cell => cell.classList.contains("poleZajete"));
    }
    
    
