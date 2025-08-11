'use client';

import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { ArrowRight, CalendarIcon, Camera, Image, User,X } from 'lucide-react';
import { toast } from 'react-toastify';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ContinueButton } from '@/components/ui/navigation-buttons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { TimePicker } from '@/components/ui/time-picker';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UnifiedBadge } from '@/components/ui/unified-badge';
import { useGlobalState } from '@/hooks/useGlobalState';
import { getFileValidationRequirements,validateImageFile } from '@/lib/fileValidation';
import { cn } from '@/lib/utils';

interface EventBasicsData {
  eventName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  submissionOpenDate: string;
  submissionOpenTime: string;
  submissionCloseDate: string;
  submissionCloseTime: string;
  location: string;
  description: string;
  hostsName: string;
  hostsAvatar: File | null;
}

export default function EventBasicsForm() {
  const router = useRouter();
  const { proActive, setProActive, gallerySubscription } = useGlobalState();
  const [formData, setFormData] = useState<EventBasicsData>({
    eventName: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    submissionOpenDate: '',
    submissionOpenTime: '',
    submissionCloseDate: '',
    submissionCloseTime: '',
    location: '',
    description: '',
    hostsName: '',
    hostsAvatar: null,
  });

  const [fileError, setFileError] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [submissionOpenDateOpen, setSubmissionOpenDateOpen] = useState(false);
  const [submissionCloseDateOpen, setSubmissionCloseDateOpen] = useState(false);

  useEffect(() => {
    // Listen for avatar upload trigger from preview
    const handleAvatarUploadTrigger = () => {
      const fileInput = document.getElementById('avatar-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.click();
      }
    };

    window.addEventListener('triggerAvatarUpload', handleAvatarUploadTrigger);

    return () => {
      window.removeEventListener('triggerAvatarUpload', handleAvatarUploadTrigger);
    };
  }, []);

  useEffect(() => {
    // Auto-calculate end date/time when start date/time changes (regardless of pro mode)
    if (formData.startDate && formData.startTime) {
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      const endDateTime = new Date(startDateTime.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours
      
      const newFormData = {
        ...formData,
        endDate: endDateTime.toISOString().split('T')[0],
        endTime: endDateTime.toTimeString().slice(0, 5),
      };
      setFormData(newFormData);
      saveToLocalStorage(newFormData);
    }
  }, [formData.startDate, formData.startTime]);

  useEffect(() => {
    // Auto-calculate submission dates (only when dates change, not when pro mode toggles)
    if (formData.startDate && formData.startTime) {
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      
      let submissionOpenDate, submissionOpenTime, submissionCloseDate, submissionCloseTime;
      
      if (proActive) {
        // Pro mode: submissions open 7 days before event, close 1 day after event end
        const submissionOpenDateTime = new Date(startDateTime.getTime() - 7 * 24 * 60 * 60 * 1000);
        submissionOpenDate = submissionOpenDateTime.toISOString().split('T')[0];
        submissionOpenTime = submissionOpenDateTime.toTimeString().slice(0, 5);
        
        if (formData.endDate && formData.endTime) {
          const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
          const submissionCloseDateTime = new Date(endDateTime.getTime() + 24 * 60 * 60 * 1000);
          submissionCloseDate = submissionCloseDateTime.toISOString().split('T')[0];
          submissionCloseTime = submissionCloseDateTime.toTimeString().slice(0, 5);
        } else {
          submissionCloseDate = formData.submissionCloseDate;
          submissionCloseTime = formData.submissionCloseTime;
        }
      } else {
        // Non-pro mode: submissions open at event start, close at event end
        submissionOpenDate = formData.startDate;
        submissionOpenTime = formData.startTime;
        
        if (formData.endDate && formData.endTime) {
          submissionCloseDate = formData.endDate;
          submissionCloseTime = formData.endTime;
        } else {
          submissionCloseDate = formData.submissionCloseDate;
          submissionCloseTime = formData.submissionCloseTime;
        }
      }

      const newFormData = {
        ...formData,
        submissionOpenDate,
        submissionOpenTime,
        submissionCloseDate,
        submissionCloseTime
      };
      setFormData(newFormData);
      saveToLocalStorage(newFormData);
    }
  }, [formData.startDate, formData.startTime, formData.endDate, formData.endTime, proActive]);

  const saveToLocalStorage = (data: EventBasicsData) => {
    // const { hostsAvatar, ...dataToSave } = data;
    // localStorage.setItem('eventBasicsData', JSON.stringify(dataToSave));
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    const newFormData = { 
      ...formData, 
      [field]: value
    };
    setFormData(newFormData);
    saveToLocalStorage(newFormData);
    
    // Dispatch custom event for real-time preview updates
    window.dispatchEvent(new CustomEvent('eventDataUpdate', { detail: newFormData }));
  };

  const handleDateSelect = (field: string, date: Date | undefined) => {
    if (date) {
      const dateString = format(date, 'yyyy-MM-dd');
      handleInputChange(field, dateString);
      
      // Close the appropriate popover
      if (field === 'startDate') setStartDateOpen(false);
      if (field === 'endDate') setEndDateOpen(false);
      if (field === 'submissionOpenDate') setSubmissionOpenDateOpen(false);
      if (field === 'submissionCloseDate') setSubmissionCloseDateOpen(false);
    }
  };

  const getCurrentYear = () => new Date().getFullYear();
  const getYearRange = () => {
    const currentYear = getCurrentYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return years;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError('');
    
    if (file) {
      const validation = validateImageFile(file);
      if (!validation.isValid) {
        setFileError(validation.error || 'Invalid file');
        return;
      }
      
      const newFormData = { ...formData, hostsAvatar: file };
      setFormData(newFormData);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Dispatch custom event for real-time preview updates
      window.dispatchEvent(new CustomEvent('eventDataUpdate', { detail: newFormData }));
    }
  };

  const removeFile = () => {
    const newFormData = { ...formData, hostsAvatar: null };
    setFormData(newFormData);
    setPreviewUrl('');
    setFileError('');
    
    // Dispatch custom event for real-time preview updates
    window.dispatchEvent(new CustomEvent('eventDataUpdate', { detail: newFormData }));
  };

  const calculateTimeDifference = (startDate: string, startTime: string, endDate: string, endTime: string) => {
    if (!startDate || !startTime || !endDate || !endTime) return '';
    
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    const diffMs = end.getTime() - start.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ${diffHours > 0 ? `${diffHours} hour${diffHours > 1 ? 's' : ''}` : ''}`;
    }
    return `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
  };

  const handleContinue = () => {
    router.push('/create-event/page-style');
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {/* Event Title */}
        <div className="space-y-3">
          <Label htmlFor="eventName" className="text-lg font-medium text-gray-700">
            Event Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="eventName"
            type="text"
            value={formData.eventName}
            onChange={(e) => handleInputChange('eventName', e.target.value)}
            className="text-lg h-12"
            placeholder="Your Event Name"
          />
          <p className="text-sm text-gray-500">Give your event a name that will be shown to guests</p>
        </div>

        {/* Event Dates */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Event Dates</h3>
            <p className="text-sm text-gray-600">The dates that guests will be attending the event.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Start Date <span className="text-red-500">*</span>
                </Label>
                <p className="text-xs text-gray-500 mb-2">When the event starts</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-10 justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? format(new Date(formData.startDate), "MMM dd, yyyy") : "Pick date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-sm font-medium">Date</Label>
                        <Select
                          value={formData.startDate ? new Date(formData.startDate).getFullYear().toString() : getCurrentYear().toString()}
                          onValueChange={(year) => {
                            const currentDate = formData.startDate ? new Date(formData.startDate) : new Date();
                            currentDate.setFullYear(parseInt(year));
                            handleDateSelect('startDate', currentDate);
                          }}
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {getYearRange().map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Calendar
                        mode="single"
                        selected={formData.startDate ? new Date(formData.startDate) : undefined}
                        onSelect={(date) => handleDateSelect('startDate', date)}
                        initialFocus
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <div className="flex flex-col">
                  <Label className="text-xs text-gray-500 mb-1">Time</Label>
                  <TimePicker
                    value={formData.startTime}
                    onChange={(value) => handleInputChange('startTime', value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  End Date <span className="text-red-500">*</span>
                </Label>
                <p className="text-xs text-gray-500 mb-2">When the event ends</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              disabled={!proActive}
                              className={cn(
                                "h-10 justify-start text-left font-normal w-full",
                                !formData.endDate && "text-muted-foreground",
                                !proActive && "opacity-50 cursor-not-allowed"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.endDate ? format(new Date(formData.endDate), "MMM dd, yyyy") : "Pick date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <div className="p-3">
                              <div className="flex items-center justify-between mb-3">
                                <Label className="text-sm font-medium">Date</Label>
                                <Select
                                  value={formData.endDate ? new Date(formData.endDate).getFullYear().toString() : getCurrentYear().toString()}
                                  onValueChange={(year) => {
                                    const currentDate = formData.endDate ? new Date(formData.endDate) : new Date();
                                    currentDate.setFullYear(parseInt(year));
                                    handleDateSelect('endDate', currentDate);
                                  }}
                                >
                                  <SelectTrigger className="w-20">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {getYearRange().map((year) => (
                                      <SelectItem key={year} value={year.toString()}>
                                        {year}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <Calendar
                                mode="single"
                                selected={formData.endDate ? new Date(formData.endDate) : undefined}
                                onSelect={(date) => handleDateSelect('endDate', date)}
                                initialFocus
                              />
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </TooltipTrigger>
                    {!proActive && (
                      <TooltipContent>
                        <p>Enable "Need a longer Event?" to customize the end date</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
                <div className="flex flex-col">
                  <Label className="text-xs text-gray-500 mb-1">Time</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <TimePicker
                            value={formData.endTime}
                            onChange={(value) => handleInputChange('endTime', value)}
                            disabled={!proActive}
                          />
                        </div>
                      </TooltipTrigger>
                      {!proActive && (
                        <TooltipContent>
                          <p>Enable "Need a longer Event?" to customize the end time</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </div>

          {/* Need a longer event */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Need a longer Event?</h4>
                  <p className="text-sm text-gray-600">Enable this to set a custom end date and time</p>
                </div>
                <div className="flex items-center space-x-2">
                  <UnifiedBadge type="pro" showSwitch />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submission Timeframe */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Submission Timeframe</h3>
            <p className="text-sm text-gray-600">When guests can submit photos (automatically calculated)</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Submissions Open
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <Popover open={submissionOpenDateOpen} onOpenChange={setSubmissionOpenDateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-10 justify-start text-left font-normal",
                        !formData.submissionOpenDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.submissionOpenDate ? format(new Date(formData.submissionOpenDate), "MMM dd, yyyy") : "Pick date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-sm font-medium">Date</Label>
                        <Select
                          value={formData.submissionOpenDate ? new Date(formData.submissionOpenDate).getFullYear().toString() : getCurrentYear().toString()}
                          onValueChange={(year) => {
                            const currentDate = formData.submissionOpenDate ? new Date(formData.submissionOpenDate) : new Date();
                            currentDate.setFullYear(parseInt(year));
                            handleDateSelect('submissionOpenDate', currentDate);
                          }}
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {getYearRange().map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Calendar
                        mode="single"
                        selected={formData.submissionOpenDate ? new Date(formData.submissionOpenDate) : undefined}
                        onSelect={(date) => handleDateSelect('submissionOpenDate', date)}
                        initialFocus
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <div className="flex flex-col">
                  <Label className="text-xs text-gray-500 mb-1">Time</Label>
                  <TimePicker
                    value={formData.submissionOpenTime}
                    onChange={(value) => handleInputChange('submissionOpenTime', value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Submissions Close
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <Popover open={submissionCloseDateOpen} onOpenChange={setSubmissionCloseDateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-10 justify-start text-left font-normal",
                        !formData.submissionCloseDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.submissionCloseDate ? format(new Date(formData.submissionCloseDate), "MMM dd, yyyy") : "Pick date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-sm font-medium">Date</Label>
                        <Select
                          value={formData.submissionCloseDate ? new Date(formData.submissionCloseDate).getFullYear().toString() : getCurrentYear().toString()}
                          onValueChange={(year) => {
                            const currentDate = formData.submissionCloseDate ? new Date(formData.submissionCloseDate) : new Date();
                            currentDate.setFullYear(parseInt(year));
                            handleDateSelect('submissionCloseDate', currentDate);
                          }}
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {getYearRange().map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Calendar
                        mode="single"
                        selected={formData.submissionCloseDate ? new Date(formData.submissionCloseDate) : undefined}
                        onSelect={(date) => handleDateSelect('submissionCloseDate', date)}
                        initialFocus
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <div className="flex flex-col">
                  <Label className="text-xs text-gray-500 mb-1">Time</Label>
                  <TimePicker
                    value={formData.submissionCloseTime}
                    onChange={(value) => handleInputChange('submissionCloseTime', value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Time differences */}
          {formData.startDate && formData.startTime && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 space-y-2">
                <div className="text-sm">
                  <span className="font-medium text-blue-900">Submission window: </span>
                  <span className="text-blue-700">
                    {calculateTimeDifference(
                      formData.submissionOpenDate, 
                      formData.submissionOpenTime,
                      formData.submissionCloseDate, 
                      formData.submissionCloseTime
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Location Name */}
        <div className="space-y-3">
          <Label htmlFor="location" className="text-lg font-medium text-gray-700">
            Location Name
          </Label>
          <p className="text-sm text-gray-500">Describe where the event is held, "Ealing Village Hall, Brentford"</p>
          <Input
            id="location"
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="Venue name and location"
          />
        </div>

        {/* Description */}
        <div className="space-y-3">
          <Label htmlFor="description" className="text-lg font-medium text-gray-700">
            Description
          </Label>
          <p className="text-sm text-gray-500">Describe your event this will show on the event page</p>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            placeholder="Tell guests about your event..."
          />
        </div>

        {/* Hosts */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Hosts</h3>
            <p className="text-sm text-gray-500">A photo of the host or group of hosts</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="hostsName" className="text-sm font-medium text-gray-700">
                Hosts Name(s)
              </Label>
              <Input
                id="hostsName"
                type="text"
                value={formData.hostsName}
                onChange={(e) => handleInputChange('hostsName', e.target.value)}
                placeholder="Enter host names"
              />
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Hosts Avatar
              </Label>
              <p className="text-xs text-gray-500">{getFileValidationRequirements()}</p>
              
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Host avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                
                <div className="flex-1 space-y-2">
                  {!formData.hostsAvatar ? (
                    <div>
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/avif,image/webp"
                        onChange={handleFileChange}
                        className="hidden"
                        id="avatar-upload"
                      />
                      <Button variant="outline" asChild>
                        <label htmlFor="avatar-upload" className="cursor-pointer">
                          <Image className="w-4 h-4 mr-2" />
                          Choose file
                        </label>
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md">
                        <span className="text-sm text-gray-700">{formData.hostsAvatar.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                        className="p-1 h-auto text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  
                  {fileError && (
                    <p className="text-sm text-red-600">{fileError}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex justify-end">
          <ContinueButton onClick={handleContinue} />
        </div>
      </div>
    </div>
  );
}