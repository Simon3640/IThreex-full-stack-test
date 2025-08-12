import { LocaleTypeEnum } from "./locale-type-enum";
import enLocal from "./messages/en-local";
import esLocal from "./messages/es-local";
import { MessageKeysDictionaryEnum } from "./messages/keys";

export class Locale {
  localeType: LocaleTypeEnum;
  constructor(localeType: LocaleTypeEnum) {
    this.localeType = localeType;
  }

  static getLocale(locale: LocaleTypeEnum): Record<string, string> {
    const locales = {
      [LocaleTypeEnum.ES]: esLocal,
      [LocaleTypeEnum.EN]: enLocal,
      [LocaleTypeEnum.ES_CO]: esLocal,
      [LocaleTypeEnum.EN_US]: enLocal,
    };
    return locales[locale] || enLocal;
  }

  get(localeType: LocaleTypeEnum, key: MessageKeysDictionaryEnum): string {
    const locale = Locale.getLocale(localeType);
    return locale[key] || `Missing translation for ${key}`;
  }
}