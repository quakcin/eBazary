

export default function servRequest (cmd, args, onSuccess, onError = null)
{
  const tokens = Object.keys(args)
    .map((key) => `${key}=${encodeURIComponent(args[key])}`)
    .join('&');
  
  const url = `http://www.e-bazary.ugu.pl/${cmd}.php?${tokens}`;
  console.log('req', url);

  
  fetch(url)
    .then((response) => response.json())
    .then((json) => json.ok
      ? onSuccess(json)
      : onError(json));
}
