import { LocaleTypeEnum } from "./locale-type-enum";
import enLocal from "./messages/en-local";
import esLocal from "./messages/es-local";
import { MessageKeysDictionaryEnum } from "./messages/Keys";

export class Locale {
  static getLocale(locale: LocaleTypeEnum): { [key: string]: string } {
    const locales = {
      [LocaleTypeEnum.ES]: esLocal,
      [LocaleTypeEnum.EN]: enLocal,
      [LocaleTypeEnum.ES_CO]: esLocal,
      [LocaleTypeEnum.EN_US]: enLocal,
    };
    return locales[locale] || enLocal;
  }

  static get(localeType: LocaleTypeEnum, key: MessageKeysDictionaryEnum): string {
    const locale = this.getLocale(localeType);
    return locale[key] || `Missing translation for ${key}`;
  }
}