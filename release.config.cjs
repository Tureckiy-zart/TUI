module.exports = {
  repositoryUrl: "https://github.com/Tureckiy-zart/tenerife-ui.git",
  branches: ["main"],
  tagFormat: "v${version}",
  plugins: [
    ["@semantic-release/commit-analyzer", { preset: "conventionalcommits" }],
    ["@semantic-release/release-notes-generator", { preset: "conventionalcommits" }],
    ["@semantic-release/changelog", { changelogFile: "CHANGELOG.md" }],
    ["@semantic-release/npm", { npmPublish: true }],
    [
      "@semantic-release/github",
      {
        assets: ["storybook-static/**/*"],
        repositoryUrl: "https://github.com/Tureckiy-zart/tenerife-ui.git",
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"],
        message: "chore(release): 🚀 Version ${nextRelease.version} [skip ci]",
      },
    ],
  ],
};
