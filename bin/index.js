#!/usr/bin/env node

import os from "os";
import path from "path";
import open from "open";
import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import gradient from "gradient-string";
import { exec } from "child_process";

// Show Title in Gradient ASCII
console.log(
  gradient.pastel.multiline(
    figlet.textSync("FuzzieCoder", { horizontalLayout: "full" })
  )
);

// Suggestion for cmd/ctrl + click usage
const suggestion = `${chalk.yellow("💡 Suggestion:")} Try using ${chalk.blue(
  "cmd/ctrl + click"
)} on the links below to open them quickly!`;

// Boxen Configuration
const options = {
  width: 64,
  padding: 1,
  borderStyle: "single",
  title: "Hey there! 👋",
  borderColor: "#66FF66",
  titleAlignment: "center",
};

// Color-coded labels and platform links
const data = {
  labelGitHub: chalk.bgHex("#24292e").white.bold("GitHub    "),
  labelLinkedIn: chalk.bgHex("#0b66c2").black.bold("LinkedIn  "),
  labelWeb: chalk.bgHex("#4CAF50").black.bold("Portfolio "),
  labelInstagram: chalk.bgHex("#C13584").black.bold("Instagram "),

  github: chalk.gray("https://github.com/") + chalk.green("fuzziecoder"),
  web: chalk.yellowBright.underline("https://www.fuzziecoder.online/"),
  instagram:
    chalk.gray("https://www.instagram.com/") + chalk.hex("#AB1E6B")("fuzziecoder"),
  linkedin:
    chalk.gray("https://linkedin.com/in/") + chalk.blueBright("fuzziecoder"),

  intro:
    chalk.white.bold(
      "Hi! I'm Ram Kumar, a Pre-Final Year Engineering Student specializing in "
    ) +
    chalk.hex("#7B68EE")("AI & Data Science") +
    chalk.white.bold(
      ". Passionate about building clean, efficient, and user-friendly applications."
    ),
};

// Combine intro & links into Box Output
const newline = "\n";
const output =
  data.intro +
  newline +
  newline +
  `${data.labelGitHub}  ${data.github}` +
  newline +
  `${data.labelWeb}  ${data.web}` +
  newline +
  `${data.labelInstagram}  ${data.instagram}` +
  newline +
  `${data.labelLinkedIn}  ${data.linkedin}`;

// Show Box & Suggestion
console.log(chalk.white(boxen(output, options)));
console.log(`\n${suggestion}\n`);

// User Interaction Questions
const questions = [
  {
    type: "list",
    name: "action",
    message: "🤖 What do you want to do?",
    choices: [
      {
        name: "🌐 Open GitHub",
        value: () => {
          open("https://github.com/fuzziecoder");
          console.log(chalk.green("🚀 Opening GitHub..."));
        },
      },
      {
        name: "💼 Open LinkedIn",
        value: () => {
          open("https://www.linkedin.com/in/fuzziecoder");
          console.log(chalk.green("🔗 Opening LinkedIn..."));
        },
      },
      {
        name: "📧 Send me an Email",
        value: () => {
          console.log(chalk.green("📩 Opening mail client..."));
          exec("start mailto:ramvj2005@gmail.com");
        },
      },
      {
        name: "📂 View Portfolio",
        value: () => {
          open("https://fuzziecoder.online/");
          console.log(chalk.green("🌟 Opening Portfolio..."));
        },
      },
      {
        name: "🚪 Just quit!",
        value: () => {
          console.log(chalk.red("\nThanks for stopping by! Have an amazing day! 🎉\n"));
          process.exit(0);
        },
      },
    ],
  },
];

// Recursive prompt loop
function promptUser() {
  inquirer.prompt(questions).then((answer) => {
    answer.action();
    promptUser();
  });
}

// Start CLI Interaction
promptUser();
