import type { AttributeRule, TagConversion } from "./conversionTypes";

export interface ConversionSettings {
  ignoreTags: string;
  tagConversions: Array<TagConversion>;
  attributeRules: Array<AttributeRule>;
  deleteTags: string;
}
