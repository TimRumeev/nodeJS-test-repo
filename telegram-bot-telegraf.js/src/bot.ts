import { env } from "process";
import { start } from "repl";
import { Telegraf } from "telegraf";

const bot = new Telegraf("5945286943:AAF1RAbIfTo9avDxwhu4T0vO2dqWQ-9JSCg");

const setupBot = (): Telegraf => {
	bot.use((ctx, next) => {
		console.log(ctx);
	});

	bot.start(start);

	return bot;
};
