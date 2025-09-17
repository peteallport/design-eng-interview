"use client";

import { Settings, X } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Slider } from "~/components/ui/slider";
import { Switch } from "~/components/ui/switch";

export interface SimulationSettings {
  streamingInterval: number;
  toolLoadingTime: number;
  simulateError: boolean;
}

interface SimulationToolbarProps {
  settings: SimulationSettings;
  onSettingsChange: (settings: SimulationSettings) => void;
}

export function SimulationToolbar({
  settings,
  onSettingsChange,
}: SimulationToolbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateSetting = <K extends keyof SimulationSettings>(
    key: K,
    value: SimulationSettings[K]
  ) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg"
          variant="outline"
        >
          {isOpen ? <X className="size-5" /> : <Settings className="size-5" />}
        </Button>
      </div>

      {/* Settings Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-40">
          <Card className="w-80 p-6 shadow-xl">
            <div className="space-y-6">
              {/* Streaming Interval Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Streaming Interval
                  </label>
                  <span className="text-sm text-muted-foreground">
                    {settings.streamingInterval}ms
                  </span>
                </div>
                <Slider
                  value={[settings.streamingInterval]}
                  onValueChange={([value]) =>
                    updateSetting("streamingInterval", value)
                  }
                  min={1}
                  max={200}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1ms</span>
                  <span>200ms</span>
                </div>
              </div>

              {/* Tool Loading Time Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Tool Loading Time
                  </label>
                  <span className="text-sm text-muted-foreground">
                    {settings.toolLoadingTime}ms
                  </span>
                </div>
                <Slider
                  value={[settings.toolLoadingTime]}
                  onValueChange={([value]) =>
                    updateSetting("toolLoadingTime", value)
                  }
                  min={100}
                  max={5000}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>100ms</span>
                  <span>5s</span>
                </div>
              </div>

              {/* Error Simulation Toggle */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Simulate Errors</label>
                  <p className="text-xs text-muted-foreground">
                    Randomly trigger errors in responses
                  </p>
                </div>
                <Switch
                  checked={settings.simulateError}
                  onCheckedChange={(checked) =>
                    updateSetting("simulateError", checked)
                  }
                />
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
