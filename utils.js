export function PrintElem(elem) {
  var mywindow = window.open("", "PRINT", "height=400,width=600");

  mywindow.document.write("<html><head><title>" + document.title + "</title>");
  mywindow.document.write("</head><body >");
  mywindow.document.write("<h1>" + document.title + "</h1>");
  mywindow.document.write(document.getElementById(elem).innerHTML);
  mywindow.document.write("</body></html>");
  mywindow.document.close(); // necessary for IE >= 10
  mywindow.focus(); // necessary for IE >= 10*/
  mywindow.print();
  mywindow.close();

  return true;
}

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