# Storygen

A Program that makes a Storybook template from the given file (with props!).

> [!NOTE]
> Currently only supports React components
> parsing for other framework components are welcome!

## Arguments

`path/to/component`

path of the file component or directory to generate the storybook file(s)

## Options:

`-r, --relativeTitle`

generate storybook title to be relative to the current working directory. Good for organizing stories based on the directory structure

## Gist

```shell
  npm install storybook-gen -g
```

then

```shell
  storybook-gen path/to/component
```

or

```shell
  sgen path/to/component
```
