# useImmer vs useState

In the nutshell, immer facilitates the way you mutate nested/complex data structures. Have a look at these 2 ways:

consider below object:

```js
const [product, updateProduct] = useState({
    name: "Product 1",
    SKU: "SKU-001",
    availability: 30,
    stock: [
      {
        id: 1, 
        store: "Store 1",
        quantity: 10
      },
      {
        id: 2, 
        store: "Store 2",
        quantity: 20
      }
    ]
  });
```

In order to manipulate this, you should pass the whole object and override the property you would like to update/change:

```js
updateProduct({ ...product, name: "Product 1 - Updated" })
```

However, if you use "useImmer" you can send the only part you would like to change and immer itself will take care of the rest under the hood.

```js
const [product, updateProduct] = useImmer({
    name: "Product 1",
    SKU: "SKU-001",
    availability: 30,
    stock: [
      {
        id: 1, 
        store: "Store 1",
        quantity: 10
      },
      {
        id: 2, 
        store: "Store 2",
        quantity: 20
      }
    ]
  });
```

So to update

```js
updateProduct((draft) => {
  draft.name = 'Product updated'
})
```

It does make more sense when you are manipulating complex structure, let say if you want to change the second object in the "Stock" array, then you can use:

```js
updateProduct((draft) => {
  draft.stock[1].quantity = 30;
})
```

---


# Throttle vs Debounce

`Throttle` is a technique used to limit the frequency of a function execution. When a function is throttled, it is only allowed to run once in a specified period of time, regardless of how many times it is called. This is particularly useful for performance optimization when dealing with events that can fire very frequently, such as scrolling, resizing, or input events.


### Throttle vs. Debounce**

`Throttle`: Ensures that a function is called at most once in a specified period.
`Debounce`: Ensures that a function is called only after a specified period of inactivity.

---


# Typing return value from a custom hook

```js
const useUrl = (defaultStr: string) => {
  const [url, setUrl] = useState(defaultString);

  return [url, setUrl] as const;
}

const App = () => {
  const [url, setUrl] = useUrl('google.com');

  ...
}
```

### Why I used `as const`?

Because, inside the hook we're returning an array right? `[url, setUrl]` So, TypeScript thinks that this array is going to be updated, perhaps you want to push some new elements to it or change it and stuff like that, But in fact, we want to return a `Tuple` not an array. So, with using `as const` we're making it readonly and convert it to Tuple. When you say `as const` you're telling the TypeScript that this `[url, setUrl]` is NOT going to be updated it's just going to have all these two members -> Now we will have correct and string types for each `url` and `setUrl`.


---


# More complex types

Imagina we have 3 states for status `fetching`, `fetched`, `error` we want to fetch some data and if fetching was seccussful we want to have data and if not we want to setState error.

```js
type State = 
 | {
     status: "fetching"   
   }
 | {
    status: "fetched",
    data: Book[]
   }
  |{
    status: "error",
    error: Error
   }

const App = () => {
  const [state, setState] = useState<State>({ status: "fetching" });

  ...rest of the fetching code
}
```

---


# Tuples with Custom Hooks

useFetch.ts
```js
type Data<T> =
 | ["fetching", undefined?]
 | ["success", T]
 | ["error", Error]; 

export const useFetch = <T,>(url: string): Data<T> => {
  const [data, setData] = useState<Data<T>>(["fetching"]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((d) => setData(["success", d]))
      .catch((error) => setData(["error", error]))
  }, [])

  return data;
} 
```

---


# Template Literal Types

```js
type HexColor = `#${string}`;
type RGBColor = `rgb(${number}, ${number}, ${number})`;

type ColorFormats = 'hex' | 'rgb';
type ActionTypes = `update-${ColorFormats}`; // ActionTypes: 'update-hex' | 'update-rgb'

