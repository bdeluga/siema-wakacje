export interface City {
  name: string;
  country: string;
  iso: string;
  lat: number;
  lng: number;
}

export interface Hotel {
  name: string;
  rate: number;
  point: {
    lat: number;
    lng: number;
  };
}
