"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import type { ConversionSettings } from "./types/conversionSettings";
import type { AttributeRule, TagConversion } from "./types/conversionTypes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

import {ConversionOptions} from "./components/ConversionOptions";
import FilePreview from "./components/FilePreview";
import FileUpload from "./components/FileUpload";
import ConvertedContent from "./components/lib/ConvertedContent";
import CopyButton from "./components/lib/CopyButton";
import DownloadButton from "./components/lib/DownloadButton";
import OutputFormatSelector from "./components/OutputFormatSelector";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { apiFetchClient } from "@/lib/apiFetchClient";
import type { IgnoreTagRule, DeleteTagRule } from "./types/conversionTypes";

const acceptedFileTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.oasis.opendocument.text",
  "application/msword",
];

const Convert = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const [ignoreTags, setIgnoreTags] = useState<IgnoreTagRule[]>([]);
  const [deleteTags, setDeleteTags] = useState<DeleteTagRule[]>([]);
  const [tagConversions, setTagConversions] = useState<Array<TagConversion>>(
    [],
  );
  const [attributeRules, setAttributeRules] = useState<Array<AttributeRule>>(
    [],
  );
  const [presets, setPresets] = useState<
    Array<{ name: string; settings: ConversionSettings }>
  >([]);
  const [outputFormat, setOutputFormat] = useState<"html" | "xml" | "htl">(
    "xml",
  );
  const [autoCopy, setAutoCopy] = useState<boolean>(false);

  const { data: userSettings } = useQuery({
    queryKey: ['userSettings'],
    queryFn: async () => {
      const response = await apiFetchClient('/api/users/me');
      return response.settings || {};
    },
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (newSettings: { [key: string]: any }) => {
      await apiFetchClient('/api/users/settings', {
        method: 'PUT',
        body: JSON.stringify({ settings: newSettings }),
      });
    },
  });

  useEffect(() => {
    if (userSettings && 'autoCopy' in userSettings) {
      setAutoCopy(userSettings.autoCopy);
    }
  }, [userSettings]);

  const convertMutation = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error("No file selected");

      const formData = new FormData();
      formData.append("file", file);

      const options = {
        ignoreTags,
        tagConversions,
        attributeRules,
        deleteTags,
      };
      formData.append("options", JSON.stringify(options));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/conversion/to-${outputFormat}`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Conversion failed");
      }

      const text = await response.text();
      return text;
    },
    onSuccess: (data) => {
      toast({
        title: "Conversion complete",
        description: `Your file has been successfully converted to ${outputFormat.toUpperCase()}.`,
      });
      if (autoCopy) {
        navigator.clipboard.writeText(data);
        toast({
          title: "Copied to clipboard",
          description: "The converted content has been automatically copied to your clipboard.",
        });
      }
    },
    onError: (error) => {
      console.error("Conversion error:", error);
      toast({
        variant: "destructive",
        title: "Conversion failed",
        description: "An error occurred during conversion. Please try again.",
      });
    },
  });

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
    convertMutation.mutate();
  };

  const handleAutoCopyChange = (checked: boolean) => {
    setAutoCopy(checked);
    updateSettingsMutation.mutate({ ...userSettings, autoCopy: checked });
  };

  const savePreset = (name: string, settings: ConversionSettings) => {
    const updatedPresets = [...presets, { name, settings }];
    setPresets(updatedPresets);
    updateSettingsMutation.mutate({ ...userSettings, presets: updatedPresets });
  };

  const loadPreset = (name: string) => {
    const preset = presets.find(p => p.name === name);
    if (preset) {
      setIgnoreTags(preset.settings.ignoreTags);
      setDeleteTags(preset.settings.deleteTags);
      setTagConversions(preset.settings.tagConversions);
      setAttributeRules(preset.settings.attributeRules);
    }
  };

  useEffect(() => {
    if (userSettings && userSettings.presets) {
      setPresets(userSettings.presets);
    }
  }, [userSettings]);
  const [currentPreset, setCurrentPreset] = useState<string>("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-primary">
          File Converter
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="shadow-xl transition-all duration-300 hover:shadow-2xl">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-center text-2xl font-bold">
                Upload & Convert
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <FileUpload
                handleFileChange={handleFileChange}
                acceptedFileTypes={acceptedFileTypes}
              />
              {file && (
                <FilePreview file={file} handleRemoveFile={handleRemoveFile} />
              )}
              <OutputFormatSelector
                outputFormat={outputFormat}
                setOutputFormat={setOutputFormat}
              />
              <Button
                onClick={handleConvert}
                disabled={!file || convertMutation.isPending}
                className="w-full text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                {convertMutation.isPending ? "Converting..." : "Convert File"}
              </Button>
              <div className="flex items-center space-x-2">
                <Switch
                  id="auto-copy"
                  checked={autoCopy}
                  onCheckedChange={handleAutoCopyChange}
                />
                <Label htmlFor="auto-copy">Auto-copy result</Label>
              </div>
            </CardContent>
          </Card>

         <ConversionOptions
          deleteTags={deleteTags}
          setDeleteTags={setDeleteTags}
          ignoreTags={ignoreTags}
          setIgnoreTags={setIgnoreTags}
          tagConversions={tagConversions}
          setTagConversions={setTagConversions}
          attributeRules={attributeRules}
          setAttributeRules={setAttributeRules}
          presets={presets}
          setPresets={setPresets}
          savePreset={savePreset}
          loadPreset={loadPreset}
          currentPreset={currentPreset}
          setCurrentPreset={setCurrentPreset}
        />
        </div>

        {convertMutation.isSuccess && (
          <div className="mt-8">
            <div className="flex w-full flex-wrap space-x-4">
              <DownloadButton
                content={convertMutation.data}
                filename={
                  file
                    ? file.name.split(".").slice(0, -1).join(".")
                    : "converted"
                }
                format={outputFormat}
              />
              <CopyButton
                content={convertMutation.data}
                format={outputFormat}
              />
            </div>
            <ConvertedContent
              content={convertMutation.data}
              format={outputFormat}
            />
          </div>
        )}

        {convertMutation.isError && (
          <div className="mt-4 text-red-500">
            An error occurred during conversion. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default Convert;
