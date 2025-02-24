using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace IdentityManagerWebApp.Models.GridEntities
{
    public class Recipe
    {
        //public int Id { get; set; }
        //public string Name { get; set; }
        //public List<string> Ingredients { get; set; }
        //public List<string> Instructions { get; set; }
        //public int PrepTimeMinutes { get; set; }
        //public int CookTimeMinutes { get; set; }
        //public int Servings { get; set; }
        //public string Difficulty { get; set; }
        //public string Cuisine { get; set; }
        //public int CaloriesPerServing { get; set; }
        //public List<string> Tags { get; set; }
        //public int UserId { get; set; }
        //public string Image { get; set; }
        //public double Rating { get; set; }
        //public int ReviewCount { get; set; }
        //public List<string> MealType { get; set; }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Ingredients { get; set; }  
        public string Instructions { get; set; }  
        public int PrepTimeMinutes { get; set; }
        public int CookTimeMinutes { get; set; }
        public int Servings { get; set; }
        public string Difficulty { get; set; }
        public string Cuisine { get; set; }
        public int CaloriesPerServing { get; set; }
        public string Tags { get; set; } 
        public int UserId { get; set; }
        public string Image { get; set; }
        public double Rating { get; set; }
        public int ReviewCount { get; set; }
        public string MealType { get; set; }

        [NotMapped]
        public List<string> IngredientsList => JsonConvert.DeserializeObject<List<string>>(Ingredients);

        [NotMapped]
        public List<string> InstructionsList => JsonConvert.DeserializeObject<List<string>>(Instructions);

        [NotMapped]
        public List<string> TagsList => JsonConvert.DeserializeObject<List<string>>(Tags);

        [NotMapped]
        public List<string> MealTypeList => JsonConvert.DeserializeObject<List<string>>(MealType);
    }
}
