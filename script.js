var toggleButton = document.querySelector(".toggle-intro");
var introOverlay = document.querySelector("#overlay");
var introButton = document.querySelector("#intro-button")

var map = L.map('map').setView([38.9072, -77.0369], 12);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'joegz.0g5b9af9',
  accessToken:'pk.eyJ1Ijoiam9lZ3oiLCJhIjoiY2lwdTR1czM1MDhiOGZ1bTJ0YmZyYmRjaiJ9.xvTMZMcfWMKG3ZLFahgJ9g'
}).addTo(map);

var sidebar = L.control.sidebar('sidebar', {
    position: 'left'
});

map.addControl(sidebar);
// setTimeout(function () {
//     sidebar.show();
// }, 500);

var photoDiv = '';

function circlestyle(feature) {
  return {
    radius: 8,
    fillColor: 'red',
    weight: 1,
    opacity: 1,
    color: 'white',
    // dashArray: '3',
    fillOpacity: 1,
    className: 'circleMarker'
  };
}

pointMarkers = L.geoJson(points, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng,   circlestyle(feature));
  },
  onEachFeature: function(feature, point) {
    var showPhotos = function () {
      photoDiv = L.DomUtil.create('div', 'popup-photo-div')
      for (var i = 0; i < feature.properties.photo_urls.length; i++){
        var imageEl = document.createElement('img');
        imageEl.src = feature.properties.photo_urls[i];
        photoDiv.appendChild(imageEl)
      }
      console.log(photoDiv);
      return photoDiv.innerHTML
    };
    point.bindPopup('<p><span class=spanText>What</span>: '+feature.properties.Description+'</p><p><span class=spanText>Where</span>: '+feature.properties.Location+'</p>'+'<p><span class=spanText>Date</span>: '+feature.properties.Date+'</p><p><span class=spanText>Time</span>: '+feature.properties.Time+'</p><div>'+showPhotos()+'</div>',
    {maxWidth: 250, minWidth: 200, maxHeight: 150, autoPan: true});
    point.on('click', function (){ sidebar.show(); })
  }
}).addTo(map);

toggleButton.addEventListener("click", function (){
  introOverlay.style.visibility = 'hidden';
})

introButton.addEventListener("click", function (){
  introOverlay.style.visibility = 'visible';
})
