export default function masterDataMiddleware() {
  return next => action => {
    const { datas, type, ...rest } = action;

    if (!datas) return next(action);

    const SUCCESS = type;
    const REQUEST = type + '_REQUEST';
    const FAILURE = type + '_FAILURE';
    next({ ...rest, type: REQUEST });

    // console.log('masterDataMiddleware datas-->',action.type);
    switch(action.type){
    case 'FETCH_OPTIONS':
      next({ ...rest, datas, type: SUCCESS });
      return true;
    case 'SELECTED_COMPANY':
      next({ ...rest, datas, type: SUCCESS });
      return true;
    case 'SELECTED_WAREHOUSES':
      next({ ...rest, datas, type: SUCCESS });
      return true;
    case 'GET_LOTNUMBERPAGE':
        next({ ...rest, datas, type: SUCCESS });
        return true;
    default:
      return { ...rest};
    }

    return datas
   };
}
