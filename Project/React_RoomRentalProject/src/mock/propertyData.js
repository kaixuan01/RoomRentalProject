import { PropertyType, PropertyStatus, ApprovalStatus, FacilityType } from '../types/property.types.js';

export const mockProperties = [
  {
    id: 1,
    name: "Luxury Skyline Apartment",
    address: "123 Downtown Street",
    price: 2500.00,
    propertyType: PropertyType.Apartment,
    areaSize: 1200,
    propertyStatus: PropertyStatus.Available,
    approvalStatus: ApprovalStatus.Approved,
    description: "Modern luxury apartment with city view, featuring high-end finishes and state-of-the-art appliances.",
    facilities: [FacilityType.Pool, FacilityType.Gym, FacilityType.Parking],
    photos: [
      {
        id: 1,
        filePath: "src/assets/images/products/s5.jpg",
        isMain: true
      }
    ],
    latitude: 1.3521,
    longitude: 103.8198
  },
  {
    id: 2,
    name: "Spacious Family House",
    address: "456 Garden Road",
    price: 4500.00,
    propertyType: PropertyType.House,
    areaSize: 2200,
    propertyStatus: PropertyStatus.Available,
    approvalStatus: ApprovalStatus.Approved,
    description: "Beautiful family home with large backyard and modern amenities.",
    facilities: [FacilityType.Parking, FacilityType.Security, FacilityType.WiFi],
    photos: [
      {
        id: 2,
        filePath: "src/assets/images/products/s4.jpg",
        isMain: true
      }
    ],
    latitude: 1.3522,
    longitude: 103.8199
  },
  {
    id: 3,
    name: "Modern Studio Condo",
    address: "789 Central Avenue",
    price: 1800.00,
    propertyType: PropertyType.Condo,
    areaSize: 600,
    propertyStatus: PropertyStatus.Available,
    approvalStatus: ApprovalStatus.Approved,
    description: "Cozy studio condo perfect for singles or couples, located in the heart of the city.",
    facilities: [FacilityType.Gym, FacilityType.WiFi],
    photos: [
      {
        id: 3,
        filePath: "src/assets/images/products/s7.jpg",
        isMain: true
      }
    ],
    latitude: 1.3523,
    longitude: 103.8200
  },
  {
    id: 4,
    name: "Luxury Beach Villa",
    address: "101 Coastal Road",
    price: 8000.00,
    propertyType: PropertyType.Villa,
    areaSize: 3500,
    propertyStatus: PropertyStatus.Available,
    approvalStatus: ApprovalStatus.Approved,
    description: "Stunning beachfront villa with private pool and panoramic ocean views.",
    facilities: [FacilityType.Pool, FacilityType.Security, FacilityType.Parking, FacilityType.WiFi],
    photos: [
      {
        id: 4,
        filePath: "src/assets/images/products/s11.jpg",
        isMain: true
      }
    ],
    latitude: 1.3524,
    longitude: 103.8201
  },
  {
    id: 5,
    name: "Cozy Garden Apartment",
    address: "202 Park Lane",
    price: 2200.00,
    propertyType: PropertyType.Apartment,
    areaSize: 900,
    propertyStatus: PropertyStatus.Rented,
    approvalStatus: ApprovalStatus.Approved,
    description: "Charming apartment with private garden and modern amenities.",
    facilities: [FacilityType.Parking, FacilityType.WiFi],
    photos: [
      {
        id: 5,
        filePath: "src/assets/images/products/empty-shopping-bag.gif",
        isMain: true
      }
    ],
    latitude: 1.3525,
    longitude: 103.8202
  },
  {
    id: 6,
    name: "Urban Loft Condo",
    address: "303 Downtown Loop",
    price: 3200.00,
    propertyType: PropertyType.Condo,
    areaSize: 1100,
    propertyStatus: PropertyStatus.Maintenance,
    approvalStatus: ApprovalStatus.Pending,
    description: "Industrial-style loft with high ceilings and exposed brick walls.",
    facilities: [FacilityType.Gym, FacilityType.Parking, FacilityType.Security],
    photos: [
      {
        id: 6,
        filePath: "src/assets/images/products/s11.jpg",
        isMain: true
      }
    ],
    latitude: 1.3526,
    longitude: 103.8203
  },
  {
    id: 7,
    name: "Suburban Family House",
    address: "404 Quiet Street",
    price: 3800.00,
    propertyType: PropertyType.House,
    areaSize: 1800,
    propertyStatus: PropertyStatus.Available,
    approvalStatus: ApprovalStatus.Approved,
    description: "Spacious family home in quiet suburban neighborhood with great schools nearby.",
    facilities: [FacilityType.Parking, FacilityType.Security],
    photos: [
      {
        id: 7,
        filePath: "src/assets/images/products/s5.jpg",
        isMain: true
      }
    ],
    latitude: 1.3527,
    longitude: 103.8204
  },
  {
    id: 8,
    name: "Hillside Villa Estate",
    address: "505 Mountain View Road",
    price: 12000.00,
    propertyType: PropertyType.Villa,
    areaSize: 5000,
    propertyStatus: PropertyStatus.Available,
    approvalStatus: ApprovalStatus.Approved,
    description: "Luxurious hillside villa with private tennis court and infinity pool.",
    facilities: [FacilityType.Pool, FacilityType.Gym, FacilityType.Security, FacilityType.Parking, FacilityType.WiFi],
    photos: [
      {
        id: 8,
        filePath: "src/assets/images/products/s7.jpg",
        isMain: true
      }
    ],
    latitude: 1.3528,
    longitude: 103.8205
  }
];