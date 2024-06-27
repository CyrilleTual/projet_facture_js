import { Article } from "./Article.js";
import { displayBasket } from "./facture.js";
import { sortStore } from "./utils.js";
let client = ""; // nom  du client
let store = [];
var basket = [];
let detailIsChecked = true;
let totalIsChecked = true;
let selectedSex = "Mr.";

// initialisation du store (tableau d'objet) depuis un fichier Json
async function createStore() {
  try {
    const response = await fetch("/data/article.json");
    const data = await response.json();
    data.forEach((item) => {
      store.push(new Article(item.id, item.name, item.price));
    });
  } catch (error) {
    console.log("Error in fetching data", error);
  }
  return store;
}

// peuplement du select depuis un tableau d'onjets de type Article
function populateSelect(store) {
  store = sortStore(store);
  const selectElt = document.getElementById("article");
  selectElt.innerHTML = "";
  store.forEach((article) => {
    const option = document.createElement("option");
    option.value = article.id;

    option.innerHTML = `${(article.name).padEnd(18, " ")}  ${article.price}€`.replace(/ /g, "&nbsp;");

    selectElt.appendChild(option);
  });
  stayAwake();  //// surveillance des actions sur la commande
}


function filterList() {
  const myFilter = this.value;
  //console.log(myFilter);
  const filteredList = store.filter((item) => {
    return item.name.toLowerCase().includes(myFilter.toLowerCase());
  });
  populateSelect(filteredList);
}


/// ajout au pannier par id 

function addToBaskletById (articleId, quantity){
  const article = store.find((item) => item.id == articleId);

  // verifie si l'article est deja dans le panier
  const index = basket.findIndex((item) => item.article.id == article.id);
  if (index != -1) {
    basket[index].quantity += parseInt(quantity);
  } else {
    basket.push({ article, quantity });
  }
  displayBasket(basket, client, selectedSex);
  // reste a vider les champs et filtre 
  document.getElementById("quantity").value = "1";
  document.getElementById("filter").value = "";
  populateSelect(store);
}

// Ajout d'un article au panier
function addToBasket() {
  const select = document.getElementById("article");
  const quantity = +document.getElementById("quantity").value;
  const articleId = select.value;
  addToBaskletById(articleId,quantity);
  stayAwake();
}

// set du client
function setClient() {
  client = this.value;
  displayBasket(basket, client, selectedSex);
}

// mise à la poubelle
function putInTrash(event) {
 // const idToRemove = (event.target.closest('button')).value;
  const idToRemove = event.target.value;
  basket = basket.filter( e => e.article.id != idToRemove)
  displayBasket(basket, client, selectedSex);
  stayAwake();
}

/// un de plus 
function oneMorePlease(event){
  const idToAdd = event.target.value;
  addToBaskletById(idToAdd,1);
  stayAwake();
}

function oneLessPlease(event){
  const idToRemove = event.target.value; 
  // recherche de l'item 
  var item = basket.find(elt=> elt.article.id == idToRemove);
  if (item.quantity>1){
    item.quantity = item.quantity-1
  }else return;
  displayBasket(basket, client, selectedSex);
  stayAwake();
}

async function init() {

  console.log("init");
  client = "";
  document.getElementById("client").value="";
  basket = [];
  displayBasket(basket, client, selectedSex);
  stayAwake();
}

export function setListeners (){
// ecoute de l'evenement click sur le bouton ajouter
  const btnAdd = document.getElementById("add");
  btnAdd.addEventListener("click", addToBasket);

  // ecoute de la saisir du client
  const inputClient = document.getElementById("client");
  inputClient.addEventListener("keyup", setClient);

  // ecoute du filtre
  const filter = document.getElementById("filter");
  filter.addEventListener("keyup", filterList);

  // ecoute du deploiement du select
  const deploy = document.getElementById("deploy");
  deploy.addEventListener("click", () => {
    const select = document.getElementById("article");
    // toggle du deploy
    select.size = select.size == 15 ? 1 : 15;
  });

  // ecoute sur la selection du sexe
  const radios = document.getElementsByName("sex");
  Array.from(radios).forEach((item) => {
    item.addEventListener("change", () => {
      selectedSex = Array.from(radios).find((item) => item.checked).value;
      displayBasket(basket, client, selectedSex);
    });
  });

  // ecoute sur la case à cocher pour le detail
  const detail = document.getElementById("detail");
  detail.addEventListener("change", () => {
    detailIsChecked = !detailIsChecked;
    stayAwake();
  });

  // excoute sur la case à cocher pour le total
  const total = document.getElementById("total");
  total.addEventListener("change", () => {
    totalIsChecked = !totalIsChecked;
    stayAwake();
  });

  // inti 
  document.getElementById("reset").addEventListener("click", () => init());
 
}

 
// au chargement de la page
document.addEventListener("DOMContentLoaded", async () => {

  setListeners();
  // peuplement du select des articles
   const store = await createStore();
  populateSelect(store);
  init();

});

//// surveillance des evenements sur la commande
function stayAwake () {
  // ecoute sur tous les enfants de la div article pour commande au double click
  const articles = document.getElementById("article").children;
  Array.from(articles).forEach((item) => {
    item.addEventListener("dblclick", () => {
      const articleId = item.value;
      addToBaskletById(articleId, 1);
    });
  });

  /// ecoute evnt sur btn trash
  const trashs = document.getElementsByClassName("trash");
  Array.from(trashs).forEach((elt) => {
    elt.addEventListener("click", putInTrash);
  });

  // ecoute sur oneMore
  const mores = document.getElementsByClassName("oneMore");
  Array.from(mores).forEach((elt) => {
    elt.addEventListener("click", oneMorePlease);
  });

  // ecoute sur oneLess
  const Lesss = document.getElementsByClassName("oneLess");
  Array.from(Lesss).forEach((elt) => {
    elt.addEventListener("click", oneLessPlease);
  });

  /// visibilité total
  const totals = document.getElementsByClassName("total");
  if (!totalIsChecked) {
    for (let i = 0; i < totals.length; i++) {
      totals[i].classList.add("hide");
    }
  } else {
    for (let i = 0; i < totals.length; i++) {
      totals[i].classList.remove("hide");
    }
  }

  /// visibilité detail
  const details = document.getElementsByClassName("detail");
  if (!detailIsChecked) {
    for (let i = 0; i < details.length; i++) {
      details[i].classList.add("hide");
    }
  } else {
    for (let i = 0; i < details.length; i++) {
      details[i].classList.remove("hide");
    }
  }
}