import type { ConversionOptionsProps } from "@/app/convert/types/conversionTypes";
import React, { useState } from "react";

import { useConversionErrors } from "@/app/convert/hooks/useConversionErrors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import AttributeRulesSection from "./lib/AttributeRulesSection";
import DeleteTagsSection from "./lib/DeleteTagsSection";
import IgnoreTagsSection from "./lib/IgnoreTagsSection";
import PresetsSection from "./lib/PresetsSection";
import TagConversionsSection from "./lib/TagConversionsSection";

const ConversionOptions = ({
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
}: ConversionOptionsProps) => {
  const [currentPreset, setCurrentPreset] = useState("");
  const { errors, validateAndSetErrors } = useConversionErrors();

  return (
    <Card className="shadow-xl transition-all duration-300 hover:shadow-2xl">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="text-center text-2xl font-bold">
          Conversion Options
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-[calc(100vh-20rem)] space-y-6 overflow-y-auto p-6">
        <PresetsSection
          deleteTags={deleteTags}
          setDeleteTags={setDeleteTags}
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
