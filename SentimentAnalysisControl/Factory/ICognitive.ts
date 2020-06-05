import { CognitiveResult } from "./CognitiveResult";

/**
 * Interface that encapsulate the cognitive data
 */
export default interface ICognitive {
  /**
   * Initialize the API
   * @param urlApi The url of API that make request
   * @param apiKey Api key that will be used to execute on the API
   */
  Initialize(urlApi: string, apiKey: string): any;
  /**
   * Execute the analyzation of the text
   * @param document text to be analyzed
   */
  AnalyzeText(document: string): Promise<CognitiveResult>;

  /**
   * Make a clean of the text for use on the API
   * @param document text to be cleaned
   */
  Sanitize(document: string): any;
}
