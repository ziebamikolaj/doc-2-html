import type { IgnoreTagsSectionProps } from "@/app/convert/types/conversionTypes";
import React from "react";
import { Info, Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const IgnoreTagsSection = ({
  ignoreTags,
  setIgnoreTags,
  errors,
  validateAndSetErrors,
}: IgnoreTagsSectionProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIgnoreTags = e.target.value;
    setIgnoreTags(newIgnoreTags);
    validateAndSetErrors("ignoreTags", newIgnoreTags);
  };

  return (
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
              <p>
                For instance, you can remove all underlines from your document
                by ignoring the <b>u tag</b>.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h3>
      <div className="space-y-2">
        <Input
          value={ignoreTags}
          onChange={handleInputChange}
          placeholder="e.g., u, b, i"
          className="w-full"
        />
        {errors && <p className="text-sm text-red-500">{errors}</p>}
      </div>
    </div>
  );
};

export default IgnoreTagsSection;
