import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

class ModelLoader {
    constructor(scene, gui) {
        this.scene = scene;
        this.gui = gui; // Pass GUI instance
        this.models = [];

        // Initialize GLTFLoader
        this.loader = new GLTFLoader();

        // Initialize DracoLoader and set decoder path
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('./static/models'); // Update this path to your Draco files
        this.loader.setDRACOLoader(dracoLoader);

        this.modelPaths = [
            './models/Rock_01.glb',
            './models/Metal_Arch.glb',
            './models/Rock_02.glb',
            './models/Rock_03.glb',
            './models/Rock_04.glb',
            './models/Rock_06.glb',
            './models/Rock_Arch.glb',
            './models/rover_x.glb',
            './models/Drone.glb',
            './models/Habitat_01.glb',
            './models/Habitat_02.glb',
            './models/Habitat_03.glb',
            './models/Observatory.glb',
            './models/Reciever.glb',
            './models/ResearchCenter.glb',
            './models/SolarPanel.glb',
            './models/Telescope.glb',
            './models/Canyon.glb',
            './models/Coin.glb',
            './models/Crater.glb',
            './models/EnergyNode.glb',
            './models/EnergyOrb.glb',
            './models/EnergySlot.glb',
            './models/GlowSocket.glb',
            './models/Lander.glb',
            './models/Outcorp.glb'

        ];

        this.modelNames = [
            'Rock_01', 'Metal_Arch', 'Rock_02', 'Rock_03', 'Rock_04', 'Rock_06',
            'Rock_Arch', 'rover_x', 'Drone', 'habitat1', 'habitat2', 'habitat2', 'observatory',
            'reciever', 'researchCenter', 'solarPlanal', 'telescope','canyon','coin','crater',
            'enNode','enOrb','enslot','glowslot',
            'lander','outcorp'
        ];

        this.modelPositions = [
            { x: 0, y: 0, z: 100 },
            { x: 150, y: 0, z: 2 },
            { x: 50, y: 0, z: 50 },
            { x: 40, y: 0, z: -100 },
            { x: 20, y: 0, z: -5 },
            { x: 80, y: 0, z: 4 },
            { x: -100, y: 0, z: 150 },
            { x: -150, y: 0, z: -50 },
            { x: -100, y: 100, z: 100 },
            { x: 100, y: 0, z: 200 },
            { x: -300, y: 0, z: 50 },
            { x: 200, y: 0, z: -200 },
            { x: -200, y: 0, z: 78 },
            { x: -150, y: 0, z: 453 },
            { x: -35, y: 0, z: 23 },
            { x: -61, y: 0, z: 97 },
            { x: -157, y: 0, z: 123 },
            {x: 500,y: 0,z:500},
            {x:100,y:0,z:100},
            {x:500,y:0,z:-350},
            {x:200,y:0,z:200},
            {x:150,y:0,z:-320},
            {x:350,y:0,z:350},
            {x:-30,y:0,z:-84},
            {x:-300,y:0,z:-300},
            {x:-30,y:0,z:-500}
        ];
    }

