// CustomOrbitControls.js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

export function createOrbitControls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);

    // Enable smooth damping for camera movement
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    // Enable panning and zooming
    controls.enablePan = true;
    controls.enableZoom = true;  // Enable built-in zoom, we will customize it below

    // Limit vertical rotation to avoid flipping
    controls.maxPolarAngle = Math.PI / 2 - 0.1;
    controls.minPolarAngle = 0.2;

    // Max and min zoom distance
    controls.maxDistance = 250; // Maximum zoom-out distance
    controls.minDistance = 10;   // Minimum zoom-in distance

    // Adjust zoom speed
    const zoomSpeed = 0.3;

    // Zoom towards the mouse position
    renderer.domElement.addEventListener('wheel', (event) => {
        event.preventDefault();

        // Get normalized mouse position
        const mouse = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );

        // Raycast from camera to mouse position
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        // Calculate zoom factor
        const zoomFactor = event.deltaY < 0 ? zoomSpeed : -zoomSpeed;

        // Calculate the new camera position based on the zoom factor
        const zoomDirection = raycaster.ray.direction.clone().multiplyScalar(zoomFactor);
        const newCameraPosition = camera.position.clone().add(zoomDirection);

        // Clamp the new camera position to be within the allowed zoom range
        if (newCameraPosition.distanceTo(controls.target) > controls.maxDistance) {
            newCameraPosition.sub(zoomDirection);
        } else if (newCameraPosition.distanceTo(controls.target) < controls.minDistance) {
            newCameraPosition.add(zoomDirection);
        }

        // Update the camera position
        camera.position.copy(newCameraPosition);

        // Update the controls' target to ensure smooth focus
        controls.target.add(zoomDirection);
        controls.update();
    });

    return controls;
}
