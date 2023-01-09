'use strict';
import * as THREE from 'three'
/* global THREE */

import mercuryTexture from "./img/mercury.jpg";
import venusTexture from "./img/venus.jpg";
import earthTexture from "./img/earth.jpg";
import marsTexture from "./img/mars.jpg";
import jupiterTexture from "./img/jupiter.jpg";
import saturnTexture from "./img/saturn.jpg";
import saturnRingTexture from "./img/saturn ring.png";
import uranusTexture from "./img/uranus.jpg";
import uranusRingTexture from "./img/uranus ring.png";
import neptuneTexture from "./img/neptune.jpg";
import plutoTexture from "./img/pluto.jpg";



function main() {
  const canvas = document.querySelector('#canvas');
  const renderer = new THREE.WebGLRenderer({canvas, alpha: true});

  //textloader
  const textureLoader = new THREE.TextureLoader();


  function makeScene(elem) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();
    camera.position.set(0, 1, 4);
    camera.lookAt(0, 0, 0);

    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(3, 3, 5);
      scene.add(light);
    }

    return {scene, camera, elem};
  }


  function setupPlanet(loc,texture,ring) {
 
    const sceneInfo = makeScene(document.querySelector(loc));
    const geometry = new THREE.SphereGeometry(1, 50, 20);
    const material = new THREE.MeshStandardMaterial({
      map: textureLoader.load(texture),
    });
    const mesh = new THREE.Mesh(geometry, material);

    const obj = new THREE.Object3D();



    obj.add(mesh);
    if (ring) {
      const ringGeo = new THREE.RingGeometry(
        ring.innerRadius,
        ring.outerRadiuse,
        50
      );
      const ringMat = new THREE.MeshBasicMaterial({
        map: textureLoader.load(ring.texture),
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      obj.add(ringMesh);
      ringMesh.position.x = 1;
      ringMesh.rotation.x = -0.5 * Math.PI;
    }


    sceneInfo.scene.add(mesh);
    sceneInfo.mesh = mesh;



    return sceneInfo;


  }
  const mercury = setupPlanet("#mercury",mercuryTexture);
  const venus = setupPlanet("#venus",venusTexture);
  const earth = setupPlanet("#earth",earthTexture);
  const mars = setupPlanet("#mars",marsTexture);
  const jupiter = setupPlanet("#jupiter",jupiterTexture);
  const saturn = setupPlanet("#saturn",saturnTexture);
  const uranus = setupPlanet("#uranus",uranusTexture,{
    innerRadius:7,
    outerRadiuse:12,
    texture:uranusRingTexture,
   
});
  const neptune = setupPlanet("#neptune",neptuneTexture);
  const pluto = setupPlanet("#pluto",plutoTexture);


  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function rendenerSceneInfo(sceneInfo) {
    const {scene, camera, elem} = sceneInfo;

    // get the viewport relative position opf this element
    const {left, right, top, bottom, width, height} =
        elem.getBoundingClientRect();

    const isOffscreen =
        bottom < 0 ||
        top > renderer.domElement.clientHeight ||
        right < 0 ||
        left > renderer.domElement.clientWidth;

    if (isOffscreen) {
      return;
    }

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
    renderer.setScissor(left, positiveYUpBottom, width, height);
    renderer.setViewport(left, positiveYUpBottom, width, height);

    renderer.render(scene, camera);
  }

  function render(time) {
    time *= 0.001;
    resizeRendererToDisplaySize(renderer);
    renderer.setScissorTest(false);
    renderer.clear(true, true);
    renderer.setScissorTest(true);


    mercury.mesh.rotation.y = time * .8;
    venus.mesh.rotation.y = time * .8;
    earth.mesh.rotation.y = time * .8;
    mars.mesh.rotation.y = time * .8;
    jupiter.mesh.rotation.y = time * .8;
    saturn.mesh.rotation.y = time * .8;
    uranus.mesh.rotation.y = time * .8;
    neptune.mesh.rotation.y = time * .8;
    pluto.mesh.rotation.y = time * .8;
   
    rendenerSceneInfo(mercury);
    rendenerSceneInfo(venus);
    rendenerSceneInfo(earth);
    rendenerSceneInfo(mars);
    rendenerSceneInfo(jupiter);
    rendenerSceneInfo(saturn);
    rendenerSceneInfo(uranus);
    rendenerSceneInfo(neptune);
    rendenerSceneInfo(pluto);


    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();