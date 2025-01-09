// main.js

import * as THREE from 'three';
import ModelLoader from './models.js';
import { createOrbitControls } from './orbitalControls.js';
import { GUI } from 'dat.gui';
import holographicVertexShader from './shaders/holographic/vertex.glsl';
import holographicFragmentShader from './shaders/holographic/fragment.glsl';
import { Board } from './board.js'; 
import { createFloor } from './floor.js'; 


const loader = new THREE.TextureLoader();
const texturePath = './texture/gravel_road_diff_2k.png';
const height = loader.load('./texture/height.png');
const texture = loader.load(
    texturePath,
    () => {
        console.log('Texture loaded successfully!');
    },
    undefined,
    (error) => {
        console.error('Error loading texture:', error);
        alert('Failed to load texture: ' + error.message);
    }
);


const scene = new THREE.Scene();
scene.background = new THREE.Color('#000');


// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(20, 15, 20);
camera.lookAt(10, 100, 10);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Orbit Controls
const controls = createOrbitControls(camera, renderer);

// GUI Controls
const gui = new GUI();
const params = {
    hologramColor: '#00ffff',
    displacementScale: 1,
    ambientLightIntensity: 5,
    directionalLightIntensity: 5,
    boardPosition: { x: 0, y: 0, z: 0 }, // Position of the board
    boardRotation: { x: 0, y: 0, z: 0 }, // Rotation of the board
    floorWidth: 1000,  // Default floor width
    floorHeight: 1000, // Default floor height
};

// GUI for lighting
const ambientLight = new THREE.AmbientLight(0xffffff, params.ambientLightIntensity);
scene.add(ambientLight);
gui.add(params, 'ambientLightIntensity', 0, 5).onChange((value) => {
    ambientLight.intensity = value;
});

const directionalLight = new THREE.DirectionalLight(0xffffff, params.directionalLightIntensity);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true;
scene.add(directionalLight);
gui.add(params, 'directionalLightIntensity', 0, 5).onChange((value) => {
    directionalLight.intensity = value;
});

// Holographic Effect
const materialParameters = { color: params.hologramColor };
const material = new THREE.ShaderMaterial({
    vertexShader: holographicVertexShader,
    fragmentShader: holographicFragmentShader,
    uniforms: {
        uTime: new THREE.Uniform(0),
        uColor: new THREE.Uniform(new THREE.Color(materialParameters.color)),
    },
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});

// GUI control for hologram color
gui.addColor(params, 'hologramColor').onChange((value) => {
    material.uniforms.uColor.value.set(value);
});

// stars background
function addStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
    const starCount = 2000;
    const starVertices = [];

    for (let i = 0; i < starCount; i++) {
        const x = THREE.MathUtils.randFloatSpread(2000);
        const y = THREE.MathUtils.randFloatSpread(2000);
        const z = THREE.MathUtils.randFloatSpread(2000);
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}
addStars();


const floor = createFloor(scene, texture, height, params);


gui.add(params, 'floorWidth', 500, 5000).onChange((value) => {
    floor.updateSize(value, params.floorHeight);  // Update floor size
});

gui.add(params, 'floorHeight', 500, 5000).onChange((value) => {
    floor.updateSize(params.floorWidth, value);  // Update floor size
});


const board = new Board(scene, gui, params, material);
const modelLoader = new ModelLoader(scene, gui);  // Pass the GUI here
modelLoader.loadModels();

const clock = new THREE.Clock();
function animate() {
    const elapsedTime = clock.getElapsedTime();
    material.uniforms.uTime.value = elapsedTime;
    controls.update();

    const minimumHeight = 1;
    if (camera.position.y < minimumHeight) {
        camera.position.y = minimumHeight;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();
