// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import "./components/editor";

"use strict";
window.onload = function () {
  let changeColor = document.getElementById("changeColor");
  chrome.storage.sync.get("color", function (data) {
    if (changeColor == null) return;
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute("value", data.color);
  });

  if (changeColor == null) return;
  changeColor.onclick = function (element) {
    if (element.target == null) return;

    // @ts-ignore
    let color = element.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // @ts-ignore
      chrome.tabs.executeScript(tabs[0].id, {
        code: 'document.body.style.backgroundColor = "' + color + '";',
      });
    });
  };
};