const isHexColor = (str: string): str is HexColor => {
  return str.startsWith('#');
}
```

---

# Inferring Generic Type

Because I passed `T` generic type to `useStateObject` I will have it type safe.

```js
import { useState } from 'react';

const useStateObject = <T,>(initialState: T) => {
    const [state, setState] = useState(initialState);

    return { state, setState };
}

const Component = () => {
    const { state, setState } = useStateObject({ name: 'Arghun' });

    // This will work autocomplete
    state.name

    // Will give me error
    setState('asdsad');

    // This will work now.
    setState({ name: 'Sahand' })

}
```

---

# Generic Components

```js
interface ProductListProps<T> {
    rows: T[];
    renderRow: (row: T) => React.ReactElement;
}

const ProductList = <T,>({ rows, renderRow }: ProductListProps<T>) => {
    return rows.map((row) => renderRow(row));
}

interface Product {
    id: number;
    title: string;
    description: string;
}

const products: Product[] = [
    {
        id: 1,
        title: 'First product',
        description: 'Product description'
    },
    {
        id: 2,
        title: 'Second product',
        description: 'Second Product description'
    },
]

const App = () => {
    // Now the ProductList component is generic type safe component and now if I type here row. => I will have autocomplete for the row
    return <ProductList rows={products} renderRow={(row) => <div>{row.title}</div>} />
}
```

One more practice that you can make the `rows` prop type safe as well is like this you can pass type to component.

```js
interface ProductListProps<T> {
    rows: T[];
    renderRow: (row: T) => React.ReactElement;
}

const ProductList = <T,>({ rows, renderRow }: ProductListProps<T>) => {
    return rows.map((row) => renderRow(row));
}

interface Product {
    id: number;
    title: string;
    description: string;
}

const products: Product[] = [
    {
        id: 1,
        title: 'First product',
        description: 'Product description'
    },
    {
        id: 2,
        title: 'Second product',
        description: 'Second Product description'
    },
]

const App = () => {
    // Now the ProductList component is generic type safe component and now if I type here row. => I will have autocomplete for the row
    return <ProductList<Product> rows={products} renderRow={(row) => <div>{row.title}</div>} />
}
```

Now the rows prop is typesafe as well. And the `ProductList` component expects to get products as `row` prop and if you pass other value which wouldn't match product type you will get error.

---

# Conditional Prop Types

```js
type PopupProps = {
    isOpen: boolean;
} & (
    {
        variant: "with-control",
        label: string;
        onClick: () => void;
    } |
    {
        variant: "without-control"
    }
)

const Popup = (props: PopupProps) => {
    return <></>
}

const App = () => {
    return (
        <>
            <Popup isOpen={false} variant="without-control" />
            <Popup isOpen={true} variant="with-control" label="Test" onClick={() => console.log('test')} />
        </>
    )
}
```

---

# Requiring props

```js
import React from 'react';

type AlertProps = {
    btnColor: string
} & (
    {
        variant: "without-code"
    } |
    {
        variant: "with-code",
        code: number
    }
)

const Alert = (props: AlertProps) => {
    return (
        <div>Hey</div>
    )
}

const App = () => {
    return (
        <>
            <Alert variant='with-code' btnColor='green' code={40} />
            <Alert variant='without-code' btnColor='green' />
        </>
    )
}
```

---

# Differentiating props

```js
import React from 'react';

type ProfileProps = 
    | {
        showLinkedIn: true,
        linkedin: string
    }
    | {
        showLinkedIn?: false,
        githubId: string
    }

const Profile = (props: ProfileProps) => {
    return <div></div>
}


const App = () => {
    return (
        <>
            <Profile showLinkedIn linkedin='linkedin-id' />
            <Profile showLinkedIn={false} githubId='github-id' />
        </>
    )
}
```

---

# Or pass one of them or non of them

```js
import React, { ChangeEventHandler }  from 'react';

type InputProps = {
    label: string,
} & (
    {
        value?: undefined,
        onChange?: undefined,
    } |
    {
        value: string,
        onChange: ChangeEventHandler,
    }
)

