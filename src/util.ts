export function paramsToUrl(params: any) {
  let result = '';

  if (params) {
    Object.keys(params).forEach(k => {
      const val = params[k];

      if (val instanceof Array) {
        val.forEach(
          v => (result += `&${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        );
      } else {
        result += `&${encodeURIComponent(k)}=${encodeURIComponent(val)}`;
      }
    });
  }

  if (result.startsWith('&')) result = result.replace('&', '?');

  return result;
}
