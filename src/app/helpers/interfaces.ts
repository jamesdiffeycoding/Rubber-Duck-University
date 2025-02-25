export interface TopicAnswerData {
  topic: string;
  answer: string;
  date: string;
  modelAnswer?: string;
  positives?: string;
  thingsToImprove?: string;
  tag?: string;
  placeholderForEditing: string;
}
