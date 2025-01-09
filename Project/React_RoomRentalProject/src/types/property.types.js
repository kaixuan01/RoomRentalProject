// Property Types
const PropertyType = {
  Apartment: 1,
  Condo: 2,
  House: 3,
  Villa: 4
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
  WiFi: 5
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
  FacilityType
};