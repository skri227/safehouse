/*
Kalen Plummer
CS 499 Senior Design

Safehouse Real-Time graphics

This file contains all of the set up and funtions for the 3D graphics of safehouse.
It uses javascript and the THREE.js library of graphics functions.
*/

//lots of global variables. This could probably be cleaned up especially by someone with
//a better understandin of javascript or THREE.js

//scene holds all of the elements in 3D space such as geometry, and lights
var scene = new THREE.Scene();

//camera is used to view the screen this sets the field of view, aspect ration, and near and far clipping planes
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

//geometry that is animated or jumps around the screen is set up as global variables because containing each in a function broke
//the textures

//variables to hold the dice
var whiteDice1;
var whiteDice2;
var redDie1;
var redDie2;
var greenDie1;
var greenDie2;


//variables to hold each of the players pieces
var whitePiece;
var redPiece;
var greenPiece;
var pinkPiece;
var bluePiece;
var orangePiece;
var blackPiece;
var purplePiece;
var yellowPiece;

//variable to determine if we should switch between table view and birds eye
var zoomClicked = false;
var zoomCount = 0;

//values of each randomly rolled dice
var dice1Value = 1;
var dice2Value = 1;


//animated Dice Translations holds the value to be translated from the start point at each time step
var xDistance = 0;
var yDistance = 0;
var zDistance = 0;

//variable used to determine if the dice should move
var diceMove = false;

//THREE.js set up variables
var renderer = new THREE.WebGLRenderer({antialias:true});
var container_height = $("#canvas_container").height()
var container_width = $("#canvas_container").width()


//variables used by all the dice in the simple physics calculations
var time = 0;

var xAcceleration = 0;
var yAcceleration = -9.8;
var zAcceleration = 0;

//The velocity vector for the dice to launch when roll is clicked
var xVelocity = 2.5;
var yVelocity = 5;
var zVelocity = .5;

//turn or battle variables
//Used to determine which die should be rolled based on the state of the game
var turn = false;
var battleAttack = false;
var battleAttackSpecial = false;
var battleDefense = false;
var battleDefenseSpecial = false;






/************Setup For all movable pieces of geometry in the scene**********/

//Each dice contains 6 textures on for each face that are applied to each side of the cube
//WhiteDice
//Dice1
THREE.ImageUtils.crossOrigin = '';
var dieOneGeo = new THREE.BoxGeometry(.1,.1,.1 );
var whiteDiceTex1 = THREE.ImageUtils.loadTexture('http://i.imgur.com/M0fHn0d.jpg');
var whiteDiceMat1 = new THREE.MeshBasicMaterial({ map: whiteDiceTex1} );
var whiteDiceTex2 = THREE.ImageUtils.loadTexture('http://i.imgur.com/k2I1BrJ.jpg');
var whiteDiceMat2 = new THREE.MeshBasicMaterial({ map: whiteDiceTex2} );
var whiteDiceTex3 = THREE.ImageUtils.loadTexture('http://i.imgur.com/YRotS1g.jpg');
var whiteDiceMat3 = new THREE.MeshBasicMaterial({ map: whiteDiceTex3} );
var whiteDiceTex4 = THREE.ImageUtils.loadTexture('http://i.imgur.com/Yj3wNqE.jpg');
var whiteDiceMat4 = new THREE.MeshBasicMaterial({ map: whiteDiceTex4} );
var whiteDiceTex5 = THREE.ImageUtils.loadTexture('http://i.imgur.com/Gv0vVKJ.jpg');
var whiteDiceMat5 = new THREE.MeshBasicMaterial({ map: whiteDiceTex5} );
var whiteDiceTex6 = THREE.ImageUtils.loadTexture('http://i.imgur.com/rp3a8EV.jpg');
var whiteDiceMat6 = new THREE.MeshBasicMaterial({ map: whiteDiceTex6} );
var whiteDieFaces = [whiteDiceMat1, whiteDiceMat2, whiteDiceMat3, whiteDiceMat4, whiteDiceMat5, whiteDiceMat6];
var whiteDieFaceMat = new THREE.MeshFaceMaterial(whiteDieFaces);
whiteDice1 = new THREE.Mesh( dieOneGeo, whiteDieFaceMat );
whiteDice1.position.set(-2.8,.11,-.55);
scene.add( whiteDice1 );

//Dice 2
var dieTwoGeo = new THREE.BoxGeometry(.1,.1,.1 );
whiteDice2 = new THREE.Mesh( dieTwoGeo, whiteDieFaceMat );
whiteDice2.position.set(-2.8,.11,-.35);
scene.add( whiteDice2 );

//RedDice
//Dice1
var dieOneGeo = new THREE.BoxGeometry(.1,.1,.1 );
var redDieTex1 = THREE.ImageUtils.loadTexture('http://i.imgur.com/JGbogEh.jpg');
var redDieMat1 = new THREE.MeshBasicMaterial({ map: redDieTex1} );
var redDieTex2 = THREE.ImageUtils.loadTexture('http://i.imgur.com/VCtxju0.jpg');
var redDieMat2 = new THREE.MeshBasicMaterial({ map: redDieTex2} );
var redDieTex3 = THREE.ImageUtils.loadTexture('http://i.imgur.com/ndYww28.jpg');
var redDieMat3 = new THREE.MeshBasicMaterial({ map: redDieTex3} );
var redDieTex4 = THREE.ImageUtils.loadTexture('http://i.imgur.com/tWFysZQ.jpg');
var redDieMat4 = new THREE.MeshBasicMaterial({ map: redDieTex4} );
var redDieTex5 = THREE.ImageUtils.loadTexture('http://i.imgur.com/CDa5BhW.jpg');
var redDieMat5 = new THREE.MeshBasicMaterial({ map: redDieTex5} );
var redDieTex6 = THREE.ImageUtils.loadTexture('http://i.imgur.com/PSFwRUs.jpg');
var redDieMat6 = new THREE.MeshBasicMaterial({ map: redDieTex6} );
var redDieFaces = [redDieMat1, redDieMat2, redDieMat3, redDieMat4, redDieMat5, redDieMat6];
var redDieFaceMat = new THREE.MeshFaceMaterial(redDieFaces);
redDice1 = new THREE.Mesh( dieOneGeo, redDieFaceMat );
redDice1.position.set(-3,.11,-.55);
scene.add( redDice1 );

