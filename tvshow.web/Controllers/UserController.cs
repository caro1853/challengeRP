using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using tvshow.web.Core.Entities;
using tvshow.web.Core.Interfaces;

namespace tvshow.web.Controllers
{
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

            /*
            List<User> users = new List<User>();

            users.Add(new User()
            {
                Id = 1,
                Name = "Maria",
                Lastname = "Morales",
                Email = "maria@gmail.com",
                Password = "1234",
                Rol = "A"
            });

            return users;*/
        }

        [HttpGet("{id}")]
        public User Get(int id)
        {

            return this._userRepository.GetUserById(id);
            /*return new User()
            {
                Id = 20,
                Name = "Mariana",
                Lastname = "perez",
                Email = "maria@gmail.com",
                Password = "1234",
                Rol = "A"
            };*/
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
        public bool Create([FromBody] User user)
        {
            return this._userRepository.CreateUser(user);
        }


    }
}