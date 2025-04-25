import { useHTTPReq } from '../hooks/HttpReq';
import { buildQueryString } from '../utils/helpers/stringHelper';

export const useTNCService = () => {
  const { HTTPReq } = useHTTPReq();

  const getTerms = (callbacks = {}, param) => {
    return HTTPReq({
      url: `/LegalTerm/GetLegalTermList?${buildQueryString(param)}`,
      method: 'GET',
      onSuccess: (data) => {
        if (callbacks.onSuccess) callbacks.onSuccess(data);
      },
      onError: (error) => {
        if (callbacks.onError) callbacks.onError(error);
      },
    });
  };

  const getTermById = (id, callbacks = {}) => {
    return HTTPReq({
      url: `/LegalTerm/GetLegalTermById?LegalTermId=${id}`,
      method: 'GET',
      onSuccess: (data) => {
        if (callbacks.onSuccess) callbacks.onSuccess(data);
      },
      onError: (error) => {
        if (callbacks.onError) callbacks.onError(error);
      },
    });
  };

  const createTerm = (termData, callbacks = {}) => {
    return HTTPReq({
      url: '/LegalTerm/CreateLegalTerm',
      method: 'POST',
      data: termData,
      onSuccess: (data, msg) => {
        if (callbacks.onSuccess) callbacks.onSuccess(data, msg);
      },
      onError: (error) => {
        if (callbacks.onError) callbacks.onError(error);
      },
    });
  };

  const updateTerm = (id, termData, callbacks = {}) => {
    return HTTPReq({
      url: `/LegalTerm/UpdateLegalTerm`,
      method: 'POST',
      data: { ...termData, id },
      onSuccess: (data, msg) => {
        if (callbacks.onSuccess) callbacks.onSuccess(data, msg);
      },
      onError: (error) => {
        if (callbacks.onError) callbacks.onError(error);
      },
    });
  };

  const deleteTerm = (id, callbacks = {}) => {
    return HTTPReq({
      url: `/LegalTerm/DeleteLegalTerm`,
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
    getTerms,
    getTermById,
    createTerm,
    updateTerm,
    deleteTerm,
  };
}; 