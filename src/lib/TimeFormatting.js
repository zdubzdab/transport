export function pullTime (response){
  //10 in order to fix warning
  var hours = (new Date(parseInt(response, 10)*1000)).getHours()
  var minutes = (new Date(parseInt(response, 10)*1000)).getMinutes()
  var seconds = (new Date(parseInt(response, 10)*1000)).getSeconds()
  return convertToHHmmSS(hours, minutes, seconds)
}

export function convertToHours(response){
  var sec_num = parseInt(response, 10);
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);
  return convertToHHmmSS(hours, minutes, seconds)
}

function convertToHHmmSS(hours, minutes, seconds){
  return getTime(hours) + ":" + getTime(minutes) + ":" + getTime(seconds)
}

export function getTime (time){
  time = time.toString();
  if( time.length === 1 ){ time = "0" + time; }
  return time
}

export function secConvertToMinutes(response){
  if (response === "0") {
    return ""
  } else {
    return "+" + (parseInt(response, 10)/60).toString()
  }
}

export function checkCanceled(response){
  if (response !== "0") {
    return "canceled"
  } else {
    return "       "
  }
}

