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
