import type { Condition, Rule } from "@/app/convert/types/conversionTypes";
import React, { useCallback, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  GripVertical,
  Plus,
  Trash2,
} from "lucide-react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { StrictModeDroppable } from "./Droppable";

interface ConditionBuilderProps {
  rule: Rule;
  setRule: (newRule: Rule) => void;
}

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

const ConditionBuilder = ({ rule, setRule }: ConditionBuilderProps) => {
  const [expandedConditions, setExpandedConditions] = useState<number[]>([]);

  const addCondition = useCallback(() => {
    const newIndex = rule.conditions.length;
    setRule({
      ...rule,
      conditions: [
        ...rule.conditions,
        { property: "", operator: "contains", value: "" },
      ],
    });
    setExpandedConditions([newIndex]);
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

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const newConditions = Array.from(rule.conditions);
    const [reorderedItem] = newConditions.splice(result.source.index, 1);
    newConditions.splice(
      result.destination.index,
      0,
      reorderedItem as Condition,
    );

    setRule({ ...rule, conditions: newConditions });
  };

  if (!rule.conditions || rule.conditions.length === 0) {
    return (
      <Button
        onClick={addCondition}
        variant="outline"
        size="sm"
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Condition
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      {rule.conditions && rule.conditions.length > 1 && (
        <Select onValueChange={updateLogic} value={rule.logic}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Logic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AND">AND</SelectItem>
            <SelectItem value="OR">OR</SelectItem>
          </SelectContent>
        </Select>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="conditions-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {rule.conditions.map((condition, index) => (
                <Draggable
                  key={`condition-${index}`}
                  draggableId={`condition-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="mb-2 rounded-md border p-2"
                    >
                      <div className="flex items-center justify-between">
                        <div
                          {...provided.dragHandleProps}
                          className="cursor-move"
                        >
                          <GripVertical className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div
                          className="ml-2 flex-grow cursor-pointer font-medium"
                          onClick={() => toggleCondition(index)}
                        >
                          Condition {index + 1}:{" "}
                          {getConditionSummary(condition)}
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
                            <Trash2 className="h-4 w-4" />
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
      <Button
        onClick={addCondition}
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
