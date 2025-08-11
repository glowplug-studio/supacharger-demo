'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowUpDown, Check, Crown,Eye, HelpCircle, Play, Radio, Upload, X } from 'lucide-react';
import { Trash2,X as XIcon } from 'lucide-react';

import Header from '@/components/Header';
import SubmissionsChart from '@/components/SubmissionsChart';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UnifiedBadge } from '@/components/ui/unified-badge';

// Sample uploaded content data with comments
const uploadedContent = [
  {
    id: 1,
    thumbnail: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=150',
    fullImage: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    uploadDate: '2024-01-12 20:15',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    authorName: 'Alex Johnson',
    comment: 'What an amazing moment! The sunset was perfect.',
    moderationStatus: 'pending',
    type: 'image'
  },
  {
    id: 2,
    thumbnail: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=150',
    fullImage: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=800',
    uploadDate: '2024-01-12 20:22',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    authorName: 'Sarah Wilson',
    comment: 'Love this candid shot!',
    moderationStatus: 'pending',
    type: 'image'
  },
  {
    id: 3,
    thumbnail: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=150',
    fullImage: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
    uploadDate: '2024-01-12 20:35',
    authorAvatar: null,
    authorName: 'Anonymous',
    moderationStatus: 'approved',
    type: 'image'
  },
  {
    id: 4,
    thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=150',
    fullImage: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
    uploadDate: '2024-01-12 21:10',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    authorName: 'Mike Chen',
    comment: 'The energy in this room was incredible!',
    moderationStatus: 'approved',
    type: 'video'
  },
  {
    id: 5,
    thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=150',
    fullImage: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    uploadDate: '2024-01-12 21:45',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    authorName: 'Emma Davis',
    moderationStatus: 'approved',
    type: 'image'
  },
  {
    id: 6,
    thumbnail: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=150',
    fullImage: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800',
    uploadDate: '2024-01-12 22:15',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    authorName: 'David Kim',
    comment: 'Beautiful ceremony, congratulations!',
    moderationStatus: 'rejected',
    type: 'image'
  }
];

