// import * as THREE from 'three';

// // Function to show the loading screen
// export function showLoadingScreen() {
//     const loadingScreen = document.createElement('div');
//     loadingScreen.id = 'loading-screen';
//     loadingScreen.innerHTML = `<div id="loading-message">Loading...</div>`;
//     document.body.appendChild(loadingScreen);
// }

// // Function to hide the loading screen
// export function hideLoadingScreen() {
//     const loadingScreen = document.getElementById('loading-screen');
//     if (loadingScreen) {
//         loadingScreen.classList.add('hidden');
//         setTimeout(() => {
//             loadingScreen.remove(); // Remove from DOM after fade-out transition
//         }, 500); // Duration matches CSS transition
//     }
// }

// // Optional: Display loading progress in the console (useful for debugging)
// export function onLoadingProgress(url, itemsLoaded, itemsTotal) {
//     console.log(`Loaded ${itemsLoaded} of ${itemsTotal}: ${url}`);
// }

// // Loading Manager to handle loading of assets
// export const loadingManager = new THREE.LoadingManager();
// loadingManager.onProgress = onLoadingProgress;
// loadingManager.onLoad = hideLoadingScreen; // Hide screen when loading completes
