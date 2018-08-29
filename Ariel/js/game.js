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

init();
animate();
function init() {
    camera = new THREE.PerspectiveCamera( 70, (window.innerWidth) / (window.innerHeight), 1, 1000 );
    //camera = new THREE.PerspectiveCamera( 70, width / height, 1, 1000 );
    camera.position.z = 400;
    scene = new THREE.Scene();
    var texture = new THREE.TextureLoader().load( '../textures/player.gif' );
    var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    // var geo = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
    // var mat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
    // var plane = new THREE.Mesh(geo, mat);

    // scene.add(plane);
    // plane.rotateX( - Math.PI / 2);
    meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(10,10, 10,10),
		new THREE.MeshBasicMaterial({color:0x5B8930})
	);
	meshFloor.rotation.x -= Math.PI / 2; // Rotate the floor 90 degrees
    scene.add(meshFloor);
    
    //camera.position.set(0, player.height, -5);
	camera.lookAt(new THREE.Vector3(0,player.height,0));

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    //renderer.setSize( width, height );
    renderer.setSize( (window.innerWidth), (window.innerHeight) );
    document.body.appendChild( renderer.domElement );
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('keydown', keyActions, false);
}
function onWindowResize() {
    camera.aspect = (window.innerWidth) / (window.innerHeight);
    camera.updateProjectionMatrix();
    renderer.setSize( (window.innerWidth), (window.innerHeight) );
}
function toRadians (angle) {
    console.log(angle * (Math.PI / 180));
    return angle * (Math.PI / 180);
}
function keyActions(event){
    //var keyCode = event.which;
    console.log(event.keyCode);
    if(event.keyCode == 37) {
        turn = "left";
        //playerRotation += deltaTime;
        //mesh.rotation.y += toRadians(1);
        ySpeed += toRadians(1)//0.10;
    }
    else if(event.keyCode == 39) {
        turn = "right";
        //playerRotation -= deltaTime;
        //mesh.rotation.y -= toRadians(1);
        ySpeed -= toRadians(1)//0.10;
    }
    else if(event.keyCode == 38) {
        turn = "up";
        //xSpeed += toRadians(1)//0.10;
    }
    else if(event.keyCode == 40) {
        turn = "down";
        //xSpeed -= toRadians(1)//0.10;
    }
    else if(event.keyCode == 65) {
        turn = "a";
        xTranslation -= 10;
    }
    else if(event.keyCode == 68) {
        turn = "d";
        xTranslation += 10;
        //camera.translateX(-10);
    }
    else if(event.keyCode == 87) {
        turn = "w";
        zTranslation -= 10;
        //camera.translateX(10);
    }
    else if(event.keyCode == 83) {
        turn = "s";
        zTranslation += 10;
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
    //camera.translateX(10);
    //camera.translateY( -yTranslation );
    //camera.translateZ( -zTranslation ); 

    renderer.render( scene, camera );
}