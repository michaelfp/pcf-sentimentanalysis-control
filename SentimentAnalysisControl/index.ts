import { IInputs, IOutputs } from "./generated/ManifestTypes";
import SentimentControl from "./SentimentControl";
import { CognitiveProvider } from "./Factory/CognitiveFactory";
import { CognitiveResult } from "./Factory/CognitiveResult";
require.resolve("./css/SentimentAnalysisControl.scss");

export class SentimentAnalysisControl
  implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private control: SentimentControl;
  private _context: ComponentFramework.Context<IInputs>;
  private _container: HTMLDivElement;
  private _refreshData: EventListenerOrEventListenerObject;
  private _value: string;
  private _neturalValue: number;
  private _positiveValue: number;
  private _negativeValue: number;
  private _semtimentValue: string;
  private _notifyOutputchanged: () => void;
  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ) {
    // Add control initialization code
    this._context = context;
    let apiEntityName = context.parameters.apiEntityName.raw
      ? context.parameters.apiEntityName.raw
      : "";
    let apiUrl = context.parameters.apiUrlField.raw
      ? context.parameters.apiUrlField.raw
      : "";
    let apiKeyField = context.parameters.apiKeyField.raw
      ? context.parameters.apiKeyField.raw
      : "";
    let apiFindField = context.parameters.apiFindValue.raw
      ? context.parameters.apiFindValue.raw
      : "";
    let apiFindValue = context.parameters.apiFindValue.raw
      ? context.parameters.apiFindValue.raw
      : "";

    this._GetApiKey(
      apiEntityName,
      apiKeyField,
      apiUrl,
      apiFindField,
      apiFindValue
    )
      .then((response) => {
        if (response instanceof Array) {
          this.control = new SentimentControl(
            CognitiveProvider.Azure,
            response[0], //url
            response[1], //key
            context.parameters.TextValue.raw
              ? context.parameters.TextValue.raw
              : ""
          );

          this._notifyOutputchanged = notifyOutputChanged;
          this._container = document.createElement("div");

          this.control.OnChange.subscribe(this._OnChange.bind(this));
          this.control.OnResultChange.subscribe(
            this._OnResultChange.bind(this)
          );
          container.appendChild(this.control.renderControl());
          this._container = container;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  private _OnChange(control: SentimentControl, valueChange: string): void {
    console.log("Text Changed");
    this._value = valueChange;
    this.control.UpdateData(valueChange);
  }

  private _OnResultChange(result: CognitiveResult) {
    console.log("Result Changed");
    console.log(result);

    this._semtimentValue = result.OverallSentiment.toString();
    this._neturalValue = result.Neutral;
    this._negativeValue = result.Negative;
    this._positiveValue = result.Positive;
    this._notifyOutputchanged();
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Add code to update control view
    console.log("Updated View");
    this._context = context;

    this._semtimentValue = this._context.parameters.SentimentValue.raw
      ? this._context.parameters.SentimentValue.raw
      : "";
    this._negativeValue = this._context.parameters.NegativeValue.raw
      ? this._context.parameters.NegativeValue.raw
      : 0;
    this._neturalValue = this._context.parameters.NeutralValue.raw
      ? this._context.parameters.NeutralValue.raw
      : 0;
    this._positiveValue = this._context.parameters.PositiveValue.raw
      ? this._context.parameters.PositiveValue.raw
      : 0;
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {
      TextValue: this._value,
      NegativeValue: this._negativeValue,
      NeutralValue: this._neturalValue,
      PositiveValue: this._positiveValue,
      SentimentValue: this._semtimentValue,
    };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }

  private async _GetApiKey(
    entityName: string,
    fieldKey: string,
    fieldUrl: string,
    findField: string,
    findValue: string
  ): Promise<any> {
    if (this._context !== undefined) {
      let query = `$select=${fieldKey},${fieldUrl}&filter=${findField} eq ${findValue}`;
      try {
        var result = await this._context.webAPI.retrieveMultipleRecords(
          entityName,
          query
        );

        if (result.entities.length > 0) {
          return new Array(
            result.entities[0].fieldUrl,
            result.entities[0].fieldKey
          );
        } else {
          return new Array(
            "https://mfpcognitivetext.cognitiveservices.azure.com/",
            "c6c1421274ae4c68b524624ea7ed3b23"
          );
        }
      } catch (err) {
        return new Array(
          "https://mfpcognitivetext.cognitiveservices.azure.com/",
          "c6c1421274ae4c68b524624ea7ed3b23"
        );
      }
    }

    return undefined;
  }
}
