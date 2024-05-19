/**
 * Bad code - using useEffect unnecessarily
 * This below code will be rendered twice becuase of the useEffect - But the action was only one action So, it is unnecessary to use useEffect here.
 */

/**
 * Whenever you are working with user interaction like click, onChange, etc. You should not use useEffect to handle the event. Instead, you should handle the event directly.
 * But, if you are working with side effects like fetching data, updating the DOM, etc., then you should use useEffect.
 * Main purpose of useEffect is to actually listen to the changes in the dependencies in other parts of the application and then perform the side effects. They are not meant to be used for handling user interactions.
 * Whenever you want to use useEffect, ask yourself if you can handle the event directly instead of using useEffect.
 */

// import { useEffect } from "react";

// function ProductPage({ product, addToCart }) {
//     // Avoid event specific logic inside useEffect
//     useEffect(() => {
//         if (product.isInCart) {
//             showNotification(product + "Added to the shopping cart");
//         }
//     }, [product]);

//     function handleByClick() {
//         addToCart(product);
//     }

//     // ...
// }

/**
 * Good code - without useEffect
 */

// function ProductPage({ product, addToCart }) {
//
//     Good: Event specific logic is inside the event handler
//     funtion buyProduct() {
//        addToCart(product);
//        showNotification(product + "Added to the shopping cart");
//     }

//     function handleByClick() {
//         buyProduct();
//     }

//     // ...
// }
