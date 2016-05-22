# twitch-categories

A web app for browsing streams on twitch.tv by categories, determined via hashtags in the stream title. **This is a work in progress!**

## Setup

Run the following to get started with this repository:

```
git clone https://github.com/jdegner0129/twitch-categories.git
cd twitch-categories
npm install
npm run start
```

## Structure
The current idea is for the program flow to work as such:

1. A worker process scrapes `https://api.twitch.tv/kraken/streams` on some interval for hashtags in current stream titles and stores them in Redis as categories. Night to night, the categories that persist will eventually have a ranking associated with them for ordering.
2. A web client requests the categories cached in Redis and exposes them to the user, allowing them to browse streams by each category.
3. When a user clicks on a specific category, the web client makes a request to `https://api.twitch.tv/kraken/search/streams?q=:category` and displays the results.
4. Each result will look similar to how it would on Twitch -- displaying a thumbnail, the name of the stream, the number of viewers, and the game being played. When clicked, it'll redirect the user to that stream on twitch.tv.
