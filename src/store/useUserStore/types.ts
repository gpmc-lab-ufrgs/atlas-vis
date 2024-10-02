


export type UseUserStoreType = {

    location : {lat: number, long: number};
    followLocation: boolean;

    // get current user location Lat and Long
    getUserLocation( followLocation:boolean ): void;
}