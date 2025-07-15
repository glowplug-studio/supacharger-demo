# Supacharger Upload & Realtime Features

Added upload and real-time functionality to Supacharger.

## 🚀 Features Overview

### Core Systems
- **Enhanced Error Handling** - Structured error types with user-friendly messages
- **File Upload System** - Progress tracking and validation
- **File Management** - Selection, camera capture, and memory management
- **Real-time Subscriptions** - Live data updates with automatic reconnection
- **State Management** - Generic utilities for application state
- **Memory Management** - Efficient handling of large files

### New Utilities Added (`src/supacharger/utils/`)

#### 1. Enhanced Error Handling (`errors.ts`)
- **SupachargerError** - Base class with structured error types
- **SupachargerUploadError** - Upload-specific errors (RLS, bucket, file size, etc.)
- **SupachargerDatabaseError** - Database-specific errors
- **SupachargerRealtimeError** - Real-time subscription errors
- **SupachargerConfigError** - Configuration issues
- Smart error parsing from Supabase responses
- User-friendly error messages with actionable advice

#### 2. Upload Utilities (`upload.ts`)
- File upload to Supabase Storage with error handling
- Smart Supabase error parsing
- Progress tracking for multiple file uploads
- File validation and metadata storage
- Database integration for storing file metadata

#### 3. File Processing (`file-processing.ts`)
- Batch processing for multiple files
- Duplicate detection and validation
- Memory-efficient object URL management
- File type and size validation
- Progress tracking with status updates

#### 4. Memory Management (`memory.ts`)
- In-memory storage with automatic cleanup
- Session storage fallback
- File object URL tracking
- Memory usage monitoring
- Garbage collection utilities

#### 5. State Management (`state-management.ts`)
- Generic state manager class
- Navigation helpers
- Data persistence utilities
- State versioning and migration
- Session storage integration

#### 6. Real-time Utilities (`realtime.ts`)
- Generic real-time subscription management
- Automatic connection handling
- Configurable filters and callbacks
- Connection status tracking

### New React Hooks (`src/hooks/`)

#### 1. File Upload Hook (`use-file-upload.ts`)
- Generic React hook for file uploads to Supabase
- Progress tracking and validation
- Database integration for metadata storage
- Error handling with user-friendly messages

#### 2. File Management Hook (`use-file-management.ts`)
- File selection and camera capture
- Memory management for large files
- State management with session storage fallback
- Duplicate detection and validation
- Auto-navigation after selection

#### 3. Realtime Subscription Hook (`use-realtime-subscription.ts`)
- Generic real-time subscription management
- Automatic connection handling
- Configurable filters and callbacks
- Connection status tracking

## 📁 Complete Folder Structure

```
src/
├── supacharger/utils/
│   ├── errors.ts             # Enhanced error handling
│   ├── file-processing.ts    # File processing utilities
│   ├── memory.ts             # Memory management
│   ├── realtime.ts           # Real-time utilities
│   ├── state-management.ts   # State management
│   └── upload.ts             # Upload utilities
├── hooks/
│   ├── use-file-management.ts      # File management hook
│   ├── use-file-upload.ts          # Upload hook
│   └── use-realtime-subscription.ts # Real-time hook
└── lib/supabase/
    └── client.ts             # Supabase client configuration
```

## 🔧 Setup Instructions

### Setup via Supabase Web UI

#### Step 1: Setup Storage Bucket
1. In Supabase dashboard, go to **Storage**
2. Click "Create bucket"
3. Name: `uploads` (or your preferred name)
4. Make it **Public** ✅
5. Click "Create bucket"

#### Step 2: Setup Storage Policies (RLS)
1. In **Storage**, click **Policies**
2. Click "New Policy" in your desired bucket
3. Select "Create a policy from scratch"
4. Add a policy name: `Allow public uploads`
5. In the "Allowed operations" section, tick the "INSERT" checkbox
6. Click "Review" and then "Save" the policy
7. Create another policy: `Allow public downloads`
8. In the "Allowed operations" section, tick the "SELECT" checkbox
9. Click "Review" and then "Save" the policy

#### Step 3: Setup Database Tables
1. Go to **SQL Editor** in your dashboard
2. Copy and paste this SQL and then click "Run" to create a photo submissions table:

```sql
-- Create photo submissions table
CREATE TABLE photo_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE photo_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
ON photo_submissions FOR SELECT
TO public
USING (true);

-- Allow public write access
CREATE POLICY "Allow public write access"
ON photo_submissions FOR INSERT
TO public
WITH CHECK (true);
```

#### Step 4: Setup Real-time
1. Go to **Table Editor** in your dashboard
2. Click on your `photo_submissions` table
3. Click the **Realtime** toggle to turn it **ON**
4. This enables real-time subscriptions for the table

## 📚 Usage Examples

