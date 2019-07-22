# Gatsby Source Matomo

Load page data as source nodes

## Features

- Page URL information including visits, hits, bounce rate etc.

## Quirks

Although the Matomo API claims to be 'restful' it is far from that. For the initial implementation of this plugin,
only page information is retrieved by default via the method `Action.getPageUrls` [api reference](https://developer.matomo.org/api-reference/reporting-api#Actions)

This can be overridden to your liking with the `apiOptions` option

## To Use

- Install `npm install --save gatsby-source-matomo`
- Add to your gatsby config
```js
{
  resolve: 'gatsby-source-matomo',
  options: {
    matomoApiToken: '...',
    matomoUrl: '...',
    siteId: '...'
    apiOptions:  {...}, // overrides for the matomo api
  }
}
```

## Options

- matomoApiToken: this is the access token
- matomoUrl: the path to your Matomo instance (https://my-matomo-site.com)
- siteId: the site id you want to get information from
- apiOptions: an object to override the query to the matomo api.
```js
//...
resolve: 'gatsby-source-matomo',
options: {
  apiOptions: {
    period: '..',
    date: '..',
    method: 'foo'
    // etc
  }
}
```

## Road Map

The initial implementation default to getting page urls, this plus the overridability with the
`apiOptions` field makes this plugin fairly flexible. I am happy to take PR's on extending the capability
of this plugin

- add support to recurse throw page urls. Matomo only provides page urls one section at a time. At this time we only support 1 level nested page paths.

[ ] - https://mysite.com/path1/path2/path3
[x] - https://mysite.com/path1/path2

## Disclaimer when overriding with ApiOptions

There is no implementation detail to change the __Node Type__  during an override so be careful with that!