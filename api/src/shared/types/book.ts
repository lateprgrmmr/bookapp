export interface Book {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  isbn: string;
  pages: number;
  coverUrl: string;
  language: string;
}

export interface BookResponse {
  items: BookItem[];
  kind: string;
  totalItems: number;
}

interface AccessInfo {
  id: string;
  etag: string;
  accessViewStatus: string;
  country: string;
  embeddable: boolean;
  publicDomain: boolean;
  webReaderLink: string;
  quoteSharingAllowed: boolean;
  textToSpeechPermission: string;
  viewability: string;
  epub: {
    isAvailable: boolean;
  };
  pdf: {
    isAvailable: boolean;
  };
}

interface VolumeInfo {
  allowAnonLogging: boolean;
  authors: string[];
  canonicalVolumeLink: string;
  categories: string[];
  contentVersion: string;
  description: string;
  imageLinks: ImageLinks;
  industryIdentifiers?: IndustryIdentifiers[];
  infoLink: string;
  language: string;
  maturityRating: string;
  panelizationSummary: PanelizationSummary;
  previewLink: string;
  printType: PrintType;
  publishedDate: string;
  publisher: string;
  readingModes: ReadingModes;
  subtitle: string;
  title: string;
}

export interface BookItem {
  accessInfo: AccessInfo;
  etag: string;
  id: string;
  kind: string;
  saleInfo: SaleInfo;
  searchInfo: SearchInfo;
  selfLink: string;
  volumeInfo: VolumeInfo;
}

interface ReadingModes {
  text: boolean;
  image: boolean;
}

interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

interface IndustryIdentifiers {
  type: "ISBN_10" | "ISBN_13" | "OTHER";
  identifier: string;
}

interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

type PrintType = "BOOK" | "MAGAZINE" | "NEWSPAPER";

interface SaleInfo {
  country: string;
  isEbook: boolean;
  saleability: "FOR_SALE" | "NOT_FOR_SALE" | "FOR_PRE_ORDER";
}

interface SearchInfo {
  textSnippet: string;
}

export enum SearchTypeEnum {
  ISBN = "isbn",
  TITLE = "title",
  KEYWORD = "keyword",
  AUTHOR = "author",
}

export const SearchOperatorEnumLookup = {
  [SearchTypeEnum.ISBN]: "isbn",
  [SearchTypeEnum.TITLE]: "title",
  [SearchTypeEnum.KEYWORD]: "keyword",
  [SearchTypeEnum.AUTHOR]: "author",
};
