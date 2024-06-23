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
