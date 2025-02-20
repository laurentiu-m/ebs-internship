import queryString, { UrlObject, StringifyOptions } from 'query-string';

export const stringifyUrl = (url: UrlObject['url'], query?: UrlObject['query'], options?: StringifyOptions) => {
  return queryString.stringifyUrl(
    {
      url,
      query
    },
    { skipEmptyString: true, skipNull: true, ...options }
  );
};
