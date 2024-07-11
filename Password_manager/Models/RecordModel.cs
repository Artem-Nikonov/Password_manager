namespace Password_manager.Models
{
    public class RecordModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public DateTime DateCreated { get; set; }
        //public string RecordType { get; set; }
        public override string ToString()
        {
            return $"{Name} {Password} {DateCreated}";
        }
    }
}
