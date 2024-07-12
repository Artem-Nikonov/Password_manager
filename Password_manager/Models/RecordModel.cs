namespace Password_manager.Models
{
    //Модель записи
    public class RecordModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public DateTime DateCreated { get; set; }
        public string recordType { get; set; }
        public override string ToString()
        {
            return $"{Name} {Password} {DateCreated} {recordType}";
        }
    }
}
