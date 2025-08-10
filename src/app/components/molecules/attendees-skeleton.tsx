"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/app/components/atoms/skeleton";

// Header Skeleton
export const AttendeeHeaderSkeleton = () => (
  <div className="bg-gradient-to-r from-white-600 to-white-700 dark:from-red-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white shadow-lg">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1">
        <Skeleton className="h-8 sm:h-10 lg:h-12 w-3/4 mb-2 bg-gray-300 dark:bg-gray-600" />
        <Skeleton className="h-4 sm:h-5 w-1/2 bg-gray-300 dark:bg-gray-600" />
      </div>
      <div className="mt-4 sm:mt-0">
        <div className="relative overflow-hidden bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 shadow-lg p-4 sm:p-6 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
          <div className="relative z-10">
            <Skeleton className="h-8 sm:h-10 lg:h-12 w-16 mx-auto mb-1 bg-white/20" />
            <Skeleton className="h-4 w-24 mx-auto bg-white/20" />
            <div className="mt-3 w-full bg-white/20 rounded-full h-2">
              <Skeleton className="h-2 w-3/4 bg-white/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Statistics Cards Skeleton
export const StatisticsCardsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    {[1, 2, 3].map((index) => (
      <Card key={index} className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Skeleton className="h-6 sm:h-8 lg:h-10 w-16 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="p-2 sm:p-3 bg-blue-500 dark:bg-blue-600 rounded-full">
            <Skeleton className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 bg-blue-400 dark:bg-blue-500 rounded" />
          </div>
        </div>
      </Card>
    ))}
  </div>
);

// Search and Filters Skeleton
export const SearchFiltersSkeleton = () => (
  <Card className="p-4 sm:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
      <div className="flex-1 max-w-md">
        <Skeleton className="h-11 w-full" />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <Skeleton className="h-8 w-12 mx-1" />
          <Skeleton className="h-8 w-16 mx-1" />
          <Skeleton className="h-8 w-14 mx-1" />
        </div>
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <Skeleton className="h-8 w-8 mx-1" />
          <Skeleton className="h-8 w-8 mx-1" />
        </div>
      </div>
    </div>
  </Card>
);

// Attendee Card Skeleton (Grid View)
export const AttendeeCardSkeleton = () => (
  <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500 dark:border-l-red-400">
    <div className="space-y-3 sm:space-y-4">
      <div className="flex justify-between items-start">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
      </div>
      <div>
        <Skeleton className="h-5 w-3/4 mb-2" />
        <div className="space-y-2">
          <div className="flex items-center">
            <Skeleton className="h-3 w-3 mr-2 rounded" />
            <Skeleton className="h-3 w-full" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-3 w-3 mr-2 rounded" />
            <Skeleton className="h-5 w-20 rounded" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-3 w-3 mr-2 rounded" />
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-3 w-3 mr-2 rounded" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>
    </div>
  </Card>
);

// Grid View Skeleton
export const AttendeeGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
    {Array.from({ length: 12 }).map((_, index) => (
      <AttendeeCardSkeleton key={index} />
    ))}
  </div>
);

// List View Skeleton
export const AttendeeListSkeleton = () => (
  <Card className="overflow-hidden dark:bg-gray-800 dark:border-gray-700">
    {/* Desktop Table Skeleton */}
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {["Attendee", "QR Code", "Status", "Check-in Time", "Registration"].map((header) => (
              <th key={header} className="px-6 py-4 text-left">
                <Skeleton className="h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {Array.from({ length: 8 }).map((_, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Skeleton className="w-10 h-10 rounded-full mr-4" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Skeleton className="h-6 w-20 rounded" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Skeleton className="h-6 w-16 rounded-full" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Skeleton className="h-4 w-20" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile Cards Skeleton */}
    <div className="lg:hidden divide-y divide-gray-200 dark:divide-gray-700">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3" />
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Skeleton className="h-3 w-16 mb-1" />
              <Skeleton className="h-5 w-20 rounded" />
            </div>
            <div>
              <Skeleton className="h-3 w-20 mb-1" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

// Complete Attendees Page Skeleton
export const AttendeesPageSkeleton = () => (
  <div className="h-full">
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      <AttendeeHeaderSkeleton />
      <StatisticsCardsSkeleton />
      <SearchFiltersSkeleton />
      <AttendeeGridSkeleton />
    </div>
  </div>
);
