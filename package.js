Package.describe({
  summary: "Greenlight analytics site template"
});

Package.on_use(function (api, where) {
    api.add_files('analytics.js', 'client');
});

Package.on_test(function (api) {
  api.add_files('analytics_tests.js', 'client');
});
