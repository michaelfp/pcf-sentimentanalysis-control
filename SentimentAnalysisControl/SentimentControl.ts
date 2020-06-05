import {
  CognitiveProvider,
  CognitiveFactory,
} from "./Factory/CognitiveFactory";

import {
  SignalDispatcher,
  SimpleEventDispatcher,
  EventDispatcher,
  IEvent,
  ISimpleEvent,
} from "strongly-typed-events";

import ICognitive from "./Factory/ICognitive";
import { CognitiveResult, Sentiment } from "./Factory/CognitiveResult";
import { BasePrivateKeyEncodingOptions } from "crypto";

export default class SentimentControl {
  public ID: string;

  private _classControl = "sentiment-control";

  private _textValue: string;
  private _container: HTMLDivElement;
  private _textControl: HTMLTextAreaElement;
  private _sentiment: Sentiment;
  private _cognitiveResultControl: HTMLParagraphElement;
  private _cognitiveResultContainer: HTMLDivElement;
  private _cognitiveResultIcon: HTMLDivElement;
  // private _cognitiveResultPositive: HTMLDivElement;
  // private _cognitiveResultNegative: HTMLDivElement;

  private _cognitiveService: ICognitive;
  private _onChange = new EventDispatcher<SentimentControl, string>();
  private _onResultChange = new SimpleEventDispatcher<CognitiveResult>();

  public get OnChange(): IEvent<SentimentControl, string> {
    return this._onChange.asEvent();
  }

  public get OnResultChange(): ISimpleEvent<CognitiveResult> {
    return this._onResultChange.asEvent();
  }

  constructor(
    provider: CognitiveProvider,
    urlApi: string,
    apiKey: string,
    textValue: string,
    sentiment: Sentiment
  ) {
    console.log("Provider " + provider);
    this.ID = this.createUniqueId();
    this._cognitiveService = CognitiveFactory.Create(provider);
    this._onTextChanged = this._onTextChanged.bind(this);
    this._cognitiveService.Initialize(urlApi, apiKey);
    this._textValue = textValue;
    this._sentiment = sentiment;
  }

  /**
   * Get UniqueId so as to avoid id conflict between multiple fields bind to same attribute
   * @param context The "Input Properties" containing the parameters, control metadata and interface functions.
   * @param passInString input string as suffix
   * @param randomInt random integer
   * @returns a string of uniqueId includes attribute logicalname + passIn specialized string + random Integer
   */
  private createUniqueId(): string {
    let randomInt = Math.floor(Math.floor(100) * Math.random());
    return "SentimentControl_" + randomInt;
  }

  private _onTextChanged(evt: Event): void {
    this._onChange.dispatch(this, this._textControl.value);
  }

  public renderControl(): HTMLDivElement {
    if (this._textControl === undefined) {
      this._textControl = document.createElement("textarea");
      this._textControl.id = "textControl_" + this.ID;
      this._textControl.value = this._textValue;
      this._textControl.addEventListener("change", this._onTextChanged);
    }

    if (this._cognitiveResultControl == null) {
      this._cognitiveResultControl = document.createElement("p");
      this._cognitiveResultControl.id = this.ID + "_result";
    }

    if (this._cognitiveResultContainer === undefined) {
      this._cognitiveResultContainer = document.createElement("div");
      this._cognitiveResultContainer.id = "container_" + this.ID;
      this._cognitiveResultContainer.className = "wrapper";

      this._cognitiveResultIcon = document.createElement("div");
      // this._cognitiveResultNegative = document.createElement("div");
      // this._cognitiveResultPositive = document.createElement("div");

      this._cognitiveResultIcon.id = "icon_" + this.ID;
      // this._cognitiveResultNegative.id = "negative_" + this.ID;
      // this._cognitiveResultPositive.id = "positive_" + this.ID;

      switch (this._sentiment) {
        case Sentiment.Positive:
          this._cognitiveResultIcon.className = "sentiment positive-sentiment";
          break;
        case Sentiment.Negative:
          this._cognitiveResultIcon.className = "sentiment negative-sentiment";
          break;
        case Sentiment.Neutral:
          this._cognitiveResultIcon.className = "sentiment neutral-sentiment";
          break;
        default:
          this._cognitiveResultIcon.className = "sentiment hide";
          break;
      }

      // if (this._sentiment === Sentiment.Positive)
      //   this._cognitiveResultIcon.className =
      //     "sentiment neutral-sentiment hide";

      // this._cognitiveResultIcon.className = "sentiment neutral-sentiment hide";
      // this._cognitiveResultNegative.className =
      //   "sentiment negative-sentiment hide";
      // this._cognitiveResultPositive.className =
      //   "sentiment positive-sentiment hide";

      // this._cognitiveResultContainer.appendChild(this._cognitiveResultNeutral);
      // this._cognitiveResultContainer.appendChild(this._cognitiveResultNegative);

      this._cognitiveResultContainer.appendChild(this._cognitiveResultIcon);
    }

    if (this._container == null) {
      this._container = document.createElement("div");
      this._container.id = this.ID;
      this._container.className = this._classControl;
      this._container.appendChild(this._textControl);
      this._container.appendChild(this._cognitiveResultContainer);

      // this._container.appendChild(this._cognitiveResultControl);
    }

    return this._container;
  }

