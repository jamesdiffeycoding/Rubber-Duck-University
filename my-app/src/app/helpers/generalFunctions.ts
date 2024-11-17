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

export function convertToSentence(input: string): string {
  // Use a regular expression to add a space before each capital letter
  const result = input.replace(/([A-Z])/g, " $1").toLowerCase();
  return result;
}

export function getCategoryPromptInfo(category: string): string {
  switch (category) {
    case "modelAnswer":
      return "Create a model answer for this topic.";
    case "positives":
      return "Give yourself credit for what you did well.";
    case "thingsToImprove":
      return "Note one or two things you'd want to learn to improve your answer.";
    case "tag":
      return "Add tag(s) to help you scan through your graduates (e.g. Maths, biology, computer science)";
    default:
      return "Error: Category not found";
  }
}
