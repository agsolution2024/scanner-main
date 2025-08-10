export interface Attendee {
  id: string;
  name: string;
  email: string;
  qrCode: string;
  registrationDate: Date;
  isPresent: boolean;
  checkInTime?: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'scanner';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AttendeeState {
  attendees: Attendee[];
  scannedAttendees: Attendee[];
  isLoading: boolean;
}
