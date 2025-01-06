// physics.js
import * as CANNON from 'cannon'; // Import Cannon.js

// Function to create and return the physics world
export function createPhysicsWorld() {
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0); // Set gravity

    return world;
}

// Function to create the floor physics body
export function createFloorPhysicsBody() {
    const floorShape = new CANNON.Plane();
    const floorBody = new CANNON.Body({
        mass: 0, // Static object
        position: new CANNON.Vec3(0, -0.5, 0),
        quaternion: new CANNON.Quaternion().setFromEuler(-Math.PI / 2, 0, 0), // Rotate to match Three.js floor
    });
    floorBody.addShape(floorShape);
    return floorBody;
}

// Function to create physics for models
export function createModelPhysics(model) {
    const bodies = [];

    model.traverse((child) => {
        if (child.isMesh) {
            const shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1)); // Box shape, adjust size as needed
            const modelBody = new CANNON.Body({
                mass: 1, // Make the model dynamic
                position: new CANNON.Vec3(child.position.x, child.position.y, child.position.z)
            });
            modelBody.addShape(shape);
            bodies.push({ model: child, body: modelBody });
        }
    });

    return bodies;
}

// Function to update model positions after physics steps
export function updateModelPositions(bodies) {
    bodies.forEach(({ model, body }) => {
        model.position.copy(body.position);
        model.rotation.copy(body.rotation);
    });
}
