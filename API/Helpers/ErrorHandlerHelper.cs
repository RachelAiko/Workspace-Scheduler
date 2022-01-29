using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Helpers
{
    public class ErrorHandlerHelper
    {
        public void HandleError()
        {
            string statusCode;
            string errorMessage;
        }
        /*
        public ObjectResult HandleError(Exception e)
        {
            if (e.Source == "FirebaseAdmin")
            {
                return UnauthorizedObjectResult("Unauthorized: " + e.Message);
            }
            
        }
        */
    }
}