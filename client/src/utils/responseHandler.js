/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

const ResponseHandler = (apiResponse, addMessage) => {
  if (apiResponse) {
    // console.log(apiResponse);
    const { intents, output /*entities, context*/ } = apiResponse.data;
    // P I C K - T H E - F I R S T - I N T E N T - A N D - C O N F I D E N C E;
    const outputIntent = intents && intents[0] ? intents[0].intent : "";
    //const outputConfidence = intents && intents[0] ? intents[0].confidence : "";

    // P I C K - T H E - F I R S T - E N T I T Y ;
    //const outputEntity = entities && entities[0] ? entities[0] : "";

    // P I C K - D A T E;
    const outputDate = new Date().toLocaleTimeString();

    output.generic.forEach(data => {
      if (data && data.response_type === "text") {
        // console.log(data.text);
        const outputMessage = {
          position: "left",
          label: outputIntent,
          message: data.text,
          date: outputDate,
          hasTail: true
        };
        // A D D - M E S S A G E - T O - T H E - P A C K;
        addMessage(outputMessage);
      }
      if (data && data.response_type === "option") {
        // console.log("OPTIONS!");
        const outputMessage = {
          position: "left",
          label: outputIntent,
          message: {
            title: data.title,
            options: data.options
          },
          date: outputDate,
          hasTail: true
        };
        // A D D - M E S S A G E - T O - T H E - P A C K;
        addMessage(outputMessage);
      }
    });
  }
};

export default ResponseHandler;
