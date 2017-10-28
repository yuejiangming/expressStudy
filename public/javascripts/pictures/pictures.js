var button = document.getElementsByClassName('upload-button')[0];
var terminateButton = document.getElementsByClassName('terminate')[0];
var file = document.getElementsByClassName('file')[0];
var formData;
var pro;

var CancelToken = axios.CancelToken;
var source = CancelToken.source();


button.onclick = function() {
  file.click();
};

file.onchange = function() {
  formData = new FormData();
  formData.append('pic', file.files[0]);
  axios.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: function(evt) {
      console.log('progress', evt);
      console.log('当前上传百分比为:', (evt.loaded / evt.total).toFixed(2));
    },
    cancelToken: source.token,
  }).then(function() {
    alert('竟然成功了');
  })
  .catch(function(evt) {
    alert('黑人问号');
    console.log('evt', evt);
    if (axios.isCancel()) {
      alert('我特么取消啦哈哈哈哈哈');
    }
  });
};

terminateButton.onclick = function() {
  console.log('被终止了')
  source.cancel('terminate');
}
