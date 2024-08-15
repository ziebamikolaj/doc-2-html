import type {
  TagConversion,
  TagConversionsSectionProps,
} from "@/app/convert/types/conversionTypes";
import React from "react";
import { Info, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import ConditionBuilder from "./ConditionBuilder";

const TagConversionsSection = ({
  tagConversions,
  setTagConversions,
  errors,
  validateAndSetErrors,
}: TagConversionsSectionProps) => {
  const addTagConversion = () => {
    const newTagConversions = [
      ...tagConversions,
      {
        from: "",
        to: "",
        rule: {
          conditions: [{ property: "", operator: "contains", value: "" }],
          logic: "AND",
        },
      } as TagConversion,
    ];
    setTagConversions(newTagConversions);
    validateAndSetErrors("tagConversions", newTagConversions);
  };

  const removeTagConversion = (index: number) => {
    const newTagConversions = tagConversions.filter((_, i) => i !== index);
    setTagConversions(newTagConversions);
    validateAndSetErrors("tagConversions", newTagConversions);
  };

  const updateTagConversion = (
    index: number,
    field: keyof TagConversion,
    value: any,
  ) => {
    const newTagConversions = tagConversions.map((conversion, i) =>
      i === index ? { ...conversion, [field]: value } : conversion,
    );
    setTagConversions(newTagConversions);
    validateAndSetErrors("tagConversions", newTagConversions);
  };

  return (
    <div className="space-y-4">
      <h3 className="flex items-center text-lg font-semibold">
        Tag Conversions
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="ml-2 size-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Define tag conversions for the output</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h3>
      {tagConversions.map((conversion, index) => (
        <div
          key={index}
          className="space-y-2 rounded border bg-secondary/20 p-4"
        >
          <div className="flex items-center space-x-2">
            <Input
              value={conversion.from}
              onChange={(e) =>
                updateTagConversion(index, "from", e.target.value)
              }
              placeholder="From tag"
            />
            <Input
              value={conversion.to}
              onChange={(e) => updateTagConversion(index, "to", e.target.value)}
              placeholder="To tag"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeTagConversion(index)}
            >
              <X className="size-4" />
            </Button>
          </div>
          <ConditionBuilder
            rule={conversion.rule || { conditions: [], logic: "AND" }}
            setRule={(newRule) => {
              updateTagConversion(index, "rule", newRule);
            }}
          />
          {errors[index] && (
            <p className="text-sm text-red-500">{errors[index]}</p>
          )}
        </div>
      ))}
      <Button onClick={addTagConversion} variant="outline" className="w-full">
        <Plus className="mr-2 size-4" /> Add Tag Conversion
      </Button>
    </div>
  );
};

export default TagConversionsSection;
