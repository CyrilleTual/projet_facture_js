import { setListeners } from "./script.js";

// utils.js file
 

// tri du panier par nom d'article
export function sortBasket(basket) {
  return basket.sort((a, b) => {
    if (a.article.name < b.article.name) return -1;
    if (a.article.name > b.article.name) return 1;
    return 0;
  });
}

// tri du catalogue par nom d'article
export function sortStore(store) {
  return store.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
}

window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("print").addEventListener("click", function () {
    window.print();
  });
});
