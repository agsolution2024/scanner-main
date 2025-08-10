'use client';

import { MainLayout } from '@/app/components/templates/main-layout';
import React from "react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
} 