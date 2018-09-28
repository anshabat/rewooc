export const getAjaxEndpoint = (action) => {
    return woocommerce_params.wc_ajax_url.toString().replace( '%%endpoint%%', action );
};