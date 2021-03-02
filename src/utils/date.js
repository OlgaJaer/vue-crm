export default function dateFormater(value) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };
  return new Intl.DateTimeFormat("ru-RU", options).format(new Date(value));
}
