function draw() {
    init();
    animate();
    window.onresize = onWindowResize;

}


function init() {
    initScene();
    initCamera();
    initLight();
    initStats();
    initRender();
    initControls();
    // DuckDuck();
    test();
}

function initScene() {
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0XCCFFCC);
}

function initCamera() {
    let aspect = width / height;
    perspectiveCamera = new THREE.PerspectiveCamera(60, aspect, 0.1, 500);
    perspectiveCamera.position.set(50, 50, 50);
    perspectiveCamera.lookAt(scene.position);
    scene.add(perspectiveCamera);
}

function initLight() {
    ambientlight = new THREE.AmbientLight(0x666666);
    scene.add(ambientlight);
    pointlight = new THREE.PointLight(0xffffff);
    pointlight.position.set(50, 50, 50);
    scene.add(pointlight);
    //   //创建灯光
    //   let directionalLight = new THREE.DirectionalLight( 0xffffff, .1);
    //   directionalLight.position.set(130, 200, 400);
    //   scene.add( directionalLight );
}

function initStats() {
    stats = new Stats();
    document.body.appendChild(stats.dom);
}

function initControls() {
    controls = new THREE.OrbitControls(perspectiveCamera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    controls.minDistance = 10;
    controls.maxDistance = 500;
    controls.enablePan = true;
}
/*初始化渲染器 */
function initRender() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0XCCFFCC, 1);
    document.body.appendChild(renderer.domElement);
}

/* 渲染函数*/
function render() {
    renderer.render(scene, perspectiveCamera);
}

function onWindowResize() {
    perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
    perspectiveCamera.updateProjectionMatrix();
    render();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    render();
    stats.update();
    controls.update();
    requestAnimationFrame(animate);
}

function test() {
    let geo = new THREE.PlaneBufferGeometry(20, 20);
    // let geo = new THREE.BoxBufferGeometry(20, 20, 20);

    geo.rotateX(-Math.PI / 2); //旋转网格模型
    const material = new THREE.MeshPhongMaterial({
        color: 0xffff00, side: THREE.DoubleSide
    });



    let mesh = new THREE.Mesh(geo, material);


    scene.add(mesh);
    console.log(mesh);

    mesh.enableEdgesRendering();


    // const edges = new THREE.EdgesGeometry( geo, 90 );
    // const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xff0000 } ) );
    // // line.scale.copy(gltf.scene.children[0].scale)
    // scene.add( line );
}



function DuckDuck() {

    var loader = new THREE.GLTFLoader();
    var dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath('./draco/');
    loader.setDRACOLoader(dracoLoader);

    // Optional: Pre-fetch Draco WASM/JS module, to save time while parsing.
    // dracoLoader.getDecoderModule();

    // Load a glTF resource
    loader.load(
        // resource URL
        // '../glTF/Duck.gltf',
        '../MilkTruck/CesiumMilkTruck.gltf',
        // called when the resource is loaded
        function (gltf) {

            // scene.add(gltf.scene);
            // gltf.scene.scale.set(5,5,5);
            // gltf.scene.children[0]

            console.log(gltf.scene);
            gltf.scene.children[0].scale.set(10, 10, 10);
            gltf.scene.updateMatrixWorld(true);
            //.updateMatrixWorld ( force : Boolean ) : null         更新物体及其后代的全局变换。

            /** .updateWorldMatrix ( updateParents : Boolean, updateChildren : Boolean ) : null
            *  updateParents - recursively updates global transform of ancestors.
            *  updateChildren - recursively updates global transform of descendants.
            *  Updates the global transform of the object.
            */

            gltf.scene.traverse(function (obj) {
                if (obj.type === "Mesh") {

                    // obj.EdgesColor = new THREE.Vector4(0.0,1.0,0.0,1.0);
                    obj.EdgesWidth = 1.0;
                    obj.enableEdgesRendering();
                    
                    // obj.enableEdgesRendering(1.0,true)
                    // console.log(obj);
                    // const edges = new THREE.EdgesGeometry( obj.geometry, 5 );
                    // edges. applyMatrix4(obj.modelViewMatrix);
                    // // edges.
                    // console.log(edges);
                    // const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xff0000 } ) );
                    // // line.disableEdgesRendering();
                    // // line.modelViewMatrix.set(obj.modelViewMatrix);
                    // line.scale.set(10,10,10);
                    // console.log(line);
                    // scene.add( line );
                }

            });

            //

            // gltf.animations; // Array<THREE.AnimationClip>
            // gltf.scene; // THREE.Scene
            // gltf.scenes; // Array<THREE.Scene>
            // gltf.cameras; // Array<THREE.Camera>
            // gltf.asset; // Object

        },
        // called while loading is progressing
        function (xhr) {

            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        },
        // called when loading has errors
        function (error) {

            console.log('An error happened');

        }
    );
}



