const mounted = () => {
  // Detect and return WebGL 2.0 context
  const canvas = document.getElementById('draw-target');
  const gl = canvas.getContext('webgl2');
  if (!gl) {
    document.write('WebGL 2.0 is not available in your browser :(');
    return null;
  }
  return gl;
};

const setup = gl => {
  // Set background to solid grey
  gl.clearColor(0.3, 0.3, 0.35, 1);

  // Setup shaders
  // Load vertex and fragment shaders
  var vsSource = document.getElementById("vs").text.trim();
  var fsSource = document.getElementById("fs").text.trim();

  // Compile shaders
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vsSource);
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(vertexShader));
  }

  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fsSource);
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(fragmentShader));
  }

  // Link shaders to WebGL program
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
  }

  // Finally, activate WebGL program
  gl.useProgram(program);

  // Setup Geometry
  // Create a Vertex Buffer Object (VBO) and bind two buffers to it
  // 1. positions
  var positions = new Float32Array([
    -0.5, -0.5, 0.0,
     0.5, -0.5, 0.0,
     0.0,  0.5, 0.0,
  ]);
  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);

  // 2. colours
  var colors = new Float32Array([
    1.0, 0.0, 1.0,
    1.0, 1.0, 0.0,
    0.0, 1.0, 1.0,
  ]);
  var colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
  gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(1);
};

const draw = gl => {
  // Fill background with one colour
  // gl.clear(gl.COLOR_BUFFER_BIT);

  // Instruct WebGL to draw triangles with a set of 3 vertices
  let r = 0, g = 0, b = 0;
  setInterval(() => {
    gl.clearColor(((++r) % 100) / 100, ((++g) % 100) / 100, ((++b) % 100) / 100, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }, 10)
};

const gl = mounted();

if (gl) {
  setup(gl);
  draw(gl);
  
}