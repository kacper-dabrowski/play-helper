module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
          targets: {
            node: "current",
            browsers: ["last 2 versions", "ie >= 11"],
          },
        },
      ],
      "@babel/preset-react",
    ],

    env: {
      test: {
        presets: [
          [
            "@babel/preset-env",
            {
              modules: ["commonjs"],
              targets: { node: "current" },
            },
          ],
          "@babel/preset-react",
        ],
      },
    },
  };
};
