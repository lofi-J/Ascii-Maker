export interface IOptions {
  resolution: number;
  asciiChars: string;
  brightnessWeight: { red: number, green: number, blue: number };
  lineHeight: number;
  fontSize: number;
  letterSpacing: number;
}

export const asciiCharsPreset = [
  {name: 'Default', value: '@%#*+=-:. '},
  {name: 'Binary', value: '01 '},
  {name: 'Detail', value: "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,\"^`\\'. "},
  {name: 'High Contrast', value: "@#S%?*+;:,. "},
  {name: 'Medium Contrast', value: "#8XOHLTI!;: "},
  {name: 'Bold', value: "MWNXK0Okxdolc:;,. "},
  {name: 'Simple', value: "#%*+=-:. "},
]

export const defaultOptions: IOptions = {
  resolution: 100,
  asciiChars: '@%#*+=-:. ',
  brightnessWeight: { red: 1, green: 1, blue: 1 },
  lineHeight: 0.8,
  fontSize: 8,
  letterSpacing: 1
}

export const limitOptionValue = {
  resolution: {min: 50, max: 500},
  brightnessWeight: {min: 0, max: 1},
  fontSize: {min: 5, max: 20},
  lineHeight: {min: 0.1, max: 3},
  letterSpacing: {min: 0.1, max: 10},
}

export interface IValidOptionsResult {
  isPass: boolean;
  warringList: {case: 'warring' | 'error', text: string}[];
}
export const validOptions = (options: IOptions): IValidOptionsResult => {
  let isPass = true;
  const warringList: IValidOptionsResult["warringList"] = [];
  
  // warring condition
  if (options.resolution >= 400) {
    warringList.push({case: 'warring', text: "Selecting a high resolution can increase memory usage and lead to performance degradation."});
  }
  
  const zeroWeights = [
    options.brightnessWeight.red === 0,
    options.brightnessWeight.green === 0,
    options.brightnessWeight.blue === 0
  ];
  const zeroCount = zeroWeights.filter(Boolean).length;
  if (zeroCount >= 1 && zeroCount < 3) {
    warringList.push({case: 'warring', text: "Some brightness weights are set to zero, which could affect the image conversion accuracy."});
  } else if (zeroCount === 3) {
    isPass = false;
    warringList.push({case: 'error', text: "Brightness weights cannot be all set to zero. Please adjust the values to ensure proper brightness calculation."});
  }
  
  return {isPass: isPass, warringList: warringList};
}
