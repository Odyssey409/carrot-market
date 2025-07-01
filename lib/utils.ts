export const formatToWon = (price: number): string => {
  return price.toLocaleString("ko-KR", {
    style: "currency",
    currency: "KRW",
  });
};

export const formatToDate = (date: Date): string => {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);

  const formattedDate = new Intl.RelativeTimeFormat("ko");

  return formattedDate.format(diff, "days");
};
