# get-attribute

> A command to get a single attribute or property from a webpage, echo to stdout

## Example

Grab the full url from a specific anchor tag of interest:

```shell
get-attribute --url=https://host.com/path --selector='a[href^="/videos"]' --attribute=href --useprop=true --timeout=5000

# echoes the first matching href with full url from property: 'https://host.com/path/videos/123456789'
```

## License
[MIT](LICENSE.md)