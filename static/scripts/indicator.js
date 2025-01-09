// Get the canvas element and its context
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size (customize based on your design)
canvas.width = 400;
canvas.height = 400;

// Create a radial gradient
// Arguments: x0, y0, r0, x1, y1, r1
const gradient = ctx.createRadialGradient(
  canvas.width / 2, canvas.height / 2, 0, // Inner circle (center and radius)
  canvas.width / 2, canvas.height / 2, canvas.width / 2 // Outer circle (center and radius)
);

// Add color stops
gradient.addColorStop(0.4, "#FF1414");
gradient.addColorStop(0.62, "#C71010");
gradient.addColorStop(0.93, "#990C0C");

// Fill the canvas with the gradient
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);
