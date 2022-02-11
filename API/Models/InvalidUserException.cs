using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class InvalidUserException : Exception
    {
        public InvalidUserException(string message) : base(message)
        {

        }
    }
}