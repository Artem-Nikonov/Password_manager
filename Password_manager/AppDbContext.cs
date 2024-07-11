using Microsoft.EntityFrameworkCore;
using Password_manager.Models;

namespace Password_manager
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<RecordModel> Records { get; set; } = null!;
    }
}
