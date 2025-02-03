chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ filterEnabled: true });
});
