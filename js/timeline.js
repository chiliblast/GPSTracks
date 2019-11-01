var timeLine=[];
var timeLineCount=0;
function setTimeLine(time,lon,lat,altM,count){
	timeLine[timeLine.length]=[];
	timeLine[timeLine.length-1].push(time);
	timeLine[timeLine.length-1].push(lon);
	timeLine[timeLine.length-1].push(lat);
	timeLine[timeLine.length-1].push(altM);
	timeLine[timeLine.length-1].push(count);
}

var currentPolylineTrack=[];
function setCurrentPolylineTrack(){
	for(var count=0;count<tracks.length;count++){
		currentPolylineTrack[count] = [];
	}
}

function setClock(){
	timeLine = timeLine.sort();

	var start = Cesium.JulianDate.fromDate(new Date((timeLine[0][0])*1000));
	var lastDate = Cesium.JulianDate.fromDate(new Date(timeLine[timeLine.length-1][0]*1000))
	var addSeconds = Cesium.JulianDate.secondsDifference(lastDate,start);
    var stop = Cesium.JulianDate.addSeconds(start, addSeconds, new Cesium.JulianDate());

    _viewer.clock.startTime = start.clone();
    _viewer.clock.stopTime = stop.clone();
    _viewer.clock.currentTime = start.clone();
    _viewer.clock.clockRange = Cesium.ClockRange.CLAMPED; //No Loop at the end
	_viewer.clock.multiplier = 1;

    _viewer.timeline.zoomTo(start, stop);

    //_viewer.clock.currentTime = Cesium.JulianDate.fromDate(new Date(timeLine[0]*1000)).clone();
}

