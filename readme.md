**Sentiment Analysis Control - Power Apps Component**

> [!TIP]
> If you want to read in Brazilian language click [here](readme.pt-br.md)

A Power Apps component to execute a sentiment analysis using Microsoft Cognitive Services or IBM Watson. It´s really helpful if you like to watch your customer tweets, for example, to check how are you feeling your customer.

![Sentiment Control](https://blog.michaelfp.com.br/wp-content/uploads/2020/06/Video_2020-06-02_235034.gif)

The component has some properties that needs to be configured first.

> [!IMPORTANT]
> You must have a account in Microsoft Cognitive Services or IBM Watson.

| Property           | Description                                             | Type   |
| ------------------ | ------------------------------------------------------- | ------ |
| **TextValue**      | current text that will be analyzed                      | string |
| **Provider**       | Select the provider that will be used: Microsoft or IBM | number |
| **SentimentValue** | Result of analysis                                      | string |
| **PositiveValue**  | Positive score                                          | number |
| **NeutralValue**   | Neutral score                                           | number |
| **NegativeValue**  | Negative Score                                          | number |
| **apiEntityName**  | Entity name that will find the api data: url and key    | string |
| **apiKeyField**    | Field that has the api key value                        | string |
| **apiUrlField**    | Field that has the url value                            | string |
| **apiFindField**   | Field to find the data in the entity                    | string |
| **apiFindValue**   | Value to find using the apiFindValue                    | string |

If you need any help please let me know.
