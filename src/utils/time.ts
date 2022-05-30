import moment from "moment";

export enum TimeFormats {
  YMD = "YYYY-MM-DD",
}

export function formatTime(time: string, format: TimeFormats) {
  return moment(time).format(format);
}

export function getInterval(start: string, end: string) {
  const startDate = Date.parse(start);
  const endDate = Date.parse(end);
  const days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
  return days;
}
