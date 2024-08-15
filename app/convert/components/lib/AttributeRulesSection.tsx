import type {
  AttributeRule,
  AttributeRulesSectionProps,
  Rule,
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

const AttributeRulesSection = ({
  attributeRules,
  setAttributeRules,
  errors,
  validateAndSetErrors,
}: AttributeRulesSectionProps) => {
  const addAttributeRule = () => {
    const newAttributeRules = [
      ...attributeRules,
      {
        tag: "",
        fromAttribute: "",
        fromValue: "",
        toAttribute: "",
        toValue: "",
        rule: { conditions: [], logic: "AND" } as Rule,
      },
    ];
    setAttributeRules(newAttributeRules);
    validateAndSetErrors("attributeRules", newAttributeRules);
  };

  const removeAttributeRule = (index: number) => {
    const newAttributeRules = attributeRules.filter((_, i) => i !== index);
    setAttributeRules(newAttributeRules);
    validateAndSetErrors("attributeRules", newAttributeRules);
  };

  const updateAttributeRule = (
    index: number,
    field: keyof (typeof attributeRules)[0],
    value: any,
  ) => {
    const newAttributeRules = attributeRules.map((rule, i) =>
      i === index ? { ...rule, [field]: value } : rule,
    );
    setAttributeRules(newAttributeRules);
    validateAndSetErrors("attributeRules", newAttributeRules);
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
        <div
          key={index}
          className="space-y-2 rounded border bg-secondary/20 p-4"
        >
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2 flex">
              <Input
                value={rule.tag}
                onChange={(e) =>
                  updateAttributeRule(index, "tag", e.target.value)
                }
                placeholder="Tag"
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
              value={rule.fromAttribute}
              onChange={(e) =>
                updateAttributeRule(index, "fromAttribute", e.target.value)
              }
              placeholder="From Attribute"
            />
            <Input
              value={rule.fromValue}
              onChange={(e) =>
                updateAttributeRule(index, "fromValue", e.target.value)
              }
              placeholder="From Value"
            />
            <Input
              value={rule.toAttribute}
              onChange={(e) =>
                updateAttributeRule(index, "toAttribute", e.target.value)
              }
              placeholder="To Attribute"
            />
            <Input
              value={rule.toValue}
              onChange={(e) =>
                updateAttributeRule(index, "toValue", e.target.value)
              }
              placeholder="To Value"
            />
          </div>

          <ConditionBuilder
            rule={rule.rule || { conditions: [], logic: "AND" }}
            setRule={(newRule) => updateAttributeRule(index, "rule", newRule)}
          />
          {errors[index] && (
            <p className="text-sm text-red-500">{errors[index]}</p>
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
