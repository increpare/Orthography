var strokeWidth = 20;
var strokeColor = 'black';
var strokeCap = 'round';
var globalscale=0.3;
var globalstep=[0,0];
var letterCount= 26;

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');


function transform(ar){
    return[globalscale*(ar[0]+globalstep[0]),globalscale*(ar[1]+globalstep[1])];    
}

function getArcPoint(c1,c2,radius,angle){
    return [c1+Math.cos(angle)*radius,c2+Math.sin(angle)*radius];
}

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function drawItem(item) {  


    switch (item[0]) {
        case 'L': {
            for (var i=1;i+1<item.length;i++){
                var item1 = transform(item[i]);                
                var item2 = transform(item[i+1]);                
                context.moveTo(item1[0],item1[1]);             
                context.lineTo(item2[0],item2[1]);
            }
            break;
        }
        case 'A': {
            var arcStart = transform(item[1]);
            var radius = item[2]*globalscale;
            var startAngle = item[3];
            var endAngle = item[4];
            var counterClockwise = item[5];
            var startPos = getArcPoint(arcStart[0],arcStart[1],radius,startAngle);
            context.moveTo(startPos[0],startPos[1]);
            context.arc(arcStart[0],arcStart[1],radius,startAngle,endAngle,counterClockwise);
            break;
        }
        case 'C': {
            item =  JSON.parse(JSON.stringify(item));
            item.shift();
            for (var i=0;i<item.length;i++){
                item[i][0]=transform(item[i][0]);
            }
            context.moveTo(item[0][0][0],item[0][0][1]);
            for (var i=1;i<item.length;i++){
                var start = item[i-1][0];
                var startTangent=item[i-1][2];
                if (startTangent===null){
                    startTangent=[0,0];
                }
                var endTangent=item[i][1];
                if (endTangent===null){
                    endTangent=[0,0];
                }

                var end = item[i][0];
                
                var cp1 = [start[0]+startTangent[0]*globalscale,start[1]+startTangent[1]*globalscale];
                var cp2 = [end[0]+endTangent[0]*globalscale,end[1]+endTangent[1]*globalscale];

                context.bezierCurveTo(cp1[0],cp1[1],cp2[0],cp2[1],end[0],end[1]);
            }
        }
    }
}

function Translate(ar,x,y,scale) {
    if (scale==undefined) {
        scale=1;
    }
    for (var i=1;i<ar.length;i++) {            
        ar[i][0]=ar[i][0]*scale+x;
        ar[i][1]=ar[i][1]*scale+y;
    }
}

var L = 'L';
var A = 'A';
var C = 'C';

var c =10/0.4;
var letterdat = {
    alpha1: {
        ins:[],
        outs:[0,2]
    },
    alpha2: {
        ins:[0,2],
        outs:[]
    },
    alpha3: {
        ins:[2],
        outs:[2]
    },
    alpha4: {
        ins:[0],
        outs:[0]
    },
    c : {
        ins:[],
        outs:[0,2],
        width:50
    },
    dash1 : {
        ins:[2],
        outs:[2],
        width:75,
        high:true,
        lowLeftFree:true,
        lowRightFree:true
    },
    dash2 : {
        ins:[1],
        outs:[1],
        width:75
    },
    dash3 : {
        ins:[0],
        outs:[0],
        width:75,
        low:true,
        highLeftFree:true,
        highRightFree:true
    },
    e1 : {
        ins:[1],
        outs:[0],
        width:75
    },
    e2 : {
        ins:[1],
        outs:[2],
        width:75
    },
    e3 : {
        ins:[2],
        outs:[1],
        width:75
    },
    e4 : {
        ins:[0],
        outs:[1],
        width:75
    },
    h : {
        ins:[2],
        outs:[0],
        blockOut:true,
        lowLeftFree:true
    },
    i1 : {
        ins:[2],
        outs:[0],
        blockIn:true,
        width:75,
        highRightFree:true
    },
    i2 : {
        ins:[2],
        outs:[0],
        highRightFree:true
    },
    j1 : {
        ins:[0],
        outs:[2],
        blockOut:true,
        width:75,
        highLeftFree:true
    },
    j2 : {
        ins:[0],
        outs:[2],
        highLeftFree:true
    },
    m : {
        ins:[0],
        outs:[2],
        highLeftFree:true,
        lowRightFree:true
    },
    n : {
        ins:[2],
        outs:[0],
        highRightFree:true,
        lowLeftFree:true
    },
    o : {
        ins:[2],//uhhhh this isn't right...
        outs:[2],
        blockOut:true,
        blockIn:true
    },
    r1 : {
        ins:[0],
        outs:[2],
        lowRightFree:true
    },
    r2 : {
        ins:[2],
        outs:[0],
        lowLeftFree:true
    },
    s : {
        ins:[0,2],
        outs:[],
        width:50
    },
    t : {
        ins:[0],
        outs:[2],
        blockIn:true,
        lowRightFree:true
    },
    z1 : {
        ins:[2],
        outs:[0]
    },
    z2 : {
        ins:[0],
        outs:[2]
    },
};

