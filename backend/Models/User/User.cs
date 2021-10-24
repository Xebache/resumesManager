using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;


namespace prid_2122_f02.Models {

    public enum Role {
        Admin = 2, Manager = 1, User = 0
    }

    public class User : IValidatableObject {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserID { get; set; }

        [Required(ErrorMessage = "Required")]
        [StringLength(10, MinimumLength = 3, ErrorMessage = "Length must be bewteen 3 and 10 characters")]
        [RegularExpression(@"^[a-zA-Z0-9_]*$", ErrorMessage = "Must contain either non-accented letters, numerals or underscore")]
        public string Pseudo { get; set; }

        [Required(ErrorMessage = "Required")]
        [StringLength(10, MinimumLength = 3, ErrorMessage = "Length must be bewteen 3 and 10 characters")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Required")] 
        [RegularExpression(@"^[\w-\.]+@([\w-]+\.)+[a-z]{2,4}$", ErrorMessage = "Does not fit email format")]
        public string Email { get; set; }

        public string Firstname { get; set; }

        public string Lastname { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? Birthdate { get; set; }

        public string FeaturedImage { get; set; } = "assets/images/profile/default.webp";

        public Role Role { get; set; } = Role.User;

        [NotMapped]
        public string Token { get; set; }

        public int? Age {
            get {
                if (!Birthdate.HasValue)
                    return null;

                var today = DateTime.Today;
                var age = today.Year - Birthdate.Value.Year;

                if (Birthdate.Value.Date > today.AddYears(-age)) 
                    age--;

                return age;
            }
        }


        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext) {
            var currContext = validationContext.GetService(typeof(Context)) as Context;
            Debug.Assert(currContext != null);

            if (!UserValidations.CheckPseudoUnicity(currContext, this))
                yield return new ValidationResult("Must be unique", new[] { nameof(Pseudo) });

            if (!UserValidations.CheckPseudoFirstLetter(this))
                yield return new ValidationResult("Must begin with a letter", new[] { nameof(Pseudo) });

            if (!UserValidations.CheckEmailUnicity(currContext, this))
                yield return new ValidationResult("Must be unique", new[] { nameof(Email) });

            if (!UserValidations.CheckNameLength(this.Firstname))
                yield return new ValidationResult("Length must be bewteen 3 and 50 characters", new[] { nameof(Firstname) });

            if (!UserValidations.CheckNameLength(this.Lastname))
                yield return new ValidationResult("Length must be bewteen 3 and 50 characters", new[] { nameof(Lastname) });

            if (!UserValidations.CheckNameComplete(this))
                yield return new ValidationResult("Both fields FirstName and LastName must be completed or left empty", new[] { nameof(Firstname), nameof(Lastname) });

            if (!UserValidations.CheckOlder18(this))
                yield return new ValidationResult("Must be 18 years old", new[] { nameof(Birthdate) });
        }

    }

}