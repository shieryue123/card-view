import {
  Message
} from "element - ui";

let messageInstance = null;
const overrideMessage = (options) => {
  if (messageInstance) {
    messageInstance.close();
  }
  messageInstance = Message(options);
};
[“error”, “success”, “info”, “warning”].forEach(type => {
  overrideMessage[type] = options => {
    if (typeof options === “string”) {
  options = {
    message: options
  };
}
options.type = type;
return overrideMessage(options);
  };
  });
export const message = overrideMessage;