using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApplication3.Models
{
    public class SecretosDB
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Titulo { get; set; }
        [Required]
        public string Descripcion { get; set; }
        [Required]
        [StringLength(100)]
        public string Valor_Monetario { get; set; }
        [Required]
        public DateTime Fecha { get; set; }
        [Required]
        [StringLength(100)]
        public string Lugar { get; set; }
        [Required]
        [StringLength(100)]
        public string Lat { get; set; }
        [Required]
        [StringLength(100)]
        public string Lot { get; set; }
        public int DBHABILATO { get; set; }
        [Required]
        [StringLength(500)]
        public string Usuario { get; set; }
    }
}