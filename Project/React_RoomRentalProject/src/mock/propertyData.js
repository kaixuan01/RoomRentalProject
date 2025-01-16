import { PropertyType, PropertyStatus, ApprovalStatus, FacilityType } from '../types/property.types.js';
import villaSmallBedroom from '../assets/images/Property_example/Villa/small-bedroom.jpg';
import villaLivingRoom from '../assets/images/Property_example/Villa/livingroom.jpg';
import villaSwimmingPool from '../assets/images/Property_example/Villa/swimmingPool.png';
import villaBalcony from '../assets/images/Property_example/Villa/balcony.jpg';
import emptyShoppingBag from '../assets/images/products/empty-shopping-bag.gif';
import condoBadroom from '../assets/images/Property_example/Condo/bedroom.jpg';
import apartmentKitchen from '../assets/images/Property_example/Apartment/kitchen.jpg';
import apermentBedroom from '../assets/images/Property_example/Apartment/bedroom.jpg';
import houseBedroom from '../assets/images/Property_example/House/bedroom.jpg';

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
    facilities: [
      FacilityType.Pool,
      FacilityType.Gym,
      FacilityType.Parking,
      FacilityType.Security,
      FacilityType.WiFi,
      FacilityType.AirCon,
      FacilityType.Balcony
    ],
    photos: [
      {
        id: 1,
        filePath: villaLivingRoom,
        isMain: true
      },
      {
        id: 2,
        filePath: villaSmallBedroom,
        isMain: false
      },
      {
        id: 3,
        filePath: villaSwimmingPool,
        isMain: false
      },
      {
        id: 4,
        filePath: villaBalcony,
        isMain: false
      },
      {
        id: 5,
        filePath: emptyShoppingBag,
        isMain: false
      },
      {
        id: 6,
        filePath: villaLivingRoom,
        isMain: false
      },
      {
        id: 7,
        filePath: villaLivingRoom,
        isMain: false
      },
      {
        id: 8,
        filePath: villaLivingRoom,
        isMain: false
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
    facilities: [
      FacilityType.Parking,
      FacilityType.Security,
      FacilityType.WiFi,
      FacilityType.AirCon,
      FacilityType.Laundry,
      FacilityType.PetFriendly
    ],
    photos: [
      {
        id: 9,
        filePath: apermentBedroom,
        isMain: true
      },
      {
        id: 10,
        filePath: villaBalcony,
        isMain: false
      },
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
    facilities: [
      FacilityType.Gym,
      FacilityType.Parking,
      FacilityType.CCTV,
      FacilityType.Elevator,
      FacilityType.Garden,
      FacilityType.BBQ,
      FacilityType.PlayArea
    ],
    photos: [
      {
        id: 11,
        filePath: apartmentKitchen,
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
    facilities: [
      FacilityType.Pool,
      FacilityType.Security,
      FacilityType.Parking,
      FacilityType.WiFi,
      FacilityType.AirCon,
      FacilityType.Balcony
    ],
    photos: [
      {
        id: 12,
        filePath: condoBadroom,
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
    facilities: [
      FacilityType.Parking,
      FacilityType.WiFi,
      FacilityType.AirCon,
      FacilityType.Balcony
    ],
    photos: [
      {
        id: 13,
        filePath: houseBedroom,
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
    facilities: [
      FacilityType.Gym,
      FacilityType.Parking,
      FacilityType.Security,
      FacilityType.AirCon,
      FacilityType.Laundry,
      FacilityType.PetFriendly
    ],
    photos: [
      {
        id: 14,
        filePath: villaBalcony,
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
    facilities: [
      FacilityType.Parking,
      FacilityType.Security,
      FacilityType.AirCon,
      FacilityType.Laundry,
      FacilityType.PetFriendly
    ],
    photos: [
      {
        id: 15,
        filePath: villaLivingRoom,
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
    facilities: [
      FacilityType.Pool,
      FacilityType.Gym,
      FacilityType.Security,
      FacilityType.Parking,
      FacilityType.WiFi,
      FacilityType.AirCon,
      FacilityType.Balcony
    ],
    photos: [
      {
        id: 16,
        filePath: villaSwimmingPool,
        isMain: true
      }
    ],
    latitude: 1.3528,
    longitude: 103.8205
  }
];