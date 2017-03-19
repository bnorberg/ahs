function main() {

        var torqueLayer;
        cartodb.createVis('map', 'https://brn.carto.com/api/v2/viz/498c34f4-b83d-11e6-b2a6-0ee66e2c9693/viz.json', {
            shareable: true,
            title: true,
            description: true,
            search: true,
            tiles_loader: true
        })
        .done(function(vis, layers) {
          //First layer is the basemap, the second is the Torque layer
          torqueLayer = layers[1];
          torqueLayer.pause();
        })
        .error(function(err) {
          console.log(err);
        });
      }

      window.onload = main;