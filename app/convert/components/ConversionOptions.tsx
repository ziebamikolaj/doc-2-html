import type { ConversionOptionsProps } from "@/app/convert/types/conversionTypes";
import React, { useState } from "react";

import { useConversionErrors } from "@/app/convert/hooks/useConversionErrors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import AttributeRulesSection from "./lib/AttributeRulesSection";
import IgnoreTagsSection from "./lib/IgnoreTagsSection";
import PresetsSection from "./lib/PresetsSection";
import TagConversionsSection from "./lib/TagConversionsSection";

const ConversionOptions = ({
  ignoreTags,
  setIgnoreTags,
  tagConversions,
  setTagConversions,
  attributeRules,
  setAttributeRules,
  presets,
  setPresets,
}: ConversionOptionsProps) => {
  const [currentPreset, setCurrentPreset] = useState("");
  const { errors, validateAndSetErrors } = useConversionErrors();

  return (
    <Card className="w-full shadow-lg md:w-1/2">
      <CardHeader className="rounded-t-lg bg-primary/10">
        <CardTitle className="text-center text-2xl font-bold text-primary">
          Conversion Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 overflow-auto p-6 md:h-[58vh]">
        <PresetsSection
          currentPreset={currentPreset}
          setCurrentPreset={setCurrentPreset}
          presets={presets}
          setPresets={setPresets}
          ignoreTags={ignoreTags}
          tagConversions={tagConversions}
          attributeRules={attributeRules}
          setIgnoreTags={setIgnoreTags}
          setTagConversions={setTagConversions}
          setAttributeRules={setAttributeRules}
        />
        <IgnoreTagsSection
          ignoreTags={ignoreTags}
          setIgnoreTags={setIgnoreTags}
          errors={errors.ignoreTags}
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
