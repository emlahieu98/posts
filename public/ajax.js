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
  $("#btn-add-post").click(function () {
    var title = $("#title").val();
    var description = $("#description").val();
    let content = $(".summernote-new").summernote("code");
    $("#content").val(content);
    if (title != '' && description != '' && content != '') {
      alert("Create new post success");
    }
  }
  );

  //   $("#btn-add-post").click(function () {

  //       var title = $("#title").val();
  //       var description = $("#description").val();
  //     var content = $(".summernote-new").summernote("code");
  //     console.log(content);
  //  //   var fullName = $("#fullName").val();
  //    //   if ($("#form-add-post").valid()) {
  //         $.ajax({
  //           url: "/admin/posts/add",
  //           method: "POST",
  //           data: {
  //             title: title,
  //             description: description,
  //             content: content,

  //           },
  //         })
  //           .then(function (data) {
  //             alertify.success(data.message);
  //             window.timeout = setTimeout(function () {
  //               window.location.href = "/admin/posts";
  //             }, 2000);
  //           })
  //           .catch(function (err) {
  //             alertify.error(err.responseJSON.message);
  //           });
  //   //    }
  //     });
});
