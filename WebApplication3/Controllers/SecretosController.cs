using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    public class SecretosController : Controller
    {
        [Authorize]
        // GET: Secretos
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarSecretos()
        {
            DataClasses1DataContext db = new DataClasses1DataContext();

            var usuario = User.Identity.Name;

            var lista = (db.SecretosDBs.Where(x => x.Usuario == usuario)
                .Select(p => new
                {
                    p.Id,
                    p.Titulo,
                    p.Descripcion,
                    p.Valor_Monetario,
                    p.Lugar,
                    Fecha = ((DateTime)p.Fecha).ToShortDateString(),
                    p.Lat,
                    p.Lot
                })).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarUser()
        {
            DataClasses1DataContext db = new DataClasses1DataContext();

            var usuario = User.Identity.Name;

            var lista = (db.AspNetUsers.Where(x => x.Email == usuario)
                .Select(p => new
                {
                    p.nombre,
                    p.apellido,
                    p.foto
                    
                })).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int eliminar(SecretosDBs secretosDBs)
        {
            DataClasses1DataContext bd = new DataClasses1DataContext();
            int nregistrosAfectados = 0;
            try
            {
                int idRegistro = secretosDBs.Id;
                SecretosDBs obj = bd.SecretosDBs.Where(p => p.Id.Equals(idRegistro)).First();
                obj.Usuario = "000091";
                bd.SubmitChanges();
                nregistrosAfectados = 1;
            }
            catch (Exception error)
            {
                nregistrosAfectados = 0;
            }
            return nregistrosAfectados;
        }
        public JsonResult recuperarInformacion(int id)
        {
            DataClasses1DataContext bd = new DataClasses1DataContext();
            var lista = bd.SecretosDBs.Where(p => p.Id.Equals(id)).Select(
                p => new
                {
                    p.Titulo,
                    p.Descripcion,
                    p.Valor_Monetario,
                    p.Lugar,
                    Fecha = ((DateTime)p.Fecha).ToShortDateString(),
                    p.Lat,
                    p.Lot
                }
                );
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
        public int guardarDatos(SecretosDBs secretosDBs)
        {
            DataClasses1DataContext bd = new DataClasses1DataContext();
            SecretosDBs obj = new SecretosDBs();
            int nregistrosAfectados = 0;
            try
            {
                int idRegistro = secretosDBs.Id;
                if (idRegistro >= 1)
                {
                    //Editar registro
                    obj = bd.SecretosDBs.Where(p => p.Id.Equals(idRegistro)).First();
                    obj.Titulo = secretosDBs.Titulo;
                    obj.Descripcion = secretosDBs.Descripcion;
                    obj.Valor_Monetario = secretosDBs.Valor_Monetario;
                    obj.Lugar = secretosDBs.Lugar;
                    obj.Fecha = secretosDBs.Fecha;
                    obj.Lat = secretosDBs.Lat;
                    obj.Lot = secretosDBs.Lot;
                    obj.Usuario = secretosDBs.Usuario;
                    bd.SubmitChanges();
                    nregistrosAfectados = 1;
                }
                else
                {
                    //Nuevo registro                    
                    bd.SecretosDBs.InsertOnSubmit(secretosDBs);
                    bd.SubmitChanges();
                    nregistrosAfectados = 1;
                }

            }
            catch (Exception error)
            {
                nregistrosAfectados = 0;
            }
            return nregistrosAfectados;
        }

        public JsonResult listarRegitro()
        {
            var usuario = User.Identity.Name;

            DataClasses1DataContext db = new DataClasses1DataContext();
            var lista = (db.AspNetUsers.Where(p => p.Email == usuario )
                   .Select(p => new { p.Email, p.nombre })).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        //public JsonResult listarAlumno()
        //{

        //    var lista = (db.Alumno.Where(p => p.BHABILITADO.Equals(1))
        //        .Select(p => new { p.IIDALUMNO, p.NOMBRE, p.APPATERNO, p.APMATERNO, p.TELEFONOPADRE })).ToList();
        //    return Json(lista, JsonRequestBehavior.AllowGet);
        //}
    }
}