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
