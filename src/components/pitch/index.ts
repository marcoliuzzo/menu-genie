import Slide01Hero from "./slides/Slide01Hero";
import Slide02Validation from "./slides/Slide02Validation";
import Slide03Problem from "./slides/Slide03Problem";
import Slide04Personas from "./slides/Slide04Personas";
import Slide04WhyNow from "./slides/Slide04WhyNow";
import Slide05Market from "./slides/Slide05Market";
import Slide07Product from "./slides/Slide07Product";
import Slide08Mood from "./slides/Slide08Mood";
import Slide09MarketGap from "./slides/Slide09MarketGap";
import Slide10WhyWeWin from "./slides/Slide10WhyWeWin";
import Slide11Business from "./slides/Slide11Business";
import Slide11GTM from "./slides/Slide11GTM";
import Slide12Flywheel from "./slides/Slide12Flywheel";
import Slide13Roadmap from "./slides/Slide13Roadmap";
import Slide14Financials from "./slides/Slide14Financials";
import Slide15Team from "./slides/Slide15Team";
import Slide16Vision from "./slides/Slide16Vision";
import Slide17Closing from "./slides/Slide17Closing";

// New narrative order:
// 1 Hero, 2 Problem, 3 Validation, 4 Product, 5 Personas,
// 6 WhyNow, 7 Market, 8 Mood, 9 MarketGap, 10 WhyWeWin,
// 11 Business, 12 GTM, 13 Flywheel, 14 Roadmap, 15 Financials,
// 16 Team, 17 Vision, 18 Closing
export const slides = [
  Slide01Hero,
  Slide03Problem,
  Slide02Validation,
  Slide07Product,
  Slide04Personas,
  Slide04WhyNow,
  Slide05Market,
  Slide08Mood,
  Slide09MarketGap,
  Slide10WhyWeWin,
  Slide11Business,
  Slide11GTM,
  Slide12Flywheel,
  Slide13Roadmap,
  Slide14Financials,
  Slide15Team,
  Slide16Vision,
  Slide17Closing,
];

// Steps per slide, matching order above
export const slideSteps = [4, 5, 3, 4, 5, 5, 4, 6, 5, 7, 5, 7, 5, 5, 5, 1, 5, 5];
