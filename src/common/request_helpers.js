const API_BASE = "http://vendor-product-api.herokuapp.com/api/"
//const API_BASE =  "http://localhost:8000/api/"

export const VENDORS_URL = dummy => API_BASE + "vendors";
export const VENDOR_URL = vendor_id => API_BASE + `vendors/${ vendor_id }`;
export const VENDOR_PRODUCTS_URL = vendor_id => API_BASE + `vendors/${ 
  vendor_id }/products`;
export const PRODUCTS_URL = dummy => API_BASE + "products";
export const PRODUCT_URL = product_id => API_BASE + `products/${ product_id }`;

const create_request = (method, data) => ({
  method: method,
  headers: { 
    "origin": "*"
  },
  ...( method !== 'GET' && { body: JSON.stringify( data) })
});

export const make_request_on_by_with = (request_name, request_arguments, 
  data = null) => ({
  url: request_name( request_arguments.id),
  request: create_request( request_arguments.method, data)
});

export const call_api = async ( url, request) => {
  const response = await fetch( url, request);
  if (response.status == 204)
    return {
      status: 204, body: {}      
    };
  return { 
    status: response.status, body: await response.json()
  };
};

