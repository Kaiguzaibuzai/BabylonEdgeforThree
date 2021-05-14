/**
 *求两个点的 向量
 *
 * @param {*} Vector1
 * @param {*} Vector2
 * @param {*} Vector3
 * @return {*} 
 */
function subtractVector(Vector1,Vector2,Vector3){

    if(!Vector3){

    const tempVector3 = new THREE.Vector3();  
        // tempVector3.setX(Vector1.x - Vector2.x);
        // tempVector3.setY(Vector1.y - Vector2.y);
        // tempVector3.setZ(Vector1.z - Vector2.z);
    // console.log(Vector1);
    // console.log(Vector2);
    // console.log(Vector3);

    tempVector3.setX(Vector1.x - Vector2.x);
    tempVector3.setY(Vector1.y - Vector2.y);
    tempVector3.setZ(Vector1.z - Vector2.z);

    // console.log(tempVector3);

    Vector3 = tempVector3;

    }else{
        Vector3.setX(Vector1.x - Vector2.x);
        Vector3.setY(Vector1.y - Vector2.y);
        Vector3.setZ(Vector1.z - Vector2.z);
    }
    
    return Vector3;
    
}


/**
 *返回两个向量叉积后的结果
 * @param {*} Vector1
 * @param {*} Vector2
 */
function setCrossResult(Vector1,Vector2){
    const result = new THREE.Vector3();
    result.crossVectors(Vector1,Vector2);
    return result;
}


/**
 *返回两个向量点积的后果
 * @param {*} Vector1
 * @param {*} Vector2
 * @return {*} 
 */
function setDotResult(Vector1,Vector2){
    return (Vector1.x * Vector2.x + Vector1.y * Vector2.y + Vector1.z * Vector2.z);
}

function pushLineAttributeInArray(linesPositions,linesNormals,linesIndices,Vector1,vector2,offset){
    linesPositions.push(
        Vector1.x, Vector1.y, Vector1.z,
        Vector1.x, Vector1.y, Vector1.z,
        vector2.x, vector2.y, vector2.z,
        vector2.x, vector2.y, vector2.z
    );

    // Normals
    linesNormals.push(
        vector2.x, vector2.y, vector2.z, -1,
        vector2.x, vector2.y, vector2.z, 1,
        Vector1.x, Vector1.y, Vector1.z, -1,
        Vector1.x, Vector1.y, Vector1.z, 1
    );

    // Indices
    linesIndices.push(
        offset, offset + 1, offset + 2,
        offset, offset + 2, offset + 3
    );
}

function createEdgesforMesh(verticies,normal,indicies){

    console.log(this)

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position',new THREE.BufferAttribute(verticies,3) );
    geometry.setAttribute( 'updown',new THREE.BufferAttribute(normal,4) );
    geometry.setIndex( new THREE.BufferAttribute(indicies,1) );
    // geometry.instanceCount = indicies
    // console.log(indicies);


    const material = new THREE.MeshPhongMaterial({
        color: 0xCC33FF, side: THREE.DoubleSide
    });
    const Shadermaterial = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
            width: { value: this.EdgesWidth ? this.EdgesWidth : 2.0 },
            color: { value: this.EdgesColor ? this.EdgesColor : new THREE.Vector4(0.0,0.0,1.0,0.5)},
            aspectRatio: {value: window.innerWidth / window.innerHeight }, 
            meshModelMatrix: {value: this.matrixWorld }, 
        },
        fragmentShader: document.getElementById('FragmentShader').textContent,
        vertexShader: document.getElementById('VertexShader').textContent
    });


    

    const mesh = new THREE.Mesh(geometry,Shadermaterial);
    mesh.frustumCulled = false;
    //mesh.scale.set(2,2,2);
    scene.add(mesh);
    // const  line = new THREE.LineSegments(geometry,Shadermaterial);
    // scene.add(line);

    console.log(mesh);

}


function getAspectRatio(Camera){
    return Camera.aspect;
}


