import { sortBasket } from "./utils.js"

export function displayBasket(basket, client, selectedSex) {
  //console.log(basket);
  const basketList = document.getElementById("anchor");

  basket = sortBasket(basket);

  var res = "";
  let total = 0;
  let totalFacture = 0;
  res += ` <table id="facture">
        <thead>
            <tr>
                <th >produit </th>
                <th class="detail"> prix unitaire</th>
                <th class="detail"> qté</th>
                  <th>action</th>
                <th class="total">prix total</th>
              
            </tr>
        </thead > 
        <tbody>`;
  basket.forEach((item) => {
    total = item.article.price * item.quantity;
    totalFacture += total;
    res += `<tr>
            <td>${item.article.name} </td>
            <td class="detail">${((item.article.price)).toLocaleString("fr-FR", {
              style: "currency",
              currency: "EUR",
            })}</td>
            <td class="detail">${item.quantity}</td>
            <td>
              <button class="oneMore" value=${item.article.id}>+</button>
              <button class="oneLess" value=${item.article.id}>-</button>
              <button class="trash"  value=${
                item.article.id
              }><i class="fa fa-trash" aria-hidden="true" style="pointer-events: none;"></i></button>
            </td>
            <td class="total"> ${(+total).toLocaleString("fr-FR", {
              style: "currency",
              currency: "EUR",
            })}</td>
        </tr>`;
  });
  res += `  
    </tbody>
    </table>`;

  res += `
     <table >
      <tbody>
        <tr>
            <td colspan="3"> ${selectedSex} ${client} </td>
         
            <td>Total Facture</td>
            <td>${totalFacture.toLocaleString("fr-FR", {
              style: "currency",
              currency: "EUR",
            })}</td>
        </tr>   
      </tbody>
    </table>`;

  basketList.innerHTML = res;
}
