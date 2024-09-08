interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface CoordinatesInput {
  lat: number;
  lng: number;
}
