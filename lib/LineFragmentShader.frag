varying vec4 vPosition;
void main() {
    gl_FragColor = vec4(vPosition.x+0.5,vPosition.y+0.5,vPosition.z+0.5,1.0);
}