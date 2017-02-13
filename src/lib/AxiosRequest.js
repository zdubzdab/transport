import axios from 'axios';

export function getRequest (first, second, third, that){
  that.serverRequest = 
    axios
      .get(pastStation(first, second, third))
      .then(function(result) {  
        that.setState({
          response: result.data,
        })
      })
}

function pastStation (first, station, second){
  return first + station + second
}
