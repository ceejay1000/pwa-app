const recipes = document.querySelector(".recipes");

// Render recipe data
function renderRecipe(data, id) {
  const html = `
   <div class="card-panel recipe white row" data-id=${id}>
          <img src="/imgs/dish.png" alt="recipe thumb">
          <div class="recipe-details">
            <div class="recipe-title">${data.title}</div>
            <div class="recipe-ingredients">${data.ingredients}l</div>
          </div>
          <div class="recipe-delete" data-id=${id}>
            <i class="material-icons">delete_outline</i>
          </div>
        </div>`;
  
  recipes.innerHTML += html;

}