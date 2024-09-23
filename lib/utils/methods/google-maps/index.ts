export function transformPolygon(
  coordinate: number[][]
): { lat: number; lng: number }[] {
  return coordinate.slice(0, coordinate.length - 1).map((item: number[]) => {
    return { lat: item[1], lng: item[0] };
  });
}

export function transformPath(
  path: { lng: number; lat: number }[]
): number[][][] {
  const geometry: number[][] = path.map((coordinates) => {
    return [coordinates.lng, coordinates.lat];
  });
  geometry.push(geometry[0]);
  return [geometry];
}
