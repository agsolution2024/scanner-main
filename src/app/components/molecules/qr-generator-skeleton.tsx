"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/app/components/atoms/skeleton";

// QR Generator Header Skeleton
export const QRGeneratorHeaderSkeleton = () => (
  <div className="mb-8">
    <Skeleton className="h-8 w-48 mb-2" />
    <Skeleton className="h-5 w-64" />
  </div>
);

// QR Generator Controls Skeleton
export const QRGeneratorControlsSkeleton = () => (
  <Card className="p-6 mb-6">
    <Skeleton className="h-9 w-40 mb-4" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="p-4 text-center">
          <Skeleton className="h-6 w-32 mx-auto mb-2" />
          <Skeleton className="h-4 w-20 mx-auto mb-4" />
          <Skeleton className="w-48 h-48 mx-auto mb-4" />
          <Skeleton className="h-8 w-full" />
        </Card>
      ))}
    </div>
  </Card>
);

// Single QR Card Skeleton
export const QRCardSkeleton = () => (
  <Card className="p-4 text-center">
    <Skeleton className="h-6 w-32 mx-auto mb-2" />
    <Skeleton className="h-4 w-20 mx-auto mb-4" />
    <Skeleton className="w-48 h-48 mx-auto mb-4" />
    <Skeleton className="h-8 w-full" />
  </Card>
);

// Complete QR Generator Page Skeleton
export const QRGeneratorPageSkeleton = () => (
  <div className="max-w-4xl mx-auto p-6">
    <QRGeneratorHeaderSkeleton />
    <QRGeneratorControlsSkeleton />
  </div>
);
