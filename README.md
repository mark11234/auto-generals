# Auto Generals

Simulate generals.io games on this site by designing an algorithm

## Set up

To host the website locally type the command 
```shell
npm start
```
This should take you to the same webpage as https://mark11234.github.io/auto-generals 

## Run a simulation

Build your own bots & add them to the `src/bots/` directory.

To test the bot edit the imports at the top of `src/helpers/getNextGameState.ts`

```js
// Change these to change the bots
import bot1 from '../bots/<yourBotHere>';
import bot2 from '../bots/<yourBotHere>';
```
