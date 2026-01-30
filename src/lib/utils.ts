const MONTHS = [
  "JANVIER",
  "FÉVRIER",
  "MARS",
  "AVRIL",
  "MAI",
  "JUIN",
  "JUILLET",
  "AOÛT",
  "SEPTEMBRE",
  "OCTOBRE",
  "NOVEMBRE",
  "DÉCEMBRE",
];

export default function parseDate(
  value: string,
  withDays: boolean = true,
): string {
  const splited = value.split("T")[0].split("-");

  const year = splited[0];
  const monthIndex = parseInt(splited[1], 10) - 1;
  const day = splited[2];

  const formattedDay = day.startsWith("0") ? day.slice(1) : day;

  if (withDays) {
    return `${formattedDay} ${MONTHS[monthIndex].toLowerCase()} ${year}`;
  } else {
    return `${MONTHS[monthIndex].toLowerCase()} ${year}`;
  }
}