    loadModels() {
        this.modelPaths.forEach((path, index) => {
            this.loader.load(
                path,
                (gltf) => {
                    const model = gltf.scene;
                    model.position.set(
                        this.modelPositions[index].x,
                        this.modelPositions[index].y,
                        this.modelPositions[index].z
                    );
                    model.scale.set(0.1, 0.1, 0.1);
                    model.name = this.modelNames[index];
                    if (this.modelNames[index] === 'canyon') {
                        model.scale.set(4, 4, 4); // Adjust the scale values as needed
                    } else {
                        model.scale.set(0.1, 0.1, 0.1);
                    }

                    if (this.modelNames[index] === 'rover_x') {
                        model.scale.set(2.5, 2.5, 2.5); // Increase the scale
                    }
                    if (this.modelNames[index] === 'coin') {
                        model.scale.set(4, 4, 4); // Increase the scale
                    }
                    if (this.modelNames[index] === 'crater') {
                        model.scale.set(2, 2, 2); // Increase the scale
                    }
                    if (this.modelNames[index] === 'enNode') {
                        model.scale.set(4, 4, 4); // Increase the scale
                    }
                    if (this.modelNames[index] === 'enOrb') {
                        model.scale.set(6, 6, 6); // Increase the scale
                    }
                    if (this.modelNames[index] === 'enslot') {  
                        model.scale.set(4, 4, 4); // Increase the scale
                    }
                    if (this.modelNames[index] === 'glowslot') {
                        model.scale.set(4, 4, 4); // Increase the scale
                    }
                    if (this.modelNames[index] === 'lander') {
                        model.scale.set(4, 4, 4); // Increase the scale
                    }
                    if (this.modelNames[index] === 'outcorp') {
                        model.scale.set(4, 4, 4); // Increase the scale
                    }
                    if (this.modelNames[index] === 'Drone') {
                        model.scale.set(.5, .5, .5); // Increase the scale
                    }

                    
                    // Apply color to models
                    if (model.name !== 'Drone' && 
                        model.name !== 'rover_x' && 
                        model.name !== 'Metal_Arch' && 
                        model.name !== 'habitat1' && 
                        model.name !== 'habitat2' && 
                        model.name !== 'habitat3' && 
                        model.name !== 'observatory' && 
                        model.name !== 'reciever' && 
                        model.name !== 'researchCenter' && 
                        model.name !== 'solarPlanal' && 
                        model.name !== 'telescope' && 
                        model.name !== 'canyon' &&
                        model.name !== 'coin' &&
                        model.name !== 'crater' &&
                        model.name !== 'enNode' &&
                        model.name !== 'enOrb' &&   
                        model.name !== 'enslot' &&
                        model.name !== 'glowslot' &&
                        model.name !== 'lander' &&
                        model.name !== 'outcorp' 
                    ) 
                    {
                        this.applyColorToModel(model, '#ee7008');
                    }

                    this.setShadowProperties(model);

                    // Add model to the scene
                    this.scene.add(model);
                    this.models.push(model);

                    // Add position and rotation controls to the GUI for each model
                    this.addPositionAndRotationControlsToGUI(model);
                },
                undefined,
                (error) => {
                    console.error('Error loading model:', error);
                }
            );
        });
    }

    applyColorToModel(model, color) {
        model.traverse((child) => {
            if (child.isMesh) {
                child.material.color.set(color);
            }
        });
    }

    setShadowProperties(model) {
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }

    addPositionAndRotationControlsToGUI(model) {
        const modelPosition = model.position;
        const modelRotation = model.rotation; // Rotation of the model
        const folder = this.gui.addFolder(`${model.name}`);

        // Position controls
        const positionFolder = folder.addFolder('Position');
        positionFolder.add(modelPosition, 'x', -500, 500).onChange((value) => {
            model.position.x = value;
        });
        positionFolder.add(modelPosition, 'y', -500, 500).onChange((value) => {
            model.position.y = value;
        });
        positionFolder.add(modelPosition, 'z', -500, 500).onChange((value) => {
            model.position.z = value;
        });

        // Rotation controls (in radians)
        const rotationFolder = folder.addFolder('Rotation');
        rotationFolder.add(modelRotation, 'x', 0, Math.PI * 2).onChange((value) => {
            model.rotation.x = value;
        });
        rotationFolder.add(modelRotation, 'y', 0, Math.PI * 2).onChange((value) => {
            model.rotation.y = value;
        });
        rotationFolder.add(modelRotation, 'z', 0, Math.PI * 2).onChange((value) => {
            model.rotation.z = value;
        });

        folder.open();
        positionFolder.open();
        rotationFolder.open();
    }
    
}

export default ModelLoader;
