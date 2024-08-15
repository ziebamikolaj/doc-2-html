import type { ConversionSettings } from "@/app/convert/types/conversionSettings";
import type { PresetsSectionProps } from "@/app/convert/types/conversionTypes";
import React from "react";
import { Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PresetsSection = ({
  currentPreset,
  setCurrentPreset,
  presets,
  setPresets,
  ignoreTags,
  tagConversions,
  attributeRules,
  setIgnoreTags,
  setTagConversions,
  setAttributeRules,
}: PresetsSectionProps) => {
  const savePreset = () => {
    if (currentPreset.trim() === "") return;
    const newPreset = {
      name: currentPreset,
      settings: {
        ignoreTags,
        tagConversions,
        attributeRules,
      } as ConversionSettings,
    };
    setPresets([...presets, newPreset]);
    setCurrentPreset("");
  };

  const loadPreset = (name: string) => {
    const preset = presets.find((p) => p.name === name);
    if (preset) {
      setIgnoreTags(preset.settings.ignoreTags);
      setTagConversions(preset.settings.tagConversions);
      setAttributeRules(preset.settings.attributeRules);
    }
  };

  const exportSettings = () => {
    const settings = { ignoreTags, tagConversions, attributeRules };
    const blob = new Blob([JSON.stringify(settings, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "conversion_settings.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const settings = JSON.parse(e.target?.result as string);
          setIgnoreTags(settings.ignoreTags);
          setTagConversions(settings.tagConversions);
          setAttributeRules(settings.attributeRules);
        } catch (error) {
          console.error("Error parsing settings file:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="flex items-center text-lg font-semibold">
        Presets
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="ml-2 size-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Save, load, export, and import conversion settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h3>
      <div className="flex flex-col space-y-2">
        <Input
          value={currentPreset}
          onChange={(e) => setCurrentPreset(e.target.value)}
          placeholder="Preset name"
        />
        <div className="flex space-x-2">
          <Button onClick={savePreset} variant="outline" className="flex-1">
            Save Preset
          </Button>
          <Button onClick={exportSettings} variant="outline" className="flex-1">
            Export Settings
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Input type="file" accept=".json" onChange={importSettings} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {presets.map((preset, index) => (
          <Button
            key={index}
            onClick={() => loadPreset(preset.name)}
            variant="outline"
          >
            {preset.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PresetsSection;
