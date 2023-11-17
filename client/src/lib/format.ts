export default function formatPrice(price: number, currency: string) {
  let locale;

  if (currency === "EUR") {
    locale = "fr-FR";
  } else {
    locale = "en-US";
  }

  return (price / 100).toLocaleString(locale, {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  });
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleString(undefined, options);
}

export const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export function formatDescription(description: string): string {
  if (!description) {
    return "";
  }

  const words = description.split(" ");
  if (words.length <= 20) {
    return description;
  }

  const truncatedDescription = words.slice(0, 20).join(" ");
  return truncatedDescription + "...";
}

export function formatLongueDescription(description: string): string {
  const words = description.split(" ");
  if (words.length <= 10) {
    return description;
  }
  const truncatedDescription = words.slice(0, 10).join(" ");
  return truncatedDescription + "...";
}
