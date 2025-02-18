using System.ComponentModel.DataAnnotations;

namespace SampleWebApp.Models
{
    public class Signup
    {
        [Required]
        public string? fname { get; set; }
        [Required]
        public string? lname { get; set; }
        [Required]
        public string? email { get; set; }
        [Required]
        public string? password { get; set; }
    }
}
