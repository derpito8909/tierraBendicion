module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [require("karma-jasmine"), require("karma-chrome-launcher"), require("karma-jasmine-html-reporter"), require("karma-coverage"), require("@angular-devkit/build-angular/plugins/karma")],
    client: {
      jasmine: {
        // Puedes configurar las opciones de Jasmine aquí
        clearContext: false, // Deja visible el reporte de pruebas en el navegador
      },
      clearContext: false, // Muestra el reporte de Jasmine en el navegador
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage/tierraBendicion"),
      subdir: ".",
      reporters: [
        { type: "html" }, // Para generar un reporte HTML
        { type: "text-summary" },
      ],
    },
    reporters: ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["ChromeHeadlessNoSandbox"],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-gpu"],
      },
    },
    singleRun: false,
    restartOnFileChange: true,
  });
};
