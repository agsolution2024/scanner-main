"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/app/components/atoms/skeleton";

// QR Scanner Header Skeleton
export const QRScannerHeaderSkeleton = () => (
  <div className="text-center mb-6">
    <Skeleton className="h-8 w-32 mx-auto mb-2" />
    <Skeleton className="h-5 w-48 mx-auto" />
  </div>
);

// QR Scanner Card Skeleton
export const QRScannerCardSkeleton = () => (
  <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
    <div className="relative mb-6">
      <Skeleton className="w-full h-64 rounded-lg" />
      
      {/* Scanning overlay skeleton */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 border-2 border-white dark:border-gray-200 rounded-lg opacity-80">
          <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-red-500 dark:border-red-400 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-red-500 dark:border-red-400 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-red-500 dark:border-red-400 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-red-500 dark:border-red-400 rounded-br-lg"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 dark:via-red-400 to-transparent animate-pulse"></div>
        </div>
      </div>
      
      {/* Loading state in center */}
      <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Skeleton className="mx-auto h-12 w-12 rounded-full mb-4" />
          <Skeleton className="h-5 w-32 mx-auto" />
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <div className="text-center">
        <Skeleton className="h-5 w-56 mx-auto mb-3" />
        <Skeleton className="h-9 w-full" />
      </div>
      <Skeleton className="h-9 w-full" />
    </div>
  </Card>
);

// Camera Not Available Skeleton
export const CameraNotAvailableSkeleton = () => (
  <div className="h-full">
    <div className="max-w-md mx-auto p-6">
      <Card className="p-6 text-center">
        <Skeleton className="mx-auto h-12 w-12 rounded-full mb-4" />
        <Skeleton className="h-7 w-48 mx-auto mb-4" />
        <Skeleton className="h-5 w-64 mx-auto mb-6" />
        <Skeleton className="h-9 w-full" />
      </Card>
    </div>
  </div>
);

// Complete QR Scanner Page Skeleton
export const QRScannerPageSkeleton = () => (
  <div className="h-full">
    <div className="max-w-md mx-auto p-6">
      <QRScannerHeaderSkeleton />
      <QRScannerCardSkeleton />
    </div>
  </div>
);
