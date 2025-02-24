using IdentityManagerWebApp.Models;
using IdentityManagerWebApp.Models.Common;
using IdentityManagerWebApp.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace IdentityManagerWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AccountController(UserManager<ApplicationUser> userManager,
                                 SignInManager<ApplicationUser> signInManager,
                                 RoleManager<ApplicationRole> roleManager,
                                 IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }
        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            try {
                var users = await _userManager.Users.ToListAsync();
                List<UserResult> userList = users.Select(p => new UserResult
                {
                    Id = p.Id,
                    UserName = p.UserName,
                    Email = p.Email,
                    FullName = p.FullName
                }).ToList();

                return Ok(userList);
            }
            catch (Exception ex)
            {
                // Return an internal server error if something goes wrong
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while fetching users.", error = ex.Message });
            }
        }
        //FgeDGSo6SE-->SecretKey fh8rcWt_p2BIrOk|DecOq2sJzeT=R^XU
        // POST: api/account/register
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser
                {
                    UserName = model.Email,
                    Email = model.Email,
                    FullName = model.FullName
                };
                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    // Add user to a default role
                    var defaultRole = "User";
                    if (model.Email.EndsWith("@admin.com")) {
                        defaultRole = "Admin";
                    }
                    var roleResult = await _userManager.AddToRoleAsync(user, defaultRole);

                    if (roleResult.Succeeded)
                    {
                        return Ok(new { message = "User created successfully" });
                    }
                    else
                    {
                        return BadRequest(roleResult.Errors);
                    }
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }
            return BadRequest("Invalid data.");
        }

        // POST: api/account/login
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user != null)
                {
                    var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);

                    if (result.Succeeded)
                    {
                        var roles = await _userManager.GetRolesAsync(user);
                        var token = GenerateJwtToken(user,roles.ToList());
                        return Ok(new { message = "Login successful",token=token });
                    }
                    else
                    {
                        return Unauthorized(new { message = "Invalid credentials" });
                    }
                }
                else
                {
                    return Unauthorized(new { message = "Invalid credentials" });
                }
            }
            return BadRequest("Invalid data.");
        }
        
        //Function to generate the JWT token
        private string GenerateJwtToken(ApplicationUser user,List<string> roles) {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub,user.Id),
                new Claim(JwtRegisteredClaimNames.Email,user.Email),
                new Claim(JwtRegisteredClaimNames.Name,user.FullName),
                
            };
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));  // Add the role to the claims
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);


            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims:claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings["ExpiryInMinutes"])),
                signingCredentials:credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        //POST :api/account/update/id
        [AllowAnonymous]
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateUser(string id,[FromBody] UpdateUserModel model)
        {
            if (ModelState.IsValid) {
                var user = await _userManager.FindByIdAsync(id);
                if (user != null)
                {
                    user.FullName = model.FullName ?? user.FullName;

                    var result = await _userManager.UpdateAsync(user);
                    if (result.Succeeded)
                    {
                        return Ok(new { message = "User updated successfully" });
                    }
                    else
                    {
                        return BadRequest(result.Errors);
                    }
                }
                else 
                {
                    return NotFound(new { message = "User not found" });
                }
            }
            return BadRequest("Invalid Data");
        }
        // POST: api/account/reset-password
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user != null)
                {
                    var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
                    var result = await _userManager.ResetPasswordAsync(user, resetToken, model.NewPassword);

                    if (result.Succeeded)
                    {
                        return Ok(new { message = "Password reset successfully" });
                    }
                    else
                    {
                        return BadRequest(result.Errors);
                    }
                }
                else
                {
                    return BadRequest("User not found.");
                }
            }
            return BadRequest("Invalid data.");
        }

        // Other methods such as GetUserRoles, GetUserLogins can also be added here
    }


    public class RegisterModel
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }

    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class ResetPasswordModel
    {
        public string Email { get; set; }
        public string NewPassword { get; set; }
    }

}
