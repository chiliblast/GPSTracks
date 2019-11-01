function animation(){

	_viewer.animation.viewModel.clockViewModel.shouldAnimate = false;

	var _animationStart;
	var shouldAnimate = false;
	//play pause
    Cesium.knockout.getObservable(_viewer.animation.viewModel.clockViewModel, 'shouldAnimate').subscribe(function(value) {
	    shouldAnimate = value;
	    if(shouldAnimate == true){
	    	_animationStart = setInterval(animationStart, 1000 / multiplier);
	    }
	    else{
	    	clearInterval(_animationStart);
	    }
	});

    var forward = 1;
    var multiplier = 1;
    //speed
	Cesium.knockout.getObservable(_viewer.animation.viewModel.clockViewModel, 'multiplier').subscribe(function(value) {
		forward = Cesium.Math.signNotZero(value);
	    multiplier = Math.abs(value);
	    if(multiplier == 0){
	    	clearInterval(_animationStart);
	    }
	    else if(shouldAnimate == true){

	    	clearInterval(_animationStart);
	    	_animationStart = setInterval(animationStart, 1000 / multiplier);
	    }
	});

	function animationStart(){

		var allReached = 0;

		for(var count=0;count<tracks.length;count++){

			//check for null value
			if((forward == 1 && animationTrack[count][trackIndex[count]] == null) || (forward == -1 && animationTrack[count][trackIndex[count]-1] == null)){
				allReached++;
			}
			else{
				var time,lon,lat,altM,position;

				if(forward == 1){
					time = animationTrack[count][trackIndex[count]];
					lon = animationTrack[count][trackIndex[count]+1];
					lat = animationTrack[count][trackIndex[count]+2];
					altM = animationTrack[count][trackIndex[count]+3];
				}
				else if(forward == -1){
					altM = animationTrack[count][trackIndex[count]-1];
					lat = animationTrack[count][trackIndex[count]-2];
					lon = animationTrack[count][trackIndex[count]-3];
					time = animationTrack[count][trackIndex[count]-4];
				}

				//sync all tracks with time
				if(forward == 1){
					if(time != timeLine[timeLineCount]){
						//console.log(time + " " + timeLine[timeLineCount])
						//console.log(count)
						continue;
					}
				}
				
				position = Cesium.Cartesian3.fromDegrees(lon, lat, altM);
				_viewer.entities.getById(tracks[count]).position = position;
				_viewer.entities.getById(tracks[count]).description = "Lat:"+lat+"</br>Lon:"+lon+"</br>Alt:"+altM+"</br>Time:"+(new Date(time*1000).toUTCString())   
				
				if(forward == 1){
					timeLineCount++;
					
					_viewer.entities.add({
						id : timeLineCount,
						name : tracks[count].split('.')[0] + " previous position", 
						position : position,
						point : {
							pixelSize : 5,
							color : Cesium.Color.fromCssColorString(tracksColor[count])
						},
						description : "Lat:"+lat+"</br>Lon:"+lon+"</br>Alt:"+altM+"</br>Time:"+(new Date(time*1000).toUTCString())   
					})

					trackIndex[count] = trackIndex[count] + 4;

				}
				else if(forward == -1){
					_viewer.entities.removeById(timeLineCount);
					//console.log(_viewer.entities.getById(id));
					timeLineCount--;

					trackIndex[count] = trackIndex[count] - 4;
				}		

			}

		}	
// console.log(animationTrack[0].length)
		if(allReached == 3){
			_viewer.animation.viewModel.clockViewModel.shouldAnimate = false;
			if(forward == 1){
				for(var count=0;count<tracks.length;count++){
					trackIndex[count] = animationTrack[count].length;
				}
			}
			else if(forward == -1){
				for(var count=0;count<tracks.length;count++){
					trackIndex[count] = 0;
				}
			}
		}
		 
	}

}