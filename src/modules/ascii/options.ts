import {IOptions} from "@/app/ascii/image/page";

export const defaultOptions: IOptions = {
  resolution: { width: 100, height: 100 },
  asciiChars: ['@', '%', '#', '*', '+', '=', '-', ':', '.',' '],
  brightnessWeight: { red: 1, green: 1, blue: 1 },
  fontSize: 1,
  lineHeight: 1
}
