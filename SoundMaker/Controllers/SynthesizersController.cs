using Microsoft.AspNetCore.Mvc;
using SoundMaker.Models;
using System.Collections.Generic;
using System.Linq;
//using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System.Security.Claims;
using System;

namespace SoundMaker.Controllers
{
  // [Authorize]
  public class SynthesizersController : Controller
  {
  // {
  //   private readonly AudioProjectContext _db;
  //   private readonly UserManager<ApplicationUser> _userManager;

  //   public ToneController(UserManager<ApplicationUser> userManager, AudioProjectContext db)
  //   {
  //     _userManager = userManager;
  //     _db = db;
  //   }
    //[HttpGet]
    public ActionResult Index() 
    {
      return View();
    }
  }
}