//Dice2
var dieTwoGeo = new THREE.BoxGeometry(.1,.1,.1 );
redDice2 = new THREE.Mesh( dieTwoGeo, redDieFaceMat );
redDice2.position.set(-3,.11,-.35);
scene.add( redDice2 );

//GreenDice
//Dice1
var dieOneGeo = new THREE.BoxGeometry(.1,.1,.1 );
var greenDieTex1 = THREE.ImageUtils.loadTexture('http://i.imgur.com/X4IoCaR.jpg');
var greenDieMat1 = new THREE.MeshBasicMaterial({ map: greenDieTex1} );
var greenDieTex2 = THREE.ImageUtils.loadTexture('http://i.imgur.com/PtHWvM9.jpg');
var greenDieMat2 = new THREE.MeshBasicMaterial({ map: greenDieTex2} );
var greenDieTex3 = THREE.ImageUtils.loadTexture('http://i.imgur.com/5FxLvgV.jpg');
var greenDieMat3 = new THREE.MeshBasicMaterial({ map: greenDieTex3} );
var greenDieTex4 = THREE.ImageUtils.loadTexture('http://i.imgur.com/EBzWtDo.jpg');
var greenDieMat4 = new THREE.MeshBasicMaterial({ map: greenDieTex4} );
var greenDieTex5 = THREE.ImageUtils.loadTexture('http://i.imgur.com/MsCLAg2.jpg');
var greenDieMat5 = new THREE.MeshBasicMaterial({ map: greenDieTex5} );
var greenDieTex6 = THREE.ImageUtils.loadTexture('http://i.imgur.com/fJvJXGy.jpg');
var greenDieMat6 = new THREE.MeshBasicMaterial({ map: greenDieTex6} );
var greenDieFaces = [greenDieMat1, greenDieMat2, greenDieMat3, greenDieMat4, greenDieMat5, greenDieMat6];
var greenDieFaceMat = new THREE.MeshFaceMaterial(greenDieFaces);
greenDice1 = new THREE.Mesh( dieOneGeo, greenDieFaceMat );
greenDice1.position.set(-3.2,.11,-.55);
scene.add( greenDice1 );

//Dice2
var dieTwoGeo = new THREE.BoxGeometry(.1,.1,.1 );
greenDice2 = new THREE.Mesh( dieTwoGeo, greenDieFaceMat );
greenDice2.position.set(-3.2,.11,-.35);
scene.add( greenDice2 );



//player and damage pieces are just a color so they don't need any textures applied

//Player Piece and damage piece setup
//whitePiece
var whiteGeo = new THREE.BoxGeometry(.1,.2,.1);
var whiteMat = new THREE.MeshPhongMaterial({color: 0xffffff});
whitePiece = new THREE.Mesh(whiteGeo, whiteMat);
whitePiece.position.set(-2.8,.11,-.1);
scene.add(whitePiece);

//white damage piece
var whiteDamage = new THREE.BoxGeometry(.05,.05,.05);
var whiteDamagePiece = new THREE.Mesh(whiteDamage, whiteMat);
whiteDamagePiece.position.set(-2.8,.11,.7);
scene.add(whiteDamagePiece);

//yellow piece
var yellowGeo = new THREE.BoxGeometry(.1,.2,.1);
var yellowMat = new THREE.MeshPhongMaterial({color: 0xffff00});
yellowPiece = new THREE.Mesh(yellowGeo, yellowMat);
yellowPiece.position.set(-2.8,.11,.1);
scene.add(yellowPiece);

//yellow damage piece
var yellowDamage = new THREE.BoxGeometry(.05,.05,.05);
var yellowDamagePiece = new THREE.Mesh(yellowDamage, yellowMat);
yellowDamagePiece.position.set(-2.8,.11,.8);
scene.add(yellowDamagePiece);

//orange piece
var orangeGeo = new THREE.BoxGeometry(.1,.2,.1);
var orangeMat = new THREE.MeshPhongMaterial({color: 0xee7600});
orangePiece = new THREE.Mesh(orangeGeo, orangeMat);
orangePiece.position.set(-2.8,.11,.3);
scene.add(orangePiece);

//orange damage piece
var orangeDamage = new THREE.BoxGeometry(.05,.05,.05);
var orangeDamagePiece = new THREE.Mesh(orangeDamage, orangeMat);
orangeDamagePiece.position.set(-2.8,.11,.9);
scene.add(orangeDamagePiece);

//green piece
var greenGeo = new THREE.BoxGeometry(.1,.2,.1);
var greenMat = new THREE.MeshPhongMaterial({color: 0x00ff00});
greenPiece = new THREE.Mesh(greenGeo, greenMat);
greenPiece.position.set(-3,.11,-.1);
scene.add(greenPiece);

//green damage piece
var greenDamage = new THREE.BoxGeometry(.05,.05,.05);
var greenDamagePiece = new THREE.Mesh(greenDamage, greenMat);
greenDamagePiece.position.set(-2.9,.11,.7);
scene.add(greenDamagePiece);

//blue piece
var blueGeo = new THREE.BoxGeometry(.1,.2,.1);
var blueMat = new THREE.MeshPhongMaterial({color: 0x0000ff});
bluePiece = new THREE.Mesh(blueGeo, blueMat);
bluePiece.position.set(-3,.11,.3);
scene.add(bluePiece);

//blue damage piece
var blueDamage = new THREE.BoxGeometry(.05,.05,.05);
var blueDamagePiece = new THREE.Mesh(blueDamage, blueMat);
blueDamagePiece.position.set(-2.9,.11,.9);
scene.add(blueDamagePiece);


//black piece
var blackGeo = new THREE.BoxGeometry(.1,.2,.1);
var blackMat = new THREE.MeshPhongMaterial({color: 0x111111});
blackPiece = new THREE.Mesh(blackGeo, blackMat);
blackPiece.position.set(-3.2,.11,-.1);
scene.add(blackPiece);

//black damage piece
var blackDamage = new THREE.BoxGeometry(.05,.05,.05);
var blackDamagePiece = new THREE.Mesh(blackDamage, blackMat);
blackDamagePiece.position.set(-3,.11,.7);
scene.add(blackDamagePiece);

//red piece
var redGeo = new THREE.BoxGeometry(.1,.2,.1);
var redMat = new THREE.MeshPhongMaterial({color: 0xff0000});
redPiece = new THREE.Mesh(redGeo, redMat);
redPiece.position.set(-3.2,.11,.1);
scene.add(redPiece);

