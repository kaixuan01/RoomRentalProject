import { useHTTPReq } from '../hooks/HttpReq';
import { buildQueryString } from '../utils/helpers/stringHelper';

export const useTNCCategoryService = () => {
  const { HTTPReq } = useHTTPReq();

  const getCategories = (callbacks = {}, param) => {
    return HTTPReq({
      url: `/LegalTermCategories/GetLegalTermCategoriesList?${buildQueryString(param)}`,
      method: 'GET',
      onSuccess: (data) => {
        if (callbacks.onSuccess) callbacks.onSuccess(data);
      },
      onError: (error) => {
        if (callbacks.onError) callbacks.onError(error);
      },
    });
  };

  const getCategoryById = (id, callbacks = {}) => {
    return HTTPReq({
      url: `/LegalTermCategories/GetLegalTermCategoriesById?LegalTermCategoryId=${id}`,
      method: 'GET',
      onSuccess: (data) => {
        if (callbacks.onSuccess) callbacks.onSuccess(data);
      },
      onError: (error) => {
        if (callbacks.onError) callbacks.onError(error);
      },
    });
  };

  const createCategory = (categoryData, callbacks = {}) => {
    console.log('Making API call to create category with data:', categoryData);
    return HTTPReq({
      url: '/LegalTermCategories/CreateLegalTermCategory',
      method: 'POST',
      data: categoryData,
      onSuccess: (data, msg) => {
        console.log('API call successful:', data, msg);
        if (callbacks.onSuccess) callbacks.onSuccess(data, msg);
      },
      onError: (error) => {
        console.error('API call failed:', error);
        if (callbacks.onError) callbacks.onError(error);
      },
    });
  };

  const updateCategory = (id, categoryData, callbacks = {}) => {
    return HTTPReq({
      url: `/LegalTermCategories/UpdateLegalTermCategory`,
      method: 'POST',
      data: { ...categoryData, id },
      onSuccess: (data, msg) => {
        if (callbacks.onSuccess) callbacks.onSuccess(data, msg);
      },
      onError: (error) => {
        if (callbacks.onError) callbacks.onError(error);
      },
    });
  };

  const deleteCategory = (id, callbacks = {}) => {
    return HTTPReq({
      url: `/LegalTermCategories/DeleteLegalTermCategory`,
      method: 'POST',
      data: id,
      onSuccess: (data, msg) => {
        if (callbacks.onSuccess) callbacks.onSuccess(data, msg);
      },
      onError: (error) => {
        if (callbacks.onError) callbacks.onError(error);
      },
    });
  };

  return {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}; 