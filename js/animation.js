function animation(){

	_viewer.animation.viewModel.clockViewModel.shouldAnimate = false;
	//_viewer.clock.canAnimate = false;

	/*var shouldAnimate = false;
	//play pause
    Cesium.knockout.getObservable(_viewer.animation.viewModel.clockViewModel, 'shouldAnimate').subscribe(function(value) {
	    shouldAnimate = value;	    
	});*/

    var forward = 1;
    var multiplier = 1;
    //speed
	Cesium.knockout.getObservable(_viewer.animation.viewModel.clockViewModel, 'multiplier').subscribe(function(value) {
		forward = Cesium.Math.signNotZero(value);
		multiplier = Math.abs(value);   
		if(multiplier >= 20) {
			multiplier = 20;
			_viewer.clock.multiplier = multiplier*forward;
		}
	});

	
	_viewer.clock.onTick.addEventListener(function(clock){
				
		if(clock.shouldAnimate == true){//auto animate

			if(timeLineCount < 0)	timeLineCount = 0;
			else if(timeLineCount >= timeLine.length-1)	timeLineCount = timeLine.length-1;

			var currentClockTime = Cesium.JulianDate.fromDate(new Date(clock.currentTime));
			var currentTimeLine = Cesium.JulianDate.fromDate(new Date(timeLine[timeLineCount][0]*1000));
//console.log(currentClockTime +"|||"+ currentTimeLine);

			if(forward == 1){

				if(Cesium.JulianDate.equalsEpsilon(currentClockTime,currentTimeLine,multiplier)){
					//console.log("=")
					renderAnimation(forward);
					//timeLineCount+=1;
				}	
				/*else if(currentClockTime < currentTimeLine){
					//console.log(-1)
				}*/					
				else if(currentClockTime > currentTimeLine){
					//console.log(1)
					timeLineCount+=1;
				}
					
			}
			else if(forward == -1){

				if(Cesium.JulianDate.equalsEpsilon(currentClockTime,currentTimeLine,multiplier)){
					//console.log("=")
					renderAnimation(forward);
					//timeLineCount-=1;
				}	
				else if(currentClockTime < currentTimeLine){
					//console.log(-1);
					timeLineCount-=1;
				}
					
				/*else if(currentClockTime > currentTimeLine){
					//console.log(1)
				}*/
					
			}

	    }
	    else if(clock.shouldAnimate == false){//timeline mouse click animate
	    	renderFrame(clock.currentTime)
	    }

	})

}