var letters = [];
letters["alpha1"]=
    [[C,
        [[100,0],null,[-c,0]],
        [[33.333,100],[c,0],[-c,0]],
        [[0,50],[0,c],[0,-c]],
        [[33.333,0],[-c,0],[c,0]],
        [[100,100],[-c,0],null]
        ]];
letters["alpha2"]=
    [[C,
        [[0,0],null,[c,0]],
        [[66.666,100],[-c,0],[c,0]],
        [[100,50],[0,c],[0,-c]],
        [[66.666,0],[c,0],[-c,0]],
        [[0,100],[c,0],null]
        ]];

letters["alpha3"]=
    [[C,
        [[100,0],null,[-c,0]],
        [[25,66.666],[0,-c],[0,c/2]],
        [[50,100],[-c/2,0],[c/2,0]],
        [[75,66.666],[0,c/2],[0,-c]],
        [[0,0],[c,0],null]
        ]];
letters["alpha4"]=
    [[C,
        [[100,100],null,[-c,0]],
        [[25,33.333],[0,c],[0,-c/2]],
        [[50,0],[-c/2,0],[c/2,0]],
        [[75,33.333],[0,-c/2],[0,c]],
        [[0,100],[c,0],null]
        ]];

var r2=Math.sqrt(2.0);

letters["m"]=[[L,[0,100],[100,0]]];
letters["n"]=[[L,[0,0],[100,100]]];
letters["r1"]=[[A,[100,100],100,1*Math.PI,1.5*Math.PI]];
letters["r2"]=[[A,[0,100],100,1.5*Math.PI,0*Math.PI]];

letters["j1"]=[[L,[75,0],[75,100],[0,100]]];
letters["j2"]=[[A,[0,0],100,0*Math.PI,0.5*Math.PI]];


letters["i1"]=[[L,[0,0],[0,100],[75,100]]];
letters["i2"]=[[A,[100,0],100,0.5*Math.PI,1.0*Math.PI]];


letters["t"]=[[L,[0,100],[0,0],[100,0]]];
letters["h"]=[[L,[0,0],[100,0],[100,100]]];
letters["z1"]=[[L,[0,0],[100,0],[0,100],[100,100]]];
letters["z2"]=[[L,[100,0],[0,0],[100,100],[0,100]]];

letters["s"]=[[A,[0,50],50,1.5*Math.PI,0.5*Math.PI]];
letters["c"]=[[A,[50,50],50,0.5*Math.PI,1.5*Math.PI]];

letters["e1"]=
    [
        [L,[0,50],[50,50]],
        [A,[50,25],25,0.5*Math.PI,1.5*Math.PI,true],        
        [A,[50,50],50,1.5*Math.PI,0.5*Math.PI,true],
        [L,[50,100],[75,100]],
    ];
letters["e2"]=
    [
        [L,[0,50],[50,50]],

        [A,[50,75],25,1.5*Math.PI,0.5*Math.PI],        
        [A,[50,50],50,0.5*Math.PI,1.5*Math.PI],

        [L,[50,0],[75,0]],
    ];
