**Controle de Análise de Sentimento - Power Apps Component**

Componente de Power Apps para executar análise de sentimentos utilizandos Microsoft Cognitive Services ou IBM Watson. Muito prático em utilizar no caso de análisar os tweets do seu cliente, verificando como ele se sente.

![Sentiment Control](pcf_control_sentiment.gif)

O componente contém alguns parametro para serem configurados antes de utilizar:

> [!IMPORTANT] > **É necessário ter uma conta do Microsoft Azure Cognitive Service ou IBM watson para utilizar.**

| Property           | Description                                                                | Type   |
| ------------------ | -------------------------------------------------------------------------- | ------ |
| **TextValue**      | Texto que será análisado                                                   | string |
| **Provider**       | Selecionar o provedor que irá fazer a consulta: Microsoft ou IBM           | number |
| **SentimentValue** | Resultado da análise                                                       | string |
| **PositiveValue**  | Score positivo                                                             | number |
| **NeutralValue**   | Score neutro                                                               | number |
| **NegativeValue**  | Score Negativo                                                             | number |
| **apiEntityName**  | Nome da entidade onde irá ficar guardos os campos de url e chave de acesso | string |
| **apiKeyField**    | Campo que contém a chave                                                   | string |
| **apiUrlField**    | Campo que contém a url para API                                            | string |
| **apiFindField**   | Campo para ser utilizado na busca da entidade                              | string |
| **apiFindValue**   | Valor para para localizar no campo apiFindValue                            | string |

Caso necessite de alguma ajuda por favor entre em contato.
