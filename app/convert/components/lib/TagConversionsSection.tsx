import type {
  TagConversion,
  TagConversionsSectionProps,
} from "@/app/convert/types/conversionTypes";
import React, { useState } from "react";
import { ChevronDown, ChevronRight, Info, Plus, X } from "lucide-react";

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
  const [expandedConversions, setExpandedConversions] = useState<number[]>([]);

  const addTagConversion = () => {
    const newIndex = tagConversions.length;
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
    setExpandedConversions([newIndex]);
  };

  const removeTagConversion = (index: number) => {
    const newTagConversions = tagConversions.filter((_, i) => i !== index);
    setTagConversions(newTagConversions);
    validateAndSetErrors("tagConversions", newTagConversions);
    setExpandedConversions(expandedConversions.filter((i) => i !== index));
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

  const toggleConversion = (index: number) => {
    setExpandedConversions(
      expandedConversions.includes(index)
        ? expandedConversions.filter((i) => i !== index)
        : [...expandedConversions, index],
    );
  };

  const getConversionSummary = (conversion: TagConversion) => {
    if (!conversion.from || !conversion.to) {
      return "Not set";
    }
    return `${conversion.from} → ${conversion.to}`;
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
        <div key={index} className="rounded border bg-secondary/20 p-4">
          <div className="flex items-center justify-between">
            <div
              className="flex-grow cursor-pointer font-medium"
              onClick={() => toggleConversion(index)}
            >
              Conversion {index + 1}: {getConversionSummary(conversion)}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleConversion(index)}
              >
                {expandedConversions.includes(index) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeTagConversion(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {expandedConversions.includes(index) && (
            <div className="mt-2 space-y-2">
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
                  onChange={(e) =>
                    updateTagConversion(index, "to", e.target.value)
                  }
                  placeholder="To tag"
                />
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
