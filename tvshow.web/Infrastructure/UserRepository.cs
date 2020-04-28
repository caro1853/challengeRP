using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tvshow.web.Core.Entities;
using tvshow.web.Core.Interfaces;
using tvshow.web.Infrastructure.Data;

namespace tvshow.web.Infrastructure
{
    public class UserRepository : IUserRepository
    {
        private readonly MyDBContext _myDBContext;

        public UserRepository(MyDBContext myDBContext)
        {
            this._myDBContext = myDBContext;
        }

        public bool UpdateUser(int id, User user)
        {
            User userCurrent = this._myDBContext.Users.FirstOrDefault(p => p.Id == id);
            if (userCurrent != null)
            {
                userCurrent.Name = string.IsNullOrEmpty(user.Name) ? userCurrent.Name : user.Name;
                userCurrent.Lastname = string.IsNullOrEmpty(user.Lastname) ? userCurrent.Lastname : user.Lastname;
                userCurrent.Password = string.IsNullOrEmpty(user.Password) ? userCurrent.Lastname : user.Password;

                this._myDBContext.Users.Update(userCurrent);
                this._myDBContext.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool CreateUser(User user)
        {
            this._myDBContext.Users.Add(user);
            this._myDBContext.SaveChanges();

            return true;
        }

        public bool DeleteUser(int id)
        {
            User user = this._myDBContext.Users.FirstOrDefault(p => p.Id == id);
            if (user != null)
            {
                this._myDBContext.Users.Remove(user);
                this._myDBContext.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public User GetUserById(int id)
        {
            User user = this._myDBContext.Users.FirstOrDefault(p => p.Id == id);

            return user;
        }

        public IEnumerable<User> GetUsers()
        {
            return this._myDBContext.Users;
        }

    }
}
