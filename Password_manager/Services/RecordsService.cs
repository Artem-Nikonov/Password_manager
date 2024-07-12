using Microsoft.EntityFrameworkCore;
using Password_manager.Interfaces;
using Password_manager.Models;

namespace Password_manager.Services
{
    //Сервис для управления записями
    public class RecordsService : IRecordsService
    {
        public RecordsService(AppDbContext dbContext, ILogger<RecordsService> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        private AppDbContext _dbContext;
        private ILogger<RecordsService> _logger;

        //Создание новой записи
        public async Task<bool> TryCreateRecord(RecordModel recordToCreate)
        {
            try
            {
                var record = await _dbContext.Records.FirstOrDefaultAsync(record => record.Name == recordToCreate.Name);
                if (record != null) return false; /*если запись с заданным именем уже существует, то новая запись не добавляется.
                                              Возвращаем false (операция добавления не выполнена)*/
                await _dbContext.Records.AddAsync(recordToCreate);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        //Получение всех записей
        public async Task<List<RecordModel>> GetRecords(string filter = null)
        {
            try
            {
                IQueryable <RecordModel> query = _dbContext.Records;

                if (!string.IsNullOrEmpty(filter))
                    query = query.Where(record => record.Name.Contains(filter));

                var records = await query.OrderByDescending(record=>record.DateCreated)
                                         .AsNoTracking().ToListAsync();
                return records;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
            
        }
    }
}
