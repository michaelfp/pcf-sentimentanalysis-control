export const enum Sentiment {
  Positive = "Positive",
  Neutral = "Neutral",
  Negative = "Negative",
  Mixed = "Mixed",
}

export class CognitiveResult {
  private _OverallSentiment: Sentiment;
  private _Positive: number;
  private _Neutral: number;
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
