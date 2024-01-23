import zhLocale from "i18n-iso-countries/langs/zh.json";
import countries from "i18n-iso-countries";

countries.registerLocale(zhLocale);

export const useCoutry = () => {
  const getName = (code: string, lang: string = "zh") =>
    countries.getName(code, lang);
  return {
    ...countries,
    getName,
  };
};

export default useCoutry;
