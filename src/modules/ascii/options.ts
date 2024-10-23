import {IOptions} from "@/app/ascii/image/page";


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
  lineHeight: 1,
  fontSize: 1,
  letterSpacing: 1
}
