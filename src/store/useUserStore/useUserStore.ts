import {create} from 'zustand';

import {logging} from '../../utils/loggin';
import {UseUserStoreType} from './types';

const initialState = {
  location: {lat: 0, long: 0},
  followLocation: false,
};

export const useUserStore = create<UseUserStoreType>()(set => ({
  ...initialState,
  // get current user location Lat and Long
  getUserLocation: (followLocation: boolean): void => {
    // get from browser the current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          set({
            location: {
              lat: position.coords.latitude,
              long: position.coords.longitude,
            },
          });
        },
        error => {
          logging.error(`getUserLocation ERROR ${error}`);
        }
      );

      if (followLocation)
        navigator.geolocation.watchPosition(
          position => {
            set({
              location: {
                lat: position.coords.latitude,
                long: position.coords.longitude,
              },
            });
          },
          error => {
            logging.error(`getUserLocation ERROR ${error}`);
          }
        );
    } else {
      logging.error('Geolocation is not supported by this browser.');
    }
  },
}));
