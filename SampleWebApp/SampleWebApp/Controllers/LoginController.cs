using Microsoft.AspNetCore.Mvc;
using SampleWebApp.Models;

namespace SampleWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private static List<User> _users = new List<User>();
        private static int _currentId = 1;

        static  LoginController()
        {
            // Populating the list with 50 sample users
            for (int i = 1; i <= 50; i++)
            {
                _users.Add(new User
                {
                    id = _currentId++,
                    email = $"user{i}@example.com",
                    password = $"password{i}"
                });
            }
        }

        //Get all users
        [HttpGet("users")]
        public IActionResult GetUsers() {

            return Ok(_users);
        }

        //Signup Request
        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] User newUser) {
            var existigUser = _users.Find(u => u.email == newUser.email);
            if (existigUser != null) {
                return BadRequest(new { message = "User with this email already exist" });
            }
          
            newUser.id = _currentId++;
            _users.Add(newUser);
            return Ok(new { message = "User registration successful",userId=newUser.id });
        }
        //Login Request
        [HttpPost("login")]
        public IActionResult Login([FromBody] User loginUser) {
            var existingUser = _users.Find(u => u.email == loginUser.email && u.password == loginUser.password);
            if (existingUser==null) {
                return Unauthorized(new { message = "Invalid email or password" });
                
            }
            return Ok(new { message = "Login Successfull",userId=existingUser.id });
        }
        // Update User Request
        [HttpPut("update/{id}")]
        public IActionResult UpdateUser(int id, [FromBody] User updatedUser)
        {
            var existingUser = _users.Find(u => u.id == id);
            if (existingUser == null)
            {
                return NotFound(new { message = "User not found" });
            }

            // Update user's email or password
            existingUser.email = updatedUser.email ?? existingUser.email; // If no new email, keep old one
            existingUser.password = updatedUser.password ?? existingUser.password; // If no new password, keep old one

            return Ok(new { message = "User updated successfully",userId=existingUser.id });
        }

        // Delete User Request
        [HttpDelete("delete/{id}")]
        public IActionResult DeleteUser(int id)
        {
            var userToDelete = _users.Find(u => u.id == id);
            if (userToDelete == null)
            {
                return NotFound(new { message = "User not found" });
            }

            _users.Remove(userToDelete);
            return Ok(new { message = "User deleted successfully",userId=id });
        }
    }
}
