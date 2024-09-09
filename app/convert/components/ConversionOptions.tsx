import React from "react";

import { useConversionErrors } from "@/app/convert/hooks/useConversionErrors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import AttributeRulesSection from "./lib/AttributeRulesSection";
import DeleteTagsSection from "./lib/DeleteTagsSection";
import IgnoreTagsSection from "./lib/IgnoreTagsSection";
import PresetsSection from "./lib/PresetsSection";
import TagConversionsSection from "./lib/TagConversionsSection";

import type { ConversionSettings } from "@/app/convert/types/conversionSettings";
import type { TagConversion } from "@/app/convert/types/conversionTypes";
import type { AttributeRule } from "@/app/convert/types/conversionTypes";

interface ConversionOptionsProps {
  deleteTags: string;
  setDeleteTags: (deleteTags: string) => void;
  ignoreTags: string;
  setIgnoreTags: (ignoreTags: string) => void;
  tagConversions: TagConversion[];
  setTagConversions: (tagConversions: TagConversion[]) => void;
  attributeRules: AttributeRule[];
  setAttributeRules: (attributeRules: AttributeRule[]) => void;
  presets: Array<{ name: string; settings: ConversionSettings }>;
  setPresets: React.Dispatch<React.SetStateAction<Array<{ name: string; settings: ConversionSettings }>>>;
  savePreset: (name: string, settings: ConversionSettings) => void;
  loadPreset: (name: string) => void;
  currentPreset: string;
  setCurrentPreset: React.Dispatch<React.SetStateAction<string>>;
}

const ConversionOptions: React.FC<ConversionOptionsProps> = ({
  deleteTags,
  setDeleteTags,
  ignoreTags,
  setIgnoreTags,
  tagConversions,
  setTagConversions,
  attributeRules,
  setAttributeRules,
  presets,
  setPresets,
  savePreset,
  loadPreset,
  currentPreset,
  setCurrentPreset,
}) => {
  const { errors, validateAndSetErrors } = useConversionErrors();

  return (
    <Card className="shadow-xl transition-all duration-300 hover:shadow-2xl">
      <CardContent className="space-y-6 p-6">
        <PresetsSection
          presets={presets}
          setPresets={setPresets}
          ignoreTags={ignoreTags}
          tagConversions={tagConversions}
          attributeRules={attributeRules}
          deleteTags={deleteTags}
          setIgnoreTags={setIgnoreTags}
          setTagConversions={setTagConversions}
          setAttributeRules={setAttributeRules}
          setDeleteTags={setDeleteTags}
          savePreset={savePreset}
          loadPreset={loadPreset}
          currentPreset={currentPreset}
          setCurrentPreset={setCurrentPreset}
        />
        <IgnoreTagsSection
          ignoreTags={ignoreTags}
          setIgnoreTags={setIgnoreTags}
          errors={errors.ignoreTags}
          validateAndSetErrors={validateAndSetErrors}
        />
        <DeleteTagsSection
          deleteTags={deleteTags}
          setDeleteTags={setDeleteTags}
          errors={errors.deleteTags}
          validateAndSetErrors={validateAndSetErrors}
        />
        <TagConversionsSection
          tagConversions={tagConversions}
          setTagConversions={setTagConversions}
          errors={errors.tagConversions}
          validateAndSetErrors={validateAndSetErrors}
        />
        <AttributeRulesSection
          attributeRules={attributeRules}
          setAttributeRules={setAttributeRules}
          errors={errors.attributeRules}
          validateAndSetErrors={validateAndSetErrors}
        />
      </CardContent>
    </Card>
  );
};

export default ConversionOptions;
