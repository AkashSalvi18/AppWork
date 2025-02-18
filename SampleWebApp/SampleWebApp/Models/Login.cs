using System.ComponentModel.DataAnnotations;

namespace SampleWebApp.Models
{
    public class Login
    {
        [Required]
        public string ? email { get; set; }
        [Required]
        public string ? password { get; set; }
    }
}
