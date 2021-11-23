using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private string testProp { get; set; }
        public UsersController()
        {
            testProp = "I'm a user";
        }

        [AllowAnonymous]
        [HttpGet]
        public string GetTest()
        {
            return "{\"testProp\": \"" + testProp + "\"}";
        }
    }
}