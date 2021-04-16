export const dateTimeFormat = (value: Date, options: any = null) => {
  const rootOptions: any = {
    month: "long",
    day: "2-digit",
    timeZone: "UTC",
  };

  if (options) Object.assign(rootOptions, options);

  return new Intl.DateTimeFormat("ru-RU", rootOptions)
    .format(new Date(value))
    .split(",")
    .reverse()
    .join(", ");
};
