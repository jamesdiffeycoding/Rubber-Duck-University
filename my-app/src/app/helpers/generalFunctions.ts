export const getRelativeTime = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);

  const isSameDay =
    now.getDate() === date.getDate() &&
    now.getMonth() === date.getMonth() &&
    now.getFullYear() === date.getFullYear();

  if (isSameDay) {
    const diffInMilliseconds = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

    if (diffInMinutes < 60) {
      return diffInMinutes === 1
        ? "1 minute ago"
        : `${diffInMinutes} minutes ago`;
    } else {
      return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
    }
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  }
};
