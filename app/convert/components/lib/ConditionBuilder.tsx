import type { Condition, Rule } from "@/app/convert/types/conversionTypes";
import React, { useCallback } from "react";
import { Plus, Trash2 } from "lucide-react";

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
  const addCondition = useCallback(
    (operator: string) => {
      setRule({
        ...rule,
        conditions: [
          ...(rule.conditions || []),
          {
            property: "",
            operator: operator.toLowerCase().replace(" ", ""),
            value: "",
          },
        ],
      } as Rule);
    },
    [rule, setRule],
  );

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
    },
    [rule, setRule],
  );

  const updateLogic = useCallback(
    (logic: "AND" | "OR") => {
      setRule({
        ...rule,
        logic,
      });
    },
    [rule, setRule],
  );

  const operators = [
    "Contains",
    "Starts with",
    "Ends with",
    "Equals",
    "Matches (regex)",
  ];

  return (
    <div className="space-y-4">
      <h4 className="font-medium">Conditions</h4>
      {rule.conditions && rule.conditions.length > 0 && (
        <Select onValueChange={updateLogic} value={rule.logic}>
          <SelectTrigger className="w-[180px]">
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
          <div key={index} className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {operators.map((op) => (
                <Button
                  key={op}
                  variant={
                    condition.operator === op.toLowerCase().replace(" ", "")
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    updateCondition(
                      index,
                      "operator",
                      op.toLowerCase().replace(" ", ""),
                    )
                  }
                >
                  {op}
                </Button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Input
                value={condition.property}
                onChange={(e) =>
                  updateCondition(index, "property", e.target.value)
                }
                placeholder="Property"
              />
              <Input
                value={condition.value}
                onChange={(e) =>
                  updateCondition(index, "value", e.target.value)
                }
                placeholder="Value"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteCondition(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      <Button
        onClick={() => addCondition("contains")}
        variant="outline"
        size="sm"
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Condition
      </Button>
    </div>
  );
};

export default ConditionBuilder;
