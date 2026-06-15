console.log("Hello world!");
 
// 1. DATA-ARRAY VOOR DE GEBOUWEN
const buildingsData = [
  { id: "amstel-hotel", className: "gebouw-amstel-hotel", fileName: "amstelhotel.png", top: "55%", left: "24%" },
  { id: "amstelhaven", className: "gebouw-amstelhaven", fileName: "Amstelhaven.png", top: "75%", left: "16%" },
  { id: "bb-sleep", className: "gebouw-bb-sleep", fileName: "B&B Sleep in Amsterdam.png", top: "12%", left: "19%" },
  { id: "bakhuys", className: "gebouw-bakhuys", fileName: "Bakhuys Amsterdam.png", top: "52%", left: "49%" },
  { id: "bar-lempicka", className: "gebouw-bar-lempicka", fileName: "Bar Lempicka.png", top: "44.6%", left: "32.9%" },
  { id: "bistro-baret", className: "gebouw-bistro-baret", fileName: "Bistro Baret.png", top: "34.1%", left: "45.5%" },
  { id: "bistro-bonjour", className: "gebouw-bistro-bonjour", fileName: "Bistro Bonjour.png", top: "7.5%", left: "21.5%" },
  { id: "cafe-noir", className: "gebouw-cafe-noir", fileName: "Café Noir.png", top: "57%", left: "75.7%" },
  { id: "capital-kitchen", className: "gebouw-capital-kitchen", fileName: "Capital Kitchen.png", top: "41%", left: "61.6%" },
  { id: "carre", className: "gebouw-carre", fileName: "Carre.png", top: "23%", left: "50%" },
  { id: "concern-congres", className: "gebouw-concern-congres", fileName: "Concern Congres Centrum.png", top: "35.2%", left: "79.9%" },
  { id: "hapjeshoek", className: "gebouw-hapjeshoek", fileName: "De Hapjeshoek.png", top: "74%", left: "69.78%" },
  { id: "mozaiekmakers", className: "gebouw-mozaiekmakers", fileName: "de Mozaiekmakers.png", top: "17%", left: "72.6%" },
  { id: "fashion-boulevard", className: "gebouw-fashion-boulevard", fileName: "Fashion Boulevard B.V..png", top: "97%", left: "14%" },
  { id: "fiaschetteria", className: "gebouw-fiaschetteria", fileName: "Fiaschetteria “Pistoia”.png", top: "11.4%", left: "23.6%" },
  { id: "frederik-park", className: "gebouw-frederik-park", fileName: "Frederik Park House.png", top: "9.7%", left: "4.9%" },
  { id: "hotel-hermitage", className: "gebouw-hotel-hermitage", fileName: "Hotel Hermitage Amsterdam.png", top: "11.6%", left: "56.9%" },
  { id: "hva", className: "gebouw-hva", fileName: "HVA.png", top: "95%", left: "34%" },
  { id: "ocker", className: "gebouw-ocker", fileName: "ocker.png", top: "15.65%", left: "19.8%" },
  { id: "petit-lou", className: "gebouw-petit-lou", fileName: "Petit Lou.png", top: "17.35%", left: "83.35%" },
  { id: "protestantse-diaconie", className: "gebouw-protestantse-diaconie", fileName: "Protestantse Diaconie.png", top: "10.2%", left: "74%" },
  { id: "chez-fabrice", className: "gebouw-chez-fabrice", fileName: "Restaurant Chez Fabrice.png", top: "26.4%", left: "45.5%" },
  { id: "utrechtsedwarstafel", className: "gebouw-utrechtsedwarstafel", fileName: "Restaurant De Utrechtsedwarstafel.png", top: "12.6%", left: "32.8%" },
  { id: "van-soest", className: "gebouw-van-soest", fileName: "Van Soest Amsterdam.png", top: "12.7%", left: "14.3%" },
  { id: "zoku", className: "gebouw-zoku", fileName: "Zoku Amsterdam.png", top: "25.5%", left: "82.5%" }
];
 
// 2. TEST: bestaande leads
// Voor nu sturen deze naar detail - succesvol.
// Alle andere gebouwen sturen straks naar Lead_aanmaken.
const existingLeadIds = [
  "bar-lempicka",
  "bakhuys",
  "zoku"
];
 
// 3. BRAVO SCREEN NAMEN
// Gebruik exact de namen zoals ze links in Bravo bij Screens staan.
const detailScreen = "detail - succesvol";
const createLeadScreen = "Lead_aanmaken";
 
// 4. GENEREER DE GEBOUWEN OP DE KAART
const buildingsContainer = document.getElementById("all-buildings");
 
buildingsData.forEach(building => {
  const img = document.createElement("img");
 
  img.src = `images/${building.fileName}`;
  img.className = building.className;
  img.setAttribute("data-id", building.id);
  img.alt = building.id;
 
  img.style.top = building.top;
  img.style.left = building.left;
 
  buildingsContainer.appendChild(img);
});
 
// 5. INITIALISEER PANZOOM
const element = document.getElementById("panzoom-element");
 
const panzoom = Panzoom(element, {
  maxScale: 6,
  minScale: 1.5,
  startScale: 2,
  contain: "outside",
  cursor: "grab"
});
 
setTimeout(() => {
  panzoom.pan(0, 0);
}, 50);
 
element.parentElement.addEventListener("wheel", panzoom.zoomWithWheel);
 
// 6. FUNCTIE: STUUR ACTIE NAAR BRAVO
function navigateInBravo(screenName, buildingId) {
  const message = {
    action: "goto",
    params: {
      href: screenName,
      buildingId: buildingId
    }
  };
 
  console.log("Bravo message:", message);
 
  if (window.bravo && typeof window.bravo.postMessage === "function") {
    window.bravo.postMessage(message);
    return;
  }
 
  // fallback/test voor sommige Bravo WebViews
  if (
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.bravo
  ) {
    window.webkit.messageHandlers.bravo.postMessage(message);
    return;
  }
 
  alert("Klik werkt, maar Bravo WebView Communication is hier niet beschikbaar. Test dit in Bravo Vision.");
}
 
// 7. CLICK INTERACTION
buildingsContainer.addEventListener("click", function(event) {
  const clickedImg = event.target.closest("img");
 
  if (!clickedImg) return;
 
  const buildingId = clickedImg.getAttribute("data-id");
  const isExistingLead = existingLeadIds.includes(buildingId);
 
  console.log("Gebouw geklikt:", buildingId);
  alert("Gebouw geklikt: " + buildingId);
 
  if (isExistingLead) {
    navigateInBravo(detailScreen, buildingId);
  } else {
    navigateInBravo(createLeadScreen, buildingId);
  }
});