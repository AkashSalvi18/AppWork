using IdentityManagerWebApp.Data;
using IdentityManagerWebApp.Models.GridEntities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Threading.Tasks;


namespace IdentityManagerWebApp.Controllers
{
   
    [ApiController]
    [Route("api/[controller]")]
    public class RecipeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RecipeController(AppDbContext context)
        {
            _context = context;
        }
      

        
        [HttpGet("recipes")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetRecipes()
        {
            var recipes =await _context.Recipes.ToListAsync();
            return Ok(recipes);
        }
        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPut("update_recipes/{id}")]
        public async Task<IActionResult> UpdateRecipes(int id, [FromBody] Recipe updatedRecipe)
        {
           
            var existingRecipe = await _context.Recipes.FindAsync(id);
            if (existingRecipe == null)
            {
                return NotFound("Recipe not found.");
            }
            existingRecipe.Name = updatedRecipe.Name ?? existingRecipe.Name;
            existingRecipe.Ingredients =JsonConvert.SerializeObject(updatedRecipe.Ingredients ?? existingRecipe.Ingredients);
            existingRecipe.Instructions =JsonConvert.SerializeObject(updatedRecipe.Instructions ?? existingRecipe.Instructions);
            existingRecipe.PrepTimeMinutes = updatedRecipe.PrepTimeMinutes;
            existingRecipe.CookTimeMinutes = updatedRecipe.CookTimeMinutes;
            existingRecipe.Servings = updatedRecipe.Servings;
            existingRecipe.Difficulty = updatedRecipe.Difficulty ?? existingRecipe.Difficulty;
            existingRecipe.Cuisine = updatedRecipe.Cuisine ?? existingRecipe.Cuisine;
            existingRecipe.CaloriesPerServing = updatedRecipe.CaloriesPerServing;
            existingRecipe.Tags = JsonConvert.SerializeObject(updatedRecipe.Tags ?? existingRecipe.Tags);
            existingRecipe.UserId = updatedRecipe.UserId;
            existingRecipe.Image = updatedRecipe.Image ?? existingRecipe.Image;
            existingRecipe.Rating = updatedRecipe.Rating;
            existingRecipe.ReviewCount = updatedRecipe.ReviewCount;
            existingRecipe.MealType = JsonConvert.SerializeObject(updatedRecipe.MealType ?? existingRecipe.MealType);

            await _context.SaveChangesAsync();
            return Ok(existingRecipe);

        }
        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpDelete("delete_recipes/{id}")]
        public async Task<IActionResult> DeleteRecipes(int id)
        {

            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe == null)
            {
                return NotFound("Recipe not found.");
            }
            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
