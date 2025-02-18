using EFCoreSample.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EFCoreSample.EntityConfiguration
{
    public class OrderConfiguration:IEntityTypeConfiguration<Orders>
    {
        public void Configure(EntityTypeBuilder<Orders> builder) {
            builder.ToTable("Orders");
            builder.HasKey(o => o.orderId);

            builder.Property(o => o.productName)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(o => o.price)
                .IsRequired();

            builder.HasOne(o => o.user)
                .WithMany(u => u.orders)
                .HasForeignKey(o => o.userId)
                .OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Cascade);
        }
    }
}
