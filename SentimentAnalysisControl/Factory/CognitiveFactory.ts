import { AzureCognitive } from "./AzureCognitive";
import { WatsonCognitive } from "./WatsonCognitive";
import ICognitive from "./ICognitive";

export const enum CognitiveProvider {
  Azure,
  Watson,
}

export class CognitiveFactory {
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
