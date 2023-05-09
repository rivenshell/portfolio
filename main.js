import * as THREE from "three"
import * as dat from "lil-gui"

// debug
const gui = new dat.GUI()

const parameters = {
  materialColor: "#ffeded",
}

gui.addColor(parameters, "materialColor").onChange(() => {
  materal.color.set(parameters.materialColor)
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

/**
 * objects
 */

//materials
const materal = new THREE.MeshToonMaterial({ color: parameters.materialColor })

//mesh
const mesh1 = new THREE.Mesh(new THREE.ConeGeometry(1, 0.4, 16, 60), materal)

const mesh2 = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), materal)

const mesh3 = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
  materal
)

scene.add(mesh1, mesh2, mesh3)

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight("#ffffff", 0.4)
directionalLight.position.set(1, 1, 2)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.z = 6
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