letters["e3"]=
    [
        [L,[0,0],[25,0]],

        [A,[25,50],50,1.5*Math.PI,0.5*Math.PI],        
        [A,[25,75],25,0.5*Math.PI,1.5*Math.PI],

        [L,[25,50],[75,50]],        
    ];
letters["e4"]=
    [
        [L,[0,100],[25,100]],

        [A,[25,50],50,0.5*Math.PI,1.5*Math.PI,true],        
        [A,[25,25],25,1.5*Math.PI,0.5*Math.PI,true],

        [L,[25,50],[75,50]],        
    ];

letters["o"]=
    [
        [A,[50,50],50,0*Math.PI,2.0*Math.PI],        
    ];


letters["dash1"]=[[L,[0,0],[75,0]]];
letters["dash2"]=[[L,[0,50],[75,50]]];
letters["dash3"]=[[L,[0,100],[75,100]]];

var letterNames = Object.keys(letters).sort();
console.log(letterNames);

var realLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var alphabet = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];



function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function ligate(a,b){
    var da=letterdat[a];
    var db=letterdat[b];
    if (da===undefined||db===undefined) {
        return -1;
    }
    var outputBlocked=da["blockOut"]===true;
    var inputBlocked=db["blockIn"]===true;
    if (inputBlocked&&outputBlocked){
        return -1;
    }

    var curmax=-1;
    for (var i=0;i<da.outs.length;i++){
        var output=da.outs[i];
        if (db.ins.indexOf(output)>=0) {
            if (output>curmax){
                curmax=output;
            }
        }
    }
    return curmax;
}

var curLetter=" ";
var prevLetter=" ";

function letterWidth(letter) {
    var dat = letterdat[letter];
    if (dat===undefined) {
        return 100;
    }

    var width = dat.width;
    if (width===undefined){
        width = 100;
    }
    return width;
}


function drawLigature(){
    var ligature = ligate(prevLetter,curLetter);
    if ((curLetter=="n"||curLetter=="m")&&curLetter==prevLetter) {
        globalstep[0]-=50;
    }
    var result=0;
    if(ligature!==-1) {
            var ligatureHeight = 100-50*ligature;
            //var ligature = new Path();
            var startx=-30;
            var endx=0;
            if (prevLetter=="o") {
                startx=-50;
                globalstep[0]-=25;
//                startx=0;
            }
            if (curLetter=="o"){
                endx=50;
                startx=0;
                globalstep[0]-=25;
            }
            var l1 = transform([startx,ligatureHeight]);
            var l2 = transform([endx,ligatureHeight]);
            context.moveTo(l1[0],l1[1]);
            context.lineTo(l2[0],l1[1]);
            result=1;
    } else {        
        prevDat=letterdat[prevLetter];
        curDat=letterdat[curLetter];
        if (curDat!==undefined&&prevDat!==undefined) {
            if ( (prevDat.low&& (curDat.lowLeftFree===true)) ||
                (prevDat.high&& (curDat.highLeftFree===true))||
                (curDat.low&& (prevDat.lowRightFree===true))||
                (curDat.high&& (prevDat.highRightFree===true)))
            {
                globalstep[0]-=50;
            }
        }
    }
    return result;
}

var curMax=0;
var maxAlphabet=alphabet;

var loopCount=300;

function doProcess(minimize){

    for (var i=0;i<loopCount;i++){
        runRound(minimize);
        console.log(curMax +"        ("+i+"/"+loopCount+")" );
    }
    console.log(curMax +"\n"+maxAlphabet );
    alphabet=maxAlphabet.slice();
    console.log("done");
}

function runRound(minimize){
    var oldMaxAlphabet=maxAlphabet.slice();
    var oldMax = curMax;

    curMax=0;
    for (var i=0;i<loopCount;i++){
        shuffle(alphabet);
        var ligCount=ligatureCount(minimize);
        if (ligCount>=curMax) {
            curMax=ligCount;
            maxAlphabet=alphabet.slice();
            descend(oldMax,minimize);
        }
    }
    if (oldMax>=curMax){
        curMax=oldMax;
        maxAlphabet=oldMaxAlphabet;
    }
    alphabet = maxAlphabet.slice();
}

