import axios from 'axios';

export function getRequest (that, first, second, third, fourth, fifth){
  that.serverRequest = 
    axios
      .get(createUrl(first, second, third, fourth, fifth))
      .then(function(result) {  
        that.setState({
          response: result.data,
        })
      })
}

function createUrl() {
  var array = []
  for(var i = 0; i < arguments.length; i++) {
    array.push(arguments[i])
  }
  return removeUndefined(array)
}

function removeUndefined(array) {
  for(var i = array.length - 1; i >= 0; i--) {
      if(array[i] === undefined) {
        array.splice(i, 1);
      }
  }
  return sumArrayElements(array)
}

function sumArrayElements(array) {
  var url = '';
  for(var i = 0; i<array.length; i++)  {
    url += array[i]
  }
  return url
}