const Input = (props: InputProps) => {
    return <div></div>
}


const App = () => {
    return (
        <>
            <Input label='label' value='test' onChange={(e) => console.log(e)} />
            <Input label='label' />
        </>
    )
}
```

---

# Linking types

<img width="1012" alt="Screenshot 2024-07-21 at 18 54 21" src="https://github.com/user-attachments/assets/375ab55e-395a-4fe9-8cb6-decb3fd8b248">

---

# Extracting types with a const

making an object as const, make your object readonly and you can not change the values of the object.

```js
const button_types = {
    0: "warning",
    1: "error",
    2: "success"
} as const;

type ButtonKeys = keyof typeof button_types;
type ButtonValues = typeof button_types[ButtonKeys]
```

---

# Re-renders

The component always re-renders because of state updates and if a component state updates the component itself and all the child components that have been defined in that component will be `re-rendered` and the re-rendering of child components is not related to props changes in Child component so don't confuse it. So, the component and child components are only re-rendered because of `state` updates in parent component.

An element or a component is basically an object that outlines a component to be displayed.

The `object` of Child element returned from parent component

```js
const Parent = () => {
  return <Child />
}

// ~

const Parent = () => {
  return React.createElement(Child, null, null);
}


// Parent

{
 type: Child,
 props: {} // because parent is not passing any props to Child component
 ... othet react stuff
}


const Child = () => {
    return <h2>I am child</h2>
}

// The object of h2 element is returned from Child component

{
 type: "h2",
 props: {},
 ... a bunch of other react stuff
}
```

on time of re-rendering react constructs two trees `Virtual DOM before`, `Virtual DOM after (with updated elements)` and then compare these two trees and only `re-renders` updated elements in real DOM. This act of comparision is called `Diffing` and this whole process of re-rendering called `Re-conciliation`.

```js
const Parent = () => {
 const [state, setState] = useState();

 // somewhere here the setState is called, and it triggers a re-render of the Parent component
 // Think of returned <Child /> componenent as an object that is defined locally in the Parent component, so on every re-render of Parent, it (Child component) will be `re-defined` and if an object gets re-defined it's actually a `new object` consequently React does `diffing` and sees that it's actually a new object So it `re-renders` the Child component.
}
```


### Example of optimizing component structuring to prevent wasted re-renders

In this example I will first show you the bad implementation which has wasted re-renders and then I will show you the corrected version of it.

**BAD CODE**
```js
const Parent = () => {
  const [state, setState] = useState()

  const handleScroll = () => {
    setState(...)
  }
  
  return (
    <Scrollbar onScroll={handleScroll}>
        <SlowComponent />
        <BlahBlah />
        <AnotherComponent />
    </Scrollbar>
  )
}
```

in the above implementation above when `handleScroll` function gets called setState triggers in the parent component and it causes re-render of the parent component and consequently all `child` components also gets `re-rendered`. So, it's a mess.


**GOOD CODE**
```js
const ScrollbarContainer = ({ children }) => {
  const [state, setState] = useState();

  const handleScroll = () => {
   setScroll(...)
  };

  return (
    <Scrollbar onScroll={handleScroll}>
      {children}
    </Scrollbar>
  )
}

const Parent = () => {
 return (
   <ScrollbarContainer>
        <SlowComponent />
        <BlahBlah />
        <AnotherComponent />
    </ScrollbarContainer>
 )
}
```

Now with the above implementation as you can see I capsulated the state to `ScrollbarContainer` component and when `handleScroll` gets called only `ScrollbarContainet` component get's re-render the other components which have been passed as children prop to `ScrollbarContainer` component does not get re-renders. So, that's an awesome trick right :)

---

# React.memo and prop drilling

The most straitforward case of broken memoization is about props that are being passed through multiple components, particularly when props are spread across many intermediary components, something that we know as prop drilling.

So consider a scenario with a sequence of components like this one below, it's highly unlikely that anyone adding additional data to inner components will inspect each component in the chain, As a result the inner component disrupt the memoization of the memoized inner component by passing it a prop that hasn't been memoized. So, unless you can guarantee that every prop every where is memoized using react.memo on components must be done with careful adherenece to specific guidelines and rules that I will mention here.

```js
const InnerComponent = () => {};
const MemoizedInnerComponent = () => React.memo(InnerComponent);