function descend(oldMax,minimize){    
    var modified=true;
    while (modified){
        modified=false;
        for (var i=0;i< letterCount;i++){
            for (var j=i+1;j< letterCount;j++){
                var t = alphabet[i];
                alphabet[i]=alphabet[j];
                alphabet[j]=t;
                var ligCount=ligatureCount(minimize);
                if (ligCount>=curMax){
                    if (ligCount>curMax){                        
                        modified=true;
                    }
                    curMax=ligCount;
                    maxAlphabet=alphabet.slice();                
                } else {
                    alphabet[j]=alphabet[i];
                    alphabet[i]=t;
                }
            }
        }
    }
//    console.log("Global : " + oldMax + " D "+curMax +"\n"+maxAlphabet );    
}

function setString(val){
    clearCanvas();
    val = val.toLowerCase();
    globalstep=[10,10];
    curLetter="";
    prevLetter="";
    context.beginPath();
    var ligCount=0;
    for (var i=0;i<val.length;i++) {
        var index = realLetters.indexOf(val[i]);
        prevLetter=curLetter;
        if (index>=0){
            index=alphabet[index];
            curLetter=letterNames[index];

            ligCount+=drawLigature();
            letters[curLetter].map(drawItem);
        } else {
            curLetter=" ";
        }

        globalstep[0]+=(letterWidth(curLetter)+30);

        if (val[i]==='\n') {
            globalstep[0]=10;
            globalstep[1]+=160;
        } 
    }

    context.lineWidth = strokeWidth*globalscale;
    context.strokeStyle = strokeColor;
    context.lineCap = 'round';
    context.stroke();
    console.log("ligcount = "+ligCount);

}

var ligatureTable=[];
var frequencyTable=[];

function generateLigatureTable(){
    ligatureTable=[];
    for (var i=0;i< letterCount;i++) {
        var row=[];
        var letterI = letterNames[alphabet[i]];
        for (var j=0;j< letterCount;j++) {
            var letterJ = letterNames[alphabet[j]];
            if (ligate(letterI,letterJ)>=0) {
                row.push(1);
            } else {
                row.push(0);
            }
        }
        ligatureTable.push(row);
    }
}

function isLetter(l){
   return realLetters.indexOf(l)>=0;
}
function generateFrequencyTable(){
    frequencyTable=[];
    for (var i=0;i< letterCount;i++) {
        var row=[];
        for (var j=0;j< letterCount;j++) {
            row.push(0);
        }
        frequencyTable.push(row);
    }

    var trainingData=document.getElementById("myID").value.toLowerCase();
    for (var i=0;i<trainingData.length-1;i++) {
        var l1 = trainingData[i];
        var l2 = trainingData[i+1];
        if (isLetter(l1)&&isLetter(l2)) {
            var p1 = realLetters.indexOf(l1);
            var p2 = realLetters.indexOf(l2);
            frequencyTable[p1][p2]++;
        }
    }
}

function ligatureCount(minimize){
    var count=0;
    for (var i=0;i< letterCount;i++){
        var indexI=alphabet[i];
        for (var j=0;j< letterCount;j++){
            var indexJ=alphabet[j];
            if(ligatureTable[indexI][indexJ]===1) {
                count+=frequencyTable[i][j];
            }
        }
    }
    if (minimize){
        return 100000-count;
    } else {
        return count;
    }
}


function regenerateTrainingData(){
    curMax=0;
    alphabet = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
    maxAlphabet=alphabet;
    generateFrequencyTable();
    generateLigatureTable();
    doProcess(false);
    var text = document.getElementById("myID").value.toLowerCase();
    setString(text);
}

function regenerateTrainingDataMin(){
    curMax=0;  
    alphabet = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];  
    maxAlphabet=alphabet;
    generateFrequencyTable();
    generateLigatureTable();
    doProcess(true);
    var text = document.getElementById("myID").value.toLowerCase();
    setString(text);
}
generateFrequencyTable();
generateLigatureTable();
var ttttt = document.getElementById("myID").value.toLowerCase();
setString(ttttt);

