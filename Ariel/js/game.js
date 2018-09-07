var loggingOn = true;
var camera, scene, renderer, controls;
var mesh;
var meshFloor;
//var width = 1920;
var width =(window.innerWidth);
//var height = 1080;
var height = (window.innerHeight);

var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };

var xRotation = 0.0; 
var yRotation = 0.0;
var xSpeed = 0.0;
var ySpeed = 0.0;
var xTranslation = 0.0;
var yTranslation = 0.0;
var zTranslation = 0.0;

/*Mouse Move*/
var viewHalfX = 0;
var viewHalfY = 0;
var mouseX = 0;
var mouseY = 0;

var lat = 0;
var lon = 0;

init();
animate();
function init() {
    camera = new THREE.PerspectiveCamera( 45, (window.innerWidth) / (window.innerHeight), 1, 1000 );
    // camera = new THREE.PerspectiveCamera( 10, (window.innerWidth) / (window.innerHeight), 1, 1000 );
    camera.position.z = 400;
    scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x87ceeb );
    var texture = new THREE.TextureLoader().load( '../textures/player.gif' );
    var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
    // var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(1000,1000),
		new THREE.MeshBasicMaterial({color:0x5B8930})
	);
	meshFloor.rotation.x -= Math.PI / 2; // Rotate the floor 90 degrees
	//					   x y z
	meshFloor.position.set(0, -10, 400);
    scene.add(meshFloor);
    
    //camera.position.set(0, player.height, -5);
    //camera.position.set(0, 400, 0);
	//camera.lookAt(new THREE.Vector3(0,player.height,0));

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( (window.innerWidth), (window.innerHeight) );
    document.body.appendChild( renderer.domElement );
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('keydown', keyActions, false);
	renderer.domElement.addEventListener( 'mousemove', onMouseMove, false );
}
function onWindowResize() {
    camera.aspect = (window.innerWidth) / (window.innerHeight);
    camera.updateProjectionMatrix();
	renderer.setSize( (window.innerWidth), (window.innerHeight) );
	if ( this.domElement === document ) {
		this.viewHalfX = window.innerWidth / 2;
		this.viewHalfY = window.innerHeight / 2;
	} else {
		this.viewHalfX = this.domElement.offsetWidth / 2;
		this.viewHalfY = this.domElement.offsetHeight / 2;
	}
}
function toRadians (angle) {
    console.log(angle * (Math.PI / 180));
    return angle * (Math.PI / 180);
}

	function onMouseMove( event ) {
		// console.log(event);
		if ( renderer.domElement === document ) {
			console.log("ONE");
			mouseX = event.pageX - viewHalfX;
			mouseY = event.pageY - viewHalfY;
			//camera.rotation.y -= player.turnSpeed;
		} else {
			// var newMouseY = event.pageY - renderer.domElement.offsetTop - viewHalfY;
			// if(newMouseY > mouseY){
				// camera.rotation.y += player.turnSpeed;
			// }
			// else if(newMouseY < mouseY){
				// camera.rotation.y -= player.turnSpeed;
			// }
			mouseX = event.pageX - renderer.domElement.offsetLeft - viewHalfX;
			mouseY = event.pageY - renderer.domElement.offsetTop - viewHalfY;
			console.log("mouseX: " + mouseX + "  |  mouseY: " + mouseY);
			console.log("viewHalfX: " + window.innerWidth/2);
			
			if(mouseX > ((window.innerWidth/2) + 10)){
				camera.rotation.y -= player.turnSpeed;
			}
			else if(mouseX < ((window.innerWidth/2) - 10)){
				camera.rotation.y += player.turnSpeed;
			}
			//camera.rotation.y += player.turnSpeed;
		}

	};

function keyActions(event){
    //var keyCode = event.which;
    console.log(event.keyCode);
    if(event.keyCode == 37) {
        turn = "left";
        //playerRotation += deltaTime;
        //mesh.rotation.y += toRadians(1);
		
		camera.rotation.y += player.turnSpeed;
        //ySpeed += toRadians(1)//0.10;
    }
    else if(event.keyCode == 39) {
        turn = "right";
        //playerRotation -= deltaTime;
        //mesh.rotation.y -= toRadians(1);
		
		camera.rotation.y -= player.turnSpeed;
        // ySpeed -= toRadians(1)//0.10;
    }
    else if(event.keyCode == 38) {
        turn = "up";
        //xSpeed += toRadians(1)//0.10;
		
		camera.rotation.x += player.turnSpeed;
    }
    else if(event.keyCode == 40) {
        turn = "down";
        //xSpeed -= toRadians(1)//0.10;
		
		camera.rotation.x -= player.turnSpeed;
    }
    else if(event.keyCode == 65) {
        turn = "a";
        zTranslation -= 10;
    }
    else if(event.keyCode == 68) {
        turn = "d";
        zTranslation += 10;
        //camera.translateX(-10);
    }
    else if(event.keyCode == 87) {
        turn = "w";
        yTranslation -= 10;
        //camera.translateX(10);
    }
    else if(event.keyCode == 83) {
        turn = "s";
        yTranslation += 10;
    }
    else if(event.keyCode == 67) {
        //Camera
        turn = "c";
    }
}
function diagnosticLog(text){
    if(loggingOn){
        document.getElementById("TextDisplay").innerText = text;
    }
}
function animate() {
    requestAnimationFrame( animate );
    //mesh.rotation.x += 0.005;
    //mesh.rotation.y += 0.01;

    // Update and set the rotation around x and y axis 
    xRotation = xSpeed; 
    yRotation = ySpeed;
    diagnosticLog("X: " + xRotation + "\n" + "Y: " + yRotation);
    mesh.rotation.set(xRotation, yRotation, 0.0);
    mesh.position.x = xTranslation;
    mesh.position.y = yTranslation;
    mesh.position.z = zTranslation;
	var targetPosition = new THREE.Vector3(0,player.height,0);
	targetPosition.x = xTranslation;
	targetPosition.y = yTranslation;
	targetPosition.z = zTranslation;
	// lon += mouseX * actualLookSpeed;
	// if ( lookVertical ) lat -= mouseY * actualLookSpeed * verticalLookRatio;

	// lat = Math.max( - 85, Math.min( 85, lat ) );
	// phi = THREE.Math.degToRad( 90 - lat );

	// theta = THREE.Math.degToRad( lon );
	
	// var targetPosition = this.target,
	// position = this.object.position;
	// targetPosition.x = position.x + 100 * Math.sin( phi ) * Math.cos( theta );
	// targetPosition.y = position.y + 100 * Math.cos( phi );
	// targetPosition.z = position.z + 100 * Math.sin( phi ) * Math.sin( theta );

	// this.object.lookAt( targetPosition );
	
    //camera.translateX(10);
    //camera.translateY( -yTranslation );
    //camera.translateZ( -zTranslation ); 

    renderer.render( scene, camera );
}