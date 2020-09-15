$(document).ready(function () {
  $(".summernote-new").summernote({
    placeholder: "Writing.....",
    tabsize: 2,
    height: 300,
    toolbar: [
      ["style", ["style"]],
      ["font", ["bold", "underline", "clear"]],
      ["color", ["color"]],
      ["para", ["ul", "ol", "paragraph"]],
      ["table", ["table"]],
      // ['insert', ['link', 'picture', 'video']],
      ["view", ["fullscreen", "codeview", "help"]],
    ],
  });
  $("#summernote-edit").summernote({
    placeholder: "Writing.....",
    tabsize: 2,
    height: 300,
    toolbar: [
      ["style", ["style"]],
      ["font", ["bold", "underline", "clear"]],
      ["color", ["color"]],
      ["para", ["ul", "ol", "paragraph"]],
      ["table", ["table"]],
      // ['insert', ['link', 'picture', 'video']],
      ["view", ["fullscreen", "codeview", "help"]],
    ],
  });
  
});
