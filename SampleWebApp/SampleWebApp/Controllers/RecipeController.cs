using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SampleWebApp.Models;

namespace SampleWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class RecipesController : ControllerBase
    {
        private static readonly List<Recipe> recipes = new List<Recipe>
        {
            new Recipe
            {
                Id = 1,
                Name = "Classic Margherita Pizza",
                Ingredients = new List<string>
                {
                    "Pizza dough",
                    "Tomato sauce",
                    "Fresh mozzarella cheese",
                    "Fresh basil leaves",
                    "Olive oil",
                    "Salt and pepper to taste"
                },
                Instructions = new List<string>
                {
                    "Preheat the oven to 475°F (245°C).",
                    "Roll out the pizza dough and spread tomato sauce evenly.",
                    "Top with slices of fresh mozzarella and fresh basil leaves.",
                    "Drizzle with olive oil and season with salt and pepper.",
                    "Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.",
                    "Slice and serve hot."
                },
                PrepTimeMinutes = 20,
                CookTimeMinutes = 15,
                Servings = 4,
                Difficulty = "Easy",
                Cuisine = "Italian",
                CaloriesPerServing = 300,
                Tags = new List<string> { "Pizza", "Italian" },
                UserId = 166,
                Image = "https://cdn.dummyjson.com/recipe-images/1.webp",
                Rating = 4.6,
                ReviewCount = 98,
                MealType = new List<string> { "Dinner" }
            },
            new Recipe
            {
                Id = 2,
                Name = "Vegetarian Stir-Fry",
                Ingredients = new List<string>
                {
                    "Tofu, cubed",
                    "Broccoli florets",
                    "Carrots, sliced",
                    "Bell peppers, sliced",
                    "Soy sauce",
                    "Ginger, minced",
                    "Garlic, minced",
                    "Sesame oil",
                    "Cooked rice for serving"
                },
                Instructions = new List<string>
                {
                    "In a wok, heat sesame oil over medium-high heat.",
                    "Add minced ginger and garlic, sauté until fragrant.",
                    "Add cubed tofu and stir-fry until golden brown.",
                    "Add broccoli, carrots, and bell peppers. Cook until vegetables are tender-crisp.",
                    "Pour soy sauce over the stir-fry and toss to combine.",
                    "Serve over cooked rice."
                },
                PrepTimeMinutes = 15,
                CookTimeMinutes = 20,
                Servings = 3,
                Difficulty = "Medium",
                Cuisine = "Asian",
                CaloriesPerServing = 250,
                Tags = new List<string> { "Vegetarian", "Stir-fry", "Asian" },
                UserId = 143,
                Image = "https://cdn.dummyjson.com/recipe-images/2.webp",
                Rating = 4.7,
                ReviewCount = 26,
                MealType = new List<string> { "Lunch" }
            },
            new Recipe
            {
                Id = 3,
                Name = "Chocolate Chip Cookies",
                Ingredients = new List<string>
                {
                    "All-purpose flour",
                    "Butter, softened",
                    "Brown sugar",
                    "White sugar",
                    "Eggs",
                    "Vanilla extract",
                    "Baking soda",
                    "Salt",
                    "Chocolate chips"
                },
                Instructions = new List<string>
                {
                    "Preheat the oven to 350°F (175°C).",
                    "In a bowl, cream together softened butter, brown sugar, and white sugar.",
                    "Beat in eggs one at a time, then stir in vanilla extract.",
                    "Combine flour, baking soda, and salt. Gradually add to the wet ingredients.",
                    "Fold in chocolate chips.",
                    "Drop rounded tablespoons of dough onto ungreased baking sheets.",
                    "Bake for 10-12 minutes or until edges are golden brown.",
                    "Allow cookies to cool on the baking sheet for a few minutes before transferring to a wire rack."
                },
                PrepTimeMinutes = 15,
                CookTimeMinutes = 10,
                Servings = 24,
                Difficulty = "Easy",
                Cuisine = "American",
                CaloriesPerServing = 150,
                Tags = new List<string> { "Cookies", "Dessert", "Baking" },
                UserId = 34,
                Image = "https://cdn.dummyjson.com/recipe-images/3.webp",
                Rating = 4.9,
                ReviewCount = 13,
                MealType = new List<string> { "Snack", "Dessert" }
            },
            new Recipe
            {
                Id = 4,
                Name = "Chocolate Cookies",
                Ingredients = new List<string>
                {
                    "All-purpose flour",
                    "Butter, softened",
                    "Brown sugar",
                    "White sugar",
                    "Eggs",
                    "Vanilla extract",
                    "Baking soda",
                    "Salt",
                    "Chocolate chips"
                },
                Instructions = new List<string>
                {
                    "Preheat the oven to 350°F (175°C).",
                    "In a bowl, cream together softened butter, brown sugar, and white sugar.",
                    "Beat in eggs one at a time, then stir in vanilla extract.",
                    "Combine flour, baking soda, and salt. Gradually add to the wet ingredients.",
                    "Fold in chocolate chips.",
                    "Drop rounded tablespoons of dough onto ungreased baking sheets.",
                    "Bake for 10-12 minutes or until edges are golden brown.",
                    "Allow cookies to cool on the baking sheet for a few minutes before transferring to a wire rack."
                },
                PrepTimeMinutes = 15,
                CookTimeMinutes = 10,
                Servings = 24,
                Difficulty = "Easy",
                Cuisine = "American",
                CaloriesPerServing = 150,
                Tags = new List<string> { "Cookies", "Dessert", "Baking" },
                UserId = 34,
                Image = "https://cdn.dummyjson.com/recipe-images/3.webp",
                Rating = 4.9,
                ReviewCount = 13,
                MealType = new List<string> { "Snack", "Dessert" }
            }
        };

        [HttpGet("recipes")]
        public IActionResult GetRecipes()
        {
            return Ok(recipes);
        }

        [HttpPut("update_recipes/{id}")]
        public IActionResult UpdateRecipes(int id, [FromBody]Recipe updatedRecipe) {
            var existingRecipe = recipes.FirstOrDefault(r => r.Id == id);
            if (existingRecipe == null)
            {
                return NotFound("Recipe not found.");
            }
            existingRecipe.Name = updatedRecipe.Name ?? existingRecipe.Name;
            existingRecipe.Ingredients = updatedRecipe.Ingredients ?? existingRecipe.Ingredients;
            existingRecipe.Instructions = updatedRecipe.Instructions ?? existingRecipe.Instructions;
            existingRecipe.PrepTimeMinutes = updatedRecipe.PrepTimeMinutes;
            existingRecipe.CookTimeMinutes = updatedRecipe.CookTimeMinutes;
            existingRecipe.Servings = updatedRecipe.Servings;
            existingRecipe.Difficulty = updatedRecipe.Difficulty ?? existingRecipe.Difficulty;
            existingRecipe.Cuisine = updatedRecipe.Cuisine ?? existingRecipe.Cuisine;
            existingRecipe.CaloriesPerServing = updatedRecipe.CaloriesPerServing;
            existingRecipe.Tags = updatedRecipe.Tags ?? existingRecipe.Tags;
            existingRecipe.UserId = updatedRecipe.UserId;
            existingRecipe.Image = updatedRecipe.Image ?? existingRecipe.Image;
            existingRecipe.Rating = updatedRecipe.Rating;
            existingRecipe.ReviewCount = updatedRecipe.ReviewCount;
            existingRecipe.MealType = updatedRecipe.MealType ?? existingRecipe.MealType;

            return Ok(existingRecipe);
            
        }
        [HttpDelete("delete_recipes/{id}")]
        public IActionResult DeleteRecipes(int id) {
            var recipe = recipes.FirstOrDefault(r => r.Id == id);
            if (recipe == null) {
                return NotFound("Recipe not found.");
            }
            recipes.Remove(recipe);
            return NoContent();
        }
    }
}
