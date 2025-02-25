import { TopicAnswerData } from "./interfaces";

export const getData = () => {
  const data: TopicAnswerData[] = JSON.parse(
    localStorage.getItem("topicAnswerData") || "[]"
  );
  const sortedData = data.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return sortedData;
};
