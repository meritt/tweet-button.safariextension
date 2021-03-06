var tweetCount = null;

function initTweetButton() {
  if (location.href === top.location.href) {
    getTweetBadge();

    safari.self.addEventListener('message', handleMessage, false);

    window.addEventListener('focus', updateTweetCount, true);
  }
}

function handleMessage(event) {
  if (event.name == 'cache-count') {
    tweetCount = event.message;
    updateTweetCount();
  }
}

function getTweetBadge() {
  if (tweetCount === null) {
    safari.self.tab.dispatchMessage('get-badge', true);
  }
}

function updateTweetCount() {
  getTweetBadge();

  if (tweetCount !== null) {
    safari.self.tab.dispatchMessage('update-badge', tweetCount);
  }
}

initTweetButton();