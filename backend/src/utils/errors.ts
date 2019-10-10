export enum thrownErrMsg {
  accountAdd = "Error adding account with username=:username:",
  communicationSaveError = "Error saving feed",
  communicationNotFound = "Could not find communication with id=:id:",
  communicationDelete = "Could not delete communication with id=:id:",
  testing = "This is a :adjective: :noun:. It is for testing :adjective: tests",
}

export function transformErrors(error: thrownErrMsg, replacements: {[s: string]: string}): string {
  let ret = error as string;
  for (const key of Object.keys(replacements)) {
    const re = new RegExp(`:${key}:`, "g");
    ret = ret.replace(re, replacements[key]);
  }
  return ret;
}
