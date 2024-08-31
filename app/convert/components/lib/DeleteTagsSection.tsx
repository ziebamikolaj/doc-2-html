import type { DeleteTagsSectionProps } from "@/app/convert/types/conversionTypes";
import React from "react";
import { Info } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DeleteTagsSection = ({
  deleteTags,
  setDeleteTags,
  errors,
  validateAndSetErrors,
}: DeleteTagsSectionProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDeleteTags = e.target.value;
    setDeleteTags(newDeleteTags);
    validateAndSetErrors("deleteTags", newDeleteTags);
  };

  return (
    <div className="space-y-4">
      <h3 className="flex items-center text-lg font-semibold">
        Tags to Delete
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="ml-2 size-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Specify tags to be deleted during conversion</p>
              <p>
                For instance, you can delete all underlines (
                <b>with all its content</b>) from your document by deleting the
                <b> u tag</b>.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h3>
      <div className="space-y-2">
        <Input
          value={deleteTags}
          onChange={handleInputChange}
          placeholder="e.g., u, b, i"
          className="w-full"
        />
        {errors && <p className="text-sm text-red-500">{errors}</p>}
      </div>
    </div>
  );
};

export default DeleteTagsSection;
