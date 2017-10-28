window.onload = () => {
  const acd = [112, 2223, 445, 778];
  const obj = {
    a: 5,
    b: 6,
    c: 7,
  }

  let {a} = obj;
  alert('希望的第一个原野')

  $('.get').html('gagaga');

  axios.get('xxx', () => {
    alert('xxxfe');
  });
}
