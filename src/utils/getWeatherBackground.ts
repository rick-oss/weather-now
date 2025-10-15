import sunnyBg from "../assets/videos/sunny.mp4";
import cloudyBg from "../assets/videos/cloudy.mp4";
import overcastBg from "../assets/videos/overcast.mp4";
import fogBg from "../assets/videos/fog.mp4";
import drizzleBg from "../assets/videos/drizzle.mp4";
import rainBg from "../assets/videos/rain.mp4";
import stormBg from "../assets/videos/storm.mp4";
import snowBg from "../assets/videos/snow.mp4";

import defaultBg from "../assets/bg-today-large.svg";

export function getWeatherBackground(code: number) {
  switch (code) {
    case 0:
      return sunnyBg;
    case 1:
    case 2:
      return cloudyBg;
    case 3:
      return overcastBg;
    case 45:
    case 48:
      return fogBg;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return drizzleBg;
    case 61:
    case 63:
    case 65:
    case 80:
    case 81:
    case 82:
      return rainBg;
    case 66:
    case 67:
    case 95:
    case 96:
    case 99:
      return stormBg;
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return snowBg;
    default:
      return defaultBg;
  }
}
