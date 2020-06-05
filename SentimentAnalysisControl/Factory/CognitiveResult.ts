/**
 * Sentiments
 */
export const enum Sentiment {
  Positive = "Positive",
  Neutral = "Neutral",
  Negative = "Negative",
  Mixed = "Mixed",
}
/**
 * Result of Cognitive Validation
 */
export class CognitiveResult {
  /**
   * Result of Analyze
   */
  private _OverallSentiment: Sentiment;
  /**
   * Value of Positive
   */
  private _Positive: number;
  /**
   * Value of Neutral
   */
  private _Neutral: number;
  /**
   * Value of Negative
   */
  private _Negative: number;

  constructor(
    overall: Sentiment,
    positive: number,
    neutral: number,
    negative: number
  ) {
    this._OverallSentiment = overall;
    this._Positive = positive;
    this._Neutral = neutral;
    this._Negative = negative;
  }

  public get OverallSentiment(): Sentiment {
    return this._OverallSentiment;
  }

  public get Positive(): number {
    return this._Positive;
  }

  public get Negative(): number {
    return this._Negative;
  }

  public get Neutral(): number {
    return this._Neutral;
  }
}
