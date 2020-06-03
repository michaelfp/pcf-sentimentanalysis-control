import { CognitiveResult } from "./CognitiveResult";

export default interface ICognitive {
  Initialize(urlApi: string, apiKey: string): any;
  AnalyzeText(document: string): Promise<CognitiveResult>;

  Sanitize(document: string): any;
}
