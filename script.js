console.log("Hello world!");


// 1. DATA-ARRAY VOOR DE GEBOUWEN
const buildingsData = [
  { id: "amstel-hotel",     className: "gebouw-amstel-hotel",     fileName: "amstelhotel.png",             top: "55%", left: "24%" },
  { id: "amstelhaven",      className: "gebouw-amstelhaven",      fileName: "Amstelhaven.png",             top: "75%", left: "16%" },
  { id: "bb-sleep",         className: "gebouw-bb-sleep",         fileName: "B&B Sleep in Amsterdam.png",  top: "12%", left: "19%" },
  { id: "bakhuys",          className: "gebouw-bakhuys",          fileName: "Bakhuys Amsterdam.png",       top: "52%", left: "49%" },
  { id: "bar-lempicka",     className: "gebouw-bar-lempicka",     fileName: "Bar Lempicka.png",            top: "44.6%", left: "32.9%" },
  { id: "bistro-baret",     className: "gebouw-bistro-baret",     fileName: "Bistro Baret.png",            top: "34.1%", left: "45.5%" },
  { id: "bistro-bonjour",   className: "gebouw-bistro-bonjour",   fileName: "Bistro Bonjour.png",          top: "7.5%", left: "21.5%" },
  { id: "cafe-noir",        className: "gebouw-cafe-noir",        fileName: "Café Noir.png",               top: "57%", left: "75.7%" },
  { id: "capital-kitchen",  className: "gebouw-capital-kitchen",  fileName: "Capital Kitchen.png",         top: "41%", left: "61.6%" },
  { id: "carre",            className: "gebouw-carre",            fileName: "Carre.png",                   top: "23%", left: "50%" }
];

// 2. GENEREER DE GEBOUWEN OP DE KAART
const buildingsContainer = document.getElementById('all-buildings');

buildingsData.forEach(building => {
  const img = document.createElement('img');
  // Hier plakken we de mapnaam 'images/' automatisch voor de bestandsnaam:
  img.src = `images/${building.fileName}`;
  img.className = building.className;
  img.setAttribute('data-id', building.id);
  img.alt = building.id;
  
  img.style.top = building.top;
  img.style.left = building.left;
  
  buildingsContainer.appendChild(img);
});

// 3. INITIALISEER PANZOOM (ZOOMEN EN SLEPEN)
const element = document.getElementById('panzoom-element');
const panzoom = Panzoom(element, {
  maxScale: 5,
  minScale: 1,
  contain: 'outside',
  startScale: 1
});

element.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);

// 4. BRAVO STUDIO CLICK INTERACTION
buildingsContainer.addEventListener('click', function(event) {
  const clickedImg = event.target.closest('img');
  
  if (clickedImg) {
    const buildingId = clickedImg.getAttribute('data-id');
    
    window.webkit.messageHandlers.bravo.postMessage({
      action: 'building_clicked',
      id: buildingId
    });

    console.log("Bravo actie getriggerd voor id:", buildingId);
  }
});
