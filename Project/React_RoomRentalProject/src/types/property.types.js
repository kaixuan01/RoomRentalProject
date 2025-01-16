import { 
  LocationOn, 
  Pool,
  FitnessCenter,
  LocalParking,
  Security,
  Wifi,
  CheckCircle,
  Cancel,
  Build,
  Close as CloseIcon,
  MoreHoriz as MoreHorizIcon,
  AcUnit,
  LocalLaundryService,
  Pets,
  Balcony,
  Inventory,
  Videocam,
  Elevator,
  Park,
  OutdoorGrill,
  Park as PlaygroundIcon
} from '@mui/icons-material';

// Property Types
const PropertyType = {
  Apartment: 1,
  Condo: 2,
  House: 3,
  Villa: 4
};

const getPropertyTypeLabel = (typeId) => {
  return Object.keys(PropertyType).find(key => PropertyType[key] === typeId) || 'Unknown';
};

// Property Status
const PropertyStatus = {
  Available: 1,
  Rented: 2,
  Maintenance: 3
};

// Approval Status
const ApprovalStatus = {
  Pending: 1,
  Approved: 2,
  Rejected: 3
};

// Facility Types
const FacilityType = {
  Pool: 1,
  Gym: 2,
  Parking: 3,
  Security: 4,
  WiFi: 5,
  AirCon: 6,
  Laundry: 7,
  PetFriendly: 8,
  Balcony: 9,
  Storage: 10,
  CCTV: 11,
  Elevator: 12,
  Garden: 13,
  BBQ: 14,
  PlayArea: 15
};

// Facility Configurations
// Facility configuration with icons and labels
const FacilityConfig = {
  [FacilityType.Pool]: { 
    icon: <Pool fontSize="small" />, 
    label: 'Pool',
    color: 'info' 
  },
  [FacilityType.Gym]: { 
    icon: <FitnessCenter fontSize="small" />, 
    label: 'Gym',
    color: 'error' 
  },
  [FacilityType.Parking]: { 
    icon: <LocalParking fontSize="small" />, 
    label: 'Parking',
    color: 'primary' 
  },
  [FacilityType.Security]: { 
    icon: <Security fontSize="small" />, 
    label: 'Security',
    color: 'success' 
  },
  [FacilityType.WiFi]: { 
    icon: <Wifi fontSize="small" />, 
    label: 'WiFi',
    color: 'secondary' 
  },
  [FacilityType.AirCon]: { 
    icon: <AcUnit fontSize="small" />, 
    label: 'Air Con',
    color: 'info' 
  },
  [FacilityType.Laundry]: { 
    icon: <LocalLaundryService fontSize="small" />, 
    label: 'Laundry',
    color: 'primary' 
  },
  [FacilityType.PetFriendly]: { 
    icon: <Pets fontSize="small" />, 
    label: 'Pet Friendly',
    color: 'warning' 
  },
  [FacilityType.Balcony]: { 
    icon: <Balcony fontSize="small" />, 
    label: 'Balcony',
    color: 'success' 
  },
  [FacilityType.Storage]: { 
    icon: <Inventory fontSize="small" />, 
    label: 'Storage',
    color: 'secondary' 
  },
  [FacilityType.CCTV]: { 
    icon: <Videocam fontSize="small" />, 
    label: 'CCTV',
    color: 'error' 
  },
  [FacilityType.Elevator]: { 
    icon: <Elevator fontSize="small" />, 
    label: 'Elevator',
    color: 'primary' 
  },
  [FacilityType.Garden]: { 
    icon: <Park fontSize="small" />, 
    label: 'Garden',
    color: 'success' 
  },
  [FacilityType.BBQ]: { 
    icon: <OutdoorGrill fontSize="small" />, 
    label: 'BBQ Area',
    color: 'warning' 
  },
  [FacilityType.PlayArea]: { 
    icon: <PlaygroundIcon fontSize="small" />, 
    label: 'Play Area',
    color: 'info' 
  }
};

// Updated status configuration with better contrast
const StatusConfig = {
  [PropertyStatus.Available]: { 
    icon: <CheckCircle fontSize="small" />, 
    label: 'Available',
    color: 'success',
    bgColor: 'rgba(46, 125, 50, 0.1)', // darker green background
    textColor: '#2e7d32' // dark green text
  },
  [PropertyStatus.Rented]: { 
    icon: <Cancel fontSize="small" />, 
    label: 'Rented',
    color: 'error',
    bgColor: 'rgba(211, 47, 47, 0.1)', // darker red background
    textColor: '#d32f2f' // dark red text
  },
  [PropertyStatus.Maintenance]: { 
    icon: <Build fontSize="small" />, 
    label: 'Under Maintenance',
    color: 'warning',
    bgColor: 'rgba(237, 108, 2, 0.1)', // darker orange background
    textColor: '#ed6c02' // dark orange text
  }
};

/**
 * @typedef {Object} PropertyPhoto
 * @property {number} id
 * @property {string} filePath
 * @property {boolean} isMain
 */

/**
 * @typedef {Object} Property
 * @property {number} id
 * @property {string} name
 * @property {string} address
 * @property {number} price
 * @property {number} propertyType
 * @property {number} areaSize
 * @property {number} propertyStatus
 * @property {number} approvalStatus
 * @property {string} description
 * @property {number[]} facilities
 * @property {PropertyPhoto[]} photos
 * @property {number} [latitude]
 * @property {number} [longitude]
 */

export {
  PropertyType,
  PropertyStatus,
  ApprovalStatus,
  FacilityType,
  FacilityConfig,
  StatusConfig,
  getPropertyTypeLabel
};