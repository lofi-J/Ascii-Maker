import {IOptions} from "@/modules/ascii/options";


const generateAsciiImage = (img: HTMLImageElement, options: IOptions) => {
  
  const canvas = document.createElement('canvas'); // 캔버스 생성
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // set canvas size
  const width = options.resolution; // 해상도 적용
  const height = Math.floor((img.width / img.height) * width);
  canvas.width = width;
  canvas.height = height;

  // draw
  ctx.drawImage(img, 0, 0, width, height);

  // get data
  const imageData = ctx.getImageData(0, 0, width, height);
  const {data} = imageData;
  
  // convert
  const asciiChars = options.asciiChars.split('');
  let asciiStr = '';
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const alpha = data[i+ 3]; // 투명도
    
    if (alpha < 50) {
      asciiStr += ' ';
    } else {
      const {red: redWeight, green: greenWeight, blue: blueWeight} = options.brightnessWeight;
      const brightness = ((r * redWeight) + (g * greenWeight) + (b * blueWeight)) / 3; // 밝기 가중치 적용
      const charIndex = Math.floor((brightness / 255) * (asciiChars.length - 1));
      asciiStr += asciiChars[charIndex];
    }
    
    // width 값을 통해 현재 계산한 인덱스가 한 행의 끝인지를 검사 후 개행 문자 삽입
    if ((i / 4 + 1) % width === 0) {
      asciiStr += '\n';
    }
  }
  return asciiStr;
}

export default generateAsciiImage;
