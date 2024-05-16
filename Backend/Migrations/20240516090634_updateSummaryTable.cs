using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace newRegistrationApp.Migrations
{
    /// <inheritdoc />
    public partial class updateSummaryTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TermsOfService",
                table: "summaries",
                newName: "TermsOfServices");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TermsOfServices",
                table: "summaries",
                newName: "TermsOfService");
        }
    }
}