//red damage piece
var redDamage = new THREE.BoxGeometry(.05,.05,.05);
var redDamagePiece = new THREE.Mesh(redDamage, redMat);
redDamagePiece.position.set(-3,.11,.8);
scene.add(redDamagePiece);

//purple piece
var purpleGeo = new THREE.BoxGeometry(.1,.2,.1);
var purpleMat = new THREE.MeshPhongMaterial({color: 0x9b30ff});
purplePiece = new THREE.Mesh(purpleGeo, purpleMat);
purplePiece.position.set(-3.2,.11,.3);
scene.add(purplePiece);

//purple damage piece
var purpleDamage = new THREE.BoxGeometry(.05,.05,.05);
var purpleDamagePiece = new THREE.Mesh(purpleDamage, purpleMat);
purpleDamagePiece.position.set(-3,.11,.9);
scene.add(purpleDamagePiece);

//color of the player who's turn it is
var playerColor = "red";

//variable to hold the value of specific types of dice rolls
//attack and defense don't have one because they are one dice so we just use that specific value
var turnValue = 0;
var attackSpecial = 0;
var defenseSpecial = 0;


canvas_init();
animate();


//draw functions for each stationary element in the scene
//stationary elements don't break textures put into functions so this cleans up the code quite a bit
function drawTable(){
	//tableTop backgroun
	var tableTopGeo = new THREE.BoxGeometry( 7.5, .1, 3 );
	THREE.ImageUtils.crossOrigin = '';
	var tableTopTex = THREE.ImageUtils.loadTexture('http://i.imgur.com/CQYuOYb.jpg');
	var tableTopMat = new THREE.MeshPhongMaterial({ map: tableTopTex} );
	var tableTop = new THREE.Mesh( tableTopGeo, tableTopMat );
	scene.add( tableTop );


	//left front leg
	var lfGeo = new THREE.BoxGeometry( .15, 2.25, .15 );
	var lfMat = new THREE.MeshBasicMaterial( { map: tableTopTex} );
	var leftFrontLeg = new THREE.Mesh( lfGeo, lfMat );
	leftFrontLeg.position.set(-3.2,-1.15,1.2);
	scene.add( leftFrontLeg );

	//right front leg
	var rfGeo = new THREE.BoxGeometry( .15, 2.25, .15 );
	var rfMat = new THREE.MeshBasicMaterial( { map: tableTopTex} );
	var rightFrontLeg = new THREE.Mesh( rfGeo, rfMat );
	rightFrontLeg.position.set(3.2,-1.15,1.2);
	scene.add( rightFrontLeg );
}

function drawRoom(){
	//Back Wall
	THREE.ImageUtils.crossOrigin = '';
	var dryWallTex = THREE.ImageUtils.loadTexture('http://i.imgur.com/61kc95T.jpg');
	var bWall = new THREE.PlaneGeometry( 20,20 );
	var bWallMat = new THREE.MeshBasicMaterial( { map: dryWallTex } );
	var backWall = new THREE.Mesh( bWall, bWallMat );
	backWall.position.set(0,0,-10);
	scene.add( backWall );

	//leftWall
	var lWall = new THREE.PlaneGeometry( 20,20 );
	var lWallMat = new THREE.MeshBasicMaterial( { map: dryWallTex } );
	var leftWall = new THREE.Mesh( lWall, lWallMat );
	leftWall.rotation.y = (90 * Math.PI/180);
	leftWall.position.set(-10,0,0);
	scene.add( leftWall );

	//rightWall
	var rWall = new THREE.PlaneGeometry( 20,20 );
	var rWallMat = new THREE.MeshBasicMaterial( { map: dryWallTex } );
	var rightWall = new THREE.Mesh( rWall, rWallMat );
	rightWall.rotation.y = (-90 * Math.PI/180);
	rightWall.position.set(10,0,0);
	scene.add( rightWall );

	//Floor
	THREE.ImageUtils.crossOrigin = '';
	var woodFloorTex = THREE.ImageUtils.loadTexture('http://i.imgur.com/tU4j1v8.jpg');
	var fPlane = new THREE.PlaneGeometry( 20,20 );
	var fPlaneMat = new THREE.MeshBasicMaterial( { map: woodFloorTex } );
	var floor = new THREE.Mesh( fPlane, fPlaneMat );
	floor.rotation.x = (-90 * Math.PI/180);
	floor.position.set(0,-2,0);
	scene.add( floor );

}

function drawBoard(){
	//board - map
	var boardMesh = new THREE.PlaneGeometry(5,2); //5 wide, 2 tall
	THREE.ImageUtils.crossOrigin = '';
	var mapOverlay = THREE.ImageUtils.loadTexture('http://i.imgur.com/Wbbp6xN.jpg');
	var boardMaterial = new THREE.MeshBasicMaterial({map: mapOverlay})
	var board = new THREE.Mesh(boardMesh,boardMaterial);
	board.rotation.x = (-90*Math.PI/180);
	board.position.set(0,.08,.25);
	scene.add(board);
}


//initialize the canvas that everything is drawen on
function canvas_init(){

	container_height = $("#canvas_container").height()
	container_width = $("#canvas_container").width()
	renderer.setSize( container_width, container_height );
	document.getElementById("canvas_container").appendChild( renderer.domElement );

	//set where the camera is in 3D space
	camera.position.set(-.5,2.5,4.5);
	//tell the camera what point to look at in the scene
	camera.lookAt(new THREE.Vector3(-.5,0,0));

	//directional lighting
	var directionalLight = new THREE.DirectionalLight(0xc0c0c0);
	directionalLight.position.set(0,7,2).normalize();
	scene.add(directionalLight);

	//ambient lighting
	//var ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
	//scene.add( ambientLight );

	//draw all stationary elements from functions above
	drawRoom();
	drawTable();
	drawBoard();

	//set the scene so that it starts at birds eye point of view because the camera was initialized
	//so that it started in the 3D view
	scene.rotation.x = (50*Math.PI/180);


}


