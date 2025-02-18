using EFCoreSample.Data;

namespace EFCoreSample.Models
{
    public class User
    {
        public int id { get; set; }
        public string name { get; set; }
        public string phoneNumber { get; set; }
        public List<Orders> ?orders { get; set; }
    }
}