### File Upload with Custom Paths
```typescript
import { useFileUpload } from '@/hooks/use-file-upload';

function PhotoUpload() {
  const eventId = 'wedding-2024';

  const fileUpload = useFileUpload({
    bucket: 'uploads',
    path: `${eventId}/submissions`,
    tableName: 'photo_submissions',
    generateFileName: (file, index) => {
      const timestamp = Date.now();
      const extension = file.name.split('.').pop() || 'jpg';
      return `${timestamp}-${index}.${extension}`;
    }
  });

  const handleUpload = async (files: File[]) => {
    const metadata = files.map(file => ({
      event_id: eventId,
      author_name: 'John Doe',
      // photo_url will be set automatically
    }));

    const urls = await fileUpload.uploadFiles(files, metadata);
    console.log('Uploaded URLs:', urls);
  };

  return (
    <div>
      <input 
        type="file" 
        multiple 
        onChange={(e) => e.target.files && handleUpload(Array.from(e.target.files))}
      />
      {fileUpload.isUploading && <div>Uploading...</div>}
      {fileUpload.error && <div>Error: {fileUpload.error}</div>}
    </div>
  );
}
```

### File Management with Camera
```typescript
import { useFileManagement } from '@/hooks/use-file-management';

function FileSelector() {
  const fileManager = useFileManagement({
    maxFiles: 20,
    autoNavigate: true,
    navigationPath: '/upload',
    eventId: 'wedding-2024'
  });

  return (
    <div>
      <button onClick={fileManager.handleFileSelection}>
        Select Photos ({fileManager.getFileCount()})
      </button>
      <button onClick={fileManager.handleCameraCapture}>
        Take Photo
      </button>
      
      {fileManager.files.map(file => (
        <div key={file.id}>
          <img src={file.url} alt="Selected" width={100} />
          <button onClick={() => fileManager.removeFile(file.id)}>
            Remove
          </button>
        </div>
      ))}
      
      {fileManager.error && (
        <div className="error">{fileManager.error}</div>
      )}
    </div>
  );
}
```

### Real-time Updates
```typescript
import { useRealtimeSubscription } from '@/hooks/use-realtime-subscription';

function LiveGallery() {
  const [photos, setPhotos] = useState([]);

  const { isConnected } = useRealtimeSubscription({
    channelName: 'photo-updates',
    table: 'photo_submissions',
    filter: 'event_id=eq.wedding-2024'
  }, (payload) => {
    if (payload.eventType === 'INSERT') {
      setPhotos(prev => [...prev, payload.new]);
    }
  });

  return (
    <div>
      <div>Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}</div>
      <div className="gallery">
        {photos.map(photo => (
          <img key={photo.id} src={photo.photo_url} alt={photo.author_name} />
        ))}
      </div>
    </div>
  );
}
```

### Error Handling
```typescript
import { parseSupabaseError, createUserErrorMessage } from '@/supacharger/utils/errors';

try {
  await uploadFile();
} catch (error) {
  const supachargerError = parseSupabaseError(error, 'upload');
  const userMessage = createUserErrorMessage(supachargerError);
  toast.error(userMessage);
  
  // Log detailed error for debugging
  console.error('Upload failed:', supachargerError);
}
```

## 🧪 Testing Your Setup

### Test File Upload
```typescript
import { uploadFileToSupabase } from '@/supacharger/utils/upload';

// Test single file upload
const testFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
const url = await uploadFileToSupabase(testFile, 'test.jpg', { bucket: 'uploads' });
console.log('Uploaded to:', url);
```

### Test Real-time
```typescript
// Test real-time subscription
useRealtimeSubscription({
  channelName: 'test',
  table: 'photo_submissions'
}, (payload) => {
  console.log('Real-time update:', payload);
});
```

## 🚨 Troubleshooting

### Common Issues

**1. RLS Policy Errors**
```
Error: "new row violates row-level security policy"
```
**Solution**: Check your RLS policies allow the operation you're trying to perform.

**2. Bucket Not Found**
```
Error: "Bucket 'uploads' not found"
```
**Solution**: Create the bucket in Supabase Storage or check bucket name spelling.

**3. File Too Large**
```
Error: "File size exceeds limit"
```
**Solution**: Check Supabase file size limits (50MB default) and adjust your upload logic.

**4. Environment Variables**
```
Error: "supabaseUrl is required"
```
**Solution**: Ensure `.env.local` is properly configured with correct variable names.

## 🎯 Production Considerations

### Security Checklist
- ✅ RLS policies are properly configured
- ✅ Storage bucket policies restrict access appropriately  
- ✅ File size limits are enforced (built into file processing)
- ✅ File type validation is implemented (built into file processing)

### Performance Features
- ✅ Batch uploads for multiple files (built-in)
- ✅ Progress tracking for better UX (built-in)
- ✅ Memory management prevents memory leaks (built-in)
- ✅ Efficient file processing and validation (built-in)

### External Considerations
- Consider CDN setup for file delivery
- Set up error tracking (Sentry, etc.)
- Monitor storage usage and costs
- Track upload success rates