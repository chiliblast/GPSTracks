var tracks = ["helmy.csv", "brent.csv", "dakota.csv"];
var tracksColor = ["#DB7093", "#9ACD32", "#7B68EE"];
var count = 0;

function loadTrack(track){
	$.ajax({
	    type: "GET",
	    url: "data/"+track,
	    dataType: "text",
	    success: function(data) {showTrack(data);}
	});
}

var polylineTrack=[];	//1 dimentional array of track(lon lat alt)
function showTrack(allText) {
    var allTextLines = allText.split(/\r\n|\n/);   
    polylineTrack[count]=[];

    for (var i=1; i<allTextLines.length-1; i++) {
    	//time,lat,lon,altM
        var data = allTextLines[i].split(',');
        var time = data[0];
        var lat = data[1];
        var lon = data[2];
        var altM = data[3];

        polylineTrack[count].push(parseFloat(lon));
        polylineTrack[count].push(parseFloat(lat));
        polylineTrack[count].push(parseFloat(altM));


        setTimeLine(parseFloat(time),parseFloat(lon),parseFloat(lat),parseFloat(altM),count);
    }

	var pinBuilder = new Cesium.PinBuilder();

    _viewer.entities.add({
    	id : tracks[count],
	    name : tracks[count].split('.')[0],
	    label : {
	    	text : tracks[count].split('.')[0],
	    	scale : 0.5
	    },
	    position : Cesium.Cartesian3.fromDegrees(polylineTrack[count][0],polylineTrack[count][1],polylineTrack[count][2]),
	    billboard : {
	        image : pinBuilder.fromColor(Cesium.Color.fromCssColorString(tracksColor[count]), 40).toDataURL(),
	        verticalOrigin : Cesium.VerticalOrigin.BOTTOM
	    },
	    polyline : {
	        positions : Cesium.Cartesian3.fromDegreesArrayHeights(polylineTrack[count]),
	        width : 0.6,
	        material : Cesium.Color.fromCssColorString(tracksColor[count])
	    },
	    description : "Lat:"+polylineTrack[count][1]+"</br>Lon:"+polylineTrack[count][0]+"</br>Alt:"+polylineTrack[count][2]+"</br>Time:"  
	});

	//_viewer.zoomTo(_viewer.entities);

    count++;
    if(count<tracks.length){
    	loadTrack(tracks[count]);
    }
    else{ // runs when all tracks have been loaded

    	setClock();
        setCurrentPolylineTrack();

        setTimeout(function(){
            _viewer.camera.flyTo({
                destination : Cesium.Cartesian3.fromDegrees(153.61,-28.64,60000),
                duration : 5
            });
        }, 2000);
        
    }

}