  public UpdateData(text: string): void {
    let analyze = true;
    console.log("New Value:" + text);
    console.log("Old Value:" + this._textValue);

    if (this._textControl !== undefined) {
      analyze = text !== this._textValue;
      this._textValue = text;
      this._textControl.value = text;
    }
    console.log("Analyze:" + analyze);
    if (analyze) this._MakeAnalysis();
  }

  private _MakeAnalysis(): void {
    this._cognitiveService
      .AnalyzeText(this._textControl.value)
      .then((r) => {
        this._RenderResult(r);
        this._onResultChange.dispatch(r);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  private _RenderResult(result: CognitiveResult): void {
    if (this._cognitiveResultControl !== undefined) {
      if (result !== undefined) {
        switch (result.OverallSentiment) {
          case Sentiment.Positive:
            this._cognitiveResultIcon.className =
              "sentiment positive-sentiment";
            break;
          case Sentiment.Negative:
            this._cognitiveResultIcon.className =
              "sentiment negative-sentiment";
            break;
          case Sentiment.Neutral:
            this._cognitiveResultIcon.className = "sentiment neutral-sentiment";
            break;
          default:
            this._cognitiveResultIcon.className = "sentiment hide";
            break;
          /*case Sentiment.Positive:
            this._cognitiveResultNeutral.className =
              "sentiment neutral-sentiment hide";
            this._cognitiveResultNegative.className =
              "sentiment negative-sentiment hide";
            this._cognitiveResultPositive.className =
              "sentiment positive-sentiment";
            break;
          case Sentiment.Negative:
            this._cognitiveResultNeutral.className =
              "sentiment neutral-sentiment hide";
            this._cognitiveResultNegative.className =
              "sentiment negative-sentiment";
            this._cognitiveResultPositive.className =
              "sentiment positive-sentiment hide";
            break;
          case Sentiment.Neutral:
            this._cognitiveResultNeutral.className =
              "sentiment neutral-sentiment";
            this._cognitiveResultNegative.className =
              "sentiment negative-sentiment hide";
            this._cognitiveResultPositive.className =
              "sentiment positive-sentiment hide";
            break;
          default:
            this._cognitiveResultNeutral.className =
              "sentiment neutral-sentiment hide";
            this._cognitiveResultNegative.className =
              "sentiment negative-sentiment hide";
            this._cognitiveResultPositive.className =
              "sentiment positive-sentiment hide";
            break;*/
        }

        if (this._cognitiveResultControl !== undefined) {
          this._cognitiveResultControl.innerHTML = `Sentiment: ${result.OverallSentiment.toString()} \n Positive: ${
            result.Positive
          }
        Neutral: ${result.Neutral} \n
        Negative: ${result.Negative}`;
        }
      }
    }
  }
}
