This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Event Attendance Management System

A modern, responsive web application for managing event attendance with QR code scanning capabilities, built with Next.js, TypeScript, and Tailwind CSS.

### ✨ Features

- **Attendee Management**: View and manage event attendees with comprehensive filtering and search
- **QR Code Scanning**: Real-time QR code scanning for attendance tracking
- **QR Code Generation**: Generate downloadable QR codes for attendees
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Skeleton Loading**: Smooth loading states with skeleton components for better UX
- **Real-time Updates**: Live attendance statistics and status updates
- **Data Persistence**: State management with Zustand for seamless data handling

### 🚀 Skeleton Loading Implementation

This application features comprehensive skeleton loading states to enhance user experience:

#### Components with Skeleton Loading:
- **Attendees List**: 
  - Header skeleton with attendance rate display
  - Statistics cards skeleton
  - Search and filter controls skeleton
  - Grid/List view skeletons for attendee cards and table rows
  - View transition loading states

- **QR Scanner**: 
  - Camera initialization skeleton
  - Scanning interface skeleton with overlay
  - Camera not available state

- **QR Generator**: 
  - Page loading skeleton
  - QR code generation process skeleton
  - Individual QR card skeletons

#### Skeleton Components Location:
```
src/app/components/
├── atoms/
│   ├── skeleton.tsx              # Base skeleton component
│   └── loading-wrapper.tsx       # Reusable loading wrapper
└── molecules/
    ├── attendees-skeleton.tsx    # Attendees page skeletons
    ├── qr-scanner-skeleton.tsx   # QR scanner skeletons
    ├── qr-generator-skeleton.tsx # QR generator skeletons
    └── dashboard-skeleton.tsx    # Dashboard layout skeletons
```

### 🎯 Loading States
- **Initial page load**: 1.5s skeleton loading for data initialization
- **View switching**: 0.5s skeleton when changing between grid/list views
- **QR generation**: 1s skeleton during QR code generation
- **Camera initialization**: Dynamic loading based on camera availability

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