//function describes how to move every object that has animation in the scene
function animate(){

	//moves the entire scene and camera so that we can see both a birds eye view and a regular table view
	//start at birds eye
	if(zoomClicked){
		if((scene.rotation.x < (50*Math.PI/180))&&(zoomCount%2==0)){
			scene.rotation.x = scene.rotation.x+.005;
			camera.position.y = camera.position.y-.005;
			camera.position.z = camera.position.z-.005;
		}
		//rotate to table top
		if((scene.rotation.x > 0)&&(zoomCount%2==1)){
			scene.rotation.x = scene.rotation.x-.005;
			camera.position.y = camera.position.y+.005;
			camera.position.z = camera.position.z+.005;
		}

	}


	//from here down is how to move each dice
	//dice only move if told to do so
	if(diceMove){
		//simple physics calculations so that the dice move with the correct trajectory and speed
		//xDistance = xVelocity*(time/100) + .5*xAcceleration*Math.pow((time/100), 2);
		yDistance = yVelocity*(time/75)+ .375*yAcceleration*Math.pow((time/75), 2);
		//zDistance = zVelocity*(time/100) + .5*zAcceleration*Math.pow((time/100), 2);


		//white dice are only ever moved used on a turn roll
		//this determines when the dice should stop moving after the have begun animation
		if(turn){
			if(whiteDice1.position.y <= .25 && time > 100){
				//console.log(dice1Value +", " + dice2Value);
				diceMove = false;
			}
		}



		//tells the white dice how to move
		if(turn){

			//translations based on physics calculations from above
			whiteDice1.position.x = whiteDice1.position.x + xDistance*.01;
			whiteDice1.position.y = whiteDice1.position.y + yDistance*.01;
			whiteDice1.position.z = whiteDice1.position.z + zDistance*.01;

			whiteDice2.position.x = whiteDice2.position.x + xDistance*.01;
			whiteDice2.position.y = whiteDice2.position.y + yDistance*.01;
			whiteDice2.position.z = whiteDice2.position.z + zDistance*.01;


			//each value generated by the random number generator has a specific rotation to make sure the 3D dice
			//lands on the correct number
			//since 2 dice are rolled it has to be done once for each dice
			if(dice1Value == 1){
				if(whiteDice1.rotation.y < 630*Math.PI/180){
					whiteDice1.rotation.y = whiteDice1.rotation.y + .08;
					whiteDice1.rotation.x = whiteDice1.rotation.x + .08;
				}
			}

			if(dice2Value == 1){
				if(whiteDice2.rotation.y < 630*Math.PI/180){
					whiteDice2.rotation.y = whiteDice2.rotation.y + .08;
					whiteDice2.rotation.x = whiteDice2.rotation.x + .08;
				}
			}

			if(dice1Value == 2){
				if(whiteDice1.rotation.z < 630*Math.PI/180){
					whiteDice1.rotation.y = whiteDice1.rotation.y + .08;
					whiteDice1.rotation.z = whiteDice1.rotation.z + .08;
				}
			}

			if(dice2Value == 2){
				if(whiteDice2.rotation.z < 630*Math.PI/180){
					whiteDice2.rotation.y = whiteDice2.rotation.y + .08;
					whiteDice2.rotation.z = whiteDice2.rotation.z + .08;
				}
			}

			if(dice1Value == 3){
				if(whiteDice1.rotation.z < 720*Math.PI/180){
					whiteDice1.rotation.z = whiteDice1.rotation.z + .1;
					whiteDice1.rotation.x = whiteDice1.rotation.x + .1;
				}
			}

			if(dice2Value == 3){
				if(whiteDice2.rotation.z < 720*Math.PI/180){
					whiteDice2.rotation.z = whiteDice2.rotation.z + .1;
					whiteDice2.rotation.x = whiteDice2.rotation.x + .1;
				}
			}

			if(dice1Value == 4){
				if(whiteDice1.rotation.y < 900*Math.PI/180){
					whiteDice1.rotation.y = whiteDice1.rotation.y + .12;
					whiteDice1.rotation.x = whiteDice1.rotation.x + .12;
				}
			}

			if(dice2Value == 4){
				if(whiteDice2.rotation.y < 900*Math.PI/180){
					whiteDice2.rotation.y = whiteDice2.rotation.y + .12;
					whiteDice2.rotation.x = whiteDice2.rotation.x + .12;
				}
			}

			if(dice1Value == 5){
				if(whiteDice1.rotation.z < 630*Math.PI/180){
					whiteDice1.rotation.z = whiteDice1.rotation.z + .08;
					whiteDice1.rotation.x = whiteDice1.rotation.x + .08;
				}
			}
			if(dice2Value == 5){
				if(whiteDice2.rotation.z < 630*Math.PI/180){
					whiteDice2.rotation.z = whiteDice2.rotation.z + .08;
					whiteDice2.rotation.x = whiteDice2.rotation.x + .08;
				}
			}

			if(dice1Value == 6){
				if(whiteDice1.rotation.z < 810*Math.PI/180){
					whiteDice1.rotation.z = whiteDice1.rotation.z + .1;
					whiteDice1.rotation.x = whiteDice1.rotation.x + .1;
				}
			}

			if(dice2Value == 6){
				if(whiteDice2.rotation.z < 810*Math.PI/180){
					whiteDice2.rotation.z = whiteDice2.rotation.z + .1;
					whiteDice2.rotation.x = whiteDice2.rotation.x + .1;
				}
			}

		}



		//from here on out is the same as above except for the color and number of dice moved
		if(battleDefenseSpecial){
			if(greenDice1.position.y <= .25 && time > 100){

				diceMove = false;
			}
		}




		if(battleDefenseSpecial){
			greenDice1.position.x = greenDice1.position.x + xDistance*.01;
			greenDice1.position.y = greenDice1.position.y + yDistance*.01;
			greenDice1.position.z = greenDice1.position.z + zDistance*.01;

			greenDice2.position.x = greenDice2.position.x + xDistance*.01;
			greenDice2.position.y = greenDice2.position.y + yDistance*.01;
			greenDice2.position.z = greenDice2.position.z + zDistance*.01;


			if(dice1Value == 1){
				if(greenDice1.rotation.y < 630*Math.PI/180){
					greenDice1.rotation.y = greenDice1.rotation.y + .08;
					greenDice1.rotation.x = greenDice1.rotation.x + .08;
				}
			}


			if(dice2Value == 1){
				if(greenDice2.rotation.y < 630*Math.PI/180){
					greenDice2.rotation.y = greenDice2.rotation.y + .08;
					greenDice2.rotation.x = greenDice2.rotation.x + .08;
				}
			}

			if(dice1Value == 2){
				if(greenDice1.rotation.z < 630*Math.PI/180){
					greenDice1.rotation.y = greenDice1.rotation.y + .08;
					greenDice1.rotation.z = greenDice1.rotation.z + .08;
				}
			}


			if(dice2Value == 2){
				if(greenDice2.rotation.z < 630*Math.PI/180){
					greenDice2.rotation.y = greenDice2.rotation.y + .08;
					greenDice2.rotation.z = greenDice2.rotation.z + .08;
				}
			}

			if(dice1Value == 3){
				if(greenDice1.rotation.z < 720*Math.PI/180){
					greenDice1.rotation.z = greenDice1.rotation.z + .1;
					greenDice1.rotation.x = greenDice1.rotation.x + .1;
				}
			}

			if(dice2Value == 3){
				if(greenDice2.rotation.z < 720*Math.PI/180){
					greenDice2.rotation.z = greenDice2.rotation.z + .1;
					greenDice2.rotation.x = greenDice2.rotation.x + .1;
				}
			}

			if(dice1Value == 4){
				if(greenDice1.rotation.y < 900*Math.PI/180){
					greenDice1.rotation.y = greenDice1.rotation.y + .12;
					greenDice1.rotation.x = greenDice1.rotation.x + .12;
				}
			}

			if(dice2Value == 4){
				if(greenDice2.rotation.y < 900*Math.PI/180){
					greenDice2.rotation.y = greenDice2.rotation.y + .12;
					greenDice2.rotation.x = greenDice2.rotation.x + .12;
				}
			}

			if(dice1Value == 5){
				if(greenDice1.rotation.z < 630*Math.PI/180){
					greenDice1.rotation.z = greenDice1.rotation.z + .08;
					greenDice1.rotation.x = greenDice1.rotation.x + .08;
				}
			}
			if(dice2Value == 5){
				if(greenDice2.rotation.z < 630*Math.PI/180){
					greenDice2.rotation.z = greenDice2.rotation.z + .08;
					greenDice2.rotation.x = greenDice2.rotation.x + .08;
				}
			}

			if(dice1Value == 6){
				if(greenDice1.rotation.z < 810*Math.PI/180){
					greenDice1.rotation.z = greenDice1.rotation.z + .1;
					greenDice1.rotation.x = greenDice1.rotation.x + .1;
				}
			}

			if(dice2Value == 6){
				if(greenDice2.rotation.z < 810*Math.PI/180){
					greenDice2.rotation.z = greenDice2.rotation.z + .1;
					greenDice2.rotation.x = greenDice2.rotation.x + .1;
				}
			}

		}


		if(battleAttackSpecial){
			if(redDice1.position.y <= .25 && time > 100){

				diceMove = false;
			}
		}




		if(battleAttackSpecial){
			redDice1.position.x = redDice1.position.x + xDistance*.01;
			redDice1.position.y = redDice1.position.y + yDistance*.01;
			redDice1.position.z = redDice1.position.z + zDistance*.01;

			redDice2.position.x = redDice2.position.x + xDistance*.01;
			redDice2.position.y = redDice2.position.y + yDistance*.01;
			redDice2.position.z = redDice2.position.z + zDistance*.01;


			if(dice1Value == 1){
				if(redDice1.rotation.y < 630*Math.PI/180){
					redDice1.rotation.y = redDice1.rotation.y + .08;
					redDice1.rotation.x = redDice1.rotation.x + .08;
				}
			}


			if(dice2Value == 1){
				if(redDice2.rotation.y < 630*Math.PI/180){
					redDice2.rotation.y = redDice2.rotation.y + .08;
					redDice2.rotation.x = redDice2.rotation.x + .08;
				}
			}

			if(dice1Value == 2){
				if(redDice1.rotation.z < 630*Math.PI/180){
					redDice1.rotation.y = redDice1.rotation.y + .08;
					redDice1.rotation.z = redDice1.rotation.z + .08;
				}
			}


			if(dice2Value == 2){
				if(redDice2.rotation.z < 630*Math.PI/180){
					redDice2.rotation.y = redDice2.rotation.y + .08;
					redDice2.rotation.z = redDice2.rotation.z + .08;
				}
			}

			if(dice1Value == 3){
				if(redDice1.rotation.z < 720*Math.PI/180){
					redDice1.rotation.z = redDice1.rotation.z + .1;
					redDice1.rotation.x = redDice1.rotation.x + .1;
				}
			}

			if(dice2Value == 3){
				if(redDice2.rotation.z < 720*Math.PI/180){
					redDice2.rotation.z = redDice2.rotation.z + .1;
					redDice2.rotation.x = redDice2.rotation.x + .1;
				}
			}

			if(dice1Value == 4){
				if(redDice1.rotation.y < 900*Math.PI/180){
					redDice1.rotation.y = redDice1.rotation.y + .12;
					redDice1.rotation.x = redDice1.rotation.x + .12;
				}
			}

			if(dice2Value == 4){
				if(redDice2.rotation.y < 900*Math.PI/180){
					redDice2.rotation.y = redDice2.rotation.y + .12;
					redDice2.rotation.x = redDice2.rotation.x + .12;
				}
			}

			if(dice1Value == 5){
				if(redDice1.rotation.z < 630*Math.PI/180){
					redDice1.rotation.z = redDice1.rotation.z + .08;
					redDice1.rotation.x = redDice1.rotation.x + .08;
				}
			}
			if(dice2Value == 5){
				if(redDice2.rotation.z < 630*Math.PI/180){
					redDice2.rotation.z = redDice2.rotation.z + .08;
					redDice2.rotation.x = redDice2.rotation.x + .08;
				}
			}

			if(dice1Value == 6){
				if(redDice1.rotation.z < 810*Math.PI/180){
					redDice1.rotation.z = redDice1.rotation.z + .1;
					redDice1.rotation.x = redDice1.rotation.x + .1;
				}
			}

			if(dice2Value == 6){
				if(redDice2.rotation.z < 810*Math.PI/180){
					redDice2.rotation.z = redDice2.rotation.z + .1;
					redDice2.rotation.x = redDice2.rotation.x + .1;
				}
			}

		}


		if(battleAttack){
			if(redDice1.position.y <= .25 && time > 100){

				diceMove = false;
			}
		}




		if(battleAttack){
			redDice1.position.x = redDice1.position.x + xDistance*.01;
			redDice1.position.y = redDice1.position.y + yDistance*.01;
			redDice1.position.z = redDice1.position.z + zDistance*.01;



			if(dice1Value == 1){
				if(redDice1.rotation.y < 630*Math.PI/180){
					redDice1.rotation.y = redDice1.rotation.y + .08;
					redDice1.rotation.x = redDice1.rotation.x + .08;
				}
			}



			if(dice1Value == 2){
				if(redDice1.rotation.z < 630*Math.PI/180){
					redDice1.rotation.y = redDice1.rotation.y + .08;
					redDice1.rotation.z = redDice1.rotation.z + .08;
				}
			}




			if(dice1Value == 3){
				if(redDice1.rotation.z < 720*Math.PI/180){
					redDice1.rotation.z = redDice1.rotation.z + .1;
					redDice1.rotation.x = redDice1.rotation.x + .1;
				}
			}



			if(dice1Value == 4){
				if(redDice1.rotation.y < 900*Math.PI/180){
					redDice1.rotation.y = redDice1.rotation.y + .12;
					redDice1.rotation.x = redDice1.rotation.x + .12;
				}
			}



			if(dice1Value == 5){
				if(redDice1.rotation.z < 630*Math.PI/180){
					redDice1.rotation.z = redDice1.rotation.z + .08;
					redDice1.rotation.x = redDice1.rotation.x + .08;
				}
			}


			if(dice1Value == 6){
				if(redDice1.rotation.z < 810*Math.PI/180){
					redDice1.rotation.z = redDice1.rotation.z + .1;
					redDice1.rotation.x = redDice1.rotation.x + .1;
				}
			}


		}




		if(battleDefense){
			if(greenDice1.position.y <= .25 && time > 100){

				diceMove = false;
			}
		}




		if(battleDefense){
			greenDice1.position.x = greenDice1.position.x + xDistance*.01;
			greenDice1.position.y = greenDice1.position.y + yDistance*.01;
			greenDice1.position.z = greenDice1.position.z + zDistance*.01;



			if(dice1Value == 1){
				if(greenDice1.rotation.y < 630*Math.PI/180){
					greenDice1.rotation.y = greenDice1.rotation.y + .08;
					greenDice1.rotation.x = greenDice1.rotation.x + .08;
				}
			}



			if(dice1Value == 2){
				if(greenDice1.rotation.z < 630*Math.PI/180){
					greenDice1.rotation.y = greenDice1.rotation.y + .08;
					greenDice1.rotation.z = greenDice1.rotation.z + .08;
				}
			}




			if(dice1Value == 3){
				if(greenDice1.rotation.z < 720*Math.PI/180){
					greenDice1.rotation.z = greenDice1.rotation.z + .1;
					greenDice1.rotation.x = greenDice1.rotation.x + .1;
				}
			}



			if(dice1Value == 4){
				if(greenDice1.rotation.y < 900*Math.PI/180){
					greenDice1.rotation.y = greenDice1.rotation.y + .12;
					greenDice1.rotation.x = greenDice1.rotation.x + .12;
				}
			}



			if(dice1Value == 5){
				if(greenDice1.rotation.z < 630*Math.PI/180){
					greenDice1.rotation.z = greenDice1.rotation.z + .08;
					greenDice1.rotation.x = greenDice1.rotation.x + .08;
				}
			}


			if(dice1Value == 6){
				if(greenDice1.rotation.z < 810*Math.PI/180){
					greenDice1.rotation.z = greenDice1.rotation.z + .1;
					greenDice1.rotation.x = greenDice1.rotation.x + .1;
				}
			}


		}






	}


	//after the dice animation this pauses them for about 3 seconds to allow the user to see what was rolled before resetting
	//back to the default position for the next roll
	if(time >= 300){
		if(whiteDice1.rotation.x > 0 || whiteDice1.rotation.y > 0 || whiteDice1.rotation.z > 0){
			movePiece(playerColor);
		}

		whiteDice1.position.set(-2.8,.11,-.55);
		whiteDice2.position.set(-2.8,.11,-.35);
		redDice1.position.set(-3,.11,-.55);
		greenDice1.position.set(-3.2,.11,-.55);
		greenDice2.position.set(-3.2,.11,-.35);
		redDice2.position.set(-3,.11,-.35);

		whiteDice1.rotation.x = 0;
		whiteDice1.rotation.y = 0;
		whiteDice1.rotation.z = 0;
		whiteDice2.rotation.x = 0;
		whiteDice2.rotation.y = 0;
		whiteDice2.rotation.z = 0;

		greenDice1.rotation.x = 0;
		greenDice1.rotation.y = 0;
		greenDice1.rotation.z = 0;
		greenDice2.rotation.x = 0;
		greenDice2.rotation.y = 0;
		greenDice2.rotation.z = 0;

		redDice1.rotation.x = 0;
		redDice1.rotation.y = 0;
		redDice1.rotation.z = 0;
		redDice2.rotation.x = 0;
		redDice2.rotation.y = 0;
		redDice2.rotation.z = 0;

		turn = false;
		battleAttack = false;
		battleDefense = false;
		battleAttackSpecial = false;
		battleDefenseSpecial = false;
	}

	//increments the time variable so that appropriate calculations can made
	time++;
	//once all of the calculations are stored in the frame buffer the scene is rendered to the screne
	render();
	//a new frame is requested for the next calculations
	requestAnimationFrame(animate);

}

