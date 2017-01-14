app.main = (function(blog) {

  function init() {
    blog.init();
  }

  return {
    init: init
  }

})(app.blog);