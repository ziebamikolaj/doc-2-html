import type { ConversionSettings } from "./conversionSettings";

export interface ConversionOptionsProps {
  ignoreTags: string;
  setIgnoreTags: React.Dispatch<React.SetStateAction<string>>;
  tagConversions: Array<TagConversion>;
  setTagConversions: React.Dispatch<React.SetStateAction<Array<TagConversion>>>;
  attributeRules: Array<AttributeRule>;
  setAttributeRules: React.Dispatch<React.SetStateAction<Array<AttributeRule>>>;
  presets: Array<{ name: string; settings: ConversionSettings }>;
  setPresets: React.Dispatch<
    React.SetStateAction<Array<{ name: string; settings: ConversionSettings }>>
  >;
}

export interface PresetsSectionProps {
  currentPreset: string;
  setCurrentPreset: React.Dispatch<React.SetStateAction<string>>;
  presets: Array<{ name: string; settings: ConversionSettings }>;
  setPresets: React.Dispatch<
    React.SetStateAction<Array<{ name: string; settings: ConversionSettings }>>
  >;
  ignoreTags: string;
  tagConversions: Array<TagConversion>;
  attributeRules: Array<AttributeRule>;
  setIgnoreTags: React.Dispatch<React.SetStateAction<string>>;
  setTagConversions: React.Dispatch<React.SetStateAction<Array<TagConversion>>>;
  setAttributeRules: React.Dispatch<React.SetStateAction<Array<AttributeRule>>>;
}

export interface IgnoreTagsSectionProps {
  ignoreTags: string;
  setIgnoreTags: React.Dispatch<React.SetStateAction<string>>;
  errors: string[];
  validateAndSetErrors: (field: string, value: any) => void;
}

export interface TagConversionsSectionProps {
  tagConversions: Array<TagConversion>;
  setTagConversions: React.Dispatch<React.SetStateAction<Array<TagConversion>>>;
  errors: Array<string | null>;
  validateAndSetErrors: (field: string, value: any) => void;
}

export interface AttributeRulesSectionProps {
  attributeRules: Array<AttributeRule>;
  setAttributeRules: React.Dispatch<React.SetStateAction<Array<AttributeRule>>>;
  errors: Array<string | null>;
  validateAndSetErrors: (field: string, value: any) => void;
}

export interface Condition {
  property: string;
  operator: "contains" | "startsWith" | "endsWith" | "equals" | "matches";
  value: string;
}

export interface Rule {
  conditions: Condition[];
  logic: "AND" | "OR";
}
export interface TagConversion {
  from: string;
  to: string;
  rule?: Rule;
}

export interface AttributeRule {
  tag: string;
  fromAttribute: string;
  fromValue: string;
  toAttribute: string;
  toValue: string;
  rule: Rule;
}
