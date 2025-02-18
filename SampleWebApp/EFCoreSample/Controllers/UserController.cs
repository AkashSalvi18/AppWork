using EFCoreSample.Data;
using EFCoreSample.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EFCoreSample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UserController(AppDbContext context)
        {
            _context = context;
        }

        public List<User> Users = new List<User>();

        [HttpGet("users")]
        public IActionResult GetUsers() {
            var users = _context.Users.ToList();
            return Ok(users);
        }

        [HttpPost("addusers")]
        public IActionResult AddUsers([FromBody]User users) {
            if (users == null) {
                return BadRequest("User data is null");
            }

            _context.Users.Add(users);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetUserById), new { id = users.id }, users);

        }
        // GET: api/user/getuser/{id}
        [HttpGet("getuser/{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // GET: api/user/getuser/{id}/orders
        [HttpGet("getuser/{id}/orders")]
        public IActionResult GetOrdersByUserId(int id)
        {
            var user = _context.Users
                               .Include(u => u.orders)  // Include related orders
                               .FirstOrDefault(u => u.id == id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user.orders);
        }

        // POST: api/user/{userId}/orders
        [HttpPost("{userId}/orders")]
        public IActionResult AddOrder(int userId,[FromBody] Orders order)
        {
            var user = _context.Users.Find(userId);

            if (user == null)
            {
                return NotFound("User not found");
            }

            // Set the UserId for the order to associate it with the user
            order.userId = userId;
            _context.Orders.Add(order);
            _context.SaveChanges();

            // Return the created order
            return CreatedAtAction(nameof(GetOrderById), new { id = order.orderId }, order);
        }

        // GET: api/orders/{id}
        [HttpGet("orders/{id}")]
        public IActionResult GetOrderById(int id)
        {
            var order = _context.Orders.Find(id);

            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }
    }
}
