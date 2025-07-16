export interface Meeting {
  id: string;                 // Unique identifier for the meeting
  topic: string;             // Meeting topic/title
  description?: string;       // Optional detailed description
  
  // Date and Time
  date: string;              // Meeting date in YYYY-MM-DD format
  time: string;              // Meeting time in HH:mm AM/PM format
  duration: number;          // Duration in minutes
  
  // People
  faculty: {
    id: string;             // Faculty member's unique ID
    name: string;           // Faculty member's name
    email: string;          // Faculty member's email
  };
  
  participants?: {          // Optional list of other participants
    id: string;
    name: string;
    email: string;
    role: 'student' | 'faculty' | 'staff';
  }[];
  
  // Location
  location?: {
    room?: string;          // Physical room number/name if applicable
    building?: string;      // Building name if applicable
    isOnline: boolean;      // Whether the meeting is online
    meetingLink?: string;   // Video conference link if online
  };
  
  // Status and Metadata
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  rsvpStatus: {            // RSVP status for each participant
    [participantId: string]: 'accepted' | 'declined' | 'pending';
  };
  
  // Timestamps
  createdAt: string;       // When the meeting was created
  updatedAt: string;       // When the meeting was last updated
  
  // Additional Metadata
  category?: string;       // e.g., 'Project Discussion', 'Course Advising', etc.
  priority?: 'low' | 'medium' | 'high';
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
  }[];
  
  // Recurring Meeting
  recurringMeetingId?: string;  // ID of the recurring meeting series if part of one
  recurrence?: {
    pattern: 'daily' | 'weekly' | 'monthly';
    interval: number;      // Repeat every X days/weeks/months
    endDate?: string;      // When the recurrence ends
  };
  
  // Notifications
  reminderSettings?: {
    enabled: boolean;
    timing: number[];      // Array of minutes before meeting to send reminders
  };
}

// Example of meeting status types
export type MeetingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

// Example of participant role types
export type ParticipantRole = 'student' | 'faculty' | 'staff';

// Example of recurrence pattern types
export type RecurrencePattern = 'daily' | 'weekly' | 'monthly'; 