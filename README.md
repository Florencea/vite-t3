# test-vite-t3

## Usage (in `.env`)

- Use as fullstack

```sh
ENABLE_CLIENT=1
ENABLE_SERVER=1
ENABLE_OPENAPI=1
```

- Use as restful backend server(with openapi)

```sh
ENABLE_CLIENT=0
ENABLE_SERVER=1
ENABLE_OPENAPI=1
```

- Use as restful backend server(without openapi)

```sh
ENABLE_CLIENT=0
ENABLE_SERVER=1
ENABLE_OPENAPI=0
```

- Use as client(not recommended, you must modefied `src/client/providers.tsx` to disable trpc and implement api strategy and proxy)

```sh
ENABLE_CLIENT=1
ENABLE_SERVER=0
ENABLE_OPENAPI=0
```
