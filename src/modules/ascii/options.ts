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
  {name: 'Detail', value: "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,\"^`\\'. "},
  {name: 'High Contrast', value: "@#S%?*+;:,. "},
  {name: 'Medium Contrast', value: "#8XOHLTI!;: "},
  {name: 'Bold', value: "MWNXK0Okxdolc:;,. "},
  {name: 'Minimal', value: "#¥±=+~-. "},
  {name: 'Simple', value: "#%*+=-:. "},
]

export const defaultOptions: IOptions = {
  resolution: 100,
  asciiChars: '@%#*+=-:. ',
  brightnessWeight: { red: 1, green: 1, blue: 1 },
  lineHeight: 10,
  fontSize: 10,
  letterSpacing: 1
}

export const validOptions = (options: IOptions) => {
  // TODO 여러 테스트를 하며 로직 추가 예정
  console.log(options);
  return {value: true, status: ''};
}