//renders the current frame
function render(){

	renderer.render(scene, camera);
}

//increments the counter so the scene can move between birds eye and table
function move_screen()
{
	zoomClicked = true;
	zoomCount++;

}

/**************************************************************************IMPORTANT FOR ZACH AND KAMERON********************************************************/
/*rolls the white dice
call this everytime it is a new players turn
pass it the color of the current player to move the appropriate player piece
the value of the dice roll for calculations is stored in the variable turnValue
*/

function rollWhiteDice(color){
	playerColor = color;

	turn = true;

	//playerColor = "blue";


	dice1Value = Math.floor(Math.random()*(6-1+1))+1;
	dice2Value = Math.floor(Math.random()*(6-1+1))+1;


	turnValue = dice1Value + dice2Value;

	time = 0;
	diceMove = true;
}

/****************************************************************************IMPORTANT FOR ZACH AND KAMERON********************************************************/
/*rolls Two green dice
use this for defense special attacks where 2 dice are needed
the value of the dice roll for calculations is stored in the variable defenseSpecial
*/
function rollTwoGreenDice(){

	battleDefenseSpecial = true;

	//playerColor = "blue";
	//turnTest(turnTestCounter);
	//turnTestCounter++;


	dice1Value = Math.floor(Math.random()*(6-1+1))+1;
	dice2Value = Math.floor(Math.random()*(6-1+1))+1;




	defenseSpecial = dice1Value + dice2Value;


	time = 0;
	diceMove = true;
}


