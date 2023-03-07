import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';

const catalogCanvas = document.getElementById('catalog-canvas');
const futureBoxCanvas = document.getElementById('future-box-canvas');

function init() {
  const scene1 = new THREE.Scene();
  const scene2 = new THREE.Scene();

  const camera1 = new THREE.PerspectiveCamera(
    75,
    catalogCanvas.clientWidth / catalogCanvas.clientHeight,
    0.1,
    1000
  );
  camera1.position.z = 5;

  const camera2 = new THREE.PerspectiveCamera(
    75,
    futureBoxCanvas.clientWidth / futureBoxCanvas.clientHeight,
    0.1,
    1000
  );
  camera2.position.z = 5;

  const catalogRenderer = new THREE.WebGLRenderer({ canvas: catalogCanvas, alpha: true });
  catalogRenderer.setSize(catalogCanvas.clientWidth, catalogCanvas.clientHeight);
  catalogRenderer.setClearColor(0x000000, 0);

  const futureBoxRenderer = new THREE.WebGLRenderer({ canvas: futureBoxCanvas, alpha: true });
  futureBoxRenderer.setSize(futureBoxCanvas.clientWidth, futureBoxCanvas.clientHeight);
  futureBoxRenderer.setClearColor(0x000000, 0);

  const loader = new GLTFLoader();
  loader.load('/models/raw.glb', function (gltf) {
    const mesh = gltf.scene.children[0];
    mesh.position.set(0, 0, 0);
    scene1.add(mesh);
  });

  const geometry = new THREE.BoxGeometry();    
  const material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const cube2 = new THREE.Mesh(geometry, material2);
  scene2.add(cube2);

  const controls1 = new OrbitControls(camera1, catalogRenderer.domElement);
  controls1.enableDamping = true;
  controls1.rotateSpeed = 0.5;

  const controls2 = new OrbitControls(camera2, futureBoxRenderer.domElement);
  controls2.enableDamping = true;
  controls2.rotateSpeed = 0.5;



  function animate() {
    requestAnimationFrame(animate);

    

    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.01;

    catalogRenderer.render(scene1, camera1);
    futureBoxRenderer.render(scene2, camera2);
  }

  animate();
}

init();
