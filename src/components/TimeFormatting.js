export function pullTime (response){
  //10 in order to fix warning
  var hours = (new Date(parseInt(response, 10)*1000)).getHours()
  var minutes = (new Date(parseInt(response, 10)*1000)).getMinutes()
  var seconds = (new Date(parseInt(response, 10)*1000)).getSeconds()
  var hour = getTime(hours)
  var minute = getTime(minutes)
  var second = getTime(seconds)
  var result = hour + ":" + minute + ":" + second
  return result
}

export function getTime (time){
  time = time.toString();
  if( time.length === 1 ){ time = "0" + time; }
  return time
}