/****************************************************************************IMPORTANT FOR ZACH AND KAMERON********************************************************/
/*rolls Two red dice
use this for attack special attacks where 2 dice are needed
the value of the dice roll for calculations is stored in the variable attackSpecial
*/
function rollTwoRedDice(){

	battleAttackSpecial = true;

	//playerColor = "blue";
	//turnTest(turnTestCounter);
	//turnTestCounter++;


	dice1Value = Math.floor(Math.random()*(6-1+1))+1;
	dice2Value = Math.floor(Math.random()*(6-1+1))+1;



	attackSpecial = dice1Value + dice2Value;


	time = 0;
	diceMove = true;
}


/****************************************************************************IMPORTANT FOR ZACH AND KAMERON********************************************************/
/*rolls one red dice
use this for regular attacks where 1 dice is needed
the value of the dice roll for calculations is stored in the variable dice1Value
*/
function rollOneRedDice(){

	battleAttack = true;



	dice1Value = Math.floor(Math.random()*(6-1+1))+1;


	time = 0;
	diceMove = true;
}



/****************************************************************************IMPORTANT FOR ZACH AND KAMERON********************************************************/
/*rolls one green dice
use this for regular defense where 1 dice is needed
the value of the dice roll for calculations is stored in the variable dice1Value
*/
function rollOneGreenDice(){

	battleDefense = true;


	dice1Value = Math.floor(Math.random()*(6-1+1))+1;


	time = 0;
	diceMove = true;
}


