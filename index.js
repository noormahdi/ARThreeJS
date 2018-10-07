init();
animate();

function init(){
    aspectRatio = window.innerWidth/window.innerHeight;
    viewsize = 30;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
                    45,
                    window.innerWidth/window.innerHeight,
                    0.1,
                    1000);
    // camera = new THREE.OrthographicCamera(
    //     -aspectRatio*viewsize/2,aspectRatio*viewsize/2,
    //     aspectRatio*viewsize/2,-aspectRatio*viewsize/2,0.1,1000);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(
                        window.innerWidth,
                        window.innerHeight
                    );
    document.body.appendChild(renderer.domElement);

    var matBasicRed = new THREE.MeshBasicMaterial({color:0xeb0a1e});
    var matBasicWhite = new THREE.MeshBasicMaterial({color:0xffffff});
    var matNormal = new THREE.MeshNormalMaterial();
    var geoSphere = new THREE.SphereGeometry(10,32,32);
    group = new THREE.Group();
    sphere = new THREE.Mesh(geoSphere,matBasicRed);
    var loader = new THREE.FontLoader();
    loader.load(
        'node_modules/three/examples/fonts/helvetiker_regular.typeface.json',
        function(font){
            var geoMessage = new THREE.TextGeometry(
                'DRIVE HAPPY',{
                    font:font,
                    size:4,
                    height:0.1,
                    curveSegments: 20
                }
            );
            geoMessage.computeBoundingBox();
            geoMessage.textWidth = geoMessage.boundingBox.max.x - geoMessage.boundingBox.min.x;
            geoMessage.textHeight = geoMessage.boundingBox.max.y - geoMessage.boundingBox.min.y;
            geoMessage.center();
            geoMessage.rotateX(Math.PI/2);
            
            var modifier = new THREE.BendModifier();
            var direction = new THREE.Vector3(0, 0, -1);
            var axis = new THREE.Vector3(0,1,0);
            var angle = Math.PI/3.25;
            modifier.set(direction, axis, angle).modify(geoMessage);
            
            message = new THREE.Mesh(geoMessage,matBasicWhite);
            message.position.z = 11;
            group.add(message);
        }
    );
    group.add(sphere);
    scene.add(group);
    camera.position.z = 50;
}

function animate(){
    requestAnimationFrame(animate);
    //group.rotation.x -= 0.01;
    group.rotation.y -= 0.02;
    renderer.render(scene,camera);
}