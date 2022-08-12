import { mockPlaces } from '../mockData/mockPlaces';

export const searchPlaces = ({value, filterBy}) =>  {
  
  switch (filterBy) {
    case 'address':
      return mockPlaces.filter((obj) => {
          if(obj?.address){
            return obj?.address.toLowerCase().indexOf(value.toLowerCase()) !== -1;
          }
          return false;
      })
    case 'state':
      return mockPlaces.filter((obj) => {
          if(obj?.state){
            return obj?.state.toLowerCase().indexOf(value.toLowerCase()) !== -1;
          }
          return false;
      })
    case 'country':
      return mockPlaces.filter((obj) => {
          if(obj?.country){
            return obj?.country.toLowerCase().indexOf(value.toLowerCase()) !== -1;
          }
          return false;
      })
    default:
      break;
  }
}
