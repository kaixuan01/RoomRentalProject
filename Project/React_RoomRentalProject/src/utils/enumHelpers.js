import { Status, User_Roles } from './enum'; // Import User_Roles enum
import { User_Status } from './enum'; // Import User_Status enum

export const getUserRoleLabel = (roleId) => {
  switch (roleId) {
    case User_Roles.ADMIN: return 'Admin';
    case User_Roles.OWNER: return 'Owner';
    case User_Roles.TENANT: return 'Tenant';
    default: return 'Unknown';
  }
};

export const getUserStatusLabel = (userStatus) => {
  switch (userStatus) {
    case User_Status.ACTIVE: return { label: 'Active', color: 'success' };
    case User_Status.INACTIVE: return { label: 'Inactive', color: 'error' };
    case User_Status.BLOCKED: return { label: 'Blocked', color: 'warning' };
    default: return { label: 'Unknown', color: 'default' };
  }
}; 

export const getStatusLabel = (status) => {
  switch (status) {
    case Status.NONE:
      return { label: 'None', color: 'default' };
    case Status.PENDING:
      return { label: 'Pending', color: 'warning' };
    case Status.APPROVED:
      return { label: 'Approved', color: 'success' };
    case Status.COMPLETE:
      return { label: 'Complete', color: 'success' };
    case Status.FAILED:
      return { label: 'Failed', color: 'error' };
    case Status.REJECTED:
      return { label: 'Rejected', color: 'error' };
    default:
      return { label: 'Unknown', color: 'default' };
  }
};
