import type {
  AttributeRule,
  AttributeRulesSectionProps,
  Rule,
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

const AttributeRulesSection = ({
  attributeRules,
  setAttributeRules,
  errors,
  validateAndSetErrors,
}: AttributeRulesSectionProps) => {
  const [expandedRules, setExpandedRules] = useState<number[]>([]);

  const addAttributeRule = () => {
    const newIndex = attributeRules.length;
    const newAttributeRules = [
      ...attributeRules,
      {
        tag: "",
        attribute: "",
        value: "",
        rule: { conditions: [], logic: "AND" } as Rule,
      },
    ];
    setAttributeRules(newAttributeRules);
    validateAndSetErrors("attributeRules", newAttributeRules);
    setExpandedRules([newIndex]);
  };

  const removeAttributeRule = (index: number) => {
    const newAttributeRules = attributeRules.filter((_, i) => i !== index);
    setAttributeRules(newAttributeRules);
    validateAndSetErrors("attributeRules", newAttributeRules);
    setExpandedRules(expandedRules.filter((i) => i !== index));
  };

  const updateAttributeRule = (
    index: number,
    field: keyof AttributeRule,
    value: any,
  ) => {
    const newAttributeRules = attributeRules.map((rule, i) =>
      i === index ? { ...rule, [field]: value } : rule,
    );
    setAttributeRules(newAttributeRules);
    validateAndSetErrors("attributeRules", newAttributeRules);
  };

  const toggleRule = (index: number) => {
    setExpandedRules(
      expandedRules.includes(index)
        ? expandedRules.filter((i) => i !== index)
        : [...expandedRules, index],
    );
  };

  const getRuleSummary = (rule: AttributeRule) => {
    if (!rule.tag || !rule.attribute) {
      return "Not set";
    }
    return `${rule.tag} - ${rule.attribute}${rule.value ? ` = ${rule.value}` : ""}`;
  };

  return (
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
        <div key={index} className="rounded border bg-secondary/20 p-4">
          <div className="flex items-center justify-between">
            <div
              className="flex-grow cursor-pointer font-medium"
              onClick={() => toggleRule(index)}
            >
              Rule {index + 1}: {getRuleSummary(rule)}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleRule(index)}
              >
                {expandedRules.includes(index) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeAttributeRule(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {expandedRules.includes(index) && (
            <div className="mt-2 space-y-2">
              <div className="grid grid-cols-2 gap-2">
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
              </div>
              <ConditionBuilder
                rule={rule.rule || { conditions: [], logic: "AND" }}
                setRule={(newRule) =>
                  updateAttributeRule(index, "rule", newRule)
                }
              />
              {errors[index] && (
                <p className="text-sm text-red-500">{errors[index]}</p>
              )}
            </div>
          )}
        </div>
      ))}
      <Button onClick={addAttributeRule} variant="outline" className="w-full">
        <Plus className="mr-2 size-4" /> Add Attribute Rule
      </Button>
    </div>
  );
};

export default AttributeRulesSection;
