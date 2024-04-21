# get-attribute

> A command to get a single attribute or property from a webpage, echo to stdout

[![npm version](https://badge.fury.io/js/@localnerve%2Fget-attribute.svg)](https://badge.fury.io/js/@localnerve%2Fget-attribute)
![Verify](https://github.com/localnerve/get-attribute/workflows/Verify/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/localnerve/get-attribute/badge.svg?branch=main)](https://coveralls.io/github/localnerve/get-attribute?branch=main)

## Example

Grab the full url from a specific anchor tag of interest:

```shell
get-attribute --url=https://host.com/path --selector='a[href^="/videos"]' --attribute=href --useprop=true --timeout=5000

# echoes the first matching href with full url from property: 'https://host.com/path/videos/123456789'
```

## License
[MIT](LICENSE.md)