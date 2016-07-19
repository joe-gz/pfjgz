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

var photoDiv = '';

var heartIcon = L.divIcon({className: 'heart-div-icon', iconSize: null});
var foodIcon = L.divIcon({className: 'food-div-icon', iconSize: null});
var sportIcon = L.divIcon({className: 'sport-div-icon', iconSize: null});
var starIcon = L.divIcon({className: 'star-div-icon', iconSize: null});

pointMarkers = L.geoJson(points, {
  pointToLayer: function (feature, latlng) {
    var props = feature.properties.event_type;
    return L.marker(latlng,   {icon: createIcon(props)});
    // return L.circleMarker(latlng,   circlestyle(feature));
  },
  onEachFeature: function(feature, point) {
    var showPhotos = function () {
      photoDiv = L.DomUtil.create('div', 'popup-photo-div')
      var photoLength = feature.properties.photo_urls.length;
      console.log(photoLength);
      var properties = feature.properties;
      if (photoLength === 0) {
        photoDiv.innerHTML = "<div>We'll add pics together :)</div>"
      } else {
        for (var i = 0; i < photoLength; i++){
          var imageEl = document.createElement('img');
          imageEl.classList.add('popup-photo')
          imageEl.src = properties.photo_urls[i];
          photoDiv.appendChild(imageEl)
        }
      }
      console.log(photoDiv);
      return photoDiv.innerHTML
    };
    point.on('click', function (){
      var sidebarDiv = document.querySelector("#sidebar");
      sidebarDiv.innerHTML = '<div class=sidebar-text><p class=what-text>'+feature.properties.Description+'</p><p><span class=spanText>Where</span>: '+feature.properties.Location+'</p>'+'<p><span class=spanText>Date</span>: '+feature.properties.Date+'</p></div><div>'+showPhotos()+'</div>'
      sidebar.show();})
  }
}).addTo(map);

toggleButton.addEventListener("click", function (){
  introOverlay.style.visibility = 'hidden';
})

introButton.addEventListener("click", function (){
  introOverlay.style.visibility = 'visible';
})

function createIcon (type) {
  var myIcon = L.divIcon({className: type+'-div-icon', iconSize: null});
  return myIcon
}
