(function (){
    camera = new THREE.PerspectiveCamera(
                    45,
                    window.innerWidth/window.innerHeight,
                    0.1,
                    1000);
    
    camera.position.z = 50;
})();