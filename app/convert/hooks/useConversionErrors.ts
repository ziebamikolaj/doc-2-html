"use client";

import { useState } from "react";

export const useConversionErrors = () => {
  const [errors, setErrors] = useState<{
    ignoreTags: string[];
    tagConversions: Array<string | null>;
    attributeRules: Array<string | null>;
  }>({
    ignoreTags: [],
    tagConversions: [],
    attributeRules: [],
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
    fromAttribute: string,
    fromValue: string,
    toAttribute: string,
    toValue: string,
  ): string => {
    if (tag.trim() === "") {
      return "Tag must be specified";
    }
    if (fromAttribute.trim() === "" && fromValue.trim() === "") {
      return "Either 'From Attribute' or 'From Value' must be specified";
    }
    if (toAttribute.trim() === "" && toValue.trim() === "") {
      return "Either 'To Attribute' or 'To Value' must be specified";
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
        (rule: {
          tag: string;
          fromAttribute: string;
          fromValue: string;
          toAttribute: string;
          toValue: string;
        }) =>
          validateAttributeRule(
            rule.tag,
            rule.fromAttribute,
            rule.fromValue,
            rule.toAttribute,
            rule.toValue,
          ),
      );
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
  };

  return { errors, validateAndSetErrors };
};
