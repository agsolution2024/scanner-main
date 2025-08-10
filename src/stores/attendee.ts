import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AttendeeState, Attendee } from "@/types/attendee";
import { QRValidator, QRValidationResult } from "@/lib/qr-validation";

interface AttendeeStore extends AttendeeState {
  addAttendee: (
    attendee: Omit<Attendee, "id" | "registrationDate" | "isPresent">
  ) => void;
  markPresent: (qrCode: string) => boolean;
  getAttendeeByQR: (qrCode: string) => Attendee | undefined;
  validateQRCode: (
    qrCode: string
  ) => QRValidationResult & { attendee?: Attendee };
  initializeDemoData: () => void;
}

export const useAttendeeStore = create<AttendeeStore>()(
  persist(
    (set, get) => ({
      attendees: [],
      scannedAttendees: [],
      isLoading: false,

      addAttendee: (attendeeData) => {
        const newAttendee: Attendee = {
          ...attendeeData,
          id: Date.now().toString(),
          registrationDate: new Date(),
          isPresent: false,
        };
        set((state) => ({
          attendees: [...state.attendees, newAttendee],
        }));
      },

      markPresent: (qrCode: string) => {
        const state = get();
        // Clean the QR code to match validation logic
        const cleanCode = qrCode.trim();
        const attendee = state.attendees.find((a) => a.qrCode === cleanCode);

        if (!attendee) {
          return false;
        }

        if (attendee.isPresent) {
          return false; // Already checked in
        }

        const updatedAttendee = {
          ...attendee,
          isPresent: true,
          checkInTime: new Date(),
        };

        set((state) => ({
          attendees: state.attendees.map((a) =>
            a.qrCode === cleanCode ? updatedAttendee : a
          ),
          scannedAttendees: [...state.scannedAttendees, updatedAttendee],
        }));

        return true;
      },

      getAttendeeByQR: (qrCode: string) => {
        const cleanCode = qrCode.trim();
        return get().attendees.find((a) => a.qrCode === cleanCode);
      },

      validateQRCode: (qrCode: string) => {
        // First validate the QR code format
        const formatValidation = QRValidator.validate(qrCode);

        if (!formatValidation.isValid) {
          return {
            ...formatValidation,
            attendee: undefined,
          };
        }

        // Then check if attendee exists in database
        // Use the cleaned QR code (attendeeId) to find the attendee
        const attendee = get().attendees.find(
          (a) => a.qrCode === formatValidation.attendeeId
        );

        if (!attendee) {
          return {
            isValid: false,
            errorCode: "ATTENDEE_NOT_FOUND",
            errorMessage: "Attendee not found in registration list",
            attendee: undefined,
          };
        }

        // Check if already checked in
        if (attendee.isPresent) {
          return {
            isValid: false,
            errorCode: "ALREADY_CHECKED_IN",
            errorMessage: `${attendee.name} is already checked in`,
            attendee: attendee,
          };
        }

        return {
          isValid: true,
          attendeeId: formatValidation.attendeeId,
          attendee: attendee,
        };
      },

      initializeDemoData: () => {
        const demoAttendees: Attendee[] = [
          {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            qrCode: "ATT001",
            registrationDate: new Date(),
            isPresent: false,
          },
          {
            id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            qrCode: "ATT002",
            registrationDate: new Date(),
            isPresent: false,
          },
          {
            id: "3",
            name: "Bob Johnson",
            email: "bob@example.com",
            qrCode: "ATT003",
            registrationDate: new Date(),
            isPresent: true,
            checkInTime: new Date(),
          },
          {
            id: "4",
            name: "Alice Brown",
            email: "alice@example.com",
            qrCode: "ATT004",
            registrationDate: new Date(),
            isPresent: false,
          },
          {
            id: "5",
            name: "Charlie Wilson",
            email: "charlie@example.com",
            qrCode: "ATT005",
            registrationDate: new Date(),
            isPresent: true,
            checkInTime: new Date(),
          },
          {
            id: "6",
            name: "Test User",
            email: "test@example.com",
            qrCode: "1010993727",
            registrationDate: new Date(),
            isPresent: false,
          },
          {
            id: "7",
            name: "Test User 2",
            email: "test@example2.com",
            qrCode: "10109937272",
            registrationDate: new Date(),
            isPresent: false,
          },
        ];

        set({
          attendees: demoAttendees,
          scannedAttendees: demoAttendees.filter((a) => a.isPresent),
        });
      },
    }),
    {
      name: "attendee-storage",
    }
  )
);
