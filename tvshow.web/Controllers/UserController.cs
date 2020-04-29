using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using tvshow.web.Core.Entities;
using tvshow.web.Core.Interfaces;
using tvshow.web.Infrastructure.Utils;

namespace tvshow.web.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]    
    public class UserController : ControllerBase
    {        
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            this._userRepository = userRepository;
        }

        [HttpGet]
        public  IEnumerable<User> Get()
        {
            return this._userRepository.GetUsers();            
        }

        [HttpGet("{id}")]
        public User Get(int id)
        {

            return this._userRepository.GetUserById(id);
            
        }

        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return this._userRepository.DeleteUser(id);            
        }

        [HttpPut("{id}")]
        public bool Update(int id, [FromBody] User user)
        {
            return this._userRepository.UpdateUser(id, user);
        }


        [HttpPost]
        public IActionResult Create([FromBody] User user)
        {
            //Validate email unique
            int cant = this._userRepository.GetUsers().Where(p => p.Email == user.Email).Count();

            if (cant > 0)
            {
                return BadRequest(new 
                    { 
                        ok =  false,
                        message = "El email debe ser único" 
                    });
            }

            user.Password = ManageKeys.GetSHA256(user.Password);
            bool res = this._userRepository.CreateUser(user);

            return Ok(new
                {
                    ok = true,
                    message = "Usuario creado"
                });            
        }
    }
}