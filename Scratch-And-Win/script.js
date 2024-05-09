const scratchWin = document.getElementById("scratch-win");
const coin = document.getElementById("coin");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = 320;
const height = 160;

// Paint golden gradient
canvas.width = width;
canvas.height = height;

const gradient = ctx.createLinearGradient(0, 0, width, height);

gradient.addColorStop(0, "#d4af37");
gradient.addColorStop(0.3, "#a67c00");
gradient.addColorStop(0.5, "#d4af37");
gradient.addColorStop(0.8, "#a67c00");
gradient.addColorStop(1, "#d4af37");

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

scratchWin.classList.add("scratch-win--ready");

// Calculate transparency
const confetti = document.getElementById("confetti");
const maxPixels = width * height;

const calculateTransparency = () => {
  const imageData = ctx.getImageData(0, 0, width, height).data;
  const alphaValues = imageData.filter(
    (value, index) => index % 4 === 4 - 1 && value === 0
  );

  return alphaValues.length / maxPixels;
};

const mouseFunction = (mouse) => {
  // Move coin
  const clientX = mouse.clientX ? mouse.clientX : mouse.touches[0].clientX;
  const clientY = mouse.clientY ? mouse.clientY : mouse.touches[0].clientY;
  coin.style = `--top: ${clientY}px; --left: ${clientX}px;`;
  // Scratch
  const canvasPosition = canvas.getBoundingClientRect();
  const canvasX = clientX - canvasPosition.left;
  const canvasY = clientY - canvasPosition.top;

  if (canvasX > 0 && canvasX < width && canvasY > 0 && canvasY < height) {
    ctx.clearRect(canvasX - 10, canvasY - 10, 20, 20);

    if (calculateTransparency() > 0.6) {
      confetti.classList.add("confetti--active");
    }
  }
};

// In a real life example you should throttle these
window.addEventListener("mousemove", mouseFunction);
window.addEventListener("touchmove", mouseFunction);
