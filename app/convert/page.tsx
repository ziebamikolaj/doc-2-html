"use client";

import { useState } from "react";
import byteSize from "byte-size";
import { File } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

import ConversionOptions from "./components/ConversionOptions";
import FilePreview from "./components/FilePreview";
import FileUpload from "./components/FileUpload";

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
    // TODO: Implement actual file conversion logic
    setTimeout(() => {
      setIsConverting(false);
      toast({
        title: "Conversion complete",
        description:
          "Your file has been successfully converted with the specified options.",
      });
    }, 2000);
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
            <FileUpload
              handleFileChange={handleFileChange}
              acceptedFileTypes={acceptedFileTypes}
            />
            {file && (
              <FilePreview file={file} handleRemoveFile={handleRemoveFile} />
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

        <ConversionOptions
          ignoreTags={ignoreTags}
          setIgnoreTags={setIgnoreTags}
          tagConversions={tagConversions}
          setTagConversions={setTagConversions}
          attributeRules={attributeRules}
          setAttributeRules={setAttributeRules}
        />
      </div>
    </div>
  );
};

export default Convert;
