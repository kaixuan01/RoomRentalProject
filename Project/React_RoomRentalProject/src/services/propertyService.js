import { mockProperties } from '../mock/propertyData';

export const propertyService = {
  async getProperties({ page = 1, limit = 6, filters = {} }) {
    try {
    //   const response = await axios.get(`${API_URL}/api/properties`, {
    //     params: {
    //       page,
    //       limit,
    //       searchText: filters.searchText || '',
    //       propertyType: filters.propertyType || '',
    //       propertyStatus: filters.propertyStatus || '',
    //       minArea: filters.minArea || '',
    //       minPrice: filters.priceRange?.[0] || '',
    //       maxPrice: filters.priceRange?.[1] || '',
    //     }
    //   });
    //   return response.data;

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Apply filters to mock data
      let filteredData = mockProperties.filter(property => {
        const matchesSearch = !filters.searchText || 
          property.name.toLowerCase().includes(filters.searchText.toLowerCase()) ||
          property.address.toLowerCase().includes(filters.searchText.toLowerCase());
        
        const matchesType = !filters.propertyType || 
          property.propertyType === filters.propertyType;
        
        const matchesStatus = !filters.propertyStatus || 
          property.propertyStatus === filters.propertyStatus;
        
        const matchesArea = !filters.minArea || 
          property.areaSize >= filters.minArea;
        
        const matchesPrice = (!filters.priceRange?.[0] || property.price >= filters.priceRange[0]) && 
          (!filters.priceRange?.[1] || property.price <= filters.priceRange[1]);

        return matchesSearch && matchesType && matchesStatus && 
          matchesArea && matchesPrice;
      });

      // Calculate pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      return {
        properties: paginatedData,
        totalCount: filteredData.length,
        hasMore: endIndex < filteredData.length,
        currentPage: page
      };

    } catch (error) {
      throw error;
    }
  },

  async getPropertyById(id) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const property = mockProperties.find(p => p.id === parseInt(id));
      if (!property) throw new Error('Property not found');

      return property;
    } catch (error) {
      throw error;
    }
  }
}; 