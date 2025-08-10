'use client';

import React from 'react';
import { CrudTemplate } from '@/app/components/templates/crud-template';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/atoms/table';
import { Input } from '@/app/components/atoms/input';
import { TableActions } from '@/app/components/molecules/table-actions';
import { StatusBadge } from '@/app/components/molecules/status-badge';
import { Button } from '@/app/components/atoms/button';
import { Search, Send } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  type: string;
  publishDate: string;
  expiryDate: string;
  status: 'active' | 'pending';
}

// Mock data - replace with actual API calls
const mockAnnouncements = [
  {
    id: '1',
    title: 'System Maintenance',
    type: 'Maintenance',
    publishDate: '2024-03-20',
    expiryDate: '2024-03-25',
    status: 'active' as const,
  },
  {
    id: '2',
    title: 'Holiday Schedule',
    type: 'Announcement',
    publishDate: '2024-04-01',
    expiryDate: '2024-04-15',
    status: 'pending' as const,
  },
];

export default function AnnouncementPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [announcements, setAnnouncements] = React.useState(mockAnnouncements);

  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    announcement.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (announcement: Announcement) => {
    setAnnouncements(prev => prev.filter(a => a.id !== announcement.id));
  };

  return (
    <CrudTemplate
      title="Announcements"
      actions={
        <Button variant="default" className="flex items-center gap-2">
          <Send className="h-4 w-4" />
          New Announcement
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search announcements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Publish Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnnouncements.map((announcement) => (
                <TableRow key={announcement.id}>
                  <TableCell>{announcement.title}</TableCell>
                  <TableCell>{announcement.type}</TableCell>
                  <TableCell>{announcement.publishDate}</TableCell>
                  <TableCell>{announcement.expiryDate}</TableCell>
                  <TableCell>
                    <StatusBadge 
                      status={announcement.status}
                      className="capitalize"
                    />
                  </TableCell>
                  <TableCell>
                    <TableActions
                      onView={() => {}}
                      onEdit={() => {}}
                      onDelete={() => handleDelete(announcement)}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {filteredAnnouncements.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No announcements found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </CrudTemplate>
  );
}
