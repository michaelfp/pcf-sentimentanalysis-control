import ICognitive from "./ICognitive";
import { CognitiveResult, Sentiment } from "./CognitiveResult";
import { stringify } from "querystring";
const ToneAnalyzerV3 = require("ibm-watson/tone-analyzer/v3");
const {
  IamAuthenticator,
  BearerTokenAuthenticator,
} = require("ibm-watson/auth");

export class WatsonCognitive implements ICognitive {
  private _tonaAnalyzer: any;

  private _toneParams = {
    toneInput: { text: "" },
    contentType: "application/json",
  };

  Initialize(urlApi: string, apiKey: string) {
    this._tonaAnalyzer = new ToneAnalyzerV3({
      version: "2017-09-21",
      authenticator: new BearerTokenAuthenticator({
        bearerToken: apiKey /*bearertoken - watson recommend to get the token from server*/,
      }),
      url: urlApi /*urlApi*/,
    });
  }
  async AnalyzeText(document: string): Promise<CognitiveResult> {
    let result = new CognitiveResult(Sentiment.Mixed, 0, 0, 0);
    if (this._tonaAnalyzer !== undefined) {
      this._toneParams.toneInput.text = document;

      try {
        const toneAnalysis = await this._tonaAnalyzer.tone(this._toneParams);
        if (toneAnalysis !== undefined) {
          if (toneAnalysis.result !== undefined) {
            if (toneAnalysis.result.document_tone.tones instanceof Array) {
              let sentimentResult = Sentiment.Neutral;
              let positiveValue = 0;
              let negativeValue = 0;
              if (
                toneAnalysis.result.document_tone.tones[0].tone_id ===
                  "anger" ||
                toneAnalysis.result.document_tone.tones[0].tone_id ===
                  "sadness" ||
                toneAnalysis.result.document_tone.tones[0].tone_id === "fear"
              ) {
                sentimentResult = Sentiment.Negative;
                negativeValue =
                  toneAnalysis.result.document_tone.tones[0].score;
              } else if (
                toneAnalysis.result.document_tone.tones[0].tone_id === "joy"
              ) {
                sentimentResult = Sentiment.Positive;
                positiveValue =
                  toneAnalysis.result.document_tone.tones[0].score;
              }

              result = new CognitiveResult(
                sentimentResult,
                positiveValue,
                0,
                negativeValue
              );
            }
          }
        }
      } catch (err) {
        throw err;
      }
    }

    return result;
  }

  Sanitize(document: string): any {}
}
