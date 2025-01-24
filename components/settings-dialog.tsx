'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SettingsDialog() {
  const { settings, updateSettings } = useStore();
  const [open, setOpen] = useState(false);
  const t = useTranslation(settings.language);

  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    updateSettings(localSettings);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
          <SettingsIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">{t('settings')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-3 sm:gap-4">
            <Label htmlFor="workDuration" className="text-right text-sm">
              {t('workDuration')}
            </Label>
            <Input
              id="workDuration"
              type="number"
              className="col-span-3"
              value={localSettings.workDuration}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  workDuration: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-3 sm:gap-4">
            <Label htmlFor="shortBreakDuration" className="text-right text-sm">
              {t('shortBreakDuration')}
            </Label>
            <Input
              id="shortBreakDuration"
              type="number"
              className="col-span-3"
              value={localSettings.shortBreakDuration}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  shortBreakDuration: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-3 sm:gap-4">
            <Label htmlFor="longBreakDuration" className="text-right text-sm">
              {t('longBreakDuration')}
            </Label>
            <Input
              id="longBreakDuration"
              type="number"
              className="col-span-3"
              value={localSettings.longBreakDuration}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  longBreakDuration: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-3 sm:gap-4">
            <Label htmlFor="notifications" className="text-right text-sm">
              {t('notifications')}
            </Label>
            <div className="col-span-3">
              <Switch
                id="notifications"
                checked={localSettings.notifications}
                onCheckedChange={(checked) =>
                  setLocalSettings({ ...localSettings, notifications: checked })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-3 sm:gap-4">
            <Label htmlFor="sound" className="text-right text-sm">
              {t('sound')}
            </Label>
            <div className="col-span-3">
              <Switch
                id="sound"
                checked={localSettings.sound}
                onCheckedChange={(checked) =>
                  setLocalSettings({ ...localSettings, sound: checked })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-3 sm:gap-4">
            <Label htmlFor="language" className="text-right text-sm">
              {t('language')}
            </Label>
            <Select
              value={localSettings.language}
              onValueChange={(value: 'en' | 'pt') =>
                setLocalSettings({ ...localSettings, language: value })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-3 sm:gap-4">
          <Button variant="outline" onClick={() => setOpen(false)} className="text-sm">
            {t('cancel')}
          </Button>
          <Button onClick={handleSave} className="text-sm">
            {t('save')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}