/****************************************************************************IMPORTANT FOR ZACH AND KAMERON********************************************************/
//moves whatever color piece is passed to it to the correct location on the board based on the dice roll
//the player just had.
//Each area on the map has a center that is stored. When a piece is moved it is set to the center and then
//given a specific offset from that center to make sure no piece is drawn over top of another
function movePiece(color){

	//variable to hold piece to be moved
	var whoseTurn = whitePiece;

	//specific centers for each region
	var fourFiveCenterX = -1.7;
	var fourFiveCenterZ = -.45;

	var sixCenterX = -.45;
	var sixCenterZ = -.45;

	var eightCenterX = .6;
	var eightCenterZ = -.45;

	var nineTenCenterX = 1.8;
	var nineTenCenterZ = -.45;

	var twoThreeCenterX = -1.7;
	var twoThreeCenterZ = .2;

	var sevenCenterX = -.1;
	var sevenCenterZ = .4;

	var elevenTwelveCenterX = 1.85;
	var elevenTwelveCenterZ = .4;

	var offsetX = 0.0;
	var offsetZ = 0.0;

	//sets the correct piece and offset based on the color passed
	if(color == "white"){
		whoseTurn = whitePiece;
		offsetX = .2;
		offsetZ = -.2;
	}

	if(color == "yellow"){
		whoseTurn = yellowPiece;
		offsetX = .2;
		offsetZ = 0.0;
	}

	if(color == "orange"){
		whoseTurn = orangePiece;
		offsetX = .2;
		offsetZ = .2;
	}

	if(color == "green"){
		whoseTurn = greenPiece;
		offsetX = 0.0;
		offsetZ = -.2;
	}

	if(color == "purple"){
		whoseTurn = purplePiece;
		offsetX = -.2;
		offsetZ = .2;
	}

	if(color == "red"){
		whoseTurn = redPiece;
		offsetX = -.2;
		offsetZ = 0.0;
	}

	if(color == "black"){
		whoseTurn = blackPiece;
		offsetX = -.2;
		offsetZ = -.2;
	}

	if(color == "blue"){
		whoseTurn = bluePiece;
		offsetX = 0.0;
		offsetZ = .2;
	}


	//moves the selected piece to the center of the region determined by the dice roll then offsets it based on the offset
	//assigned above
	if(turnValue == 2 || turnValue == 3){
		whoseTurn.position.set(twoThreeCenterX+offsetX,.2,twoThreeCenterZ+offsetZ);
	}

	if(turnValue == 4 || turnValue == 5){
		whoseTurn.position.set(fourFiveCenterX+offsetX,.2,fourFiveCenterZ+offsetZ);
	}

	if(turnValue == 6){
		whoseTurn.position.set(sixCenterX+offsetX,.2,sixCenterZ+offsetZ);
	}

	if(turnValue == 7){
		offsetZ = offsetZ + .2;
		whoseTurn.position.set(sevenCenterX+offsetX,.2,sevenCenterZ+offsetZ);
	}

	if(turnValue == 8){
		whoseTurn.position.set(eightCenterX+offsetX,.2,eightCenterZ+offsetZ);
	}

	if(turnValue == 9 || turnValue == 10){
		whoseTurn.position.set(nineTenCenterX+offsetX,.2,nineTenCenterZ+offsetZ);
	}

	if(turnValue == 11 || turnValue == 12){
		whoseTurn.position.set(elevenTwelveCenterX+offsetX,.2,elevenTwelveCenterZ+offsetZ);
	}


}


/****************************************************************************IMPORTANT FOR ZACH AND KAMERON********************************************************/
/*
Anytime a player takes damage call this function and pass the color of the player and the amount of damage they took
*/

function moveDamage(color, damageAdded){

	//variable to hold which piece should be moved based on dice roll
	var damage = whiteDamagePiece;

	//sets the correct piece based on color passed
	if(color == "white"){
		damage = whiteDamagePiece;
	}

	if(color == "yellow"){
		damage = yellowDamagePiece;
	}

	if(color == "orange"){
		damage = orangeDamagePiece;
	}

	if(color == "green"){
		damage = greenDamagePiece;
	}

	if(color == "purple"){
		damage = purpleDamagePiece;
	}

	if(color == "red"){
		damage = redDamagePiece;
	}

	if(color == "black"){
		damage = blackDamagePiece;
	}

	if(color == "blue"){
		damage = blueDamagePiece;
	}

	//Find correct player based on color
	for(var i = 1; i <= game.num_of_players; i++)
	{
		if(game.player_array[i].player_color == color)
		{
			if(((game.player_array[i].hp + damageAdded) > 0) && ((game.player_array[i].hp + damageAdded) < game.player_array[i].character.hp))
			{
				game.player_array[i].hp = game.player_array[i].hp + damageAdded;
				damage.position.x = damage.position.x + (damageAdded*.33);
			}
			else if((game.player_array[i].hp + damageAdded) >= game.player_array[i].character.hp)
			{
				playerDied(color);
				game.player_array[i].hp = game.player_array[i].character.hp
			}
			else {
				game.player_array[i].hp = 0;
				resetDamage(color);
			}
		}
	}
	game.check_win_or_dead();
	//the center of every square on the damage map is .33 away so we can move each piece the correct number of squares
	//by incrementing the x-coordinate by the damage take *.33
	//damage.position.x = damage.position.x + (damageAdded*.33);


}

