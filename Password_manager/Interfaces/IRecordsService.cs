using Password_manager.Models;

namespace Password_manager.Interfaces
{
    //Интерфейс класса-сервиса для управления записями.
    public interface IRecordsService
    {
        //Создание новой записи. Значение bool будет указывать на то, успешно ли выполнено добавление.
        Task<bool> TryCreateRecord(RecordModel record);

        //Получение всех записей
        Task<List<RecordModel>> GetRecords(string? filter=null);
    }
}
