function renderCurrentPolylineTrackAnimation(forward,lon,lat,altM,count){

	if(_viewer.entities.getById("currentPolylineTrack"+tracks[count]) == null){

		_viewer.entities.add({
	    	id : "currentPolylineTrack"+tracks[count],
		    polyline : {
		        positions : Cesium.Cartesian3.fromDegreesArrayHeights(currentPolylineTrack[count]),
		        width : 5,
		        material : Cesium.Color.fromCssColorString(tracksColor[count])
		    }
		});
		currentPolylineTrack[count] = [];

	}	
		
	if(forward == 1){
		currentPolylineTrack[count].push(lon);
		currentPolylineTrack[count].push(lat);
		currentPolylineTrack[count].push(altM);
	}	
	else if(forward == -1){
		/*var  currentPolylineTrackLength = currentPolylineTrack[count].length;
		for(var i=currentPolylineTrackLength; i>=currentPolylineTrackLength-6; i--){

			var _lon = currentPolylineTrack[count][i-3];
			var _lat = currentPolylineTrack[count][i-2];
			var _altM = currentPolylineTrack[count][i-1];

			if(_lon == lon && _lat == lat && _altM == altM)
				{console.log("--");break;}
			else{
				currentPolylineTrack[count].pop();
				currentPolylineTrack[count].pop();
				currentPolylineTrack[count].pop();
			}

		}*/
		renderCurrentPolylineTrackFrame(lon,lat,altM,count)
		
	} 
		
	_viewer.entities.getById("currentPolylineTrack"+tracks[count]).polyline.positions = Cesium.Cartesian3.fromDegreesArrayHeights(currentPolylineTrack[count]); 

}


function renderCurrentPolylineTrackFrame(lon,lat,altM,count){

	if(_viewer.entities.getById("currentPolylineTrack"+tracks[count]) == null){

		_viewer.entities.add({
	    	id : "currentPolylineTrack"+tracks[count],
		    polyline : {
		        positions : Cesium.Cartesian3.fromDegreesArrayHeights(currentPolylineTrack[count]),
		        width : 5,
		        material : Cesium.Color.fromCssColorString(tracksColor[count])
		    }
		});

	}	
		
	currentPolylineTrack[count] = [];	
	var _lon,_lat,_altM,_count;	
	for(var i=0; i<timeLine.length; i+=5){
		_count = parseFloat(timeLine[i][4])
		if(count == _count){

			_time = new Date(timeLine[i][0]*1000);
			currentTimeLine = Cesium.JulianDate.fromDate(_time);
			if(Cesium.JulianDate.lessThanOrEquals(currentTimeLine,_viewer.clock.currentTime)){

				_lon = parseFloat(timeLine[i][1]);
				_lat = parseFloat(timeLine[i][2]);
				_altM = parseFloat(timeLine[i][3]);

				currentPolylineTrack[count].push(parseFloat(_lon));
	    		currentPolylineTrack[count].push(parseFloat(_lat));
	    		currentPolylineTrack[count].push(parseFloat(_altM));

			}
			else
				break;
					
		}

	}	

	_viewer.entities.getById("currentPolylineTrack"+tracks[count]).polyline.positions = Cesium.Cartesian3.fromDegreesArrayHeights(currentPolylineTrack[count]);
    
}