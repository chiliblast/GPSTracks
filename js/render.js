

function renderAnimation(forward){
	//console.log(timeLineCount)
	var time,lon,lat,altM,position,count;

	var tempTime = timeLine[timeLineCount][0];
	while (tempTime == timeLine[timeLineCount][0]) {

		time = timeLine[timeLineCount][0];
		lon = parseFloat(timeLine[timeLineCount][1]);
		lat = parseFloat(timeLine[timeLineCount][2]);
		altM = parseFloat(timeLine[timeLineCount][3]);
		count = parseFloat(timeLine[timeLineCount][4]);

		position = Cesium.Cartesian3.fromDegrees(lon, lat, altM);
		_viewer.entities.getById(tracks[count]).position = position;
		_viewer.entities.getById(tracks[count]).description = "Lat:"+lat+"</br>Lon:"+lon+"</br>Alt:"+altM+"</br>Time:"+(new Date(timeLine[timeLineCount][0]*1000).toUTCString())   
		 
		renderCurrentPolylineTrackAnimation(forward,lon,lat,altM,count); 

		if(forward == 1){
			timeLineCount++;
		}   
		else if(forward == -1){
			timeLineCount--;
		} 

		if(timeLineCount <= 0 || timeLineCount >= timeLine.length-1)
			break;
			
	}

				
}

var tempCurrentClockTime = null;
function renderFrame(currentClockTime){
	if(tempCurrentClockTime == null) 
		tempCurrentClockTime = currentClockTime;
	else if(tempCurrentClockTime.toString() != currentClockTime.toString()){
		tempCurrentClockTime = currentClockTime;
				
		//reset track			
		for(count=0; count<tracks.length; count++){
			lon = polylineTrack[count][0];
			lat = polylineTrack[count][1];
			altM = polylineTrack[count][2]
			position = Cesium.Cartesian3.fromDegrees(lon,lat,altM);
			_viewer.entities.getById(tracks[count]).position = position;
			_viewer.entities.getById(tracks[count]).description = "Lat:"+lat+"</br>Lon:"+lon+"</br>Alt:"+altM+"</br>Time:";   
			
			renderCurrentPolylineTrackFrame(lon,lat,altM,count);
		}
			 

		var currentTimeLine;
		for(var count=0; count<tracks.length; count++){

			for(var i = 0; i < timeLine.length; i++){

				_count = parseFloat(timeLine[i][4]);

				if(count == _count){

					time = new Date(timeLine[i][0]*1000);

					currentTimeLine = Cesium.JulianDate.fromDate(time);

					if(Cesium.JulianDate.lessThanOrEquals(currentTimeLine,currentClockTime)){

						time = time.toUTCString();
						lon = parseFloat(timeLine[i][1]);
						lat = parseFloat(timeLine[i][2]);
						altM = parseFloat(timeLine[i][3]);
						

						position = Cesium.Cartesian3.fromDegrees(lon, lat, altM);
						_viewer.entities.getById(tracks[_count]).position = position;
						_viewer.entities.getById(tracks[_count]).description = "Lat:"+lat+"</br>Lon:"+lon+"</br>Alt:"+altM+"</br>Time:"+time   
				 
				 		timeLineCount = i;

					}

				}			
					
			}

		}	

	}

}


