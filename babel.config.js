module.exports = {
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@dotenv",
        path: ".env",
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    "react-native-reanimated/plugin",
  ],
  presets: ["module:metro-react-native-babel-preset"],
};
