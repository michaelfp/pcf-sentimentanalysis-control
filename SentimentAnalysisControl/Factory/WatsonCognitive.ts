import ICognitive from "./ICognitive";
import { CognitiveResult, Sentiment } from "./CognitiveResult";

export class WatsonCognitive implements ICognitive {
  public Result: CognitiveResult;
  Initialize(urlApi: string, apiKey: string) {
    throw new Error("Method not implemented.");
  }
  AnalyzeText(document: string): Promise<CognitiveResult> {
    throw new Error("Method not implemented.");
  }

  Sanitize(document: string): any {}
}