/****************************************************************************IMPORTANT FOR ZACH AND KAMERON********************************************************/
/*

*/
function resetDamage(colorsPlaying){

	//since the damage map consists of squares we only need the starting center and an offset
	var centerZ = 1.1;
	var centerX = -2.3;

		//if a piece is playing set it to the correct position in the zero square
		if(colorsPlaying == "white"){
			offsetX = .05;
			offsetZ = -.05;
			whiteDamagePiece.position.set(centerX+offsetX,.11,centerZ+offsetZ);
		}

		if(colorsPlaying == "yellow"){
			offsetX = .05;
			offsetZ = 0.0;
			yellowDamagePiece.position.set(centerX+offsetX,.11,centerZ+offsetZ);
		}

		if(colorsPlaying == "orange"){
			offsetX = .05;
			offsetZ = .05;
			orangeDamagePiece.position.set(centerX+offsetX,.11,centerZ+offsetZ);
		}

		if(colorsPlaying == "green"){
			offsetX = 0.0;
			offsetZ = -.05;
			greenDamagePiece.position.set(centerX+offsetX,.11,centerZ+offsetZ);
		}

		if(colorsPlaying == "purple"){
			offsetX = -.05;
			offsetZ = .05;
			purpleDamagePiece.position.set(centerX+offsetX,.11,centerZ+offsetZ);
		}

		if(colorsPlaying == "red"){
			offsetX = -.05;
			offsetZ = 0.0;
			redDamagePiece.position.set(centerX+offsetX,.11,centerZ+offsetZ);
		}

		if(colorsPlaying == "black"){
			offsetX = -.05;
			offsetZ = -.05;
			blackDamagePiece.position.set(centerX+offsetX,.11,centerZ+offsetZ);
		}

		if(colorsPlaying == "blue"){
			offsetX = 0.0;
			offsetZ = .05;
			blueDamagePiece.position.set(centerX+offsetX,.11,centerZ+offsetZ);
		}

		//Find correct player based on color
		for(var i = 1; i <= game.num_of_players; i++)
		{
			if(game.player_array[i].player_color == colorsPlaying)
			{
					game.player_array[i].hp = 0;
			}
		}
		game.check_win_or_dead();
}

/****************************************************************************IMPORTANT FOR ZACH AND KAMERON********************************************************/
/*
Call this only once at the very begining of the game.
Pass an array of all the colors that will be used in the game

sets all of the colors playing to the zero damage square and assigns them a unique offset
so that there is no overlap of the pieces if they are in the same square
*/
function setDamage(colorsPlaying){

	//since the damage map consists of squares we only need the starting center and an offset
	var centerZ = 1.1;
	var centerX = -2.3;

	//looks through an array to find all of the colors playing
	for(i = 0; i < colorsPlaying.length; i++){
		//if a piece is playing set it to the correct position in the zero square
		if(colorsPlaying[i] == "white"){
			offsetX = .05;
			offsetZ = -.05;
			whiteDamagePiece.position.set(centerX+offsetX,.11,centerZ+offsetZ);
		}

		if(colorsPlaying[i] == "yellow"){
			offsetX = .05;
			offsetZ = 0.0;
			yellowDamagePiece.position.set(centerX+offsetX,.11,centerZ+offsetZ);
		}

		if(colorsPlaying[i] == "orange"){
			offsetX = .05;
			offsetZ = .05;
			orangeDamagePiece.position.set(centerX+offsetX,.11,centerZ+offsetZ);
		}

		if(colorsPlaying[i] == "green"){
			offsetX = 0.0;
			offsetZ = -.05;
			greenDamagePiece.position.set(centerX+offsetX,.11,centerZ+offsetZ);
		}

		if(colorsPlaying[i] == "purple"){
			offsetX = -.05;
			offsetZ = .05;
			purpleDamagePiece.position.set(centerX+offsetX,.11,centerZ+offsetZ);
		}

		if(colorsPlaying[i] == "red"){
			offsetX = -.05;
			offsetZ = 0.0;
			redDamagePiece.position.set(centerX+offsetX,.11,centerZ+offsetZ);
		}

		if(colorsPlaying[i] == "black"){
			offsetX = -.05;
			offsetZ = -.05;
			blackDamagePiece.position.set(centerX+offsetX,.11,centerZ+offsetZ);
		}

		if(colorsPlaying[i] == "blue"){
			offsetX = 0.0;
			offsetZ = .05;
			blueDamagePiece.position.set(centerX+offsetX,.11,centerZ+offsetZ);
		}
	}
}


/****************************************************************************IMPORTANT FOR ZACH AND KAMERON********************************************************/
/*
If a player dies at some point during the game call this function with their color
to remove their piece from the board. Currently leaves damage pieces so other
players can see at what square they died. To move those back uncomment each damage
piece section

Sets the piece of the color called back to the starting position
*/
function playerDied(color){
	if(color == "white"){
		whitePiece.position.set(-2.8,.11,-.1);
		//whiteDamagePiece.position.set(-2.8,.11,.7);
	}

	if(color == "yellow"){
		yellowPiece.position.set(-2.8,.11,.1);
		//yellowDamagePiece.position.set(-2.8,.11,.8);
	}

	if(color == "orange"){
		orangePiece.position.set(-2.8,.11,.3);
		//orangeDamagePiece.position.set(-2.8,.11,.9);
	}

	if(color == "green"){
		greenPiece.position.set(-3,.11,-.1);
		//greenDamagePiece.position.set(-2.9,.11,.7);
	}

	if(color == "blue"){
		bluePiece.position.set(-3,.11,.3);
		//blueDamagePiece.position.set(-2.9,.11,.9);
	}

	if(color == "black"){
		blackPiece.position.set(-3.2,.11,-.1);
		//blackDamagePiece.position.set(-3,.11,.7);
	}

	if(color == "red"){
		redPiece.position.set(-3.2,.11,.1);
		//redDamagePiece.position.set(-3,.11,.8);
	}

	if(color == "purple"){
		purplePiece.position.set(-3.2,.11,.3);
		//purpleDamagePiece.position.set(-3,.11,.9);
	}
}
