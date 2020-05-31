// import { browser } from "webextension-polyfill-ts";
import "@webcomponents/custom-elements";
import "./components/editor";

const execute = async () => {
  const path = window.location.pathname;
  const data = path.match(/\/contests\/(.+)\/tasks\/(.+)/);
  if (data) {
    const taskStatement = document.getElementById("task-statement");
    if (taskStatement == null) {
      return;
    }

    const el = document.createElement("atcoder-note-editor");
    taskStatement.parentNode?.insertBefore(el, taskStatement.nextSibling);
  }
};

execute();
