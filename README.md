# Storygen

A Program that makes a Storybook template from the given file (with props!).

> [!NOTE]
> Currently only supports React components
> 
> PRs for support of other frameworks are welcome!

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

### Output

```ts
// ComponentName.stories.tsx

import {StoryObj, Meta} from '@storybook/react';

import {{componentName}} from '${componentPath}';

export default {
  title: {{componentTitle}},
  component: {{componentName}},
  args: {
     //if required props exist
  },
} as Meta<typeof {{componentName}}>;

type Story = StoryObj<typeof {{componentName}}>;

export const Default: Story = {
  args: {},
};

```

Start generating these templates for all of your components and build storybooks from there!