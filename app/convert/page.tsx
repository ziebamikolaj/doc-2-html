"use client";

import { useState } from "react";
import byteSize from "byte-size";
import { File, Info, Plus, Trash2, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

const acceptedFileTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.oasis.opendocument.text",
  "application/msword",
];

const Convert = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const { toast } = useToast();

  const [ignoreTags, setIgnoreTags] = useState<string[]>([]);
  const [tagConversions, setTagConversions] = useState<
    Array<{ from: string; to: string }>
  >([]);
  const [attributeRules, setAttributeRules] = useState<
    Array<{
      tag: string;
      attribute: string;
      value: string;
      condition: string;
    }>
  >([]);

  const [preserveWhitespace, setPreserveWhitespace] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileFromUser = e.target.files[0];
      if (!acceptedFileTypes.includes(fileFromUser.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF, Word, or OpenDocument file.",
        });
        return;
      }
      setFile(fileFromUser);
      toast({
        title: "File uploaded",
        description: "Your file has been successfully uploaded.",
      });
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    toast({
      title: "File removed",
      description: "The file has been removed.",
    });
  };

  const handleConvert = () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please upload a file first.",
      });
      return;
    }
    setIsConverting(true);
    setTimeout(() => {
      setIsConverting(false);
      toast({
        title: "Conversion complete",
        description:
          "Your file has been successfully converted with the specified options.",
      });
    }, 2000);
  };

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
    const newTagConversions = [...tagConversions];
    const conversion = newTagConversions[index];
    if (conversion) {
      conversion[field] = value;
      setTagConversions(newTagConversions);
    }
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
    const newAttributeRules = [...attributeRules];
    const rule = newAttributeRules[index];
    if (rule) {
      rule[field] = value;
      setAttributeRules(newAttributeRules);
    }
  };
  const removeAttributeRule = (index: number) => {
    setAttributeRules(attributeRules.filter((_, i) => i !== index));
  };
  return (
    <div className="flex min-h-[calc(100vh-236px-65px)] items-start justify-center bg-gradient-to-b from-background to-background/80 p-8">
      <div className="flex w-full max-w-6xl flex-col gap-8 md:flex-row">
        <Card className="w-full shadow-lg md:w-1/2">
          <CardHeader className="rounded-t-lg bg-primary/10">
            <CardTitle className="text-center text-2xl font-bold text-primary">
              File Upload
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-6">
            <div className="flex flex-col items-center">
              <Input
                type="file"
                id="file"
                className="hidden"
                onChange={handleFileChange}
                accept={acceptedFileTypes.join(",")}
              />
              <Label
                htmlFor="file"
                className="cursor-pointer rounded-full bg-primary p-6 text-primary-foreground transition duration-300 hover:bg-primary/90 hover:shadow-md"
              >
                <Upload className="size-12" />
              </Label>
              <span className="mt-4 text-sm text-muted-foreground">
                Upload a PDF, Word, or OpenDocument file
              </span>
            </div>

            {file && (
              <Card className="bg-secondary/30">
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center">
                    <File className="mr-3 size-8 text-primary" />
                    <div>
                      <p className="max-w-[200px] truncate text-sm font-medium">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {byteSize(file.size).toString()}
                      </p>
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleRemoveFile}
                        >
                          <Trash2 className="size-5 text-destructive" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remove file</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardContent>
              </Card>
            )}

            <Button
              onClick={handleConvert}
              disabled={!file || isConverting}
              className="w-full text-lg font-semibold"
            >
              {isConverting ? "Converting..." : "Convert File"}
            </Button>
          </CardContent>
        </Card>

        <Card className="w-full shadow-lg md:w-1/2">
          <CardHeader className="rounded-t-lg bg-primary/10">
            <CardTitle className="text-center text-2xl font-bold text-primary">
              Conversion Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 overflow-auto p-6 md:max-h-[60vh]">
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
              <Button
                onClick={addIgnoreTag}
                variant="outline"
                className="w-full"
              >
                <Plus className="mr-2 size-4" /> Add Tag to Ignore
              </Button>
            </div>

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
      </div>
    </div>
  );
};

export default Convert;