export default function EventDetails() {
  const router = useRouter();
  const [moderationEnabled, setModerationEnabled] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Static event data
  const event = {
    id: "LIVE-NOW-123",
    type: "pro",
    title: "New Year's Eve Party 2024",
    location: "Downtown Convention Center",
    startDate: "2024-12-31",
    startTime: "20:00",
    endDate: "2025-01-01",
    endTime: "02:00",
    submissionOpenDate: "2024-12-31",
    submissionOpenTime: "19:30",
    submissionCloseDate: "2025-01-01",
    submissionCloseTime: "03:00",
    photoCount: 156,
    videoCount: 12,
    uploadFormLink: "https://app.snapscreen.co/event/LIVE-NOW-123",
    galleryLink: "https://gallery.snapscreen.co/event/LIVE-NOW-123",
    expiresInDays: 30,
    status: "active"
  };

  // Sort content based on upload date and sort order
  const sortedContent = [...uploadedContent].sort((a, b) => {
    const dateA = new Date(a.uploadDate);
    const dateB = new Date(b.uploadDate);
    return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });

  const handleBack = () => {
    router.push('/events');
  };

  const handleApprove = (id: number) => {
    console.log('Approving content:', id);
    // Handle approval logic here
  };

  const handleReject = (id: number) => {
    console.log('Rejecting content:', id);
    // Handle rejection logic here
  };

  const handleDelete = (id: number) => {
    console.log('Deleting content:', id);
    // Handle deletion logic here
  };

  const handleThumbnailClick = (content: any) => {
    setSelectedContent(content);
    setPreviewModalOpen(true);
  };

  const getStatusIndicator = (status: string) => {
    if (status === 'approved') {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Approved</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    } else if (status === 'pending') {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Pending approval</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    } else if (status === 'rejected') {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <X className="w-4 h-4 text-white" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Rejected</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    return null;
  };

  // Check if event is currently live
  const isEventLive = (() => {
    const now = new Date();
    const uploadWindowStart = event.submissionOpenDate && event.submissionOpenTime 
      ? new Date(`${event.submissionOpenDate}T${event.submissionOpenTime}`)
      : null;
    const uploadWindowEnd = event.submissionCloseDate && event.submissionCloseTime 
      ? new Date(`${event.submissionCloseDate}T${event.submissionCloseTime}`)
      : null;
    
    // Upload window start date < now AND upload window end date > now
    return uploadWindowStart && uploadWindowEnd && 
      uploadWindowStart < now && uploadWindowEnd > now;
  })();

  // Filter content based on moderation status
  const unmoderatedContent = sortedContent.filter(content => content.moderationStatus === 'pending');
  const moderatedContent = sortedContent.filter(content => content.moderationStatus !== 'pending');

  const ContentTable = ({ content, title }: { content: any[], title: string }) => (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">{content.length} items</p>
          </div>
          
          {/* Sort by upload time */}
          <div className="flex items-center space-x-2">
            <Label className="text-sm text-gray-600">Sort by upload time:</Label>
            <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest first</SelectItem>
                <SelectItem value="asc">Oldest first</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Thumbnail</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {content.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleThumbnailClick(item)}
                    >
                      <img 
                        src={item.thumbnail} 
                        alt="Content thumbnail" 
                        className="w-full h-full object-cover"
                      />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                          <Play className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-50 transition-opacity">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    {getStatusIndicator(item.moderationStatus)}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {item.uploadDate}
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={item.authorAvatar || undefined} />
                        <AvatarFallback className="text-xs">
                          {item.authorName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-900">{item.authorName}</span>
                    </div>
                    {item.comment && (
                      <p className="text-xs text-gray-600 italic ml-8">"{item.comment}"</p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-1">
                    {item.moderationStatus === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApprove(item.id)}
                          className="h-8 px-2 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(item.id)}
                          className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(item.id)}
                      className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Yellow My Events Header */}
      <div className="bg-[#FFE51F] text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="flex items-center space-x-2 text-black hover:text-gray-700 hover:bg-yellow-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>My Events</span>
              </Button>
              
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold">{event.title}</h1>
                
                {/* Live Icon */}
                {isEventLive && (
                  <div className="flex items-center space-x-2 bg-black text-white px-3 py-1.5 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>LIVE</span>
                  </div>
                )}
                
                {/* Package Type Badge */}
                <UnifiedBadge 
                  type={event.type as 'free' | 'pro' | 'unlimited'} 
                  size="sm"
                />
              </div>
            </div>
            
            {/* Upgrade Event Button */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                disabled={event.type === 'pro' || event.type === 'unlimited'}
                className={`flex items-center space-x-2 ${
                  event.type === 'free' 
                    ? 'text-blue-600 border-blue-600 hover:bg-blue-50' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <Crown className="w-4 h-4" />
                <span>Upgrade Event</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="content" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger 
                value="content"
                onClick={() => router.push('/events/event-detail')}
              >
                Content
              </TabsTrigger>
              <TabsTrigger 
                value="details"
                onClick={() => router.push('/events/event-detail/details')}
              >
                Details
              </TabsTrigger>
            </TabsList>
            
            {/* Upload Files Button */}
            <Button
              onClick={() => setUploadModalOpen(true)}
              className="flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Files</span>
            </Button>
          </div>
          
          <TabsContent value="content" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Content Tables */}
              <div className="lg:col-span-2">
                {/* Moderation Toggle */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="moderation-toggle" className="text-sm font-medium text-gray-900">
                        Moderation
                      </Label>
                      <p className="text-xs text-gray-600">Enable content moderation for this event</p>
                    </div>
                    <Switch
                      id="moderation-toggle"
                      checked={moderationEnabled}
                      onCheckedChange={setModerationEnabled}
                    />
                  </div>
                </div>

                {/* Content Sections */}
                {moderationEnabled && unmoderatedContent.length > 0 && (
                  <ContentTable content={unmoderatedContent} title="Unmoderated Content" />
                )}
                
                <ContentTable 
                  content={moderationEnabled ? moderatedContent : uploadedContent} 
                  title={moderationEnabled ? "Moderated Content" : "All Content"} 
                />
              </div>
              
              {/* Right Column - Event Info */}
              <div className="lg:col-span-1">
                {/* Submissions Chart */}
                <SubmissionsChart className="mb-6" />
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Upload Form Link</label>
                      <p className="text-gray-900 break-all text-sm">{event.uploadFormLink}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Link</label>
                      <p className="text-gray-900 break-all text-sm">{event.galleryLink}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Submission Window</h4>
                      <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-gray-600">Open:</span>
                            <p className="text-gray-900">{event.submissionOpenDate} {event.submissionOpenTime}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Close:</span>
                            <p className="text-gray-900">{event.submissionCloseDate} {event.submissionCloseTime}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Event Status</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className="text-gray-900 capitalize">{event.status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Expires in:</span>
                          <span className="text-gray-900">{event.expiresInDays} days</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Photos</label>
                        <p className="text-2xl font-bold text-gray-900">{event.photoCount}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Videos</label>
                        <p className="text-2xl font-bold text-gray-900">{event.videoCount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Upload Files Modal */}
      <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">Drag and drop files here, or click to select</p>
              <Button variant="outline">Choose Files</Button>
            </div>
            <p className="text-xs text-gray-500">Supported formats: JPG, PNG, MP4, MOV (max 50MB)</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <Dialog open={previewModalOpen} onOpenChange={setPreviewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Content Preview</DialogTitle>
          </DialogHeader>
          {selectedContent && (
            <div className="space-y-4">
              <div className="flex justify-center">
                {selectedContent.type === 'video' ? (
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <img 
                      src={selectedContent.fullImage} 
                      alt="Video thumbnail" 
                      className="max-w-full max-h-96 object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-gray-800 ml-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={selectedContent.fullImage} 
                    alt="Content preview" 
                    className="max-w-full max-h-96 object-contain rounded-lg"
                  />
                )}
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={selectedContent.authorAvatar || undefined} />
                    <AvatarFallback>
                      {selectedContent.authorName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{selectedContent.authorName}</p>
                    <p className="text-sm text-gray-600">{selectedContent.uploadDate}</p>
                  </div>
                  {getStatusIndicator(selectedContent.moderationStatus)}
                </div>
                
                {selectedContent.comment && (
                  <p className="text-gray-700 italic">"{selectedContent.comment}"</p>
                )}
              </div>
              
              {selectedContent.moderationStatus === 'pending' && (
                <div className="flex justify-center space-x-3">
                  <Button
                    onClick={() => {
                      handleApprove(selectedContent.id);
                      setPreviewModalOpen(false);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleReject(selectedContent.id);
                      setPreviewModalOpen(false);
                    }}
                  >
                    <XIcon className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}