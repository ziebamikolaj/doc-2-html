import type { AttributeRule, TagConversion } from "./conversionTypes";

export interface ConversionSettings {
  ignoreTags: Array<IgnoreTagRule>;
  tagConversions: Array<TagConversion>;
  attributeRules: Array<AttributeRule>;
  deleteTags: Array<DeleteTagRule>;
}
