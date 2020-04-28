using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tvshow.web.Core.Entities;

namespace tvshow.web.Core.Interfaces
{
    public interface IUserRepository
    {
        IEnumerable<User> GetUsers();

        bool DeleteUser(int id);

        bool CreateUser(User user);

        bool UpdateUser(int id, User user);

        User GetUserById(int id);

    }
}
