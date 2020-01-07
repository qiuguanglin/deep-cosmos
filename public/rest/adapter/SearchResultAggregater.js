'use strict';

//check the two arryas are identical at length, orders and elements
const isArrEq = (arr1, arr2)=>{
    if(arr1.length !== arr2.length)return false;
    for(let i in arr1){
        if(arr1[i]!==arr2[i])return false;
    }
    return true;
}

/**
aggregate multiple lines that share the same spaceship to be one, for example:

{[spaceship1, spaceship2, ...], place1},
{[spaceship1, spaceship2, ...], place2}, ...

the case above means spaceship1 and spaceship2 both transpass place1 and place2
and that will be aggregated to:
{
  [spaceship1, spaceship2], [place1, place2]
}
**/
const aggregateLine = transfers =>{
  const {board, land, shuttles} = transfers[0];
  const aggregatedLines = [{shuttles, stops: [board, land]}];

  for(let i=1; i<transfers.length; i++){
    const thisStop = transfers[i];
    const previousStop = aggregatedLines[aggregatedLines.length - 1];
    //if this planet has the same transfers as the previous planet, add this planet into the Set that contains
    //all planets sharing the same spaceship
    if(isArrEq(thisStop.shuttles, previousStop.shuttles)){
      previousStop.stops.push(thisStop.land);
    }else{
      //if not, just add it as a new entry into the result
      aggregatedLines.push({
        shuttles: thisStop.shuttles,
        stops: [thisStop.board, thisStop.land]
      });
    }
  }

  return aggregatedLines;
}

//aggregate the names to take place of the ids, which comes from backend
const aggregateDescriptiveNames = (lines, planetEnum, flightsMap) => {
  for(let i=0; i<lines.length; i++){
      const line = lines[i];
      line.shuttles = line.shuttles.map(st=>flightsMap[st].cname);
      line.stops = line.stops.map(st=>planetEnum[st].cname)
  }
}

const aggreateSectionDistance = (lines, routeCostMap, flightsMap) => {
  for(let i=0; i<lines.length; i++){
      const line = lines[i];
      const stops = line.stops;

      let sum = 0;
      for(let j=0; j<stops.length-1; j++){
        const thisStop = stops[j];
        const nextStop = stops[j+1];
        sum += routeCostMap[thisStop][nextStop].distance;
      }

      const spaceshipNumber = line.shuttles[0]; //at this version there is only one routine spacehip in between 2 planets
      const spaceship = flightsMap[spaceshipNumber];

      line['sectionDistance'] = sum.toFixed(2);
      line['duration'] = (sum / spaceship.speed).toFixed(1);
  }
}

const Adapter = (result, flightsMap, planetList, routeCostMap) => {
  const {totalPrice, transfers} = result.data.message;
  const planetEnum = planetList.reduce((obj, ele) => {obj[ele.id] = ele; return obj}, {});

  const lines = aggregateLine(transfers);
  aggreateSectionDistance(lines, routeCostMap, flightsMap);
  aggregateDescriptiveNames(lines, planetEnum, flightsMap);
  return {totalPrice, lines};
}

export default Adapter;
