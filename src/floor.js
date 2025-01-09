import * as THREE from 'three';

export function createFloor(scene, texture, heightMap, params) {
    const floorGeometry = new THREE.PlaneGeometry(5000, 5000);  // Default size
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: '#df7614',
        map: texture,
        displacementMap: heightMap,
        displacementScale: params.displacementScale,
    });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.5;
    floor.receiveShadow = true;
    scene.add(floor);

    // Function to update the floor size
    floor.updateSize = (width, height) => {
        floor.geometry.dispose();
        floor.geometry = new THREE.PlaneGeometry(width, height);
    };

    return floor;
}
