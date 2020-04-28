using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tvshow.web.Core.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }

        public string Rol { get; set; }
    }
}
