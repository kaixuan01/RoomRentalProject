namespace DAL.Models;

public partial class TPropertyFacility
{
    public long PropertyId { get; set; }

    public int FacilityType { get; set; }

    public DateTime CreatedAt { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int? UpdatedBy { get; set; }
}