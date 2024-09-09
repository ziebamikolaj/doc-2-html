import type { ConversionSettings } from "./conversionSettings";

export interface ConversionOptionsProps {
  ignoreTags: string;
  setIgnoreTags: React.Dispatch<React.SetStateAction<string>>;
  deleteTags: string;
  setDeleteTags: React.Dispatch<React.SetStateAction<string>>;
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
  presets: Array<{ name: string; settings: ConversionSettings }>;
  setPresets: React.Dispatch<React.SetStateAction<Array<{ name: string; settings: ConversionSettings }>>>;
  currentPreset: string;
  setCurrentPreset: React.Dispatch<React.SetStateAction<string>>;
  ignoreTags: string;
  tagConversions: TagConversion[];
  attributeRules: AttributeRule[];
  deleteTags: string;
  setIgnoreTags: (ignoreTags: string) => void;
  setTagConversions: (tagConversions: TagConversion[]) => void;
  setAttributeRules: (attributeRules: AttributeRule[]) => void;
  setDeleteTags: (deleteTags: string) => void;
}

export interface IgnoreTagsSectionProps {
  ignoreTags: string;
  setIgnoreTags: (ignoreTags: string) => void;
  errors?: string;
  validateAndSetErrors?: (field: string, value: any) => void;
}

export interface DeleteTagsSectionProps {
  deleteTags: string;
  setDeleteTags: (deleteTags: string) => void;
  errors?: string[;
  validateAndSetErrors?: (field: string, value: any) => void;
}

export interface TagConversionsSectionProps {
  tagConversions: TagConversion[];
  setTagConversions: (tagConversions: TagConversion[]) => void;  
  errors?: { [key: number]: string };
  validateAndSetErrors?: (field: string, value: any) => void;
}

export interface AttributeRulesSectionProps {
  attributeRules: AttributeRule[];
  setAttributeRules: (attributeRules: AttributeRule[]) => void;
  errors?: { [key: number]: string };
  validateAndSetErrors?: (field: string, value: any) => void;
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
  attribute: string;
  value: string;
  rule?: Rule;
}
