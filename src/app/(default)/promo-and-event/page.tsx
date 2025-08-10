'use client';

import React from 'react';
import { CrudTemplate } from '@/app/components/templates/crud-template';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/atoms/table';
import { SearchBar } from '@/app/components/molecules/search-bar';
import { TableActions } from '@/app/components/molecules/table-actions';
import { StatusBadge } from '@/app/components/molecules/status-badge';
import { Button } from '@/app/components/atoms/button';
import { Tag, Calendar } from 'lucide-react';

interface Promo {
  id: string;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'pending';
}

// Mock data - replace with actual API calls
const mockPromos = [
  {
    id: '1',
    name: 'Summer Sale',
    type: 'discount',
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    status: 'active' as const,
  },
  {
    id: '2',
    name: 'Back to School Event',
    type: 'event',
    startDate: '2024-08-15',
    endDate: '2024-09-15',
    status: 'pending' as const,
  },
];

export default function PromoAndEventPage() {
  const [activeTab, setActiveTab] = React.useState('promos');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [promos, setPromos] = React.useState(mockPromos);

  const tabs = [
    {
      id: 'promos',
      label: 'Promotions',
      icon: <Tag className="h-4 w-4" />,
    },
    {
      id: 'events',
      label: 'Events',
      icon: <Calendar className="h-4 w-4" />,
    },
  ];

  const filteredPromos = promos.filter(promo =>
    promo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (promo: Promo) => {
    setPromos(prev => prev.filter(p => p.id !== promo.id));
  };

  return (
    <CrudTemplate
      title="Promotions & Events"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      actions={
        <Button>
          Add {activeTab === 'promos' ? 'Promotion' : 'Event'}
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="w-96">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={`Search ${activeTab === 'promos' ? 'promotions' : 'events'}...`}
            showSearchButton={false}
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPromos.map((promo) => (
                <TableRow key={promo.id}>
                  <TableCell>{promo.name}</TableCell>
                  <TableCell className="capitalize">{promo.type}</TableCell>
                  <TableCell>{promo.startDate}</TableCell>
                  <TableCell>{promo.endDate}</TableCell>
                  <TableCell>
                    <StatusBadge status={promo.status} />
                  </TableCell>
                  <TableCell>
                    <TableActions
                      onView={() => {}}
                      onEdit={() => {}}
                      onDelete={() => handleDelete(promo)}
                      confirmDelete
                    />
                  </TableCell>
                </TableRow>
              ))}
              {filteredPromos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No {activeTab === 'promos' ? 'promotions' : 'events'} found
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