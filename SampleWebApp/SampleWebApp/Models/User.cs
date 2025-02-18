using System.ComponentModel.DataAnnotations;

namespace SampleWebApp.Models
{
    public class User
    {
        [Required]
        public int  id { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string password { get; set; }
        
    }
}
