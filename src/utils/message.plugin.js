import M from "materialize-css";
export default {
  install(app, options) {
    app.config.globalProperties.$message = function(html) {
      M.toast({ html });
      // Vue.prototype.$message = function(text) {
      //   M.toast({ html: text });
    };

    app.config.globalProperties.$error = function(html) {
      M.toast({ html: `[Error]: ${html}` });
    };
    console.log(options);
  }
};