const IntermediateComponent = (props) => {
    return <MemoizedInnerComponent {...props} />
}

const WrapperComponent = (props) => {
    return <IntermediateComponent {...props} />
}

const MainComponent = (props) => {
    // This component will have state and will trigger re-render of this component
    return <WrapperComponent {...props} data={{ id: '1' }} />
}
```

### Rules

1. You should never spread props received from other components like in this example.

   ```js
   // BAD CODE
   const Component = (props) => {
     return <MemoizedComponent {...props} />;
   }

   // GOOD CODE
   const Component = (props) => {
     return <MemoizedComponent data={props.data} blahblah={props.blahblah} />  
   }
   ```

2. Avoid passing `non-primitive` props derived from other components
   If any of those props are `non-memoized` objects or functions, memoization will be broken again.

3. Be cautious about passing `non-primitive` values that come from `custom-hooks` 
   ```js
   const Component = () => {
        const { submit } = useSubmitForm();

        return <MemoizedComponent onChange={submit} />
   }
   ```
   This might seem opposing to the common practice of isolating stateful logic in custom hooks, which is why we have custom hooks in the first place. While custom hooks seriously simplify complexities, they also obsecure whether they return data or function have stable inferences.
   Like the exable above, the `submit` funcion is concealed within the `useSubmitForm` custom hook.
   Every custom hook triggers on every re-render, so it can cause disrupt in memoization of the `MemoizedComponent` so you have to wrap the functions with `useCallback` or `useMemo` depending use case when creating those functions in custom hook.


Look at the code below and it look correct right?

```js
const MemoizedChild = React.memo(Child);

const MyComponent = () => {
  return (
    <MemoizedChild>
        <div>Hello world!</div>
    </MemoizedChild>
  )
}
```

However, the memoization here is actually broken, making this react memo wrapper really pointless.

We can re-write above code just like below:

```js
const MemoizedChild = React.memo(Child);

const MyComponent = () => {
    return <MemoizedChild children={<div>Hello world!</div>} />
}
```

As we explored in the previous syntax all JSX code translates to `react.createElement` function, which in turn just create an object in this scenario it results an object with the type of "div" => { type: "div" }

So in the above code we're actually passing `unmemoized` type div object to MemoizedChild component.

To resolve this we also need to make sure that the div also memoized.

```js
const MyComponent = () => {
    const children = useMemo(() => {
        return <div>Hello world!</div>
    }, []);

    return (
        <MemoizedChild>{children}</MemoizedChild>
    )
}
```


---


## React Hooks and State Isolation (Important)

The reason the state does not change when using the useCounter hook in separate components is due to the nature of React hooks and state management. Each call to useCounter creates a new, isolated state instance. This means that each component using the useCounter hook maintains its own separate state, and changes in one component do not affect the state in another component.

Here's a detailed explanation:

React Hooks and State Isolation
When you define a custom hook like `useCounter`, it uses React's useState internally. Each time you call useCounter, a new `state instance` is created. This is how React hooks are designed to work, ensuring that each component has its own isolated state.

Example Scenario
Consider the following simplified example:


```js
import React from 'react';
import { useCounter } from './useCounter';

const IncrementButton = () => {
  const { increment } = useCounter();
  return <button onClick={increment}>Increment</button>;
};

const CountDisplay = () => {
  const { count } = useCounter();
  return <p>Count: {count}</p>;
};

