import params from "@params";

console.log(params.countryCodes);

const world = require('./world.json'); // https://github.com/AshKyd/geojson-regions/tree/main/public/countries/110m

var map = L.map('foodmap', {
    center: [30, 0],
    zoom: 3
});

const hugoAllParams = params.countryCodes;
const getHugoParams = (feature) => {
    var code = feature.properties.ISO_A3.toLowerCase();
    if (hugoAllParams[code]) {
        return hugoAllParams[code];
    }
    return null;
}
const getNbRestaurants = (feature) => {
    var hugoParams = getHugoParams(feature);
    if (hugoParams) {
        return hugoParams.length;
    }
    return 0;
}

const countryStyle = (feature) => {
    return {
        stroke: true,
        weight: 1,
        color: '#000000',
        fill: true,
        fillColor: getNbRestaurants(feature) > 0 ? '#f5d59f' : '#fff',
        fillOpacity: 1
    }
}

const highlightFeature = (e) => {
    var layer = e.target;
    var hugoParams = getHugoParams(layer.feature);

    if (layer.options.weight === 1) {
        geoJson.resetStyle();

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
    
        layer.bringToFront();
        info.update(layer.feature.properties, hugoParams);
    } else {
        geoJson.resetStyle(e.target);
        info.update();
    }
}

const onEachFeature = (feature, layer) => {
    layer.on({
        click: highlightFeature
    });
}

var geoJson;
geoJson = L.geoJson(world, {
    style: countryStyle,
    onEachFeature: onEachFeature
}).addTo(map);


var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props, hugoParams) {
    var listRestaurants = '<ul>';
    console.log(hugoParams)
    if (hugoParams) {
        hugoParams.forEach(page => {
            var visitDate = new Date(page.Page.Date).toLocaleDateString();
            listRestaurants += '<li><a href="' + page.Page.Path + '" target="_blank">' + page.Page.LinkTitle + '</a> - ' + visitDate +'</li>'
        });
    }
    listRestaurants += '</ul>';
    console.log(listRestaurants);
    this._div.innerHTML = '<h4>Restaurants</h4>' +  (props ?
        '<b>' + props.NAME_FR + '</b><br />' + listRestaurants
        : 'Select a country');
};

info.addTo(map);

