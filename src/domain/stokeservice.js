let currentStroke = null;

export function startStroke(points){

  currentStroke={
    points:[points]
  };

}

export function add(point){
  if(!currentStroke) return;
  currentStroke.points.push(point);

}

export function end(){
  if(!currentStroke) return null;
  const finishedStroke=currentStroke;
  currentStroke=null;
  return finishedStroke;
}

export function isActive(){
  return currentStroke!=null;
}