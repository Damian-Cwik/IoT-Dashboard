export interface Data {
  deviceId: number;
  temperature: number | undefined;
  pressure: number | undefined;
  humidity: number | undefined;
  readingDate: Array<Date>;
}
