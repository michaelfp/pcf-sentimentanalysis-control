import { AzureCognitive } from "./AzureCognitive";
import { WatsonCognitive } from "./WatsonCognitive";
import ICognitive from "./ICognitive";

/**
 * Current Provides that is supported
 */
export const enum CognitiveProvider {
  Azure,
  Watson,
}

/**
 * Factory to create the cognitives services to analyze the text
 */
export class CognitiveFactory {
  /**
   * Creates the cognitive service
   * @param provider The provider that will be used
   */
  static Create(provider: CognitiveProvider): ICognitive {
    var returnCognitive: ICognitive;

    switch (provider) {
      case CognitiveProvider.Azure:
        returnCognitive = new AzureCognitive();
        break;
      case CognitiveProvider.Watson:
        returnCognitive = new WatsonCognitive();
        break;
      default:
        console.error("You must select de Provider");
        throw new Error("You must select de Provider");
        break;
    }

    return returnCognitive;
  }
}
