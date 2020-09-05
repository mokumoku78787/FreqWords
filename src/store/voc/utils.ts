import { OrderType, LangType } from "./types";


export const getLevelLabel = (level: number): string => {
  switch (level) {
    case 0:
      return 'All';
    case 1:
      return 'Unchecked';
    case 2:
      return 'Checked';
    default:
      return 'All'
  }
}

export const getOrderLabel = (order: OrderType): string => {
  switch (order) {
    case 'ORDER_ID_ASC':
      return 'Frequency';
    case 'ORDER_ID_DESC':
      return 'Frequency Rev.';
    case 'ORDER_TEXT_ASC':
      return 'ABC';
    case 'ORDER_TEXT_DESC':
      return 'ABC Rev.';
    case 'ORDER_RANDOM':
      return 'Random';
    default:
      return 'Frequency';
  }
}

export const getSupportedLangs = (name: string): LangType[] => {
  let langs: LangType[] = [];
  switch (name) {
    case 'German 10000':
      langs = ['LANG_EN', 'LANG_NL'];
      break;
    case 'French 10000':
      langs = ['LANG_EN'];
      break;
    case 'Spanish 10000':
      langs = ['LANG_EN'];
      break;
  }
  return langs;
}

export const getLangLabel = (lang: LangType): string => {
  switch (lang) {
    case "LANG_EN":
      return "English";
    case "LANG_NL":
      return "Dutch";
    default:
      return "Unknown";
  }
}

export const getLangCode = (lang: LangType): string => {
  switch (lang) {
    case "LANG_EN":
      return "en";
    case "LANG_NL":
      return "nl";
    default:
      return "en";
  }
}
