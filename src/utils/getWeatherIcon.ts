import iconRain from "../assets/icon-rain.webp";
import iconDrizzle from "../assets/icon-drizzle.webp";
import iconSunny from "../assets/icon-sunny.webp";
import iconPartlyCloud from "../assets/icon-partly-cloudy.webp";
import iconStorm from "../assets/icon-storm.webp";
import iconSnow from "../assets/icon-snow.webp";
import iconFog from "../assets/icon-fog.webp";
import iconOvercast from "../assets/icon-overcast.webp";

export function getWeatherIcon(code: number) {
  switch (code) {
    case 0:
      return iconSunny;
    case 1:
    case 2:
      return iconPartlyCloud;
    case 3:
      return iconOvercast;
    case 45:
    case 48:
      return iconFog;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return iconDrizzle;
    case 61:
    case 63:
    case 65:
    case 80:
    case 81:
    case 82:
      return iconRain;
    case 66:
    case 67:
    case 95:
    case 96:
    case 99:
      return iconStorm;
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return iconSnow;
    default:
      return iconOvercast;
  }
}
