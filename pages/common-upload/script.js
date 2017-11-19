window.onload = () => {
  $('.upload-button').on('click', () => {
    $('.file').click();
  });

  $('.file').on('change', (evt) => {
    uploadFile(evt.target.files[0]);
  });

  function uploadFile(file) {
    let formData = new FormData();
    formData.append('file', file);
    axios.post('uploadFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((res) => {
      console.log(res);
      $('.picContainer').append($('<div></div>').addClass('picShower').css('background-image', 'url(' + res.data.route + ')'));
    }).catch(() => {
      alert('上传失败');
    });
  }
};

