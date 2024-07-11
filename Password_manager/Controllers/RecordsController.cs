using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Password_manager.Interfaces;
using Password_manager.Models;

namespace Password_manager.Controllers
{
    //Контроллер для управления записями
    [Route("records")]
    public class RecordsController : Controller
    {
        private IRecordsService recordsService;
        public RecordsController(IRecordsService recordsService)
        {
            this.recordsService = recordsService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRecord([FromBody] RecordModel record)
        {
            var creationIsSuccessful = await recordsService.TryCreateRecord(record);
            if (creationIsSuccessful) return Ok();
            return Conflict("Запись с таким именен уже существует.");
        }

        [HttpGet]
        public async Task<IActionResult> GetRecords()
        {
            var records = await recordsService.GetRecords();
            return Json(records);
        }
    }
}
