/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import WatsonSpeech from "watson-speech";

// A U D I O - I N S T A N C E - I N I T I A L I Z E D - T O - N U L L
let audio = null;
// T H I S - W I L L - B E - T H E - A R R A Y - C A R R Y I N G - A L L - T E X T - M E S S A G E S - T O - W A T S O N - A P I
let textMessage = [];

// F U N C T I O N - T H A T - W I L L - T A K E - I N - A R R A Y - O F - T E X T - M E S S A G E S - A N D - A - V E R I F I E D - T O K E N
const startTalking = (message, token) => {
  // S T R I N G - T H A T - W I L L - B E - R E A D - O U T - L O U D
  let textString = "";
  // I F - A U D I O - I S - O N - A L R E A D Y - N O - N E E D - R E A D I N G - P R E V I O U S - M E S S G A E S - J U M P - T O - A - N E W - O N E
  if (audio !== null && !audio.ended) {
    // P A U S E - P R E V I O U S - A U D I O - M E S S A G E S
    audio.pause();
    // S T R I N G - T O - P L A Y - B E C O M E S - T H E - L A S T - B A T C H - M E S S A G E S
    textString = message[message.length - 1];
  }
  // E L S E - P L A Y - E V E R Y T H I N G - I N S I D E - T H E - A R R A Y
  else {
    textString = message.join(" ");
  }

  audio = WatsonSpeech.TextToSpeech.synthesize({
    text: textString, // Output text/response
    voice: "en-US_MichaelVoice", // Default Watson voice
    autoPlay: true, // Automatically plays audio
    token: token
  });
  // I T'S - I M P O R T A N T - T O - C L E A R - T H E - A R R A Y - O N C E - M E S S A G E S - A R E - A L L - R E A D
  audio.onended = function() {
    textMessage = [];
  };
};

const TextToSpeechHandler = (apiResponseFromWatsonConversation, token) => {
  if (apiResponseFromWatsonConversation) {
    const { output } = apiResponseFromWatsonConversation.data;
    // M E S S A G E S - A R E - A R R A N G E - I N - B A T C H E S.. - M A K I N G - I T - S O - E A S Y - T O - F I L T E R - O U T - L A S T - B A C T H - O F - M E S S A G E S
    let batchMessages = "";

    output.generic.forEach(data => {
      if (data && data.response_type === "text") {
        batchMessages += data.text + " <break time='0.2s'/>"; // ADD A BREAK TO READER'S SPEECH
      }
      if (data && data.response_type === "option") {
        batchMessages += data.title + " <break time='0.2s'/>";
        data.options.forEach(option => {
          batchMessages += option.label + " <break time='0.2s'/>";
        });
      }
    });

    textMessage.push(batchMessages);
    // I F - A R R A Y - I S - E M P T Y - N O T H I N G - TO - R E A D
    if (textMessage.length > 0) {
      // S T A R T - S P E A K I N G
      startTalking(textMessage, token);
    }
  }
};

export default TextToSpeechHandler;
