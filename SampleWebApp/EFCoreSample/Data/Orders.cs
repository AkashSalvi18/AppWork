using EFCoreSample.Models;

namespace EFCoreSample.Data
{
    public class Orders
    {
        public int orderId { get; set; }
        public string productName { get; set; }
        public decimal price { get; set; }
        public int userId { get; set; }

        public User ? user { get; set; }
    }
}
