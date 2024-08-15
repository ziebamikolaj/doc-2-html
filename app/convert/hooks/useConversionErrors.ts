"use client";

import type { Condition, Rule } from "@/app/convert/types/conversionTypes";
import { useState } from "react";

export const useConversionErrors = () => {
  const [errors, setErrors] = useState<{
    ignoreTags: string[];
    tagConversions: Array<string | null>;
    attributeRules: Array<string | null>;
    conditions: Array<string | null>;
  }>({
    ignoreTags: [],
    tagConversions: [],
    attributeRules: [],
    conditions: [],
  });

  const validateIgnoreTag = (tag: string): string => {
    return tag.trim() !== "" ? "" : "Tag cannot be empty";
  };

  const validateTagConversion = (from: string, to: string): string => {
    return from.trim() !== "" && to.trim() !== ""
      ? ""
      : 'Both "from" and "to" tags must be specified';
  };

  const validateAttributeRule = (
    tag: string,
    attribute: string,
    value: string,
  ): string => {
    if (tag.trim() === "") {
      return "Tag must be specified";
    }
    if (attribute.trim() === "" || value.trim() === "") {
      return "'Attribute' and 'Value' must be specified";
    }
    return "";
  };

  const validateCondition = (condition: Condition): string => {
    if (condition.property.trim() === "") {
      return "Property must be specified";
    }
    if (condition.operator.trim() === "") {
      return "Operator must be specified";
    }
    if (condition.value.trim() === "") {
      return "Value must be specified";
    }
    return "";
  };

  const validateRule = (rule: Rule): string => {
    if (!rule.conditions || rule.conditions.length === 0) {
      return "At least one condition must be specified";
    }
    if (rule.conditions.length > 1 && !rule.logic) {
      return "Logic (AND/OR) must be specified for multiple conditions";
    }
    return "";
  };

  const validateAndSetErrors = (field: string, value: any) => {
    let newErrors: any = {};

    if (field === "ignoreTags") {
      newErrors.ignoreTags = value.split(",").map(validateIgnoreTag);
    } else if (field === "tagConversions") {
      newErrors.tagConversions = value.map(
        (conv: { from: string; to: string }) =>
          validateTagConversion(conv.from, conv.to),
      );
    } else if (field === "attributeRules") {
      newErrors.attributeRules = value.map(
        (rule: { tag: string; attribute: string; value: string }) =>
          validateAttributeRule(rule.tag, rule.attribute, rule.value),
      );
    } else if (field === "conditions") {
      newErrors.conditions = value.map((rule: Rule) => {
        const ruleError = validateRule(rule);
        if (ruleError) return ruleError;
        return (
          rule.conditions.map(validateCondition).filter(Boolean)[0] || null
        );
      });
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
  };

  return { errors, validateAndSetErrors };
};
