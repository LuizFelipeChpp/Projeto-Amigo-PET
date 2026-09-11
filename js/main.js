// ===============================
// ESTADO E ELEMENTOS DA PÁGINA
// ===============================
let breeds = [];

const breedListEl = document.getElementById("breedList");
const priceIconEl = document.getElementById("priceIcon");
const priceCardTitleEl = document.getElementById("priceCardTitle");
const priceListEl = document.getElementById("priceList");


fetch("breeds/breeds.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Não foi possível carregar breeds.json");
    }
    return response.json();
  })
  .then((data) => {
    breeds = data;
    renderBreedButtons();
    selectBreed(0);
  })
  .catch((error) => {
    console.error("Erro ao carregar as raças:", error);
  });

// ===============================
// RENDERIZAÇÃO DA TABELA DE PREÇOS
// ===============================

// Cria um botão de raça na tela
function renderBreedButtons() {
  breedListEl.innerHTML = "";

  breeds.forEach((breed, index) => {
    const button = document.createElement("button");
    button.className = "breed-btn";
    button.textContent = breed.name; // sem emoji no botão, só o nome
    button.dataset.index = index;

    if (index === 0) button.classList.add("breed-btn--active");

    button.addEventListener("click", () => selectBreed(index));
    breedListEl.appendChild(button);
  });
}

// Atualiza o card com a raça escolhida
function selectBreed(index) {
  const breed = breeds[index];

  // Atualiza qual botão está marcado como ativo
  document.querySelectorAll(".breed-btn").forEach((btn) => {
    btn.classList.toggle("breed-btn--active", Number(btn.dataset.index) === index);
  });

  // Atualiza o cabeçalho do card
  priceIconEl.textContent = breed.emoji;
  priceCardTitleEl.textContent = breed.name;

  // Atualiza a lista de preços
  priceListEl.innerHTML = "";
  breed.precos.forEach((preco) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span><span class="dot"></span>${preco.tipo}</span>
      <strong>${preco.valor}</strong>
    `;
    priceListEl.appendChild(li);
  });

  // Se a raça tiver uma observação (ex: "Disponível até tamanho M"), mostra
  if (breed.nota) {
    const li = document.createElement("li");
    li.className = "price-list__nota";
    li.textContent = `ℹ️ ${breed.nota}`;
    priceListEl.appendChild(li);
  }
}