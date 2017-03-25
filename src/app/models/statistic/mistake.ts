export interface TypedMistakeCount {
  [replacerChar: string]: number;
}

export interface Mistakes {
  [replacedChar: string]: TypedMistakeCount;
};
