import {
  TextAnalyticsClient,
  AzureKeyCredential,
  AnalyzeSentimentResult,
} from "@azure/ai-text-analytics";

import { CognitiveResult, Sentiment } from "./CognitiveResult";
import ICognitive from "./ICognitive";

export class AzureCognitive implements ICognitive {
  private client: TextAnalyticsClient;

  public Result: CognitiveResult;

  Initialize(urlApi: string, apiKey: string) {
    this.client = new TextAnalyticsClient(
      urlApi,
      new AzureKeyCredential(apiKey)
    );
  }
  async AnalyzeText(document: string): Promise<CognitiveResult> {
    var documents = this.Sanitize(document);
    const results = await this.client.analyzeSentiment(documents);

    let countPhrases = results.length;
    let totalPositive = 0;
    let totalNeutral = 0;
    let totalNegative = 0;
    let sentiment = Sentiment.Neutral;

    for (const result of results) {
      if (result.error === undefined) {
        totalPositive += result.confidenceScores.positive;
        totalNegative += result.confidenceScores.negative;
        totalNeutral += result.confidenceScores.neutral;
      } else {
        console.error("Encountered an error:", result.error);
        countPhrases--;
      }
    }

    const resultPositive = totalPositive / countPhrases;
    const resultNegative = totalNegative / countPhrases;
    const resultNeutral = totalNeutral / countPhrases;

    if (resultPositive > resultNeutral && resultPositive > resultNegative)
      sentiment = Sentiment.Positive;

    if (resultNeutral > resultPositive && resultNeutral > resultNegative)
      sentiment = Sentiment.Neutral;

    if (resultNegative > resultPositive && resultNegative > resultNeutral)
      sentiment = Sentiment.Negative;

    var result = new CognitiveResult(
      sentiment,
      resultPositive,
      resultNeutral,
      resultNegative
    );

    for (const result of results) {
      if (result.error === undefined) {
        console.log("Overall sentiment:", result.sentiment);
        console.log("Scores:", result.confidenceScores);
      } else {
        console.error("Encountered an error:", result.error);
      }
    }

    return result;
  }

  Sanitize(document: string): any {
    if (document.indexOf(".") === -1) {
      return new Array(document);
    } else {
      var itens = document.split(".");
      var result = new Array();
      for (const item of itens) {
        if (item.trim() !== "") {
          result.push(item);
        }
      }

      return result;
    }
  }
}