const CounterComponent = () => {
  return (
    <div>
      <CountDisplay />
      <IncrementButton />
    </div>
  );
};

export default CounterComponent;
```

In this example:

`IncrementButton` calls useCounter and gets its own state instance.
`CountDisplay` calls useCounter and gets a different state instance.

When you click the increment button, it updates the state in IncrementButton, but CountDisplay is not aware of this change because it has its own separate state.


Why State Does Not Change Across Components

1. `Isolated State Instances`: Each call to useCounter creates a new state instance. Therefore, IncrementButton and CountDisplay do not share the same state.
2. `No Shared State`: Since the state is not shared, updating the state in one component does not affect the state in another component.


**Solution: Shared State**

To share state across components, you need to lift the state up to a common parent component or use a global state management solution like `React Context`, `Zustand`, or `Redux`.

Like using React context:

```js
import React, { createContext, useContext, useCallback, useState } from 'react';

const CounterContext = createContext(null);

export const CounterProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount(prevCount => prevCount + 1), []);
  const decrement = useCallback(() => setCount(prevCount => prevCount - 1), []);
  const reset = useCallback(() => setCount(0), []);

  return (
    <CounterContext.Provider value={{ count, increment, decrement, reset }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
};
```

```js
import React from 'react';
import { CounterProvider } from './CounterContext';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import CountDisplay from './CountDisplay';
import ResetButton from './ResetButton';

const CounterComponent = () => {
  return (
    <CounterProvider>
      <div>
        <CountDisplay />
        <IncrementButton />
        <DecrementButton />
        <ResetButton />
      </div>
    </CounterProvider>
  );
};

export default CounterComponent;
```

---


### Refs

// without React

```js
const el = document.getElementById('username-input');
el.focus();
```

// typical use-cases for using Refs in React:

1. Focusing an element
2. Detecting outside clicks
3. Scrolling to an element
4. Estimating boundaries of elements

What is Ref in React?

Well a ref in react is just a `mutable object that is maintained across re-renders`.

Do you remember how everything within a component is recreated every time? Components are essentially functions and `everything inside them is treated like a local variable and every time component re-renders these local variables is being re-created again.

```js
const Component = () => {
  // will be new with every re-render
  const data = { id: 'test' };
}
```

Refs helps us bypass this behaviour,

to use ref we use `useRef` hook and we provide it with initial value, this initial value is accessible through `ref.current` however whatever we assign to the ref is stored there. The initial value is retained, so comparing ref.current across re-renders will show that reference remains constant, much like using the useMemo hook on that object.

```js
const Component = () => {
  const someData = ...

  const ref = useRef({ id: 'test' });  // initial value

  useEffect(() => {
    // assign some value as an id, when it changes
    ref.current = { id: someData };
  }, [someData]) 
}
```

Once we have created a ref, we can assign anything to it, whether in useEffect or within just event handlers, it's simply an object nothing more complicated than this.

**Important Notes**

1. Ref update does not trigger re-render but state update triggers re-render on the component
2. State update async but ref update synchronously


### React setState async behaviour

It's not the same async that we know, it's not returning Promise but it's behaviour is like an async action.

How `setState` is async. Look at the below example:

```js
const Form = () => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    console.log('before - ', value);
    setValue(e.target.value);
    console.log('after - ', value);
  };
}
```

In the above component if we type for example 'a', the log that will be shown will be:

```js
before -
after -
```

both of them are empty - why? what happens here?

we you are saying `setValue` you are not updating an object directly.

All you do is telling react that hey, I have a state and I have a new value for that state. I want to schedule a new task for updating the state with a new value, that's it goodbye :) And goes to the next line. That's why you see the `after - ` empty string. the value of the state is the same, it's not changing immediately because setValue or setState generally is `asynchronous`. It's not the same async that we know, but technically you can think of it as an async task.


but if you use `useRef` instead of useState the logs output would be `before - `, `after - a`

because `useRef` is `synchronous`
