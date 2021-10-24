using System;

namespace prid_2122_f02.Models {

    public class UserDTO {

        public string Pseudo { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public DateTime? Birthdate { get; set; }
        public string FeaturedImage { get; set; }
        public Role Role { get; set; }
        public string Token { get; set; }
    }

    public class UserWithPasswordDTO : UserDTO {

        public string Password { get; set; }
    }

}