import { PaceFrontend } from "components/PaceFrontend";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HttpClient } from "./utils/http";
import { PaceBackendClient } from "external-clients/pacebackend";

declare var document: any;

const httpClient = new HttpClient();
const pacebackend = new PaceBackendClient(httpClient);

ReactDOM.render(
  <PaceFrontend pacebackend={pacebackend} />,
  document.getElementById("root"),
);
