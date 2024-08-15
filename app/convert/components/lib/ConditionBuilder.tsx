import type { Condition, Rule } from "@/app/convert/types/conversionTypes";
import React, { useCallback, useState } from "react";
import { ChevronDown, ChevronRight, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ConditionBuilderProps {
  rule: Rule;
  setRule: (newRule: Rule) => void;
}

const ConditionBuilder = ({ rule, setRule }: ConditionBuilderProps) => {
  const [expandedConditions, setExpandedConditions] = useState<number[]>([]);

  const addCondition = useCallback(() => {
    const newConditionIndex = rule.conditions.length;
    setRule({
      ...rule,
      conditions: [
        ...(rule.conditions || []),
        { property: "", operator: "contains", value: "" },
      ],
    } as Rule);
    setExpandedConditions([newConditionIndex]);
  }, [rule, setRule]);

  const updateCondition = useCallback(
    (index: number, field: keyof Condition, value: string) => {
      setRule({
        ...rule,
        conditions: rule.conditions.map((cond, i) =>
          i === index ? { ...cond, [field]: value } : cond,
        ),
      });
    },
    [rule, setRule],
  );

  const deleteCondition = useCallback(
    (index: number) => {
      setRule({
        ...rule,
        conditions: rule.conditions.filter((_, i) => i !== index),
      });
      setExpandedConditions(expandedConditions.filter((i) => i !== index));
    },
    [rule, setRule, expandedConditions],
  );

  const updateLogic = useCallback(
    (logic: "AND" | "OR") => {
      setRule({ ...rule, logic });
    },
    [rule, setRule],
  );

  const toggleCondition = useCallback(
    (index: number) => {
      setExpandedConditions(
        expandedConditions.includes(index)
          ? expandedConditions.filter((i) => i !== index)
          : [...expandedConditions, index],
      );
    },
    [expandedConditions],
  );

  const operators = [
    "Contains",
    "Starts with",
    "Ends with",
    "Equals",
    "Matches",
    "Does not contain",
    "Does not start with",
    "Does not end with",
    "Does not equal",
    "Does not match",
    "Regex (syntax //gm)",
  ];

  const getConditionSummary = (condition: Condition) => {
    if (!condition.property || !condition.operator || !condition.value) {
      return "Not set";
    }
    return `${condition.property} ${condition.operator} ${condition.value}`.trim();
  };

  return (
    <div className="space-y-4">
      {rule.conditions && rule.conditions.length > 1 && (
        <Select onValueChange={updateLogic} value={rule.logic}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select logic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AND">AND</SelectItem>
            <SelectItem value="OR">OR</SelectItem>
          </SelectContent>
        </Select>
      )}
      {rule.conditions &&
        rule.conditions.map((condition, index) => (
          <div key={index} className="rounded-md border p-2">
            <div className="flex items-center justify-between">
              <div
                className="flex-grow cursor-pointer font-medium"
                onClick={() => toggleCondition(index)}
              >
                Condition {index + 1}: {getConditionSummary(condition)}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleCondition(index)}
                >
                  {expandedConditions.includes(index) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteCondition(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {expandedConditions.includes(index) && (
              <div className="mt-2 space-y-2">
                <Input
                  value={condition.property}
                  onChange={(e) =>
                    updateCondition(index, "property", e.target.value)
                  }
                  placeholder="Property"
                  className="w-full"
                />
                <Select
                  value={condition.operator}
                  onValueChange={(value) =>
                    updateCondition(index, "operator", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select operator" />
                  </SelectTrigger>
                  <SelectContent>
                    {operators.map((op) => (
                      <SelectItem
                        key={op}
                        value={op.toLowerCase().replace(/ /g, "")}
                      >
                        {op}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={condition.value}
                  onChange={(e) =>
                    updateCondition(index, "value", e.target.value)
                  }
                  placeholder="Value"
                  className="w-full"
                />
              </div>
            )}
          </div>
        ))}
      <div className="grid w-full place-items-end">
        <Button
          onClick={addCondition}
          variant="outline"
          size="sm"
          className="w-1/3"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Condition
        </Button>
      </div>
    </div>
  );
};

export default ConditionBuilder;
