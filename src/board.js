import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

export class Board {
    constructor(scene, gui, params, material) {
        this.scene = scene;
        this.gui = gui;
        this.params = params;
        this.material = material;
        this.board = null;

        this.loadBoard();
    }

    loadBoard() {
        const gltfLoader = new GLTFLoader();
        gltfLoader.load('./models/board.glb', (gltf) => {
            this.board = gltf.scene;

            // Set the size of the hologram
            this.board.scale.set(5, 5, 5);
            this.board.traverse((child) => {
                if (child.isMesh) child.material = this.material;
            });

            // Load font and add text inside hologram
            const fontLoader = new FontLoader();
            fontLoader.load('./fonts/Quantum Lemon Bold_Lemon-Bold.json', (font) => {
                const textGeometry = new TextGeometry('Kanine-KLans', {
                    font: font,
                    size: 0.3, // Size of the text
                    depth: 0.05, // Depth of the text extrusion
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 0.01,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 5
                });

                const textMaterial = new THREE.MeshBasicMaterial({ color: '#00ffff' });
                const textMesh = new THREE.Mesh(textGeometry, textMaterial);

                // Position the text inside the hologram
                textMesh.position.set(-1.5, 4, 0); // Adjust based on your model
                // Add the text to the board (hologram)
                this.board.add(textMesh);
            });

            this.scene.add(this.board);

            // Update GUI to control the board position with new names
            this.gui.add(this.params.boardPosition, 'x', -10, 10).name('Board Position X').onChange(() => {
                this.board.position.x = this.params.boardPosition.x;
            });
            this.gui.add(this.params.boardPosition, 'y', -10, 10).name('Board Position Y').onChange(() => {
                this.board.position.y = this.params.boardPosition.y;
            });
            this.gui.add(this.params.boardPosition, 'z', -10, 10).name('Board Position Z').onChange(() => {
                this.board.position.z = this.params.boardPosition.z;
            });

            // Update GUI to control the board rotation
            this.gui.add(this.params.boardRotation, 'x', 0, Math.PI * 2).name('Board Rotation X').onChange(() => {
                this.board.rotation.x = this.params.boardRotation.x;
            });
            this.gui.add(this.params.boardRotation, 'y', 0, Math.PI * 2).name('Board Rotation Y').onChange(() => {
                this.board.rotation.y = this.params.boardRotation.y;
            });
            this.gui.add(this.params.boardRotation, 'z', 0, Math.PI * 2).name('Board Rotation Z').onChange(() => {
                this.board.rotation.z = this.params.boardRotation.z;
            });
        });
    }

    getBoard() {
        return this.board;
    }
}
