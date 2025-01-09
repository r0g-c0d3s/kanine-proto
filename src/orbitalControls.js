// CustomOrbitControls.js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

export function createOrbitControls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);

   
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    //  panning and zooming
    controls.enablePan = true;
    controls.enableZoom = true; 

    // Limit vertical rotation
    controls.maxPolarAngle = Math.PI / 2 - 0.1;
    controls.minPolarAngle = 0.2;

    // Max and min zoom distance
    controls.maxDistance = 250; 
    controls.minDistance = 10;   

    // Adjust zoom speed
    const zoomSpeed = 0.5;

    
    renderer.domElement.addEventListener('wheel', (event) => {
        event.preventDefault();

        
        const mouse = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );

       
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

       
        const zoomFactor = event.deltaY < 0 ? zoomSpeed : -zoomSpeed;

        
        const zoomDirection = raycaster.ray.direction.clone().multiplyScalar(zoomFactor);
        const newCameraPosition = camera.position.clone().add(zoomDirection);

       
        if (newCameraPosition.distanceTo(controls.target) > controls.maxDistance) {
            newCameraPosition.sub(zoomDirection);
        } else if (newCameraPosition.distanceTo(controls.target) < controls.minDistance) {
            newCameraPosition.add(zoomDirection);
        }

        
        camera.position.copy(newCameraPosition);

        
        controls.target.add(zoomDirection);
        controls.update();
    });

    return controls;
}
