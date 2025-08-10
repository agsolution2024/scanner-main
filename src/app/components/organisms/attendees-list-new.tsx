'use client';

import React, { useState } from 'react';
import { useAttendeeStore } from '@/stores/attendee';
import Typography from '@/app/components/atoms/typography';
import Button from '@/app/components/atoms/button';
import Input from '@/app/components/atoms/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Search, Users, UserCheck, Calendar, Mail, Hash, Clock, Grid3X3, List } from 'lucide-react';
import { format } from 'date-fns';

const AttendeesList = () => {
  const { attendees, initializeDemoData } = useAttendeeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'present' | 'absent'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAttendees = attendees.filter(attendee => {
    const matchesSearch = attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attendee.qrCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'present' && attendee.isPresent) ||
                         (filter === 'absent' && !attendee.isPresent);
    
    return matchesSearch && matchesFilter;
  });

  const totalAttendees = attendees.length;
  const presentCount = attendees.filter(a => a.isPresent).length;
  const absentCount = totalAttendees - presentCount;

  // Initialize demo data if no attendees exist
  React.useEffect(() => {
    if (attendees.length === 0) {
      initializeDemoData();
    }
  }, [attendees.length, initializeDemoData]);

  return (
    <div className="h-full">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Typography variant="h1" className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2">
                Event Attendees
              </Typography>
              <Typography variant="body1" className="text-blue-100 opacity-90 text-sm sm:text-base">
                Track and manage your event attendance in real-time
              </Typography>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                <Typography variant="h3" className="text-xl sm:text-2xl font-bold text-white">
                  {Math.round((presentCount / totalAttendees) * 100) || 0}%
                </Typography>
                <Typography variant="caption" className="text-blue-100 text-xs sm:text-sm">
                  Attendance Rate
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h3" className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-700">
                  {totalAttendees}
                </Typography>
                <Typography variant="body2" className="text-blue-600 font-medium text-sm">
                  Total Registered
                </Typography>
              </div>
              <div className="p-2 sm:p-3 bg-blue-500 rounded-full">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h3" className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-700">
                  {presentCount}
                </Typography>
                <Typography variant="body2" className="text-green-600 font-medium text-sm">
                  Present
                </Typography>
              </div>
              <div className="p-2 sm:p-3 bg-green-500 rounded-full">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h3" className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-700">
                  {absentCount}
                </Typography>
                <Typography variant="body2" className="text-red-600 font-medium text-sm">
                  Absent
                </Typography>
              </div>
              <div className="p-2 sm:p-3 bg-red-500 rounded-full">
                <XCircle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search attendees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
            </div>

            {/* Filter and View Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Status Filter */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={filter === 'all' ? 'default' : 'ghost'}
                  onClick={() => setFilter('all')}
                  size="sm"
                  className="rounded-md text-xs sm:text-sm"
                >
                  All
                </Button>
                <Button
                  variant={filter === 'present' ? 'default' : 'ghost'}
                  onClick={() => setFilter('present')}
                  size="sm"
                  className="rounded-md text-xs sm:text-sm"
                >
                  Present
                </Button>
                <Button
                  variant={filter === 'absent' ? 'default' : 'ghost'}
                  onClick={() => setFilter('absent')}
                  size="sm"
                  className="rounded-md text-xs sm:text-sm"
                >
                  Absent
                </Button>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('grid')}
                  size="sm"
                  className="rounded-md"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('list')}
                  size="sm"
                  className="rounded-md"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Attendees Content */}
        {filteredAttendees.length === 0 ? (
          <Card className="p-8 sm:p-12">
            <div className="text-center">
              <UserCheck className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mb-4 sm:mb-6" />
              <Typography variant="h3" className="mb-4 text-gray-500">
                No attendees found
              </Typography>
              <Typography variant="body1" className="text-gray-400 mb-6">
                {searchTerm ? 'Try adjusting your search criteria' : 'No attendees match the current filter'}
              </Typography>
              {searchTerm && (
                <Button onClick={() => setSearchTerm('')} variant="outline">
                  Clear Search
                </Button>
              )}
            </div>
          </Card>
        ) : (
          <>
            {viewMode === 'grid' ? (
              /* Grid View */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredAttendees.map((attendee) => (
                  <Card key={attendee.id} className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                    <div className="space-y-3 sm:space-y-4">
                      {/* Status Badge */}
                      <div className="flex justify-between items-start">
                        <Badge 
                          variant={attendee.isPresent ? 'default' : 'secondary'}
                          className={`text-xs ${attendee.isPresent ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}
                        >
                          {attendee.isPresent ? (
                            <div className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Present
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <XCircle className="h-3 w-3 mr-1" />
                              Absent
                            </div>
                          )}
                        </Badge>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                          {attendee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                      </div>

                      {/* Attendee Info */}
                      <div>
                        <Typography variant="h6" className="font-bold text-gray-900 mb-1 truncate text-sm sm:text-base">
                          {attendee.name}
                        </Typography>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <Mail className="h-3 w-3 mr-2 flex-shrink-0" />
                            <Typography variant="caption" className="truncate text-xs">
                              {attendee.email}
                            </Typography>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Hash className="h-3 w-3 mr-2 flex-shrink-0" />
                            <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                              {attendee.qrCode}
                            </code>
                          </div>
                          {attendee.checkInTime && (
                            <div className="flex items-center text-green-600">
                              <Clock className="h-3 w-3 mr-2 flex-shrink-0" />
                              <Typography variant="caption" className="text-xs">
                                {format(attendee.checkInTime, 'MMM dd, HH:mm')}
                              </Typography>
                            </div>
                          )}
                          <div className="flex items-center text-gray-500">
                            <Calendar className="h-3 w-3 mr-2 flex-shrink-0" />
                            <Typography variant="caption" className="text-xs">
                              Reg: {format(attendee.registrationDate, 'MMM dd')}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              /* List View - Mobile Optimized */
              <Card className="overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Attendee
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          QR Code
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Check-in Time
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Registration
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredAttendees.map((attendee) => (
                        <tr key={attendee.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                                {attendee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </div>
                              <div>
                                <Typography variant="body1" className="font-medium text-gray-900">
                                  {attendee.name}
                                </Typography>
                                <Typography variant="body2" className="text-gray-500">
                                  {attendee.email}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <code className="bg-gray-100 px-3 py-2 rounded-lg text-sm font-mono">
                              {attendee.qrCode}
                            </code>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={attendee.isPresent ? 'default' : 'secondary'}>
                              {attendee.isPresent ? (
                                <div className="flex items-center">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Present
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Absent
                                </div>
                              )}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {attendee.checkInTime ? (
                              format(attendee.checkInTime, 'MMM dd, yyyy HH:mm')
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {format(attendee.registrationDate, 'MMM dd, yyyy')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden divide-y divide-gray-200">
                  {filteredAttendees.map((attendee) => (
                    <div key={attendee.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                            {attendee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </div>
                          <div>
                            <Typography variant="body1" className="font-medium text-gray-900 text-sm">
                              {attendee.name}
                            </Typography>
                            <Typography variant="body2" className="text-gray-500 text-xs">
                              {attendee.email}
                            </Typography>
                          </div>
                        </div>
                        <Badge variant={attendee.isPresent ? 'default' : 'secondary'} className="text-xs">
                          {attendee.isPresent ? (
                            <div className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Present
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <XCircle className="h-3 w-3 mr-1" />
                              Absent
                            </div>
                          )}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <Typography variant="caption" className="text-gray-500 font-medium text-xs">QR Code</Typography>
                          <code className="block bg-gray-100 px-2 py-1 rounded text-xs mt-1">
                            {attendee.qrCode}
                          </code>
                        </div>
                        <div>
                          <Typography variant="caption" className="text-gray-500 font-medium text-xs">Registration</Typography>
                          <Typography variant="caption" className="block mt-1 text-xs">
                            {format(attendee.registrationDate, 'MMM dd, yyyy')}
                          </Typography>
                        </div>
                        {attendee.checkInTime && (
                          <div className="col-span-2">
                            <Typography variant="caption" className="text-gray-500 font-medium text-xs">Check-in Time</Typography>
                            <Typography variant="caption" className="block mt-1 text-green-600 text-xs">
                              {format(attendee.checkInTime, 'MMM dd, yyyy HH:mm')}
                            </Typography>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AttendeesList;
