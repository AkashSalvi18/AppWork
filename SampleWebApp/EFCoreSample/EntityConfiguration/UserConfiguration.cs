using EFCoreSample.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EFCoreSample.EntityConfiguration
{
    public class UserConfiguration:IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder) {
            builder.ToTable("Users");
            builder.HasKey(u => u.id);
            builder.Property(u => u.name)
                .IsRequired()
                .HasMaxLength(15);
            builder.Property(u => u.phoneNumber)
                .IsRequired()
                .HasMaxLength(10);

            builder.HasIndex(u => u.phoneNumber).IsUnique();
        }
    }
}
