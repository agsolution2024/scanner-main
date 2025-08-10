// Simple QR code validation utilities for prototype
export interface QRValidationResult {
  isValid: boolean;
  errorCode?: string;
  errorMessage?: string;
  attendeeId?: string;
}

export class QRValidator {
  // Simple format validation - just check if not empty
  static validateFormat(qrCode: string): QRValidationResult {
    // Remove whitespace
    const cleanCode = qrCode.trim();

    // Check if empty
    if (!cleanCode) {
      return {
        isValid: false,
        errorCode: 'EMPTY_CODE',
        errorMessage: 'QR code is empty'
      };
    }

    return {
      isValid: true,
      attendeeId: cleanCode
    };
  }

  // Accept any pattern for prototype
  static validateAttendeePattern(qrCode: string): QRValidationResult {
    const cleanCode = qrCode.trim();

    // Accept any non-empty string for prototype
    if (cleanCode) {
      return {
        isValid: true,
        attendeeId: cleanCode
      };
    }

    return {
      isValid: false,
      errorCode: 'EMPTY_CODE',
      errorMessage: 'QR code is empty'
    };
  }

  // Simplified validation - only check if not empty
  static validate(qrCode: string): QRValidationResult {
    const cleanCode = qrCode.trim();
    
    if (!cleanCode) {
      return {
        isValid: false,
        errorCode: 'EMPTY_CODE',
        errorMessage: 'QR code is empty'
      };
    }

    return {
      isValid: true,
      attendeeId: cleanCode
    };
  }
}

// QR code generator for testing
export class QRGenerator {
  static generateAttendeeCode(id: number): string {
    return `ATT${id.toString().padStart(3, '0')}`;
  }

  static generateEventCode(eventId: string, attendeeId: number): string {
    return `${eventId}_ATT${attendeeId.toString().padStart(3, '0')}`;
  }
}
