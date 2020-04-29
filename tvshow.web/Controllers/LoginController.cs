using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using tvshow.web.Core.Entities;
using tvshow.web.Core.Interfaces;
using tvshow.web.Infrastructure.Utils;

namespace tvshow.web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class LoginController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public LoginController(IUserRepository userRepository)
        {
            this._userRepository = userRepository;
        }

        [HttpPost]
        public IActionResult Login([FromBody] UserInfo userInfo)
        {
            if (ModelState.IsValid)
            {
                string ePass = ManageKeys.GetSHA256(userInfo.Password);

                User userAuth = this._userRepository.GetUsers().Where(p => p.Email == userInfo.Email && p.Password == ePass).FirstOrDefault();

                if (userAuth!=null)
                {
                    return BuildToken(userAuth);
                }

                return Unauthorized();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize]
        [HttpGet]
        public IActionResult Login()
        {
            return Ok();
        }

        private IActionResult BuildToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Email),
                new Claim("role", user.Rol ==null? "U" : user.Rol),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("EstaEsUnaClaveSecreta"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddHours(4);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: "",
                audience: "",
                claims: claims,
                expires: expiration,
                signingCredentials: creds
                );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = expiration
            });
        }


    }
}