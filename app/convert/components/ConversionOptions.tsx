import React from "react";
import { Info, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ConversionOptionsProps {
  ignoreTags: string[];
  setIgnoreTags: React.Dispatch<React.SetStateAction<string[]>>;
  tagConversions: Array<{ from: string; to: string }>;
  setTagConversions: React.Dispatch<
    React.SetStateAction<Array<{ from: string; to: string }>>
  >;
  attributeRules: Array<{
    tag: string;
    attribute: string;
    value: string;
    condition: string;
  }>;
  setAttributeRules: React.Dispatch<
    React.SetStateAction<
      Array<{
        tag: string;
        attribute: string;
        value: string;
        condition: string;
      }>
    >
  >;
}

const ConversionOptions: React.FC<ConversionOptionsProps> = ({
  ignoreTags,
  setIgnoreTags,
  tagConversions,
  setTagConversions,
  attributeRules,
  setAttributeRules,
}) => {
  const addIgnoreTag = () => {
    setIgnoreTags([...ignoreTags, ""]);
  };

  const updateIgnoreTag = (index: number, value: string) => {
    const newIgnoreTags = [...ignoreTags];
    newIgnoreTags[index] = value;
    setIgnoreTags(newIgnoreTags);
  };

  const removeIgnoreTag = (index: number) => {
    setIgnoreTags(ignoreTags.filter((_, i) => i !== index));
  };

  const addTagConversion = () => {
    setTagConversions([...tagConversions, { from: "", to: "" }]);
  };

  const updateTagConversion = (
    index: number,
    field: "from" | "to",
    value: string,
  ) => {
    const newTagConversions = tagConversions.map((conversion, i) =>
      i === index ? { ...conversion, [field]: value } : conversion,
    );
    setTagConversions(newTagConversions);
  };

  const removeTagConversion = (index: number) => {
    setTagConversions(tagConversions.filter((_, i) => i !== index));
  };

  const addAttributeRule = () => {
    setAttributeRules([
      ...attributeRules,
      { tag: "", attribute: "", value: "", condition: "" },
    ]);
  };

  const updateAttributeRule = (
    index: number,
    field: keyof (typeof attributeRules)[0],
    value: string,
  ) => {
    const newAttributeRules = attributeRules.map((rule, i) =>
      i === index ? { ...rule, [field]: value } : rule,
    );
    setAttributeRules(newAttributeRules);
  };
  const removeAttributeRule = (index: number) => {
    setAttributeRules(attributeRules.filter((_, i) => i !== index));
  };

  return (
    <Card className="w-full shadow-lg md:w-1/2">
      <CardHeader className="rounded-t-lg bg-primary/10">
        <CardTitle className="text-center text-2xl font-bold text-primary">
          Conversion Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 overflow-auto p-6 md:max-h-[60vh]">
        {/* Ignore Tags Section */}
        <div className="space-y-4">
          <h3 className="flex items-center text-lg font-semibold">
            Tags to Ignore
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="ml-2 size-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Specify tags to be ignored during conversion</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h3>
          {ignoreTags.map((tag, index) => (
            <div key={index} className="flex items-center">
              <Input
                value={tag}
                onChange={(e) => updateIgnoreTag(index, e.target.value)}
                placeholder="e.g., u, b, i"
                className="mr-2"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeIgnoreTag(index)}
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
          <Button onClick={addIgnoreTag} variant="outline" className="w-full">
            <Plus className="mr-2 size-4" /> Add Tag to Ignore
          </Button>
        </div>

        {/* Tag Conversions Section */}
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
            <div key={index} className="flex items-center">
              <Input
                value={conversion.from}
                onChange={(e) =>
                  updateTagConversion(index, "from", e.target.value)
                }
                placeholder="From tag"
                className="mr-2"
              />
              <Input
                value={conversion.to}
                onChange={(e) =>
                  updateTagConversion(index, "to", e.target.value)
                }
                placeholder="To tag"
                className="mr-2"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeTagConversion(index)}
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
          <Button
            onClick={addTagConversion}
            variant="outline"
            className="w-full"
          >
            <Plus className="mr-2 size-4" /> Add Tag Conversion
          </Button>
        </div>

        {/* Attribute Rules Section */}
        <div className="space-y-4">
          <h3 className="flex items-center text-lg font-semibold">
            Attribute Rules
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="ml-2 size-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Set rules for handling attributes during conversion</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h3>
          {attributeRules.map((rule, index) => (
            <div
              key={index}
              className="space-y-2 rounded border bg-secondary/20 p-4"
            >
              <div className="flex items-center space-x-2">
                <Input
                  value={rule.tag}
                  onChange={(e) =>
                    updateAttributeRule(index, "tag", e.target.value)
                  }
                  placeholder="Tag"
                />
                <Input
                  value={rule.attribute}
                  onChange={(e) =>
                    updateAttributeRule(index, "attribute", e.target.value)
                  }
                  placeholder="Attribute"
                />
                <Input
                  value={rule.value}
                  onChange={(e) =>
                    updateAttributeRule(index, "value", e.target.value)
                  }
                  placeholder="Value"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAttributeRule(index)}
                >
                  <X className="size-4" />
                </Button>
              </div>
              <Input
                value={rule.condition}
                onChange={(e) =>
                  updateAttributeRule(index, "condition", e.target.value)
                }
                placeholder="Condition (e.g., href.endsWith('.docx') || class.includes('special'))"
              />
            </div>
          ))}
          <Button
            onClick={addAttributeRule}
            variant="outline"
            className="w-full"
          >
            <Plus className="mr-2 size-4" /> Add Attribute Rule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionOptions;
