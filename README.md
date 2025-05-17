# React JSX Utils

I've always preferred Vue.js, largely because of its use of HTML templates. React’s JSX, while powerful, often feels verbose and unintuitive for common UI patterns. Since working more with React, I've repeatedly run into frustration when handling things like:

1. Conditional rendering
2. Looping over components

To address this, I created react-jsx-utils, a small utility library that helps make JSX feel a bit more like templating—bringing some of the simplicity I love from Vue.

```shell
npm i git@github.com:shailen-naidoo/react-jsx-utils.git
```

#### ✨ Conditional Rendering
##### IfElse

###### Without JSX Utils (Vanilla React)

```jsx
function App({ isLoggedIn = true }) {
  return (
    <Container>
      {isLoggedIn && <Home />}  {/* Renders if true */}
      {!isLoggedIn && <Login />}
    </Container>
  );
}

```

###### With JSX Utils

```jsx
import { IfElse } from 'react-jsx-utils';

function App({ isLoggedIn = true }) {
  return (
    <Container>
      <IfElse condition={isLoggedIn}>
        <Home />  {/* Renders if true */}
        <Login />
      </IfElse>
    </Container>
  );
}
```
```jsx
function App({ isLoggedIn = false }) {
  return (
    <Container>
      <IfElse condition={isLoggedIn}>
        <Home />
        <Login />  {/* Renders if false */}
      </IfElse>
    </Container>
  );
}
```
Supports single-child scenarios too:

```jsx
function App({ isLoggedIn = false }) {
  return (
    <Container>
      <IfElse condition={isLoggedIn}>
        <Home />  {/* Hidden if false */}
      </IfElse>
    </Container>
  );
}
```

Nested IfElse:

```jsx
import { IfElse } from 'react-jsx-utils'

function App({ isLoggedIn = false, isSuperAdmin = false }) {
  return (
    <Container>
      <IfElse condition={isLoggedIn}>
        <Home />
        <IfElse condition={isSuperAdmin}>
          <SuperAdmin />
          <Admin /> // This renders
        </IfElse>
      </IfElse>
    </Container>
  )
}
```

##### SwitchCase

###### Without JSX Utils

```jsx
function App({ fruit }) {
  if (fruit === 'apple') return <Apple />;
  if (fruit === 'banana') return <Banana />;
  if (fruit === 'orange') return <Orange />;
  return <Pear />;
}
```
Or using a switch:

```jsx
function App({ fruit }) {
  switch (fruit) {
    case 'apple': return <Apple />;
    case 'banana': return <Banana />;
    case 'orange': return <Orange />;
    default: return <Pear />;
  }
}
```
#### With JSX Utils

```jsx
import { SwitchCase } from 'react-jsx-utils';

function App({ fruit = 'banana' }) {
  return (
    <SwitchCase condition={fruit}>
      <Apple data-case="apple" />
      <Banana data-case="banana" />  {/* Renders */}
      <Orange data-case="orange" />
      <Pear data-default />
    </SwitchCase>
  );
}
```

Fallback behavior included:

```jsx
function App({ fruit = 'tomato' }) {
  return (
    <SwitchCase condition={fruit}>
      <Apple data-case="apple" />
      <Banana data-case="banana" />
      <Orange data-case="orange" />
      <Pear data-default />  {/* Renders */}
    </SwitchCase>
  );
}
```

#### 🔁 Component Looping
##### Loop

###### Without JSX Utils

```jsx
function App() {
  return ['bananas', 'apples', 'oranges'].map((fruit) => (
    <p key={fruit}>{fruit}</p>
  ));
}
```

###### With JSX Utils
```jsx
import { Loop } from 'react-jsx-utils';

const fruits = ['bananas', 'apples', 'oranges'];

function App() {
  return (
    <Loop collection={fruits}>
      {(fruit) => <p key={fruit}>{fruit}</p>}
    </Loop>
  );
}
```

Supports inline usage as well:

```jsx
function App() {
  return (
    <Loop
      collection={fruits}
      children={(fruit) => <p key={fruit}>{fruit}</p>}
    />
  )
}
```

#### Conditional rendering + Component looping

```jsx
import { Loop, IfElse } from 'react-jsx-utils'

function App() {
  const fruits = [
    { label: 'Apples', isVisible: true },
    { label: 'Bananas', isVisible: false },
    { label: 'Oranges', isVisible: true },
  ]

  return (
    <Container>
      <Loop collection={fruits}>
        {(fruit) => (
          <IfElse condition={fruit.isVisible}>
            <p>{fruit.label}</p>
          </IfElse>
        )}
      </Loop>
    </Container>
  )
}
```

```jsx
import { Loop, IfElse } from 'react-jsx-utils'

function App() {
  const fruits = [
    { label: 'Apples', isVisible: true, stores: ['Checkers', 'Woolworths'] },
    { label: 'Bananas', isVisible: false, stores: ['Checkers', 'Woolworths'] },
    { label: 'Oranges', isVisible: true, stores: ['Checkers', 'Woolworths'] },
  ]

  return (
    <Container>
      <Loop collection={fruits}>
        {(fruit, key) => (
          <IfElse condition={fruit.isVisible} key={key}>
            <>
              <p>{fruit.label}</p>
              <Loop collection={fruit.stores}>
                {(store, key) => <p key={key}>{store}</p>}
              </Loop>
            </>
          </IfElse>
        )}
      </Loop>
    </Container>
  )
}
```

#### Why This?

React gives you a lot of power—but sometimes at the cost of elegance. These utilities aren’t a replacement for JSX but rather a lightweight layer to bring some declarative clarity to common UI patterns.

