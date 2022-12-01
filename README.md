# React Bella Email

### Your React's next email input field.

[Demo and examples]() — [Stackblitz]()

<br />

It is a controlled component that aims to replace the typical `<input type="email" />` of your form by giving the best UX with all the flexibility you'd expect from an input field:

- Fully accessible with great keyboard controls
- Add the most common event handlers and attributes
- Completely unstyled and white labeled
- Controllable with React Hook Form

![react-bella-email](https://i.ibb.co/nCNZvsg/Schermata-2022-09-18-alle-15-18-14.png)

---

**Jump to:** [Props](#-cyclone--props) | [Styling](#-art--styling) | [Usage and Behavior](#usage-and-behavior) | [Keyboard controls](#keyboard-controls)

---

<br />

## :cyclone: Props

| Prop             | Description                                                                                      | Type                                                               | Default   | Required           |
| ---------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ | --------- | ------------------ |
| `value`          | State or portion of state that will hold the email                                               | _string_                                                           | undefined | :white_check_mark: |
| `onChange`       | State setter or custom dispatcher to update the state                                            | _Dispatch<SetStateAction<string\>>_ \| _((value: string) => void)_ | undefined | :white_check_mark: |
| `baseList`       | Domains to suggest while typing the username                                                     | _string[]_                                                         | undefined | :white_check_mark: |
| `refineList`     | Domains to refine suggestions after typing the username                                          | _string[]_                                                         | []        | :x:                |
| `onSelect`       | Custom callback to invoke on suggestion select                                                   | _(object: SelectData) => void \| Promise\<void\>_                  | undefined | :x:                |
| `minChars`       | Minimum chars required to display suggestions                                                    | _1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8_                             | 2         | :x:                |
| `maxSuggestions` | Maximum number of suggestions to display                                                         | _2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8_                                  | 6         | :x:                |
| `nextElement`    | DOM ID of the next focusable element. If set, it will be focused after a suggestion is selected. | _string_                                                           | undefined | :x:                |
| `classNames`     | Class names of each child                                                                        | _ClassNames_                                                       | undefined | :x:                |
| `className`      | Class name of the wrapper element                                                                | _string_                                                           | undefined | :x:                |

### Are also available:

- Events: `onBlur`, `onFocus`, `onInput` and `onKeyDown`.

- Attributes: `id`, `name`, `placeholder`, `required`, `disabled` and `readOnly`.

- React's `ref` and `children`.

> :bulb: They are forwarded to the `<input />` element.

<br />

## :art: Styling

The component renders a `div` with a very simple DOM structure:

```js
Wrapper — div
├──Email Input Field — input
└── Dropdown — ul
    └── Suggestions - li
        └──[username - span:first-of-type] [@domain.com - span:last-of-type]
```

You can either specify `classNames` for one or multiple elements:

```jsx
const myClassNames = {
  wrapper: 'my-wrapper',
  input: 'my-input',
  dropdown: 'my-dropdown',
  suggestion: 'my-suggestion',
  username: 'my-username',
  domain: 'my-domain',
};

function App() {
  return (
    <Email
      classNames={myClassNames}
      baseList={baseList}
      domainList={domainList}
      onChange={setEmail}
      value={email}
    />
  );
}
```

<details><summary><strong>Tailwind Intellisense for VSCode</strong></summary>
<br />

You can add a setting like this in VSCode `settings.json` in order to enable autcomplete for any object property variables ending with `ClassNames`.

```json
  "tailwindCSS.experimental.classRegex": [
    ["ClassNames \\=([^;]*);", "'([^']*)'"],
    ["ClassNames \\=([^;]*);", "\"([^\"]*)\""],
    ["ClassNames \\=([^;]*);", "\\`([^\\`]*)\\`"]
  ],
```

</details>

Or add a class to the container via `className` prop:

```jsx
function App() {
  return (
    <Email
      className="my-wrapper"
      baseList={baseList}
      domainList={domainList}
      onChange={setEmail}
      value={email}
    />
  );
}
```

And target any child:

```css
/* Wrapper */
.my-wrapper {
}

/* Input field */
.my-wrapper input {
}

/* Dropdown */
.my-wrapper ul {
}

/* Suggestions */
.my-wrapper li {
}

/* Username */
.my-wrapper li > span:first-of-type {
}

/* Domain */
.my-wrapper li > span:last-of-type {
}
```

<details><summary><strong>Basic styles</strong></summary>

<br />

This package ships with **zero css**. Initial styles to see the component in action may match the following properties:

```css
.my-wrapper,
.my-input {
  position: relative;
}

.my-input,
.my-dropdown,
.my-suggestion {
  font-size: inherit;
  box-sizing: border-box;
  width: 100%;
}

.my-dropdown {
  position: absolute;
  margin: 0.45rem 0 0 0;
  padding: 0;
  list-style-type: none;
  z-index: 999;
}

.my-suggestion {
  cursor: pointer;
  user-select: none;
  overflow: hidden;
}
```

</details>

<br />

## :dna: Usage and Behavior

### 1. Basic

Once users start typing, it displays a list of _base_ suggestions and hides it once they type `@` . It already gives a nice UX and should be enough for the vast majority of websites:

![react-email-suggestions](https://i.ibb.co/2hqKpY6/Schermata-2022-09-18-alle-15-18-35.png)

```jsx
import { Email } from 'react-email-suggestions';

const baseList = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'aol.com',
  'msn.com',
  'proton.me',
];

function App() {
  const [email, setEmail] = useState('');

  return (
    <Email
      className="my-wrapper"
      baseList={baseList}
      onChange={setEmail} // or (value) => setEmail(value)
      value={email}
    />
  );
}
```

### 2. With Refine

Acts like **Basic** until users type `@` . Then as they start typing the domain, it refines the suggestions according to an extended list of domains (like an autocomplete).

![react-email-suggestions](https://i.ibb.co/nCNZvsg/Schermata-2022-09-18-alle-15-18-14.png)

All you have to do is to provide a second array of domains to `refineList` prop. This package already comes with a curated [list]() of the ~160 most popular world domains (thanks to **@mailcheck**):

```jsx
import { Email, domains } from 'react-email-suggestions';

const baseList = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'aol.com',
  'msn.com',
  'proton.me',
];

function App() {
  const [email, setEmail] = useState('');

  return (
    <Email
      className="my-wrapper"
      baseList={baseList}
      refineList={domains}
      onChange={setEmail}
      value={email}
    />
  );
}
```

Alternatively, you can create your own array of domains or [search]() for the one that more suits your audience.

<br />

### onChange with object state

```jsx
function App() {
  const [payload, setPayload] = useState({
    name: '',
    lastName: '',
    email: '',
  });

  function handleChange(value) {
    setPayLoad((prevData) => ({
      ...prevData,
      email: value,
    }));
  }

  return (
    // ...
    <Email
      className="my-wrapper"
      baseList={baseList}
      onChange={handleChange}
      value={payload.email}
    />
    // ...
  );
}
```

</details>

<br />

### Custom onSelect callback

You may need to invoke a callback (e.g. server email validation), everytime a suggestion is selected (either with mouse or keyboard):

```jsx
import { Email, domains } from 'react-email-suggestions';

function App() {
  const [email, setEmail] = useState('');

  function handleSelect({ value, keyboard, position }) {
    console.log(value, keyboard, position);
  }

  return (
    <Email
      className="my-wrapper"
      baseList={baseList}
      refineList={domains}
      onChange={setEmail}
      onSelect={handleSelect}
      value={email}
    />
  );
}
```

<details><summary><strong>Type Definition</strong></summary>
<br/>

```ts
type SelectData = {
  value: string;
  keyboard: boolean;
  position: number;
};

type OnSelect = (object: SelectData) => void | Promise<void>;
```

</details>

<br />

### React Hook Form

No special configuration needed, it just works. Just follow the official React Hook Form's [Controller documentation](https://react-hook-form.com/api/usecontroller/controller).

<br />

## :keyboard: Keyboard controls

- **Up / Down arrow** - Navigate through suggestions
- **Enter / Space** - Confirm the suggestion and focus the input field (or the next one).
- **Tab / Shift + Tab** - Close the list and go to next/prev focusable input
- **Backspace** - Keep the list open and keep refining the suggestions
- **Escape** - Close the list and focus the input field

<br />

## :dvd: License

MIT Licensed. Copyright (c) Simone Mastromattei 2022.
