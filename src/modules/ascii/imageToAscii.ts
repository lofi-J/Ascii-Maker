const generateAsciiImage = (img: HTMLImageElement) => {
  const canvas = document.createElement('canvas'); // js로 캔버스 생성
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // set canvas size
  const width = 100;
  const height = Math.floor((img.width / img.height) * width);
  canvas.width = width;
  canvas.height = height;
  
  // draw
  ctx.drawImage(img, 0, 0, width, height);
  
  // get data
  const imageData = ctx.getImageData(0, 0, width, height);
  const {data} = imageData;
  
  // convert
  const asciiChars = ['@', '%', '#', '*', '+', '=', '-', ':', '.',' '];
  let asciiStr = '';
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const brightness = (r + g + b) / 3;
    const charIndex = Math.floor((brightness / 255) * (asciiChars.length - 1));
    asciiStr += asciiChars[charIndex];
    if ((i / 4 + 1) % width === 0) {
      asciiStr += '\n';
    }
  }
  return asciiStr;
}

export default generateAsciiImage;
