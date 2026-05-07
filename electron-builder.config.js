module.exports = {
  appId: 'com.orivon.browser',
  productName: 'Orivon Browser',
  directories: {
    buildResources: 'assets',
    output: 'release',
  },
  files: [
    'dist/**/*',
    'node_modules/**/*',
    '!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme,LICENSE,license,LICENSEs,licenses}',
  ],
  win: {
    target: ['nsis', 'portable'],
    artifactName: '${productName}-${version}.${ext}',
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
  },
};
