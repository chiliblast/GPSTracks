var _viewer;
function startup(Cesium) {

	var viewer = new Cesium.Viewer(cesiumContainer, {
        sceneModePicker : false,
        baseLayerPicker : true,
        geocoder : false,
        timeline : true,
        animation : true,
        fullscreenButton : true,
        navigationHelpButton : true,
        homeButton : false
    });

    /*var viewer = new Cesium.Viewer('cesiumContainer', {
        imageryProvider : new Cesium.createTileMapServiceImageryProvider({
            url : 'Cesium/Assets/Textures/NaturalEarthII',
            usePreCachedTilesIfAvailable : false
        }),
        baseLayerPicker : false,
        sceneModePicker : false,
        baseLayerPicker : false,
        geocoder : false,
        timeline : true,
        animation : true,
        fullscreenButton : true,
        navigationHelpButton : true,
        homeButton : false
    });*/

    var layers = viewer.imageryLayers;

    layers.addImageryProvider(new Cesium.SingleTileImageryProvider({
        url : 'GPS_Tracks/GPS_Tracks.png',
        rectangle : Cesium.Rectangle.fromDegrees(153.3, -28.8, 153.9, -28.4)
    }));

    var terrainProvider = new Cesium.CesiumTerrainProvider({
        url : '//assets.agi.com/stk-terrain/world',
        requestVertexNormals: true,
        requestWaterMask: true
    });
    viewer.terrainProvider = terrainProvider;
    viewer.scene.globe.enableLighting = true;

    _viewer = viewer;

    viewer.infoBox.frame.sandbox = "allow-same-origin allow-top-navigation allow-pointer-lock allow-popups allow-forms allow-scripts";

    viewer.scene.frameState.creditDisplay.destroy();

    //Enable lighting based on sun/moon positions
    viewer.scene.globe.enableLighting = true;
  
    var scene = viewer.scene;
    var handler;
    
    // Mouse over the globe to see the cartographic position
    handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function(movement) {
        var cartesian = viewer.camera.pickEllipsoid(movement.endPosition, scene.globe.ellipsoid);
        if (cartesian) {
            var cartographic = scene.globe.ellipsoid.cartesianToCartographic(cartesian);
            cursorLon = Cesium.Math.toDegrees(cartographic.longitude);
            cursorLat = Cesium.Math.toDegrees(cartographic.latitude);
            $('#LatLon').html(cursorLon.toFixed(2) + ', ' + cursorLat.toFixed(2));
        } 
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    loadTrack(tracks[count]);

    animation();  

}