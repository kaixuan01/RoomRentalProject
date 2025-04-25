import {
  IconAperture, IconLayoutDashboard, IconUsers, IconBuilding, IconCalendarEvent, 
  IconFileDescription, IconHome, IconReportMoney, IconUserCheck, IconAlertTriangle,
  IconBellRinging, IconSearch, IconHistory, IconSettings, IconWallet, IconClipboardList,
  IconMessageReport, IconBuildingStore, IconReceipt, IconScript
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';
import { User_Roles } from '../../../utils/enum';

const getMenuItems = (userRoleId) => [
  // Common Dashboard for all users
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/portal/dashboard',
  },

  // Admin Only Section
  ...(userRoleId === User_Roles.ADMIN ? [
    {
      navlabel: true,
      subheader: 'Administration',
    },
    {
      id: uniqueId(),
      title: 'User Management',
      icon: IconUsers,
      href: '/portal/user-management',
      children: [
        {
          id: uniqueId(),
          title: 'Verify Users',
          icon: IconUserCheck,
          href: '/portal/user-management/verify',
        },
        {
          id: uniqueId(),
          title: 'User Activity Logs',
          icon: IconHistory,
          href: '/portal/user-management/logs',
        },
      ]
    },
    {
      id: uniqueId(),
      title: 'T&C Category',
      icon: IconScript,
      href: '/portal/tncCategory',
      children: [
      ]
    },
    {
      id: uniqueId(),
      title: 'Term and Conditions',
      icon: IconScript,
      href: '/portal/tnc',
      children: [
      ]
    },
    {
      id: uniqueId(),
      title: 'Property Management',
      icon: IconBuilding,
      href: '/portal/property-management',
      children: [
        {
          id: uniqueId(),
          title: 'Review Listings',
          icon: IconBuildingStore,
          href: '/portal/property-management/review',
        },
        {
          id: uniqueId(),
          title: 'Reported Listings',
          icon: IconAlertTriangle,
          href: '/portal/property-management/reported',
        },
      ]
    },
    {
      id: uniqueId(),
      title: 'Dispute Resolution',
      icon: IconMessageReport,
      href: '/portal/disputes',
    },
    {
      id: uniqueId(),
      title: 'Contract Management',
      icon: IconFileDescription,
      href: '/portal/contracts',
    },
    {
      id: uniqueId(),
      title: 'System Settings',
      icon: IconSettings,
      href: '/portal/settings',
      children: [
        {
          id: uniqueId(),
          title: 'Announcements',
          icon: IconBellRinging,
          href: '/portal/settings/announcements',
        },
        {
          id: uniqueId(),
          title: 'Audit Logs',
          icon: IconClipboardList,
          href: '/portal/settings/audit-logs',
        },
      ]
    },
  ] : []),

  // Owner Only Section
  ...(userRoleId === User_Roles.OWNER ? [
    {
      navlabel: true,
      subheader: 'Property Management',
    },
    {
      id: uniqueId(),
      title: 'My Properties',
      icon: IconBuilding,
      href: '/portal/my-properties',
      children: [
        {
          id: uniqueId(),
          title: 'Add New Listing',
          icon: IconBuildingStore,
          href: '/portal/my-properties/add',
        },
        {
          id: uniqueId(),
          title: 'Manage Listings',
          icon: IconBuildingStore,
          href: '/portal/my-properties/manage',
        },
      ]
    },
    {
      id: uniqueId(),
      title: 'Booking Requests',
      icon: IconCalendarEvent,
      href: '/portal/booking-requests',
    },
  ] : []),

  // Tenant Only Section
  ...(userRoleId === User_Roles.TENANT ? [
    {
      navlabel: true,
      subheader: 'Room Search',
    },
    {
      id: uniqueId(),
      title: 'Find Rooms',
      icon: IconSearch,
      href: '/portal/search-rooms',
    },
    {
      id: uniqueId(),
      title: 'My Bookings',
      icon: IconCalendarEvent,
      href: '/portal/my-bookings',
    },
  ] : []),

  // Common sections for Owner and Tenant
  ...(userRoleId === User_Roles.TENANT || userRoleId === User_Roles.OWNER ? [
    {
      navlabel: true,
      subheader: 'Contracts & Payments',
    },
    {
      id: uniqueId(),
      title: 'My Contracts',
      icon: IconFileDescription,
      href: '/portal/my-contracts',
    },
    {
      id: uniqueId(),
      title: 'Payment History',
      icon: IconReceipt,
      href: '/portal/payment-history',
    },
  ] : []),

  // Financial Section (different views per role)
  {
    navlabel: true,
    subheader: 'Financial',
  },
  {
    id: uniqueId(),
    title: userRoleId === User_Roles.ADMIN ? 'Platform Finance' : 
          userRoleId === User_Roles.OWNER ? 'My Income' : 
          'My Payments',
    icon: IconWallet,
    href: '/portal/finance',
  },
];

export { getMenuItems };
