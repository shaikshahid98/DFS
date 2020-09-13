var col,row;
var w=20;
var grid=[];
var stack=[];
var current;
function setup() {
  createCanvas(1000, 1000);
  
  col= floor(width/w);
  row = floor(height/w);
  frameRate(20);
  for(var i=0;i<row;i++){
    for(var j=0;j<col;j++){
        var cell = new Cell(i,j);
        grid.push(cell);
        }
  }
  current=grid[0];
}

function draw() {
  background(255,255,255);
  for(var i=0;i<grid.length;i++){
     grid[i].show();
  }
  current.visited=1;
  current.pos();
  
  var next= current.nkb();
  if(next)
  {
    removewall(current,next);
    stack.push(current);
    current=next;
  }
  else if(stack.length >0)
  {
    current= stack.pop();
  }
  
}
function removewall(a,b)
{
  var x= b.i-a.i;
  var y = b.j-a.j;
  if(x==1) {
    a.wall[1]=0;b.wall[3]=0;
  }
  if(x==-1) {
    a.wall[3]=0;b.wall[1]=0;
  }
  if(y==1) {
    a.wall[2]=0;b.wall[0]=0;
  }
  if(y==-1) {
    a.wall[0]=0;b.wall[2]=0;
  }
}

function ind(i,j)
{
  if(i<0 || j<0 || i > col-1 || j > row-1){ return -1;}
  return j + (i) * col;
}
function Cell(i,j)
{
  this.i=i;
  this.j=j;
  this.visited=false;
  this.wall=[1,1,1,1];
  this.pos= function()
  {
    var x= (this.i) * w;
    var y= (this.j) * w;  
    fill(255, 255, 102);
    rect(x,y,w,w);
  }
  this.nkb= function()
  {
    var nonv=[];
    var top= grid[ind(i,j-1)];
    var right= grid[ind(i+1,j)];
    var bot= grid[ind(i,j+1)];
    var left= grid[ind(i-1,j)];
    if(top && !top.visited) { nonv.push(top);}
    if(right && !right.visited) { nonv.push(right);}
    if(bot && !bot.visited) { nonv.push(bot);}
    if(left && !left.visited) { nonv.push(left);}
    if(nonv.length > 0){
      var t= floor(random(0,nonv.length));
     
      return nonv[t];
    }
    else
    {
        if(this.prev)
        {
          return this.prev;
        }
      else return undefined;
    }
  }
  
  this.show = function()
  {
    var x= (this.i) * w;
    var y= (this.j) * w;   
    stroke(128, 229, 255);
    if(this.wall[0]) {line(x,y,x+w,y);}
    if(this.wall[1]) {line(x+w,y,x+w,y+w);}
    if(this.wall[2]) {line(x+w,y+w,x,y+w);}
    if(this.wall[3]) {line(x,y+w,x,y);}
    if(this.visited)
    {
      noStroke();
      fill(0, 204, 204);
      rect(x,y,w,w);
    }
  }
}